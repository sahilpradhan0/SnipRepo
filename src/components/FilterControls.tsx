import { Filter, Star, Search, ArrowDownUp } from 'lucide-react';

interface FilterControlsProps {
    showFavoritesOnly: boolean;
    onToggleFavoritesOnly: () => void;
    selectedLanguage: string;
    onSelectLanguage: (language: string) => void;
    languages: string[];
    onClearFilters: () => void;
    hasActiveFilters: boolean;
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    sortByName: string;
    sortByDate: string;
    onSortByName: (sortByName: string) => void;
    onSortByDate: (SortByDate: string) => void;
}

export function FilterControls({
    showFavoritesOnly,
    onToggleFavoritesOnly,
    selectedLanguage,
    onSelectLanguage,
    languages,
    onClearFilters,
    hasActiveFilters,
    sortByName,
    sortByDate,
    onSortByName,
    onSortByDate,
}: FilterControlsProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                </h3>
                {hasActiveFilters && (
                    <button onClick={onClearFilters} className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        Clear
                    </button>
                )}
            </div>


            <button onClick={onToggleFavoritesOnly} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition mb-2 ${showFavoritesOnly ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-yellow-500' : ''}`} />
                <span className="text-sm font-medium">Favorites</span>
            </button>

            <div className="mb-3">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">Language</label>
                <select value={selectedLanguage} onChange={(e) => onSelectLanguage(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <option value="">All Languages</option>
                    {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>
            <div className="mb-1">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">Sort by Name</label>
                <select value={sortByName} onChange={(e) => onSortByName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <option value="none">None</option>
                    <option value="name_asc">Alphabetical (A-Z)</option>
                    <option value="name_desc">Alphabetical (Z-A)</option>
                </select>
            </div>
            <div className="mb-1">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">Sort by Date</label>
                <select value={sortByDate} onChange={(e) => onSortByDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <option value="none_date">None</option>
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                </select>
            </div>

        </div>
    );
}