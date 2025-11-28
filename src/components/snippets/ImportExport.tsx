import { useState } from 'react';
import { X, Download, Upload, FileJson, FileText } from 'lucide-react';
import { snippetApi, SnippetWithTags } from '../../lib/api/snippets';
import { useAuth } from '../../contexts/AuthContext';

interface ImportExportProps {
  snippets: SnippetWithTags[];
  onClose: () => void;
  onImportComplete: () => void;
}

export function ImportExport({ snippets, onClose, onImportComplete }: ImportExportProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [importFormat, setImportFormat] = useState<'json' | 'markdown'>('json');
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const exportAsJSON = () => {
    const exportData = snippets.map(snippet => ({
      title: snippet.title,
      description: snippet.description,
      code: snippet.code,
      language: snippet.language,
      output: snippet.output,
      explanation: snippet.explanation,
      tags: snippet.tags?.map(t => t.name) || [],
      folder: snippet.folder?.name || null,
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snippets-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsMarkdown = () => {
    let markdown = '# Code Snippets Export\n\n';
    markdown += `Generated: ${new Date().toLocaleString()}\n\n`;
    markdown += `Total Snippets: ${snippets.length}\n\n---\n\n`;

    snippets.forEach((snippet, index) => {
      markdown += `## ${index + 1}. ${snippet.title}\n\n`;
      if (snippet.description) {
        markdown += `**Description:** ${snippet.description}\n\n`;
      }
      markdown += `**Language:** ${snippet.language}\n\n`;
      if (snippet.tags && snippet.tags.length > 0) {
        markdown += `**Tags:** ${snippet.tags.map(t => t.name).join(', ')}\n\n`;
      }
      markdown += '```' + snippet.language.toLowerCase() + '\n';
      markdown += snippet.code;
      markdown += '\n```\n\n';
      if (snippet.explanation) {
        markdown += `**What it does:** ${snippet.explanation}\n\n`;
      }
      if (snippet.output) {
        markdown += '**Output:**\n```\n';
        markdown += snippet.output;
        markdown += '\n```\n\n';
      }
      markdown += '---\n\n';
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snippets-export-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setImporting(true);
    setImportStatus('Reading file...');

    try {
      const text = await file.text();
      let snippetsToImport: any[] = [];

      if (importFormat === 'json') {
        snippetsToImport = JSON.parse(text);
      } else {
        const markdownSnippets = parseMarkdown(text);
        snippetsToImport = markdownSnippets;
      }

      setImportStatus(`Importing ${snippetsToImport.length} snippets...`);

      for (const snippet of snippetsToImport) {
        await snippetApi.create({
          title: snippet.title || 'Imported Snippet',
          description: snippet.description || null,
          code: snippet.code || '',
          language: snippet.language || 'JavaScript',
          output: snippet.output || null,
          explanation: snippet.explanation || null,
          user_id: user.id,
        });
      }

      setImportStatus(`Successfully imported ${snippetsToImport.length} snippets!`);
      setTimeout(() => {
        onImportComplete();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Import error:', error);
      setImportStatus('Error importing snippets. Please check the file format.');
    } finally {
      setImporting(false);
    }
  };

  const parseMarkdown = (markdown: string) => {
    const snippets: any[] = [];
    const sections = markdown.split('---').filter(s => s.trim());

    sections.forEach(section => {
      const titleMatch = section.match(/##\s+\d+\.\s+(.+)/);
      const descMatch = section.match(/\*\*Description:\*\*\s+(.+)/);
      const langMatch = section.match(/\*\*Language:\*\*\s+(.+)/);
      const codeMatch = section.match(/```[\w]*\n([\s\S]+?)\n```/);

      if (titleMatch && codeMatch) {
        snippets.push({
          title: titleMatch[1].trim(),
          description: descMatch ? descMatch[1].trim() : null,
          language: langMatch ? langMatch[1].trim() : 'JavaScript',
          code: codeMatch[1].trim(),
        });
      }
    });

    return snippets;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Import / Export Snippets
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('export')}
              className={`pb-3 px-4 font-medium transition ${
                activeTab === 'export'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Download className="w-4 h-4 inline mr-2" />
              Export
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`pb-3 px-4 font-medium transition ${
                activeTab === 'import'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Import
            </button>
          </div>

          {activeTab === 'export' ? (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Export {snippets.length} {snippets.length === 1 ? 'snippet' : 'snippets'} to a file for backup or sharing.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={exportAsJSON}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FileJson className="w-5 h-5" />
                    Export as JSON
                  </button>
                  <button
                    onClick={exportAsMarkdown}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Export as Markdown
                  </button>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Note</h4>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  JSON format preserves all metadata and can be re-imported. Markdown is great for documentation but may lose some details.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Import Format
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setImportFormat('json')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                      importFormat === 'json'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    JSON
                  </button>
                  <button
                    onClick={() => setImportFormat('markdown')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                      importFormat === 'markdown'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Markdown
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept={importFormat === 'json' ? '.json' : '.md,.markdown'}
                  onChange={handleFileUpload}
                  disabled={importing}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition cursor-pointer ${
                    importing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  {importing ? 'Importing...' : `Choose ${importFormat.toUpperCase()} File`}
                </label>
                {importStatus && (
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{importStatus}</p>
                )}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Warning</h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-400">
                  Importing will create new snippets. Existing snippets will not be modified or deleted.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
