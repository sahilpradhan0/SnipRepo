import { Code2, Plus } from 'lucide-react';
import { SnippetWithTags } from '../lib/api/snippets';
import { SnippetCard } from './snippets/SnippetCard';

interface SnippetGridProps {
    loading: boolean;
    snippets: SnippetWithTags[];
    hasActiveFilters: boolean;
    onEdit: (snippet: SnippetWithTags) => void;
    onDelete: (id: string) => void;
    onToggleFavorite: (id: string, isFavorite: boolean) => void;
    onView: (snippet: SnippetWithTags) => void;
    onCreate: () => void;
    selectedSnippetIds: string[];
    onSelectSnippet: (id: string) => void;
    isSelectionModeActive: boolean;
}

export function SnippetGrid({
    loading,
    snippets,
    hasActiveFilters,
    onEdit,
    onDelete,
    onToggleFavorite,
    onView,
    onCreate,
    selectedSnippetIds,
    onSelectSnippet,
    isSelectionModeActive,
}: SnippetGridProps) {
    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
            </div>
        );
    }

    if (snippets.length === 0) {
        return (
            <div className="text-center py-12">
                <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No snippets found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {hasActiveFilters ? 'Try adjusting your filters' : 'Create your first snippet to get started'}
                </p>
                {!hasActiveFilters && (
                    <button onClick={onCreate} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition inline-flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Create Snippet
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {snippets.map(snippet => {
                return (
                    <SnippetCard
                        key={snippet.id}
                        snippet={snippet}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggleFavorite={onToggleFavorite}
                        isSelected={selectedSnippetIds.includes(snippet.id)}
                        onSelect={onSelectSnippet}
                        isSelectionModeActive={isSelectionModeActive}
                        onView={() => onView(snippet)}
                    />
                );
            })}
        </div>
    );
}