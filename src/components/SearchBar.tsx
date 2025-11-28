import { Search, X } from 'lucide-react';
import { RefObject } from 'react';

interface SearchBarProps {
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    searchInputRef: RefObject<HTMLInputElement>;
}

export function SearchBar({ searchQuery, onSearchQueryChange, searchInputRef }: SearchBarProps) {
    return (
        <div className="mb-4 w-full">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <div className='flex items-center justify-between w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'>
                    <input ref={searchInputRef} type="text" value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)}
                        placeholder="Search snippets by title, description, code, or tags..."
                        className="bg-transparent w-full outline-none" />
                    {searchQuery && <X className='dark:text-white text-gray-500 cursor-pointer' onClick={() => onSearchQueryChange("")} />}
                </div>
            </div>
        </div>
    );
}