import { supabase } from '../supabase';

export interface LanguageStats {
  language: string;
  count: number;
}

export interface AnalyticsData {
  totalSnippets: number;
  totalFolders: number;
  totalTags: number;
  favoriteCount: number;
  languageStats: LanguageStats[];
  recentActivity: number;
}

export const analyticsApi = {
  async getStats(): Promise<AnalyticsData> {
    const [snippetsResult, foldersResult, tagsResult, languageStatsResult] = await Promise.all([
      supabase.from('snippets').select('id, is_favorite, created_at', { count: 'exact' }),
      supabase.from('folders').select('id', { count: 'exact' }),
      supabase.from('tags').select('id', { count: 'exact' }),
      supabase.from('snippets').select('language'),
    ]);

    const totalSnippets = snippetsResult.count || 0;
    const totalFolders = foldersResult.count || 0;
    const totalTags = tagsResult.count || 0;

    const favoriteCount = snippetsResult.data?.filter(s => s.is_favorite).length || 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentActivity = snippetsResult.data?.filter(
      s => new Date(s.created_at) > sevenDaysAgo
    ).length || 0;

    const languageMap = new Map<string, number>();
    languageStatsResult.data?.forEach(snippet => {
      const count = languageMap.get(snippet.language) || 0;
      languageMap.set(snippet.language, count + 1);
    });

    const languageStats = Array.from(languageMap.entries())
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalSnippets,
      totalFolders,
      totalTags,
      favoriteCount,
      languageStats,
      recentActivity,
    };
  },
};
