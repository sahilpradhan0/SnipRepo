import { useState } from 'react';
import { Sparkles, FileText, Tag, Wand2, BookOpen } from 'lucide-react';
import { SnippetWithTags } from '../../lib/api/snippets';

interface AIFeaturesProps {
  snippet: SnippetWithTags;
  onUpdate?: () => void;
}

export function AIFeatures({ snippet, onUpdate }: AIFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const simulateAI = async (feature: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    switch (feature) {
      case 'explain':
        return `This ${snippet.language} code snippet implements a function that ${snippet.title.toLowerCase()}. It uses modern syntax and follows best practices for ${snippet.language} development. The code is well-structured and maintainable.`;
      case 'tags':
        return 'async, data-fetching, error-handling, react, hooks';
      case 'optimize':
        return `Optimization suggestions:\n1. Consider using memoization for expensive calculations\n2. Add error boundaries for better error handling\n3. Extract reusable logic into custom hooks\n4. Add TypeScript types for better type safety`;
      case 'document':
        return `# ${snippet.title}\n\n## Description\n${snippet.description || 'A utility function for common operations'}\n\n## Usage\n\`\`\`${snippet.language.toLowerCase()}\n${snippet.code}\n\`\`\`\n\n## Parameters\n- \`param1\`: Description of first parameter\n- \`param2\`: Description of second parameter\n\n## Returns\nDescription of return value\n\n## Example\nProvide usage example here`;
      default:
        return 'AI feature coming soon!';
    }
  };

  const handleFeature = async (feature: string) => {
    setActiveFeature(feature);
    setLoading(true);
    try {
      const aiResult = await simulateAI(feature);
      setResult(aiResult);
    } catch (error) {
      setResult('AI feature temporarily unavailable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI-Powered Features
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleFeature('explain')}
          disabled={loading}
          className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:shadow-md transition text-left disabled:opacity-50"
        >
          <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
          <div className="font-semibold text-gray-900 dark:text-white text-sm">Explain Code</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Get plain English explanation
          </div>
        </button>

        <button
          onClick={() => handleFeature('tags')}
          disabled={loading}
          className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:shadow-md transition text-left disabled:opacity-50"
        >
          <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
          <div className="font-semibold text-gray-900 dark:text-white text-sm">Auto-Tag</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Generate smart tags
          </div>
        </button>

        <button
          onClick={() => handleFeature('optimize')}
          disabled={loading}
          className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-lg hover:shadow-md transition text-left disabled:opacity-50"
        >
          <Wand2 className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
          <div className="font-semibold text-gray-900 dark:text-white text-sm">Optimize</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Get improvement tips
          </div>
        </button>

        <button
          onClick={() => handleFeature('document')}
          disabled={loading}
          className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:shadow-md transition text-left disabled:opacity-50"
        >
          <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400 mb-2" />
          <div className="font-semibold text-gray-900 dark:text-white text-sm">Generate Docs</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Create documentation
          </div>
        </button>
      </div>

      {loading && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-purple-600 mb-2"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">AI is analyzing your code...</p>
        </div>
      )}

      {!loading && result && (
        <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="font-semibold text-purple-900 dark:text-purple-300 text-sm">
              AI Result
            </span>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-xs text-blue-800 dark:text-blue-400">
          <strong>Note:</strong> AI features are currently in demo mode. Full AI integration coming soon!
        </p>
      </div>
    </div>
  );
}
