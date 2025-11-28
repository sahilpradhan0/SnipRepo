import { Tag } from 'lucide-react';

interface TagListProps {
    tags: any[];
    selectedTag: string | null;
    onShowTagManager: () => void;
    onSelectTag: (tagId: string | null) => void;
}

export function TagList({ tags, selectedTag, onShowTagManager, onSelectTag }: TagListProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                </h3>
                <div className="flex items-center gap-2">
                    {selectedTag && (
                        <button onClick={() => onSelectTag(null)} className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                            Clear
                        </button>
                    )}
                    <button onClick={onShowTagManager} className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        Manage
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No tags available.</p>}
                {tags.map(tag => (
                    <button
                        key={tag.id}
                        onClick={() => onSelectTag(selectedTag === tag.id ? null : tag.id)}
                        className={`px-2 py-1 text-xs rounded-full font-medium transition-all ${selectedTag === tag.id ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800' : ''}`}
                        style={{
                            backgroundColor: `${tag.color}20`,
                            color: tag.color,
                            ringColor: tag.color,
                        }}>
                        {tag.name}
                    </button>
                ))}
            </div>
        </div>
    );
}