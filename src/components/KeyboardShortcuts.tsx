import { X, Command, Search, Plus, Moon, HelpCircle } from 'lucide-react';

interface KeyboardShortcutsProps {
  onClose: () => void;
}

export function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts = [
    { keys: [`${modKey}`, 'Q'], description: 'Create new snippet', icon: Plus },
    { keys: [`${modKey}`, 'K'], description: 'Focus search', icon: Search },
    { keys: [`${modKey}`, 'D'], description: 'Toggle dark mode', icon: Moon },
    { keys: ['?'], description: 'Show keyboard shortcuts', icon: HelpCircle },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Command className="w-6 h-6" />
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {shortcuts.map((shortcut, index) => {
            const Icon = shortcut.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{shortcut.description}</span>
                </div>
                <div className="flex items-center gap-2">
                  {shortcut.keys.map((key, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm font-mono text-gray-900 dark:text-white shadow-sm"
                    >
                      {key}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              <strong>Tip:</strong> These shortcuts work from anywhere in the app to help you work faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
