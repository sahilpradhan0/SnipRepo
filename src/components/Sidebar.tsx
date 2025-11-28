import { Plus } from 'lucide-react';
import { FilterControls } from './FilterControls';
import { FolderList } from './FolderList';
import { TagList } from './TagList';

interface SidebarProps {
    onCreateSnippet: () => void;
    isCreateDisabled: boolean;
    createDisabledTooltip: string;
    folders: any[];
    tags: any[];
    selectedTag: string | null;
    onSelectTag: (tagId: string | null) => void;
    languages: string[];
    selectedFolder: string | null;
    onSelectFolder: (folderId: string | null) => void;
    selectedLanguage: string;
    onSelectLanguage: (language: string) => void;
    showFavoritesOnly: boolean;
    onToggleFavoritesOnly: () => void;
    onShowFolderManager: () => void;
    onShowTagManager: () => void;
    onClearFilters: () => void;
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    sortByName: string;
    sortByDate: string;
    onSortByName: (sortByName: string) => void;
    onSortByDate: (sortByDate: string) => void;
}

export function Sidebar({
    onCreateSnippet,
    isCreateDisabled,
    createDisabledTooltip,
    folders,
    tags,
    selectedTag,
    onSelectTag,
    languages,
    selectedFolder,
    onSelectFolder,
    selectedLanguage,
    onSelectLanguage,
    showFavoritesOnly,
    onToggleFavoritesOnly,
    onShowFolderManager,
    onShowTagManager,
    onClearFilters,
    searchTerm,
    onSearchTermChange,
    sortByName,
    sortByDate,
    onSortByName,
    onSortByDate,
}: SidebarProps) {
    const hasActiveFilters = selectedFolder !== null || !!selectedLanguage || showFavoritesOnly || !!selectedTag || !!searchTerm;

    return (
        <aside className="lg:w-64 space-y-4 lg:sticky lg:top-8 lg:self-start" data-lenis-prevent="true">
            <button
                title={createDisabledTooltip}
                disabled={isCreateDisabled}
                onClick={onCreateSnippet}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
            >
                <Plus className="w-5 h-5" />
                New Snippet
            </button>
            <div className="space-y-4 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
                <FilterControls
                    showFavoritesOnly={showFavoritesOnly}
                    onToggleFavoritesOnly={onToggleFavoritesOnly}
                    selectedLanguage={selectedLanguage}
                    onSelectLanguage={onSelectLanguage}
                    languages={languages}
                    onClearFilters={onClearFilters}
                    hasActiveFilters={hasActiveFilters}
                    sortByName={sortByName}
                    sortByDate={sortByDate}
                    onSortByName={onSortByName}
                    onSortByDate={onSortByDate}
                />

                <FolderList folders={folders} selectedFolder={selectedFolder} onSelectFolder={onSelectFolder} onShowFolderManager={onShowFolderManager} />

                <TagList tags={tags} selectedTag={selectedTag} onSelectTag={onSelectTag} onShowTagManager={onShowTagManager} />
            </div>
        </aside>
    );
}