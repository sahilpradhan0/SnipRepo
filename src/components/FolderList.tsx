import { Folder } from 'lucide-react';

interface FolderListProps {
    folders: any[];
    selectedFolder: string | null;
    onSelectFolder: (folderId: string | null) => void;
    onShowFolderManager: () => void;
}

export function FolderList({ folders, selectedFolder, onSelectFolder, onShowFolderManager }: FolderListProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700" data-lenis-prevent-wheel>
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    Folders
                </h3>
                <button onClick={onShowFolderManager} className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Manage
                </button>
            </div>
            <div className="space-y-1">
                <button
                    onClick={() => onSelectFolder(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${selectedFolder === null ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                    All Snippets
                </button>
                {folders.map(folder => (
                    <button
                        key={folder.id}
                        onClick={() => onSelectFolder(folder.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${selectedFolder === folder.id ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: folder.color }} />
                        {folder.name}
                    </button>
                ))}
            </div>
        </div>
    );
}