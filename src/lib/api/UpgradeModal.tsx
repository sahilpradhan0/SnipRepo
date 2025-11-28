import { X, Zap } from 'lucide-react';

interface UpgradeModalProps {
  onClose: () => void;
  onUpgrade: () => void;
  message: string;
}

export function UpgradeModal({ onClose, onUpgrade, message }: UpgradeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-center">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
          <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Upgrade to Pro</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
        <button onClick={onUpgrade} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">Upgrade Now</button>
      </div>
    </div>
  );
}