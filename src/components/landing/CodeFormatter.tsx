import React, { useState, useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Settings, Code2, Github, X, ChevronDown, User, Save } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { formatCode } from '../../lib/api/formatter';
import { FormatterActionBar } from './FormatterActionBar';
import LandingLayout from './LandingLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function CodeFormatter() {
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>('typescript');
    const [title, setTitle] = useState<string>('Untitled Snippet');
    const [isCopied, setIsCopied] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const { theme } = useTheme();
    const nav = useNavigate();
    const editorRef = useRef<any>(null);

    // Handle Editor Mount
    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // "Paste & Polish" Logic
        editor.onDidPaste(async () => {
            const currentCode = editor.getValue();
            if (!currentCode.trim()) return;

            // Show loading state or toast
            const toastId = toast.loading('Auto-formatting...');

            const formatted = await formatCode(currentCode, language);

            if (formatted !== currentCode) {
                editor.setValue(formatted);
                toast.success('✨ Auto-formatted', { id: toastId, duration: 2000 });
            } else {
                toast.dismiss(toastId);
            }
        });
    };

    const handleCopy = async () => {
        if (code.length === 0) {
            toast.error('Nothing to copy!');
            return;
        }
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        toast.success('Copied to clipboard!');

        // Smart Copy Nudge
        setTimeout(() => {
            setIsCopied(false);
            if (!showSignupModal) {
                toast('Want to save this for later?', {
                    icon: '💾',
                    duration: 4000,
                });
            }
        }, 2000);
    };

    const handleSave = () => {
        if (code.length === 0) {
            toast.error('Nothing to save!');
            return;
        }
        setShowSignupModal(true);
    };

    const handleClear = () => {
        setCode('');
        editorRef.current?.setValue('');
        toast('Editor cleared', { icon: '🧹' });
    };

    return (
        <LandingLayout>
            <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
                <Toaster position="top-center" />

                {/* B. The Editor Canvas */}
                <main className="relative flex-1 mt-20 mb-6 mx-4 md:mx-8 overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e]">
                    {/* Top Bar (Inside Editor) */}
                    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between bg-white dark:bg-[#1e1e1e] px-4 py-3 border-b border-gray-200 dark:border-gray-800 rounded-t-xl">
                        <div className="relative">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="appearance-none rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-3 pr-8 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <option value="typescript">TypeScript</option>
                                <option value="javascript">JavaScript</option>
                                <option value="json">JSON</option>
                                <option value="css">CSS</option>
                                <option value="html">HTML</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="h-full pt-16 pb-20">
                        <Editor
                            height="100%"
                            defaultLanguage="typescript"
                            language={language}
                            theme={theme === 'dark' ? 'vs-dark' : 'light'}
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            onMount={handleEditorDidMount}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                                fontLigatures: true,
                                scrollBeyondLastLine: false,
                                padding: { top: 16, bottom: 16 },
                                formatOnPaste: false, // We handle this manually for control
                            }}
                        />
                    </div>
                </main>

                {/* C. The Action Bar */}
                <FormatterActionBar
                    code={code}
                    onClear={handleClear}
                    onCopy={handleCopy}
                    onSave={handleSave}
                    isCopied={isCopied}
                />

                {/* Conversion Modal (Soft Gate) */}
                {showSignupModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Save Snippet</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Save this snippet to your collection.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowSignupModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="rounded-lg bg-indigo-50 dark:bg-indigo-500/10 p-4 border border-indigo-200 dark:border-indigo-500/20 mb-6">
                                <p className="text-sm text-indigo-700 dark:text-indigo-200">
                                    <strong>Save instantly!</strong> You can now save this snippet without creating an account.
                                </p>
                            </div>

                            <button onClick={() => nav("/create-snippet", {
                                state: {
                                    code,
                                    language,
                                    title
                                }
                            })} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-bold text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors" >
                                <Save className="h-5 w-5" />
                                Save Snippet
                            </button>
                        <button onClick={() => setShowSignupModal(false)} className="mt-3 w-full text-center text-xs text-gray-500 hover:text-gray-300">
                            Maybe later
                        </button>
                    </div>
                    </div>
                )}
        </div>
        </LandingLayout >
    );
}