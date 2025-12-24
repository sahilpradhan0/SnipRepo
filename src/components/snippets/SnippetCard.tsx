import { Star, Trash2, Edit, Copy, Check, Folder, Tag, Power, Image } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SnippetWithTags } from '../../lib/api/snippets';

interface SnippetCardProps {
  snippet: SnippetWithTags;
  onEdit: (snippet: SnippetWithTags) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isSelectionModeActive: boolean;
  onView: (snippet: SnippetWithTags) => void;
}

export function SnippetCard({ snippet, onEdit, onDelete, onToggleFavorite, isSelected, onSelect, isSelectionModeActive, onView }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const nav = useNavigate();

  const handleClick = () => {
    if (isSelectionModeActive) {
      onSelect(snippet.id);
      return;
    }
    nav(`/dashboard/snippet/${snippet.id}`);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(snippet);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(snippet.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(snippet.id, !snippet.is_favorite);
  };

  const handleScreenshot = (e: React.MouseEvent) => {
    e.stopPropagation();
    nav('/screenshot', { state: { code: snippet.code } });
  };

  return (
    <div
      onClick={handleClick}
      className={`group/card bg-white dark:bg-gray-800  rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border flex flex-col relative ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-700'} ${isSelectionModeActive ? 'hover:border-blue-400' : ''}`}
    >
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3 flex-grow">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                {snippet.title}
              </h3>
              {snippet.is_favorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            {snippet.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {snippet.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
            {snippet.language}
          </span>
          {snippet.folder && (
            <span
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full"
              style={{
                backgroundColor: `${snippet.folder.color}20`,
                color: snippet.folder.color,
              }}
            >
              <Folder className="w-3 h-3" />
              {snippet.folder.name}
            </span>
          )}
        </div>

        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {snippet.tags.map(tag => (
              <span
                key={tag.id}
                className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                }}
              >
                <Tag className="w-3 h-3" />
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="rounded-lg mb-4 overflow-hidden h-[120px] relative">
          <SyntaxHighlighter
            language={snippet.language?.toLowerCase() || 'plaintext'}
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{ margin: 0, padding: '1rem', fontSize: '0.75rem' }}
            codeTagProps={{ style: { fontFamily: 'inherit' } }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(snippet.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
          </span>
          <div className="flex items-center gap-0.5 opacity-0 group-hover/card:opacity-100 transition-opacity">
            <div className="relative group">
              <button onClick={handleToggleFavorite} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <Star className={`w-4 h-4 ${snippet.is_favorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
              </button>
              <span className="absolute top-full left-0 mt-2 w-max max-w-xs bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">{snippet.is_favorite ? 'Remove from favorites' : 'Add to favorites'}</span>
            </div>
            <div className="relative group">
              <button onClick={handleCopy} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <span className="absolute top-full left-0 mt-2 w-max max-w-xs bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Copy code</span>
            </div>
            <div className="relative group">
              <button onClick={handleEdit} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <Edit className="w-4 h-4 text-gray-400" />
              </button>
              <span className="absolute top-full left-0 mt-2 w-max max-w-xs bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Edit snippet</span>
            </div>
            <div className="relative group">
              <button onClick={handleScreenshot} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <Image className="w-4 h-4 text-gray-400" />
              </button>
              <span className="absolute top-full left-0 mt-2 w-max max-w-xs bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Create screenshot</span>
            </div>
            {/* <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
              title="Delete snippet"
            >
              < className="w-4 h-4 text-red-500" />
            </button> */}
            <div className="relative group">
              <button onClick={handleDelete} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
              <span className="absolute top-full right-0 mt-2 w-max max-w-xs bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Delete Snippet</span>
            </div>



          </div>
        </div>
      </div>
    </div >
  );
}
