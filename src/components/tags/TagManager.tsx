import { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, Tag, AlertTriangle, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { tagApi } from '../../lib/api/tags';
import { useAuth } from '../../contexts/AuthContext';

interface TagManagerProps {
  onClose: () => void;
  onTagsUpdated: () => void;
}

const COLORS = [
  '#6366F1',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
];

export function TagManager({ onClose, onTagsUpdated }: TagManagerProps) {
  const { user } = useAuth();
  const [tags, setTags] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingTagId, setDeletingTagId] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTags();

  }, []);

  const loadTags = async () => {
    try {
      const data = await tagApi.getAll();
      setTags(data);
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

      const tagData = {
        name,
        color,
        user_id: user.id,
      };

      if (editingId) {
        await tagApi.update(editingId, tagData);
      } else {
        await tagApi.create(tagData);
      }

      setName('');
      setColor(COLORS[0]);
      setEditingId(null);
      await loadTags();
      onTagsUpdated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tag: any) => {
    setName(tag.name);
    setColor(tag.color);
    setEditingId(tag.id);
  };

  const handleDelete = (id: string) => {
    setDeletingTagId(id);
  };

  const confirmDelete = async () => {
    if (!deletingTagId) return;
    try {
      setLoading(true);
      await tagApi.delete(deletingTagId);
      await loadTags();
      onTagsUpdated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setDeletingTagId(null);
    }
  };

  const confirmDeleteAll = async () => {
    try {
      setLoading(true);
      await tagApi.deleteAll(); // Assumes a `deleteAll` method in `tagApi`
      await loadTags();
      onTagsUpdated();
      toast.success('All tags have been deleted.');
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to delete all tags.');
    } finally {
      setLoading(false);
      setIsDeletingAll(false);
    }
  };
  const handleCancel = () => {
    setName('');
    setColor(COLORS[0]);
    setEditingId(null);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-lenis-prevent-wheel>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Tag className="w-6 h-6" />
            Manage Tags
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
                Tag Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="e.g., performance"
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
                    className={`w-10 h-10 rounded-lg transition ${color === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''
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
                {loading ? 'Saving...' : editingId ? 'Update Tag' : 'Add Tag'}
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
                Your Tags ({tags.length})
              </h3>
              {tags.length > 0 && (
                <button onClick={() => setIsDeletingAll(true)}
                  className="text-xs flex items-center font-semibold gap-1 text-red-600 dark:text-red-500
                   hover:text-red-100 p-1 hover:rounded-lg hover:bg-red-900 transition">
                  <Trash2 className="w-3 h-3" /> Delete All
                </button>
              )}
            </div>

            {tags.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No tags yet. Create your first tag above.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {tags.map(tag => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg group"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {tag.name}
                    </span>
                    <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(tag)}
                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(tag.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {deletingTagId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Tag
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Are you sure you want to delete this tag? It will be removed from all associated snippets. This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button onClick={() => setDeletingTagId(null)} className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold">
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
                Delete All Tags
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Are you sure you want to delete all of your tags? This will remove them from all associated snippets. This action cannot be undone.
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
