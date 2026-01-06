import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { supabase } from '../lib/supabase';
import { AlertTriangle, Trash2, ArrowRight, X, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { snippetApi, SnippetWithTags, } from '../lib/api/snippets';
import { folderApi } from '../lib/api/folders';
import { tagApi } from '../lib/api/tags';
import { SnippetForm } from './snippets/SnippetForm';
import { SnippetDetail } from './snippets/SnippetDetail';
import { FolderManager } from './folders/FolderManager';
import { TagManager } from './tags/TagManager';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { Layout } from './Layout';
import { Sidebar } from './Sidebar';
import { SearchBar } from './SearchBar';
import { SnippetGrid } from './SnippetGrid';
import { Link } from 'react-router-dom';
import { ImportExport } from './snippets/ImportExport';
import { track } from '../lib/api/PostHogAnalytics';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const { subscription } = useSubscription();
  const [snippets, setSnippets] = useState<SnippetWithTags[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<SnippetWithTags[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState('');
  const [sortByDate, setSortByDate] = useState('newest');
  const [sortByName, setSortByName] = useState('none');
  const [showSnippetForm, setShowSnippetForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<SnippetWithTags | null>(null);
  const [viewingSnippet, setViewingSnippet] = useState<SnippetWithTags | null>(null);
  const [showFolderManager, setShowFolderManager] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [deletingSnippetId, setDeletingSnippetId] = useState<string | null>(null);
  const [selectedSnippetIds, setSelectedSnippetIds] = useState<string[]>([]);
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
console.log(user);

  const loadData = async () => {
    setLoading(true);
    if (!user) return; // Guard against running without a user
    try {
      const [snippetsData, foldersData, tagsData] = await Promise.all([
        snippetApi.getAll(user?.id),
        folderApi.getAll(user?.id),
        tagApi.getAll(user?.id),
      ]);
      setSnippets(snippetsData);
      setFolders(foldersData);
      setTags(tagsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!user) return;

    loadData(); // Initial load

    // Set up the real-time subscription
    const channel = supabase
      .channel('dashboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'snippets',
          filter: `user_id=eq.${user.id}` // Only listen to THIS user's changes
        },
        (payload) => {
          console.log('Realtime change detected:', payload.eventType);
          loadData(); // Refresh everything
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);// <-- Key change: Re-run this effect when the user object changes.

  // Effect to listen for snippet migration and show a fallback toast.
  useEffect(() => {
    const handleSnippetMigration = () => {
      console.log('Snippet migration event received!');
      // Give the real-time subscription a moment to catch up.
      // If it works, the UI will update, and this toast is just a backup.
      const timer = setTimeout(() => {
        toast("If you don't see your new snippet. A quick refresh might be needed.", {
          icon: '✨',
          duration: 6000 // Show for a bit longer
        });
      }, 2500); // 2.5-second delay
    };

    window.addEventListener('snippet-migrated', handleSnippetMigration);

    return () => window.removeEventListener('snippet-migrated', handleSnippetMigration);
  }, []); // Run only once on component mount

  useEffect(() => {
    filterSnippets();
  }, [snippets, searchQuery, selectedFolder, selectedLanguage, selectedTag, showFavoritesOnly, sidebarSearchTerm, sortByName, sortByDate]);


  const filterSnippets = () => {
    let filtered = [...snippets];

    // Sidebar search (by name)
    if (sidebarSearchTerm) {
      const sidebarQuery = sidebarSearchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(sidebarQuery)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.title.toLowerCase().includes(query) ||
          s.description?.toLowerCase().includes(query) ||
          s.code.toLowerCase().includes(query) ||
          s.tags?.some(t => t.name.toLowerCase().includes(query))
      );
    }

    if (selectedFolder !== null) {
      if (selectedFolder === '') { // "No Folder" selected
        filtered = filtered.filter(s => s.folder_id === null);
      } else {
        filtered = filtered.filter(s => s.folder_id === selectedFolder);
      }
    }

    if (selectedLanguage) {
      filtered = filtered.filter(s => s.language === selectedLanguage);
    }

    if (selectedTag) {
      filtered = filtered.filter(s => s.tags?.some(t => t.id === selectedTag));
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(s => s.is_favorite);
    }

    // Combined sorting logic
    switch (sortByName) {
      case 'name_asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // If name sort is 'none', use the date sort
        if (sortByDate === 'oldest') {
          filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else if (sortByDate === 'newest') {
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } else {
          // If both are 'none', default to newest, which matches the API's default order.
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
        break;
    }
    // On the main dashboard, we only want to show a limited number of snippets.
    // The full list is on the /snippets page.
    const dashboardSnippets = filtered.slice(0, 10);
    setFilteredSnippets(dashboardSnippets);
  }

  const handleToggleSnippetSelection = (id: string) => {
    track('toggle_snippet_selection', { snippet_id: id });
    setSelectedSnippetIds(prev =>
      prev.includes(id)
        ? prev.filter(snippetId => snippetId !== id) // Deselect
        : [...prev, id] // Select
    );
  };

  const handleToggleSelectionMode = () => {
    track('toggle_selection_mode', { active: !isSelectionModeActive });
    setIsSelectionModeActive(prev => !prev);
    setSelectedSnippetIds([]); // Clear selections when toggling mode
  };

  const handleExportSelected = () => {
    track('export_selected_snippets', { count: selectedSnippetIds.length });
    if (selectedSnippetIds.length > 0) {
      setShowImportExport(true);
    }
  };

  const snippetsToExport = snippets.filter(s => selectedSnippetIds.includes(s.id));
  const isFreePlan = !subscription || subscription.plan === 'free';
  const snippetLimit = 50;
  const hasReachedLimit = isFreePlan && snippets.length >= snippetLimit;
  const limitTooltip = hasReachedLimit ? 'You have reached the snippet limit for the free plan. Please upgrade to save more snippets.' : '';

  const handleCreateSnippet = () => {
    track('create_snippet_clicked');
    if (hasReachedLimit) return;
    setEditingSnippet(null);
    setShowSnippetForm(true);
  };

  const handleEditSnippet = (snippet: SnippetWithTags) => {
    track('edit_snippet_clicked', { snippet_id: snippet.id });
    setEditingSnippet(snippet);
    setShowSnippetForm(true);
    setViewingSnippet(null);
  };

  const handleDeleteSnippet = (id: string) => {
    track('delete_snippet_clicked', { snippet_id: id });
    setDeletingSnippetId(id);
  };

  const confirmDeleteSnippet = async () => {
    if (!deletingSnippetId) return;
    try {
      await snippetApi.delete(deletingSnippetId);
      track('snippet_deleted', { snippet_id: deletingSnippetId });
      toast.success('Snippet deleted successfully.');
      await loadData();
    } catch (error) {
      console.error('Error deleting snippet:', error);
      toast.error('Failed to delete snippet.');
    } finally {
      setDeletingSnippetId(null);
    }
  };

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await snippetApi.toggleFavorite(id, isFavorite);
      track('toggle_favorite', { snippet_id: id, is_favorite: isFavorite });
      await loadData();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSnippetSaved = async (dataFromForm: any) => {
    // Destructure to separate snippet data from tag cleanup data
    const { originalTagIds, tags, ...snippetDataForDatabase } = dataFromForm;

    try {
      // Ensure user_id is always present for RLS policies.
      if (!snippetDataForDatabase.user_id && user?.id) {
        snippetDataForDatabase.user_id = user.id;
      }

      if (editingSnippet) {
        // When editing, 'tags' is already the array of selected tag IDs.
        track('update_snippet', { snippet_id: editingSnippet.id });
        await snippetApi.update(
          editingSnippet.id,
          {
            ...snippetDataForDatabase,
            tags: tags, // Pass the array of tag IDs directly
            originalTagIds,
          }
        );

        const currentTagIds = tags?.map((t: any) => t.id);
        const removedTagIds = originalTagIds?.filter(
          (id: string) => !currentTagIds?.includes(id)
        );

        const deletePromises: Promise<void>[] = [];
        if (removedTagIds.length > 0) {
          for (const tagId of removedTagIds) {
            deletePromises?.push(tagApi.getUsageCount(tagId)?.then(usageCount => {
              if (usageCount === 0) return tagApi.delete(tagId);
            }));
          }
        }
        await Promise.all(deletePromises);

        toast.success('Snippet updated successfully!');
      } else {
        // For new snippets, 'tags' is the array of selected tag IDs.
        await snippetApi.create(snippetDataForDatabase, tags);


        toast.success('Snippet created successfully!');
      }

      // STEP 3: Finally, after all DB operations are complete, reload UI data.
      await loadData();
      setShowSnippetForm(false);
      setEditingSnippet(null);
    } catch (error) {
      console.error('Error saving snippet:', error);
      toast.error((error as Error).message || 'There was an error saving the snippet.');
      throw error; // Re-throw the error to be caught by the form
    }
  };

  const handleSnippetUpdate = (updatedSnippet: SnippetWithTags) => {
    setSnippets(currentSnippets =>
      currentSnippets.map(s =>
        s.id === updatedSnippet.id ? updatedSnippet : s
      )
    );
    // Also update the viewingSnippet state if it's the one being edited
    if (viewingSnippet?.id === updatedSnippet.id) {
      setViewingSnippet(updatedSnippet);
    }
  };

  useKeyboardShortcuts({
    onNew: () => setShowSnippetForm(true),
    onSearch: () => searchInputRef.current?.focus(),
  });

  const handleSelectPlan = (planName: string) => {
    console.log(`User wants to upgrade to: ${planName}`);
    // Here you would add logic to handle the upgrade, e.g., redirect to Stripe checkout.
    setShowPricing(false); // Close the modal after selection.
  };

  const languages = Array.from(new Set(snippets.map(s => s.language))).sort();

  const hasOpenModal = showSnippetForm || !!viewingSnippet || showFolderManager || showTagManager || !!deletingSnippetId || showPricing || showImportExport;

  return (
    <Layout hasOpenModal={hasOpenModal} onShowImportExport={handleToggleSelectionMode}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            onCreateSnippet={handleCreateSnippet}
            isCreateDisabled={hasReachedLimit}
            createDisabledTooltip={limitTooltip}
            folders={folders}
            tags={tags}
            languages={languages}
            selectedFolder={selectedFolder}
            onSelectFolder={setSelectedFolder}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
            onShowFolderManager={() => setShowFolderManager(true)}
            onShowTagManager={() => setShowTagManager(true)}
            searchTerm={sidebarSearchTerm}
            snippetCount={snippets.length}
            onSearchTermChange={setSidebarSearchTerm}
            sortByName={sortByName}
            sortByDate={sortByDate}
            onSortByName={setSortByName}
            onSortByDate={setSortByDate}
            onClearFilters={() => {
              setSelectedFolder(null);
              setSelectedLanguage('');
              setSelectedTag(null);
              setShowFavoritesOnly(false);
              setSidebarSearchTerm('');
              setSortByDate('newest');
              setSortByName('none');
            }}
          />

          <main className="flex-1">
            <div className="flex justify-between items-center">
              <SearchBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} searchInputRef={searchInputRef} />
            </div>
            {/* {snippets && (
              <Link to="/dashboard/snippets" className="flex items-center justify-end mb-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            )} */}
            <SnippetGrid
              loading={loading}
              snippets={filteredSnippets}
              hasActiveFilters={!!searchQuery || selectedFolder !== null || !!selectedLanguage || showFavoritesOnly || !!selectedTag}
              onEdit={handleEditSnippet}
              onDelete={handleDeleteSnippet}
              onToggleFavorite={handleToggleFavorite}
              onView={setViewingSnippet}
              onCreate={handleCreateSnippet}
              selectedSnippetIds={selectedSnippetIds}
              onSelectSnippet={handleToggleSnippetSelection}
              isSelectionModeActive={isSelectionModeActive}
            />
          </main>
        </div>
      </div>

      {showSnippetForm && (
        <SnippetForm
          snippet={editingSnippet}
          onClose={() => {
            setShowSnippetForm(false);
            setEditingSnippet(null);
          }}
          folders={folders}
          tags={tags}
          onSave={handleSnippetSaved}
        />
      )}

      {viewingSnippet && (
        <SnippetDetail
          snippet={viewingSnippet}
          onClose={() => setViewingSnippet(null)}
          onEdit={handleEditSnippet}
          onDelete={handleDeleteSnippet}
          onSnippetUpdated={loadData}
        />
      )}

      {showFolderManager && (
        <FolderManager
          onClose={() => {
            setShowFolderManager(false);
            loadData();
          }}
        />
      )}

      {showTagManager && (
        <TagManager
          onClose={() => {
            setShowTagManager(false);
            loadData();
          }}
          onTagsUpdated={loadData}
        />
      )}

      {showImportExport && (
        <ImportExport
          snippets={snippetsToExport}
          onClose={() => setShowImportExport(false)}
          onImportComplete={loadData}
        />
      )}


      {deletingSnippetId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Snippet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Are you sure you want to delete this snippet? This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button onClick={() => setDeletingSnippetId(null)} className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold">
                  Cancel
                </button>
                <button onClick={confirmDeleteSnippet} className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition flex items-center justify-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSelectionModeActive && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 shadow-2xl rounded-full p-3 flex items-center gap-4 z-40 border border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 pl-3">
            {selectedSnippetIds.length > 0
              ? `${selectedSnippetIds.length} selected`
              : 'Select snippets to export'}
          </span>
          <button
            onClick={handleExportSelected}
            disabled={selectedSnippetIds.length === 0}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={handleToggleSelectionMode} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </Layout>
  );
}
