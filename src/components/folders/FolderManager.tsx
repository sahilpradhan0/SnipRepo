import { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, Folder, AlertTriangle, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { folderApi } from '../../lib/api/folders';
import { useAuth } from '../../contexts/AuthContext';

interface FolderManagerProps {
  onClose: () => void;
}

const COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
];

export function FolderManager({ onClose }: FolderManagerProps) {
  const { user } = useAuth();
  const [folders, setFolders] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingFolderId, setDeletingFolderId] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    try {
      const data = await folderApi.getAll(user?.id);
      setFolders(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) throw new Error('User not authenticated');

      const folderData = {
        name,
        description: description || null,
        color,
        user_id: user.id,
      };

      if (editingId) {
        await folderApi.update(editingId, folderData);
      } else {
        await folderApi.create(folderData);
      }

      setName('');
      setDescription('');
      setColor(COLORS[0]);
      setEditingId(null);
      await loadFolders();
    } catch (err: any) {
      toast.error(editingId ? 'Failed to update folder.' : 'Failed to create folder.');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (folder: any) => {
    setName(folder.name);
    setDescription(folder.description || '');
    setColor(folder.color);
    setEditingId(folder.id);
  };

  const handleDelete = async (id: string) => {
    setDeletingFolderId(id);
  };

  const confirmDelete = async () => {
    if (!deletingFolderId) return;
    try {
      setLoading(true);
      await folderApi.delete(deletingFolderId);
      toast.success('Folder deleted successfully.');
      await loadFolders();
    } catch (err: any) {
      toast.error('Failed to delete folder.');
      setError(err.message);
    } finally {
      setLoading(false);
      setDeletingFolderId(null);
    }
  };

  const confirmDeleteAll = async () => {
    try {
      setLoading(true);
      await folderApi.deleteAll();
      toast.success('All folders have been deleted.');
      await loadFolders();
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to delete all folders.');
    } finally {
      setLoading(false);
      setIsDeletingAll(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setColor(COLORS[0]);
    setEditingId(null);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-lenis-prevent-wheel>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Folder className="w-6 h-6" />
            Manage Folders
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Folder Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="e.g., React Hooks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Optional description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color
              </label>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-lg transition ${
                      color === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {loading ? 'Saving...' : editingId ? 'Update Folder' : 'Add Folder'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Folders ({folders.length})
              </h3>
              {folders.length > 0 && (
                <button onClick={() => setIsDeletingAll(true)} className="text-xs flex items-center gap-1  text-red-600 dark:text-red-500
                   hover:text-red-100 p-1 hover:rounded-lg hover:bg-red-900 transition">
                  <Trash2 className="w-3 h-3" /> Delete All
                </button>
              )}
            </div>
            {folders?.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No folders yet. Create your first folder above.
              </p>
            ) : (
              <div className="flex  flex-wrap gap-3">
                {folders?.map(folder => (
                  <div
                    key={folder.id}
                    className="group relative flex-grow basis-72 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: folder.color }}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {folder.name}
                        </div>
                        {folder.description && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {folder.description}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(folder)}
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(folder.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {deletingFolderId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Folder
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Are you sure you want to delete this folder? Snippets inside will not be deleted. This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button onClick={() => setDeletingFolderId(null)} className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold">
                  Cancel
                </button>
                <button onClick={confirmDelete} disabled={loading} className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50">
                  <Trash2 className="w-5 h-5" />
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeletingAll && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Delete All Folders
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Are you sure you want to delete all of your folders? Snippets inside them will not be deleted. This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button onClick={() => setIsDeletingAll(false)} className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold">
                  Cancel
                </button>
                <button onClick={confirmDeleteAll} disabled={loading} className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50">
                  <Trash2 className="w-5 h-5" />
                  {loading ? 'Deleting...' : 'Yes, Delete All'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
