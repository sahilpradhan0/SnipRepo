import React, { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Save, Sparkles, Plus, FolderPlus, ArrowLeft } from 'lucide-react';
import Editor from '@monaco-editor/react';

import { snippetApi, SnippetWithTags } from '../../lib/api/snippets';
import { folderApi, Folder } from '../../lib/api/folders';
import { tagApi, Tag } from '../../lib/api/tags';
import { useAuth } from '../../contexts/AuthContext';
import { UpgradeModal } from '../../lib/api/UpgradeModal';
import { track } from '../../lib/api/PostHogAnalytics';
import { Layout } from '../Layout';
import toast from 'react-hot-toast';
import { getTempClient } from '../../lib/supabaseTempClient';
import { supabase } from '../../lib/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

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

export function CreateSnippetForm({ onClose }) {
    const { user } = useAuth();
    const { id: snippetId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isProUser = user?.app_metadata?.is_pro ?? false;
    const proFeatureTooltip = 'Upgrade to Pro to access AI-powered features';
    const isEditing = !!snippetId;

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

    const [folders, setFolders] = useState<Folder[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

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
    const contentRef = useRef<HTMLDivElement | null>(null);
    const editorContainerRef = useRef<HTMLDivElement | null>(null);
    // === TEMP SNIPPET AUTH ===

    const [tempClient, setTempClient] = useState<SupabaseClient | null>(null);

    const [showSuggestionBanner, setShowSuggestionBanner] = useState(false);
    const [converting, setConverting] = useState(false);
    const nav = useNavigate();
    const handleGoToRegister = () => {
        const tempId = localStorage.getItem("migrate_temp_id");

        // if (tempId) {
        //     localStorage.setItem("migrate_temp_id", tempId);
        // }

        nav("/register");
    };

    useEffect(() => {
        async function initTempClient() {
            let tempId = localStorage.getItem("migrate_temp_id");

            if (!tempId) {
                tempId = crypto.randomUUID();
                localStorage.setItem("migrate_temp_id", tempId);
            }

            const res = await fetch(
                "https://ahkpwcszyshvluomingr.functions.supabase.co/create-temp-token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                    },
                    body: JSON.stringify({ temp_id: tempId }),
                }
            );

            if (!res.ok) {
                console.error("Failed to fetch temp token");
                return;
            }

            const { token } = await res.json();

            if (!token) {
                console.error("No token returned from edge function");
                return;
            }

            const client = getTempClient(token);
            setTempClient(client);
        }

        initTempClient();
    }, []);


    useEffect(() => {
        track('open_snippet_form', {
            mode: isEditing ? 'edit' : 'create'
        });

        async function fetchData() {
            if (!user) return;
            setLoading(true);
            try {
                const [foldersData, tagsData] = await Promise.all([
                    folderApi.getAll(user.id),
                    tagApi.getAll(user.id),
                ]);
                setFolders(foldersData);
                setTags(tagsData);

                if (isEditing && snippetId) {
                    const snippet = await snippetApi.getById(snippetId);
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
                        setOriginalTagIds(currentTagIds);
                    }
                }
            } catch (err: any) {
                setError(`Failed to load data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [snippetId, user, isEditing]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // ===== GUEST FLOW =====
            // ===== GUEST FLOW =====
            if (!user) {
                let tempId = localStorage.getItem("migrate_temp_id");

                if (!tempId) {
                    tempId = crypto.randomUUID();
                }

                const { error } = await supabase
                    .from("temp_snippets")
                    .upsert(
                        {
                            temp_id: tempId,
                            title,
                            description,
                            code,
                            language,
                            output,
                            explanation,
                        },
                        { onConflict: "temp_id" }
                    );

                if (error) {
                    console.error(error);
                    toast.error("Failed to save snippet temporarily");
                    return;
                }

                localStorage.setItem("migrate_temp_id", tempId);
                toast.success("Snippet saved! Create an account to keep it permanently.");
                setShowSuggestionBanner(true);
                onClose();
                return;
            }




            // ===== LOGGED-IN FLOW =====
            if (isEditing && snippetId) {
                // --- If Editing, call update, and include tag data for internal syncing ---
                await snippetApi.update(snippetId, {
                    ...payload,
                    tags: selectedTags,         // Current selected tags
                    originalTagIds: originalTagIds // Tags that were originally loaded
                });
                toast.success('Snippet updated');

                // IMPORTANT: Since update handles tags internally, 
                // you must update originalTagIds state after a successful update.
                setOriginalTagIds(selectedTags);


            } else {
                // --- If Creating, call create, and include tag data in a separate array as required by your create function ---
                await snippetApi.create(payload, selectedTags); // Assuming create accepts snippet data and an array of tag IDs
                toast.success('Snippet saved');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
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

    const filteredTags = tagInput
        ? tags.filter(tag => !selectedTags.includes(tag.id) && tag.name.toLowerCase().includes(tagInput.toLowerCase()))
        : [];


    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-2 sm:p-6 lg:p-8">
                {showUpgradeModal && (
                    <UpgradeModal
                        message={upgradeMessage}
                        onClose={() => setShowUpgradeModal(false)}
                        onUpgrade={() => navigate('/pricing')}
                    />
                )}

                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full mx-auto flex flex-col">
                    <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate("/")} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                {isEditing ? 'Edit Snippet' : 'Create New Snippet'}
                            </h2>
                        </div>
                        <button onClick={() => navigate(-1)} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition rounded-full">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form id="snippet-form" onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                        {/* Scrollable content area: this is what we manually scroll from modal's onWheel */}
                        <div ref={contentRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-0">
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

                                {/* <div>
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
                                </div> */}

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
                                    {/* <div className="flex items-center justify-between mb-2">
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
                                    </div> */}

                                    {/* <div className="relative">
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
                                        </div> */}

                                    {/* {filteredTags.length > 0 && (
                                            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                                <ul className="py-1">
                                                    {filteredTags?.map(tag => (
                                                        <li key={tag.id} onClick={() => addTag(tag.id)} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                                            {tag.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )} */}

                                    {/* <div className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 px-1">Type and press Enter to create a new tag.</div> */}
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex-shrink-0 flex flex-col-reverse sm:flex-row gap-3 justify-end p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-700/20 dark:to-purple-900/20 rounded-b-2xl">
                            <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                Cancel
                            </button>
                            <button type="submit" form="snippet-form" disabled={loading} className="w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                <Save className="w-4 h-4" />
                                {loading ? 'Saving...' : isEditing ? 'Update Snippet' : 'Save Snippet'}
                            </button>
                        </div>
                    </form>
                    {/* 
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
                    )} */}
                    {showSuggestionBanner && !user && (
                        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center">
                                <span className="font-semibold">Your snippet auto-expires in 5 days!</span>
                                <button
                                    onClick={handleGoToRegister}
                                    className="bg-white text-purple-600 font-bold py-2 px-6 rounded-xl hover:scale-105 transition w-full sm:w-auto"
                                >
                                    {converting ? "Creating account…" : "Sign up & keep forever →"}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div >
        </Layout >
    );
}

export default CreateSnippetForm;
