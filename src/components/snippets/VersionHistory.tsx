import { useState, useEffect } from 'react';
import { X, History, RotateCcw, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Version {
  id: string;
  snippet_id: string;
  code: string;
  version_number: number;
  created_at: string;
}

interface VersionHistoryProps {
  snippetId: string;
  currentCode: string;
  onClose: () => void;
  onRestore: (code: string) => Promise<void> | void;
}

export function VersionHistory({ snippetId, currentCode, onClose, onRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [versionToRestore, setVersionToRestore] = useState<Version | null>(null);

  useEffect(() => {
    loadVersions();
  }, [snippetId]);

  const loadVersions = async () => {
    try {
      const { data, error } = await supabase
        .from('snippet_versions')
        .select('*')
        .eq('snippet_id', snippetId)
        .order('version_number', { ascending: false });

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Error loading versions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreClick = (version: Version) => {
    setVersionToRestore(version);
    setShowConfirmModal(true);
  };

  const confirmRestore = async () => {
    if (!versionToRestore) return;

    await onRestore(versionToRestore.code);
    setShowConfirmModal(false);
    setVersionToRestore(null);
    onClose(); // This closes the main VersionHistory modal
  };

  const renderDiff = (oldCode: string, newCode: string) => {
    const oldLines = oldCode.split('\n');
    const newLines = newCode.split('\n');
    const maxLines = Math.max(oldLines.length, newLines.length);
    const diff = [];

    for (let i = 0; i < maxLines; i++) {
      const oldLine = oldLines[i] || '';
      const newLine = newLines[i] || '';

      if (oldLine !== newLine) {
        if (oldLine) {
          diff.push({ type: 'removed', line: oldLine, number: i + 1 });
        }
        if (newLine) {
          diff.push({ type: 'added', line: newLine, number: i + 1 });
        }
      } else {
        diff.push({ type: 'unchanged', line: oldLine, number: i + 1 });
      }
    }

    return diff;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-lenis-prevent-wheel>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <History className="w-6 h-6" />
            Version History
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4 space-y-2">
              <div
                onClick={() => setSelectedVersion(null)}
                className={`p-4 rounded-lg cursor-pointer transition ${
                  selectedVersion === null
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">Current</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Active version</span>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                </div>
              ) : versions.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  No previous versions
                </p>
              ) : (
                versions.map((version) => (
                  <div
                    key={version.id}
                    onClick={() => setSelectedVersion(version)}
                    className={`p-4 rounded-lg cursor-pointer transition ${
                      selectedVersion?.id === version.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                        : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Version {version.version_number}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestoreClick(version);
                        }}
                        className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded transition"
                        title="Restore this version"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(version.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {selectedVersion === null ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Current Code
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400 font-mono">{currentCode}</pre>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Version {selectedVersion.version_number} - Diff View
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    {renderDiff(selectedVersion.code, currentCode).map((line, idx) => (
                      <div
                        key={idx}
                        className={`${
                          line.type === 'added'
                            ? 'bg-green-900/30 text-green-400'
                            : line.type === 'removed'
                            ? 'bg-red-900/30 text-red-400'
                            : 'text-gray-400'
                        } px-2`}
                      >
                        <span className="inline-block w-12 text-gray-600">
                          {line.number}
                        </span>
                        <span className="inline-block w-8">
                          {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                        </span>
                        {line.line}
                      </div>
                    ))}
                  </pre>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleRestoreClick(selectedVersion)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restore This Version
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmModal && versionToRestore && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <RotateCcw className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Restore Version
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Are you sure you want to restore to{' '}
                <strong>Version {versionToRestore.version_number}</strong>? The current code will be overwritten.
              </p>
              <div className="flex gap-4 w-full">
                <button onClick={() => setShowConfirmModal(false)} className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold">
                  Cancel
                </button>
                <button onClick={confirmRestore} className="w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition flex items-center justify-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Yes, Restore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
