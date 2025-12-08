import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { toPng, toBlob } from 'html-to-image';
import { Editor } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import prettier from 'prettier/standalone';
import * as babelParser from 'prettier/parser-babel';
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
import html from "prettier/plugins/html";
import css from "prettier/plugins/postcss";
import markdown from "prettier/plugins/markdown";
import typescript from "prettier/plugins/typescript";
import { track } from '../../lib/api/PostHogAnalytics';
// --- Font Imports ---
import "@fontsource/fira-code";
import "@fontsource/jetbrains-mono";
import "@fontsource/cascadia-code";
import "@fontsource/source-code-pro";

// --- Data Constants (Updated for Prism.js) ---
const themes = [
    { name: 'Dracula', bg: 'bg-[#282a36]' },
    { name: 'SynthWave', bg: 'bg-[#2d2a55]' },
    { name: 'Monokai', bg: 'bg-[#272822]' },
    { name: 'Vercel Dark', bg: 'bg-[#222]' },
    { name: 'GitHub Light', bg: 'bg-white' },
];
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNavigate } from 'react-router-dom';
import PostDownloadModal from './PostDownloadModal';

const fonts = [
    { name: 'Fira Code', family: "'Fira Code', monospace" },
    { name: 'JetBrains Mono', family: "'JetBrains Mono', monospace" },
    { name: 'Cascadia Code', family: "'Cascadia Code', monospace" },
    { name: 'Source Code Pro', family: "'Source Code Pro', monospace" },
];

const paddings = ['8', '16', '32', '48', '64'];
const fontSizes = ['12', '14', '16', '18'];
const shadows = {
    None: 'shadow-none',
    Small: 'shadow-md',
    Medium: 'shadow-lg',
    Large: 'shadow-xl',
};

const headerStyles = ['macOS', 'Elegant', 'VS Code', 'Minimal Line'];

const backgroundPresets = {
    "Transparent": "bg-transparent",
    "Glass Card": "bg-white/10 backdrop-blur-lg",
    "Deep Black": "bg-black",
    "Cosmic Gradient": "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    "Blurred Wall": "bg-gray-400/30 backdrop-blur-xl",
};

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

const detectLanguage = (code: string) => {
    if (/\b(import|export|const|let|var|function|=>|class)\b/.test(code) && /<[a-zA-Z]/.test(code)) return 'tsx';
    if (/\b(import|export|const|let|var|function|=>|class)\b/.test(code)) return 'javascript';
    if (/\b(def|import|from|class|for|while)\b/.test(code)) return 'python';
    if (/package\.json/.test(code) && /"name"|"version"|"dependencies"/.test(code)) return 'json';
    if (/\b(public|class|static|void|string)\b/.test(code)) return 'java'; // or csharp
    if (/<html|<div|<p/.test(code)) return 'html';
    return 'plaintext';
};

// --- Main Component ---
export default function ScreenshotGenerator() {
    // State Management
    const [code, setCode] = useState(`function hello() {\n  console.log("Hello, SnipRepo! 🔥");\n}`);
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState(themes[0]);
    const [font, setFont] = useState(fonts[0]);
    const [fontSize, setFontSize] = useState(fontSizes[1]);
    const [padding, setPadding] = useState(paddings[1]);
    const [shadow, setShadow] = useState(shadows.Large);
    const [previewStyle, setPreviewStyle] = useState<'Window' | 'Card'>('Window');
    const [headerStyle, setHeaderStyle] = useState(headerStyles[0]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showWatermark, setShowWatermark] = useState(true);
    const [filename, setFilename] = useState('sniprepo-screenshot');
    const [maxWidth, setMaxWidth] = useState('860'); // Adjusted for better aspect ratio
    const [background, setBackground] = useState(Object.values(backgroundPresets)[3]);

    const previewRef = useRef<HTMLDivElement>(null);
    const exportContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const [showAfterDownloadModal, setShowAfterDownloadModal] = useState(false);

    const nav = useNavigate();
    // --- Effects ---
    useEffect(() => {
        const detectedLang = detectLanguage(code);
        setLanguage(detectedLang);
    }, [code]);

    // --- Handlers ---
    const handleDownload = async () => {
        if (!exportContainerRef.current || isDownloading) return;
        setIsDownloading(true);

        try {
            const node = exportContainerRef.current;

            // Temporarily remove max-width constraint and force fixed layout
            const originalStyle = node.style.cssText;
            node.style.maxWidth = 'none';
            node.style.width = 'fit-content';
            node.style.minWidth = '800px'; // prevents it from being too narrow

            // Force SyntaxHighlighter to respect font size + wrap lines
            const preElement = node.querySelector('pre');
            if (preElement) {
                preElement.style.whiteSpace = 'pre-wrap';
                preElement.style.wordBreak = 'break-word';
                preElement.style.overflow = 'visible';
                preElement.style.fontSize = `${fontSize}px !important`;
            }

            // Force code tag to keep exact font size
            const codeElement = node.querySelector('code');
            if (codeElement) {
                codeElement.style.fontSize = `${fontSize}px !important`;
                codeElement.style.lineHeight = '1.5';
            }

            // Wait for layout to settle
            await new Promise(resolve => setTimeout(resolve, 100));

            const dataUrl = await toPng(node, {
                cacheBust: true,
                pixelRatio: 3,
                width: node.scrollWidth,
                height: node.scrollHeight,
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left',
                },
            });

            // Restore original styles
            node.style.cssText = originalStyle;

            const link = document.createElement('a');
            link.download = `${filename || 'sniprepo'}.png`;
            link.href = dataUrl;
            link.click();

            track("Screenshot Downloaded", { filename: link.download });
            setShowAfterDownloadModal(true);
        } catch (err) {
            console.error('Download failed:', err);
            toast.error('Failed to generate image');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleCopyImage = async () => {
        if (!exportContainerRef.current) return;
        try {
            const node = exportContainerRef.current.cloneNode(true) as HTMLElement;
            node.style.width = 'auto';
            node.style.display = 'inline-block';
            document.body.appendChild(node);

            const preElement = node.querySelector('pre');
            if (preElement) {
                preElement.style.overflow = 'visible';
                preElement.style.whiteSpace = 'pre';
            }

            // Also remove overflow-hidden from the window container
            const windowElement = node.querySelector('.overflow-hidden') as HTMLElement;
            if (windowElement) {
                windowElement.style.overflow = 'visible';
            }

            const blob = await toBlob(node, {
                cacheBust: true,
                pixelRatio: 3,
            });
            document.body.removeChild(node);

            if (blob) {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                track("Screenshot Copied to Clipboard");
                // toast.success('Image copied to clipboard!');
            }
        } catch (err) {
            console.error('Failed to copy image:', err);
            toast.error('Failed to copy image. Your browser might not support this feature.');
        }
    };

    const handleShare = async (platform: 'x' | 'linkedin') => {
        // First, copy the image to the clipboard
        await handleCopyImage();

        const text = "Check out this code snippet I created with SnipRepo! 🔥";
        let shareUrl = '';

        if (platform === 'x') {
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=coding,developers,programming`;
            track("Screenshot Shared on X");
        } else if (platform === 'linkedin') {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(text)}&hashtags=coding,developers,programming`;
            track("Screenshot Shared on LinkedIn");
        }

        if (shareUrl) {
            // Use a more prominent, custom toast to make sure the user sees the instruction.
            toast.custom(
                (t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
                            max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex border border-gray-200 dark:border-gray-700`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Image Copied!</p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Press Ctrl+V or Cmd+V to paste it in the new tab.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ), { duration: 6000 } // Keep the toast on screen for 6 seconds
            );

            // Delay opening the new tab to give the user time to read the toast.
            setTimeout(() => {
                window.open(shareUrl, '_blank', 'noopener,noreferrer');
            }, 2000); // 2-second delay
        }
    };

    const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monaco: any) => {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        editorRef.current = editorInstance;
        // Register a formatting provider for JavaScript/TypeScript
        monaco.languages.registerDocumentFormattingEditProvider('javascript', {
            async provideDocumentFormattingEdits(model: editor.ITextModel) {
                const text = model.getValue();
                try {
                    const formatted = await prettier.format(text, {
                        parser: 'babel',
                        plugins: [babelParser],
                        singleQuote: true,
                        trailingComma: 'all',
                    });
                    return [{ range: model.getFullModelRange(), text: formatted }];
                } catch (error) {
                    console.error("Prettier formatting failed:", error);
                    return []; // Return empty array on error
                }
            },
        });
    };

    const formatCode = async () => {
        if (!editorRef.current) return;

        const unformattedCode = editorRef.current.getValue();
        const model = editorRef.current.getModel();
        const language = model?.getLanguageId();; // Monaco language ID

        let parser = "babel"; // fallback

        switch (language) {
            case "typescript":
                parser = "typescript";
                break;
            case "html":
                parser = "html";
                break;
            case "css":
                parser = "css";
                break;
            case "markdown":
                parser = "markdown";
                break;
            case "json":
                parser = "json";
                break;
            default:
                parser = "babel";
        }

        try {
            const formatted = await prettier.format(unformattedCode, {
                parser,
                plugins: [babel, estree, html, css, markdown, typescript],
                singleQuote: true,
                trailingComma: "all",
            });

            editorRef.current.setValue(formatted);
            toast.success("Code formatted!");
        } catch (err) {
            console.error(err);
            console.log(err);

            toast.error('Failed to format code.');
        }
    };


    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 's') {
                event.preventDefault();
                handleDownload();
            }
            if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
                event.preventDefault();
                formatCode();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [filename]); // eslint-disable-line react-hooks/exhaustive-deps

    // --- Dynamic Styles ---
    const previewContainerClasses = `w-full mx-auto rounded-lg transition-shadow duration-300`;
    const previewWindowClasses = `rounded-lg overflow-hidden ${theme.bg}`;
    const previewContentStyles = {
        padding: `${padding}px`,
        fontFamily: font.family,
    };
    const previewWrapperStyles = {
        maxWidth: `${maxWidth}px`,
    };

    return (
        <section className="my-0 max-w-5xl mx-auto px-6 space-y-6">
            {/* <h2 className="text-3xl font-semibold mb-6 text-center">Create Beautiful Code Snippet Screenshots</h2> */}

            {/* --- Preview Panel --- */}
            <div ref={exportContainerRef} className={`mb-1 p-4 rounded-xl transition-all duration-300 ${background} ${shadow}`} style={previewWrapperStyles}>
                <div ref={previewRef} className={previewContainerClasses} >
                    <div className={previewWindowClasses}>
                        {previewStyle === 'Window' && headerStyle === 'macOS' && (
                            <div className="p-3 bg-gray-800/80 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                        )}
                        {previewStyle === 'Window' && headerStyle === 'Elegant' && (
                            <div className="p-3 bg-gray-900/90 flex items-center justify-center">
                                <div className="w-1/4 h-1.5 bg-gray-600/50 rounded-full"></div>
                            </div>
                        )}
                        {previewStyle === 'Window' && headerStyle === 'VS Code' && (
                            <div className="flex items-center bg-[#1e1e1e] px-4 py-2 text-sm text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span>index.js</span>
                            </div>
                        )}
                        {previewStyle === 'Window' && headerStyle === 'Minimal Line' && (
                            <div className="h-1.5 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"></div>
                        )}

                        <div className="relative mb-2" style={previewContentStyles}>
                            <SyntaxHighlighter
                                language={language}
                                style={okaidia}
                                showLineNumbers
                                wrapLongLines={true}          // ← THIS LINE
                                PreTag="div"
                                customStyle={{
                                    margin: 0,
                                    padding: padding + 'px',
                                    backgroundColor: 'transparent',
                                    fontSize: `${fontSize}px`,
                                    lineHeight: '1.6',
                                }}
                            >
                                {code}
                            </SyntaxHighlighter>

                            {/* Watermark */}
                            {showWatermark && (
                                <div className="absolute bottom-0 right-1 sm:right-2 text-xs text-gray-400/70 select-none pointer-events-none mt-1 mb-1">
                                    Made with SnipRepo 🔥
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Background Presets --- */}
            <div className="mb-8">
                <label className="block font-semibold mb-2 text-center">Background Style</label>
                <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(backgroundPresets).map(([name, className]) => (
                        <button
                            key={name}
                            onClick={() => setBackground(className)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${background === className ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Code Input --- */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col flex-grow">
                    <label htmlFor="codeInput" className="mb-2 font-semibold">Paste your code here:</label>
                    {/* <textarea
                        id="codeInput"
                        rows={12}
                        className="w-full resize-none rounded border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck="false"
                    /> */}
                    <div
                        className="relative font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
                        style={{ height: 420 }}
                    >
                        <Editor
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            onMount={handleEditorDidMount}
                            language={getMonacoLanguage(language)}
                            theme="vs-dark"
                            options={{
                                wordWrap: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 10, bottom: 10 },
                                scrollbar: {
                                    alwaysConsumeMouseWheel: false
                                }
                            }}
                        />
                    </div>
                    <div className="flex mt-2 mb-2">
                        <button onClick={formatCode} className="text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-1 px-3 rounded-md transition-colors">
                            Format Code
                        </button>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <span>Watermark enabled</span>
                        <button onClick={() => nav("/login")} className="text-blue-500 hover:underline font-semibold">
                            Unlock Watermark-free Screenshots
                        </button>
                    </div>

                </div>

                {/* --- Controls --- */}
                <div className="flex flex-col gap-6 md:w-72 flex-shrink-0">
                    <div className="grid sm:grid-cols-2 gap-4">
                        {/* Theme Select */}
                        <div>
                            <label className="block font-semibold mb-1">Theme</label>
                            <select
                                value={theme.name}
                                onChange={(e) => setTheme(themes.find(t => t.name === e.target.value) || themes[0])}
                                className="w-full rounded border border-gray-300 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            >
                                {themes.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                            </select>
                        </div>
                        {/* Font Select */}
                        <div>
                            <label className="block font-semibold mb-1">Font</label>
                            <select
                                value={font.name}
                                onChange={(e) => setFont(fonts.find(f => f.name === e.target.value) || fonts[0])}
                                className="w-full rounded border border-gray-300 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            >
                                {fonts.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {/* Padding Control */}
                        <div>
                            <label className="block font-semibold mb-1">Padding</label>
                            <div className="flex gap-2">
                                {paddings.map(p => (
                                    <button key={p} onClick={() => setPadding(p)} className={`px-3 py-1 rounded ${padding === p ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Font Size Control */}
                        <div>
                            <label className="block font-semibold mb-1">Font Size</label>
                            <div className="flex gap-2">
                                {fontSizes.map(p => (
                                    <button key={p} onClick={() => setFontSize(p)} className={`px-3 py-1 rounded ${fontSize === p ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>
                                        {p}px
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Preview Style */}
                        <div>
                            <label className="block font-semibold mb-1">Preview Style</label>
                            <div className="flex gap-2">
                                <button onClick={() => setPreviewStyle('Card')} className={`px-3 py-1 rounded w-full ${previewStyle === 'Card' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>Card</button>
                                <button onClick={() => setPreviewStyle('Window')} className={`px-3 py-1 rounded w-full ${previewStyle === 'Window' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>Window</button>
                            </div>
                        </div>
                        {/* Header Style */}
                        <div className={previewStyle === 'Card' ? 'opacity-50' : ''}>
                            <label className="block font-semibold mb-1">Header Style</label>
                            <select
                                value={headerStyle}
                                onChange={(e) => setHeaderStyle(e.target.value)}
                                disabled={previewStyle === 'Card'}
                                className="w-full rounded border border-gray-300 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {headerStyles.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid  gap-4">
                        <div>
                            <label htmlFor="filenameInput" className="block font-semibold mb-1">Filename</label>
                            <input id="filenameInput" type="text" value={filename} onChange={e => setFilename(e.target.value)} className="w-full rounded border border-gray-300 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300" />
                        </div>
                        {/* <div>
                            <label htmlFor="maxWidthInput" className="block font-semibold mb-1">Max Width (px)</label>
                            <input id="maxWidthInput" type="number" value={maxWidth} onChange={e => setMaxWidth(e.target.value)} className="w-full rounded border border-gray-300 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300" />
                        </div> */}
                    </div>


                    {/* Download/Copy Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                        >
                            {isDownloading ? 'Downloading...' : 'Download'}
                        </button>
                        <button
                            onClick={handleCopyImage}
                            className="bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                        >
                            Copy Image
                        </button>
                    </div>
                    <PostDownloadModal
                        visible={showAfterDownloadModal}
                        onClose={() => setShowAfterDownloadModal(false)}
                    />

                    <div className="flex flex-col gap-4  mb-5">
                        <button
                            onClick={() => handleShare('x')}
                            className="flex items-center justify-center gap-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition-colors "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            Share on X
                        </button>
                        <button
                            onClick={() => handleShare('linkedin')}
                            className="flex items-center justify-center gap-2 bg-[#0077B5] text-white font-bold py-2 px-4 rounded hover:bg-[#005e90] transition-colors "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            Share on LinkedIn
                        </button>
                    </div>
                </div>
            </div>
        </section >
    );
}
