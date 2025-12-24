import React from 'react';
import { Copy, Save, Check } from 'lucide-react';

interface FormatterActionBarProps {
    onClear: () => void;
    onCopy: () => void;
    onSave: () => void;
    isCopied: boolean;
}

export const FormatterActionBar: React.FC<FormatterActionBarProps> = ({
    onClear,
    onCopy,
    onSave,
    isCopied,
}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e] p-4 shadow-2xl z-50">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                {/* Left: Destructive/Reset Action */}
                <button
                    onClick={onClear}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                    Clear
                </button>

                {/* Right: Primary Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onCopy}
                        className="flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        {isCopied ? (
                            <>
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={onSave}
                        className="flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1e1e1e]"
                    >
                        <Save className="h-4 w-4" />
                        <span>Save & Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};