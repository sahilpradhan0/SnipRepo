import { Copy, Check, Star, Edit, Calendar, Folder, Tag, History, Link, Sparkles, ArrowLeft, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams, useNavigate } from 'react-router-dom';
import { SnippetWithTags, snippetApi } from '../../lib/api/snippets';
import { Folder as FolderType, folderApi } from '../../lib/api/folders';
import { Tag as TagType, tagApi } from '../../lib/api/tags';
import { VersionHistory } from './VersionHistory';
import { SnippetEmbed } from './SnippetEmbed';
import { AIFeatures } from '../ai/AIFeatures';
import { SnippetForm } from './SnippetForm';
import { useAuth } from '../../contexts/AuthContext';
import { Layout } from '../Layout';
import { track } from '../../lib/api/PostHogAnalytics';

interface SnippetDetailProps {
  snippet: SnippetWithTags;
  onClose: () => void;
  onEdit: (snippet: SnippetWithTags) => void;
  onDelete: (id: string) => void;
  onSnippetUpdated: () => void;
}

export function SnippetDetail({ snippet: initialSnippet, onClose, onEdit, onDelete, onSnippetUpdated }: SnippetDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState<SnippetWithTags | null>(initialSnippet);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);

  const isProUser = user?.app_metadata?.is_pro ?? false;

  // This effect is for the standalone page version
  useEffect(() => {
    if (id && !initialSnippet) {
      setLoading(true);
      Promise.all([
        snippetApi.getById(id),
        folderApi.getAll(),
        tagApi.getAll()
      ]).then(([snippet, foldersData, tagsData]) => {
        setCurrentSnippet(snippet);
        setFolders(foldersData);
        setTags(tagsData);
        setLoading(false);
      });
    } else {
      // If used as a modal, the data is passed in.
      setLoading(false);
    }
  }, [id, initialSnippet]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRestoreVersion = async (code: string) => {
    try {
      if (!currentSnippet) return;
      // Update the database and fetch the full updated snippet with tags
      const updated = await snippetApi.update(currentSnippet.id, { code }, currentSnippet.tags?.map(t => t.id) || []);
      track('restore_version', { snippet_id: currentSnippet.id });
      setCurrentSnippet(updated); // Update local state for the modal
    } catch (error) {
      console.error('Error restoring version:', error);
    }
  };

  const handleSave = async (data: any) => {
    if (!currentSnippet) return;
    try {
      const { originalTagIds, tags: tagIds, ...snippetData } = data;
      track('update_snippet', { snippet_id: currentSnippet.id });
      await snippetApi.update(currentSnippet.id, {
        ...snippetData,
        tags: tagIds,
        originalTagIds,
      });
      setIsEditing(false);
      // Re-fetch the snippet to get the full object with populated folder and tags
      const refreshedSnippet = await snippetApi.getById(currentSnippet.id);
      setCurrentSnippet(refreshedSnippet);
      if (onSnippetUpdated) onSnippetUpdated(); // Notify parent to reload data
      toast.success('Snippet updated successfully!');
    } catch (error) {
      console.error('Failed to update snippet:', error);
    }
  };

  const hasOpenModal = isEditing || showVersionHistory || showEmbed || showAI;

  // Handle case where component is used as a modal
  const handleEditClick = () => {
    track('edit_snippet', { snippet_id: currentSnippet?.id });
    if (onEdit) onEdit(currentSnippet!); else setIsEditing(true);
  }

  return (
    <Layout hasOpenModal={hasOpenModal} hideImportExport>
      {loading && (
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 justify-end max-w-7xl mx-auto p-8 w-full">
        <div className="relative group">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Go Back</span>

        </div>
        <div className="relative group">
          <button
            onClick={() => isProUser && setShowAI(!showAI)}
            className={`p-2 rounded-lg transition ${isProUser
              ? 'text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
            disabled={!isProUser}
          >
            <Sparkles className="w-5 h-5" />
          </button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {isProUser ? 'AI Features' : 'Upgrade to Pro for AI Features'}
          </span>

        </div>
        <div className="relative group">
          <button
            onClick={() => isProUser && setShowVersionHistory(true)}
            className={`p-2 rounded-lg transition ${isProUser
              ? 'text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
            disabled={!isProUser}
          >
            <History className="w-5 h-5" />
          </button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">{isProUser ? 'Version History' : 'Upgrade to Pro for Version History'}</span>

        </div>
        <div className="relative group">
          <button
            onClick={() => isProUser && setShowEmbed(true)}
            className={`p-2 rounded-lg transition ${isProUser
              ? 'text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
            disabled={!isProUser}
          >
            <Link className="w-5 h-5" />
          </button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">{isProUser ? 'Embed Snippet' : 'Upgrade to Pro to Embed Snippets'}</span>

        </div>
        <div className="relative group">
          <button onClick={handleEditClick} className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <Edit className="w-5 h-5" />
          </button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Edit Snippet</span>
        </div>
      </div>
      {currentSnippet && (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentSnippet.title}
              </h2>
              {currentSnippet.is_favorite && (
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              )}
            </div>

          </div>

          <div>
            {showAI && (
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-xl shadow-lg">
                <AIFeatures snippet={currentSnippet} />
              </div>
            )}

            <div className="p-6 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg ">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(currentSnippet.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                  {currentSnippet.language}
                </span>
                {currentSnippet.folder && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: `${currentSnippet.folder.color}20`,
                      color: currentSnippet.folder.color,
                    }}
                  >
                    <Folder className="w-3 h-3" />
                    {currentSnippet.folder.name}
                  </span>
                )}
                {currentSnippet.tags && currentSnippet.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentSnippet.tags.map(tag => (
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
              </div>

              {currentSnippet.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">{currentSnippet.description}</p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code</h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition text-sm font-medium"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    <span className='hidden sm:block'>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <SyntaxHighlighter
                  language={currentSnippet.language?.toLowerCase() || 'plaintext'}
                  style={vscDarkPlus}
                  showLineNumbers
                  wrapLines={true}
                  customStyle={{ margin: 0, borderRadius: '0.5rem', fontSize: '0.875rem' }}
                >
                  {currentSnippet.code}
                </SyntaxHighlighter>
              </div>

              {currentSnippet.explanation && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What It Does</h3>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{currentSnippet.explanation}</p>
                </div>
              )}

              {currentSnippet.output && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Output / Result</h3>
                  <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono">{currentSnippet.output}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showVersionHistory && (
            <VersionHistory
              snippetId={currentSnippet.id}
              currentCode={currentSnippet.code}
              onClose={() => setShowVersionHistory(false)}
              onRestore={handleRestoreVersion}
            />
          )}

          {showEmbed && (
            <SnippetEmbed
              snippet={currentSnippet}
              onClose={() => setShowEmbed(false)}
            />
          )}

          {isEditing && (
            <SnippetForm
              snippet={currentSnippet}
              onClose={() => setIsEditing(false)}
              onSave={handleSave}
              folders={folders}
              tags={tags}
            />
          )}
        </div>
      )}
    </Layout>
  )
}