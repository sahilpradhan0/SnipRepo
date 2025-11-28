import { useState, useEffect } from 'react';
import { X, Code2, Folder, Tag, Star, TrendingUp } from 'lucide-react';
import { analyticsApi, AnalyticsData } from '../../lib/api/analytics';

interface AnalyticsProps {
  onClose: () => void;
}

export function Analytics({ onClose }: AnalyticsProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const analyticsData = await analyticsApi.getStats();
      setData(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start p-4 z-50 overflow-y-auto" data-lenis-prevent-wheel>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
     max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Analytics Dashboard
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          className="flex-1 p-6 overflow-y-auto"
          style={{ overscrollBehavior: "auto" }}
        >


          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
            </div>
          ) : data ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Code2 className="w-8 h-8 opacity-80" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{data.totalSnippets}</div>
                  <div className="text-blue-100 text-sm">Total Snippets</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Folder className="w-8 h-8 opacity-80" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{data.totalFolders}</div>
                  <div className="text-green-100 text-sm">Folders</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Tag className="w-8 h-8 opacity-80" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{data.totalTags}</div>
                  <div className="text-purple-100 text-sm">Tags</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-8 h-8 opacity-80" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{data.favoriteCount}</div>
                  <div className="text-yellow-100 text-sm">Favorites</div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Activity
                  </h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {data.recentActivity}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Snippets created in the last 7 days
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Languages Distribution
                </h3>
                {data.languageStats.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-center py-4">
                    No snippets yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.languageStats.map((stat, index) => {
                      const percentage = (stat.count / data.totalSnippets) * 100;
                      return (
                        <div key={stat.language}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {stat.language}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {stat.count} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data.totalSnippets > 0
                        ? (data.favoriteCount / data.totalSnippets * 100).toFixed(1)
                        : 0}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Favorite Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data.totalFolders > 0
                        ? (data.totalSnippets / data.totalFolders).toFixed(1)
                        : data.totalSnippets}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg per Folder
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data.languageStats.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Languages Used
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              Failed to load analytics data
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
