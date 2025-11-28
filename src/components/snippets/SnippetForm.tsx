import React, { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { X, Save, Sparkles, Plus, FolderPlus } from 'lucide-react';
import Editor from '@monaco-editor/react';

import { SnippetWithTags } from '../../lib/api/snippets';
import { folderApi, Folder } from '../../lib/api/folders';
import { tagApi, Tag } from '../../lib/api/tags';
import { useAuth } from '../../contexts/AuthContext';
import { UpgradeModal } from '../../lib/api/UpgradeModal';
import { track } from '../../lib/api/PostHogAnalytics';

interface SnippetFormProps {
  snippet?: SnippetWithTags | null;
  onClose: () => void;
  onSave: (data: any) => void;
  folders: Folder[];
  tags: Tag[];
}

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'HTML', 'CSS', 'SQL', 'Shell', 'Other',
];

const getMonacoLanguage = (lang: string) => {
  const lowerLang = lang.toLowerCase();
  switch (lowerLang) {
    case 'c++': return 'cpp';
    case 'c#': return 'csharp';
    case 'shell': return 'shellscript';
    case 'javascript': return 'javascript';
    case 'typescript': return 'typescript';
    default: return lowerLang;
  }
};

export function SnippetForm({ snippet, onClose, onSave, folders: initialFolders, tags: initialTags }: SnippetFormProps) {
  const { user } = useAuth();
  const isProUser = user?.app_metadata?.is_pro ?? false;
  const proFeatureTooltip = 'Upgrade to Pro to access AI-powered features';

  // State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [output, setOutput] = useState('');
  const [explanation, setExplanation] = useState('');
  const [folderId, setFolderId] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [originalTagIds, setOriginalTagIds] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // AI
  const [aiLoading, setAiLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiResult, setAiResult] = useState('');

  // New folder modal
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Upgrade modal state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState('');

  // REFS for scrolling fix
  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    track('open_snippet_form', {
      mode: snippet ? 'edit' : 'create'
    });
  }, []);

  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title);
      setDescription(snippet.description || '');
      setCode(snippet.code);
      setLanguage(snippet.language);
      setOutput(snippet.output || '');
      setExplanation(snippet.explanation || '');
      setFolderId(snippet.folder_id || '');
      const currentTagIds = snippet.tags?.map(t => t.id) || [];
      setSelectedTags(currentTagIds);
      setOriginalTagIds(currentTagIds); // Store original tags for comparison
    } else {
      setTitle('');
      setDescription('');
      setCode('');
      setLanguage('JavaScript');
      setOutput('');
      setExplanation('');
      setFolderId('');
      setSelectedTags([]);
      setOriginalTagIds([]);
    }
  }, [snippet]);

  useEffect(() => {
    setFolders(initialFolders);
    setTags(initialTags);
  }, [initialFolders, initialTags]);

  const handleCreateFolder = async (e: FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim() || !user) return;
    setError('');
    try {
      const existingFolder = folders?.find(f => f.name.toLowerCase() === newFolderName.trim().toLowerCase());
      if (existingFolder) {
        setError('A folder with this name already exists.');
        return;
      }
      const newFolder = await folderApi.create({ name: newFolderName.trim(), user_id: user.id });
      setFolders(prev => [...prev, newFolder]);
      setFolderId(newFolder.id);
      track('create_folder', {
        folder_name: newFolderName.trim(),
      });
      setShowNewFolderInput(false);
      setNewFolderName('');

    } catch (err: any) {
      setError(`Failed to create folder: ${err.message}`);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!user) throw new Error('User not authenticated');

      const snippetData = {
        title,
        description: description || null,
        code,
        language,
        output: output || null,
        explanation: explanation || null,
        folder_id: folderId || null,
        user_id: user.id,
      };
      track('snippet_saved', {
        mode: snippet ? 'edit' : 'create',
        language,
        folder_id: folderId || null,
        tag_count: selectedTags.length,
      });

      await onSave({
        ...snippetData,
        tags: selectedTags,
        originalTagIds: originalTagIds,
      });
      onClose();
    } catch (error: any) {
      if (error.message.includes("You have reached the 50 snippet limit")) {
        console.log(error);

        setUpgradeMessage(error.message);
        setShowUpgradeModal(true);
        track('reached_snippet_limit', { limit: 50 });
        return; // Stop further execution
      }
      // More robust error handling: check for nested error messages
      const errorMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message || 'An unexpected error occurred.';
      setError(errorMessage);
      console.error('Error in SnippetForm handleSubmit:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) setSelectedTags(prev => [...prev, tagId]);
    track('add_tag_to_snippet', { tag_id: tagId });
    setTagInput('');
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(prev => prev.filter(id => id !== tagId));
    track('remove_tag_from_snippet', { tag_id: tagId });
  };



  const handleCreateTag = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const tagName = tagInput.trim();
    if (!tagName || !user) return;

    const existingTag = tags?.find(t => t.name.toLowerCase() === tagName.toLowerCase());
    if (existingTag) {
      addTag(existingTag.id);
      track('add_tag_to_snippet', { tag_id: existingTag.id });
      return;
    }

    try {
      const createdTag = await tagApi.create({ name: tagName, user_id: user.id });
      setTags(prev => [...prev, createdTag]);
      addTag(createdTag.id);
      track('create_tag', { tag_name: tagName });
    } catch (err: any) {
      setError(`Failed to create tag: ${err.message}`);
    }
  };

  const extractKeywords = (): string => {
    const keywords = new Set<string>();
    const codeUpper = code.toUpperCase();

    if (codeUpper.includes('ASYNC') || codeUpper.includes('AWAIT')) keywords.add('async');
    if (codeUpper.includes('FETCH') || codeUpper.includes('HTTP')) keywords.add('api');
    if (codeUpper.includes('ERROR') || codeUpper.includes('CATCH')) keywords.add('error-handling');
    if (codeUpper.includes('CLASS') || codeUpper.includes('EXTENDS')) keywords.add('oop');
    if (codeUpper.includes('FUNCTION') || codeUpper.includes('CONST')) keywords.add('utility');
    if (codeUpper.includes('FOR') || codeUpper.includes('WHILE')) keywords.add('iteration');
    if (codeUpper.includes('MAP') || codeUpper.includes('FILTER')) keywords.add('array-methods');
    if (language === 'JavaScript' || language === 'TypeScript') keywords.add(language.toLowerCase());

    return keywords.size > 0 ? Array.from(keywords).join(', ') : 'code, snippet';
  };

  const simulateAI = async (feature: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    switch (feature) {
      case 'explain': return `This ${language} code snippet implements a function that ${title.toLowerCase()}. It uses modern syntax and follows best practices for ${language} development.`;
      case 'tags': return extractKeywords();
      case 'optimize': return `Optimization suggestions:\n1. Consider using memoization\n2. Add error boundaries\n3. Extract reusable logic into hooks\n4. Add TypeScript types where possible`;
      case 'document': return `# ${title}\n\n## Description\n${description || 'A utility function'}\n\n## Usage\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\`\n\n## Returns\nDescription of return value`;
      default: return '';
    }
  };

  const handleAIFeature = async (feature: string) => {
    setAiLoading(true);
    setAiResult('');
    track('ai_feature_used', { feature });
    try {
      const result = await simulateAI(feature);
      setAiResult(result);

      if (feature === 'explain' || feature === 'document') {
        setExplanation(prev => prev ? `${prev}\n\n${result}` : result);
      } else if (feature === 'tags') {
        const suggestedTagNames = result.split(',')?.map(t => t.trim().toLowerCase());
        const matchingTags = tags.filter(tag => suggestedTagNames.includes(tag.name.toLowerCase()));
        matchingTags.forEach(tag => addTag(tag.id));
      }
    } finally {
      setAiLoading(false);
    }
  };
  const filteredTags = tagInput
    ? tags.filter(tag => !selectedTags.includes(tag.id) && tag.name.toLowerCase().includes(tagInput.toLowerCase()))
    : [];


  return (
    <div className="fixed inset-0 bg-black/50 z-50 p-4 flex items-start sm:items-center justify-center" data-lenis-prevent-wheel>
      {showUpgradeModal && (
        <UpgradeModal
          message={upgradeMessage}
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={() => { /* Navigate to pricing page */ }}
        />
      )}

      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-auto flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {snippet ? 'Edit Snippet' : 'Create New Snippet'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form id="snippet-form" onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {/* Scrollable content area: this is what we manually scroll from modal's onWheel */}
          <div ref={contentRef} className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm -mt-2 mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="e.g., React Custom Hook for API Calls"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language *</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                >
                  {LANGUAGES?.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Folder</label>
                  <button type="button" onClick={() => { setShowNewFolderInput(true); setError(''); }} className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 transition">
                    <Plus className="w-3 h-3" /> New
                  </button>
                </div>
                <select
                  value={folderId}
                  onChange={(e) => setFolderId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">No Folder</option>
                  {folders?.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition resize-none"
                  placeholder="Brief description of what this snippet does"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Code *</label>
                <div
                  ref={editorContainerRef}
                  className="w-full relative font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
                  style={{ height: 240 }}
                >
                  <Editor
                    value={code}
                    onChange={(value) => setCode(value || '')}

                    language={getMonacoLanguage(language)}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 12,
                      wordWrap: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      padding: { top: 20, bottom: 20 },
                      scrollbar: {
                        alwaysConsumeMouseWheel: false
                      }
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What It Does</label>
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition resize-none"
                  placeholder="Detailed explanation of functionality"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output / Result</label>
                <textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition font-mono text-sm"
                  placeholder="Expected output or execution result"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={() => setShowAI(!showAI)}
                      disabled={!isProUser}
                      className="text-xs flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                      <Sparkles className="w-3 h-3" /> AI Helper
                    </button>
                    {!isProUser && <span className="absolute bottom-full right-0 mb-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">{proFeatureTooltip}</span>}
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full flex flex-wrap items-center gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-blue-500">
                    {selectedTags?.map(tagId => {
                      const tag = tags?.find(t => t.id === tagId);
                      return tag ? (
                        <span key={tagId} className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium px-2.5 py-1 rounded-full">
                          {tag.name}
                          <button type="button" onClick={() => removeTag(tagId)} className="text-blue-500 hover:text-blue-700 dark:text-blue-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ) : null;
                    })}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleCreateTag}
                      className="flex-grow bg-transparent focus:outline-none p-1 min-w-[120px]"
                      placeholder={selectedTags.length > 0 ? "Add another..." : "Add tags..."}
                    />
                  </div>

                  {filteredTags.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      <ul className="py-1">
                        {filteredTags?.map(tag => (
                          <li key={tag.id} onClick={() => addTag(tag.id)} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            {tag.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 px-1">Type and press Enter to create a new tag.</div>
                </div>
              </div>

              {showAI && (
                <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">AI-Powered Helpers</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['explain', 'tags', 'optimize', 'document']?.map(feature => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => handleAIFeature(feature)}
                        disabled={aiLoading || !code}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-md transition disabled:opacity-50 text-left"
                      >
                        <div className="text-sm font-semibold text-gray-900 dark:text-white capitalize">Auto-{feature}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {feature === 'explain' && 'Generate explanation'}
                          {feature === 'tags' && 'Suggest tags'}
                          {feature === 'optimize' && 'Get tips'}
                          {feature === 'document' && 'Create docs'}
                        </div>
                      </button>
                    ))}
                  </div>

                  {aiLoading && (
                    <div className="text-center py-2">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-purple-300 border-t-purple-600"></div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">AI is working...</p>
                    </div>
                  )}

                  {!aiLoading && aiResult && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 max-h-40 overflow-y-auto">
                      <pre className="whitespace-pre-wrap break-words font-sans text-xs">{aiResult}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 flex gap-3 justify-end p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-700/20 dark:to-purple-900/20 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              Cancel
            </button>
            <button type="submit" form="snippet-form" disabled={loading} className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : snippet ? 'Update Snippet' : 'Save Snippet'}
            </button>
          </div>
        </form>

        {showNewFolderInput && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full">
              <form onSubmit={handleCreateFolder} className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <FolderPlus className="w-5 h-5" />
                  Create New Folder
                </h3>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                  autoFocus
                />
                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => { setShowNewFolderInput(false); setError(''); }} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SnippetForm;
