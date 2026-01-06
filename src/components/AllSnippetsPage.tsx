import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { snippetApi, SnippetWithTags } from '../lib/api/snippets';
import { folderApi } from '../lib/api/folders';
import { tagApi } from '../lib/api/tags';
import { SnippetCard } from '../components/snippets/SnippetCard';
import { SnippetForm } from '../components/snippets/SnippetForm';
import { SnippetDetail } from '../components/snippets/SnippetDetail';
import { FolderManager } from '../components/folders/FolderManager';
import { TagManager } from '../components/tags/TagManager';
import { ImportExport } from '../components/snippets/ImportExport';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { DashboardNav } from '../components/DashboardNav';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { SnippetGrid } from '../components/SnippetGrid';

export function AllSnippetsPage() {
  const { user, signOut } = useAuth();
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
  const [showImportExport, setShowImportExport] = useState(false);
  const [deletingSnippetId, setDeletingSnippetId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  useEffect(() => {
    filterSnippets();
  }, [snippets, searchQuery, selectedFolder, selectedLanguage, selectedTag, showFavoritesOnly, sidebarSearchTerm, sortByName, sortByDate]);

  const loadData = async () => {
    setLoading(true);
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

  const filterSnippets = () => {
    let filtered = [...snippets];

    if (sidebarSearchTerm) {
      filtered = filtered.filter(s => s.title.toLowerCase().includes(sidebarSearchTerm.toLowerCase()));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query) ||
        s.code.toLowerCase().includes(query) ||
        s.tags?.some(t => t.name.toLowerCase().includes(query))
      );
    }

    if (selectedFolder !== null) {
      filtered = filtered.filter(s => s.folder_id === (selectedFolder === '' ? null : selectedFolder));
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

    switch (sortByName) {
      case 'name_asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        if (sortByDate === 'oldest') {
          filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else if (sortByDate === 'newest') {
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } else {
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
        break;
    }
    setFilteredSnippets(filtered);
  };

  const handleCreateSnippet = () => {
    setEditingSnippet(null);
    setShowSnippetForm(true);
  };

  const handleEditSnippet = (snippet: SnippetWithTags) => {
    setEditingSnippet(snippet);
    setShowSnippetForm(true);
    setViewingSnippet(null);
  };

  const handleDeleteSnippet = (id: string) => setDeletingSnippetId(id);

  const confirmDeleteSnippet = async () => {
    if (!deletingSnippetId) return;
    try {
      await snippetApi.delete(deletingSnippetId);
      toast.success('Snippet deleted successfully.');
      await loadData();
    } catch (error) {
      toast.error('Failed to delete snippet.');
    } finally {
      setDeletingSnippetId(null);
    }
  };

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await snippetApi.toggleFavorite(id, isFavorite);
      await loadData();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSnippetSaved = async () => {
    setShowSnippetForm(false);
    setEditingSnippet(null);
    await loadData();
    toast.success('Snippet saved successfully!');
  };

  const handleSnippetUpdate = (updatedSnippet: SnippetWithTags) => {
    setSnippets(currentSnippets => currentSnippets?.map(s => s.id === updatedSnippet.id ? updatedSnippet : s));
    if (viewingSnippet?.id === updatedSnippet.id) {
      setViewingSnippet(updatedSnippet);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useKeyboardShortcuts({
    onNew: () => setShowSnippetForm(true),
    onSearch: () => searchInputRef.current?.focus(),
    onToggleTheme: toggleTheme,
  });

  const languages = Array?.from(new Set(snippets?.map(s => s.language))).sort();
  const hasOpenModal = showSnippetForm || !!viewingSnippet || showFolderManager || showTagManager || showImportExport || !!deletingSnippetId;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ${hasOpenModal ? 'fixed inset-0 overflow-hidden' : ''}`}>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: 'dark:bg-gray-700 dark:text-white' }} />
      <DashboardNav userEmail={user?.email} onSignOut={signOut} onShowImportExport={() => setShowImportExport(true)} onShowAnalytics={() => {}} onShowKeyboardShortcuts={() => {}} onUpgrade={() => {}} theme={theme} onToggleTheme={toggleTheme} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            onCreateSnippet={handleCreateSnippet}
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
            <SearchBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} searchInputRef={searchInputRef} />
            <SnippetGrid
              loading={loading}
              snippets={filteredSnippets}
              hasActiveFilters={!!searchQuery || selectedFolder !== null || !!selectedLanguage || showFavoritesOnly || !!selectedTag}
              onEdit={handleEditSnippet}
              onDelete={handleDeleteSnippet}
              onToggleFavorite={handleToggleFavorite}
              onView={setViewingSnippet}
              onCreate={handleCreateSnippet}
            />
          </main>
        </div>
      </div>

      {showSnippetForm && <SnippetForm snippet={editingSnippet} onClose={() => { setShowSnippetForm(false); setEditingSnippet(null); }} onSave={handleSnippetSaved} />}
      {viewingSnippet && <SnippetDetail snippet={viewingSnippet} onClose={() => setViewingSnippet(null)} onEdit={handleEditSnippet} onDelete={handleDeleteSnippet} onSnippetUpdated={handleSnippetUpdate} />}
      {showFolderManager && <FolderManager onClose={() => { setShowFolderManager(false); loadData(); }} />}
      {showTagManager && <TagManager onClose={() => { setShowTagManager(false); loadData(); }} />}
      {showImportExport && <ImportExport snippets={snippets} onClose={() => setShowImportExport(false)} tags={tags} tagApi={tagApi} onImportComplete={loadData} />}

      {deletingSnippetId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Delete Snippet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Are you sure you want to delete this snippet? This action cannot be undone.</p>
              <div className="flex gap-4 w-full">
                <button onClick={() => setDeletingSnippetId(null)} className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold">Cancel</button>
                <button onClick={confirmDeleteSnippet} className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition flex items-center justify-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}