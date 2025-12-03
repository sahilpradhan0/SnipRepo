import { useState, useEffect } from 'react';
import { X, Code2, Folder, Tag, Star, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { analyticsApi, AnalyticsData } from '../../lib/api/analytics';
import { Layout } from '../Layout';

type DateRange = '7d' | '30d' | '365d';
const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '365d', label: 'Last Year' },
];

// Colors for the language chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

export function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('7d');

  useEffect(() => {
    loadAnalytics(dateRange);
  }, [dateRange]);

  const loadAnalytics = async (range: DateRange) => {
    setLoading(true);
    try {
      // NOTE: You will need to update your API to accept a 'range' parameter
      const analyticsData = await analyticsApi.getStats({ range });
      setData(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-2 sm:p-8 w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            Analytics Dashboard
          </h2>
        </div>

        <div className="space-y-6">
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
                  <div className="flex items-center rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
                    {dateRangeOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setDateRange(option.value)}
                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${dateRange === option.value
                          ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {data.recentActivity?.snippets ?? 0}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Snippets created
                      </p>
                      {data.recentActivity?.wowSnippetsChange !== undefined && (
                        <span className={`text-xs font-bold ${data.recentActivity?.wowSnippetsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {data.recentActivity?.wowSnippetsChange >= 0 ? '▲' : '▼'} {Math.abs(data.recentActivity?.wowSnippetsChange)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {data.recentActivity?.folders ?? 0}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Folders created
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {data.recentActivity?.tags ?? 0}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Tags created
                    </p>
                  </div>
                </div>

                {data.activityTrend && data.activityTrend.length > 0 && (
                  <div className="mt-6 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.activityTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="date" stroke="rgb(156 163 175 / 0.8)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgb(156 163 175 / 0.8)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{
                            background: 'rgba(31, 41, 55, 0.9)',
                            borderColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '0.5rem',
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="snippets" stroke="#3b82f6" strokeWidth={2} dot={false} name="Snippets" />
                        <Line type="monotone" dataKey="folders" stroke="#22c55e" strokeWidth={2} dot={false} name="Folders" />
                        <Line type="monotone" dataKey="tags" stroke="#a855f7" strokeWidth={2} dot={false} name="Tags" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 min-h-[350px]">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Languages Distribution
                </h3>
                {data.languageStats?.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-center py-4">
                    No snippets yet
                  </p>
                ) : (
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={data.languageStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          innerRadius={60}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="language"
                          paddingAngle={5}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.languageStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS?.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: 'rgba(31, 41, 55, 0.8)',
                            borderColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '0.5rem',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contribution Activity
                </h3>
                {data.heatmapData && (
                  <CalendarHeatmap
                    startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                    endDate={new Date()}
                    values={data.heatmapData}
                    classForValue={(value) => {
                      if (!value) return 'color-empty';
                      return `color-github-${Math.min(value.count, 4)}`;
                    }}
                    tooltipDataAttrs={(value: { date: string; count: number }) => ({
                      'data-tip': `${value.count || 0} contributions on ${value.date ? new Date(value.date).toLocaleDateString() : ''}`,
                    })}
                  />
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data?.totalSnippets > 0
                        ? ((data?.favoriteCount / data?.totalSnippets) * 100).toFixed(1)
                        : 0}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Favorite Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data?.totalFolders > 0
                        ? (data?.totalSnippets / data?.totalFolders).toFixed(1)
                        : data?.totalSnippets}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg per Folder
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data?.languageStats?.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Languages Used
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data?.uncategorizedCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Uncategorized
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Most Used Tags
                </h3>
                {data?.tagStats?.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-center py-4">
                    No tags used yet
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {data?.tagStats?.map(tag => (
                      <div key={tag.name} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1">
                        <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{tag.name}</span>
                        <span className="text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">{tag.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              Failed to load analytics data
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
