import { useState } from 'react';
import { X, Code, Copy, Check, Link } from 'lucide-react';
import { SnippetWithTags } from '../../lib/api/snippets';

interface SnippetEmbedProps {
  snippet: SnippetWithTags;
  onClose: () => void;
}

export function SnippetEmbed({ snippet, onClose }: SnippetEmbedProps) {
  const [copied, setCopied] = useState(false);
  const [embedType, setEmbedType] = useState<'iframe' | 'markdown' | 'html'>('iframe');

  const baseUrl = window.location.origin;
  const embedUrl = `${baseUrl}/embed/${snippet.id}`;

  const getEmbedCode = () => {
    switch (embedType) {
      case 'iframe':
        return `<iframe src="${embedUrl}" width="100%" height="400" frameborder="0"></iframe>`;
      case 'markdown':
        return `\`\`\`${snippet.language.toLowerCase()}\n${snippet.code}\n\`\`\``;
      case 'html':
        return `<div class="snippet-embed">
  <div class="snippet-header">
    <h3>${snippet.title}</h3>
    <span class="language">${snippet.language}</span>
  </div>
  <pre><code class="language-${snippet.language.toLowerCase()}">${snippet.code}</code></pre>
</div>`;
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getEmbedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-lenis-prevent-wheel>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Link className="w-6 h-6" />
            Embed Snippet
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Embed Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setEmbedType('iframe')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${embedType === 'iframe'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                <Code className="w-4 h-4 inline mr-2" />
                iFrame
              </button>
              <button
                onClick={() => setEmbedType('markdown')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${embedType === 'markdown'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                Markdown
              </button>
              <button
                onClick={() => setEmbedType('html')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${embedType === 'html'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                HTML
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Embed Code
            </label>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto max-h-64 overflow-y-auto text-sm font-mono">
                {getEmbedCode()}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Preview</h4>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="font-semibold text-gray-900 dark:text-white">{snippet.title}</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                  {snippet.language}
                </span>
              </div>
              <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto **max-h-48 overflow-y-auto**">
                {snippet.code}
              </pre>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
