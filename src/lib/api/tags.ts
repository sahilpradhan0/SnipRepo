import { supabase } from '../supabase';
import type { Database } from '../types/database';

type Tag = Database['public']['Tables']['tags']['Row'];
type TagInsert = Database['public']['Tables']['tags']['Insert'];
type TagUpdate = Database['public']['Tables']['tags']['Update'];

export const tagApi = {
  async getAll() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('user_id', user.id)
      .order('name');

    if (error) throw error;
    return data as Tag[];
  },

  async getById(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data as Tag | null;
  },

  async create(tag: TagInsert) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    const { data, error } = await supabase
      .from('tags')
      .insert({
        ...tag,
        user_id: user.id, // enforce secure ownership
      })
      .select()
      .single();

    if (error) throw error;
    return data as Tag;
  },

  async update(id: string, tag: TagUpdate) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    const { data, error } = await supabase
      .from('tags')
      .update(tag)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("Tag not found or unauthorized.");
    return data as Tag;
  },

  async delete(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  },

  async deleteAll() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    // We need to delete from 'snippet_tags' first due to foreign key constraints.
    // Get all tag IDs for the current user.
    const { data: userTags, error: userTagsError } = await supabase
      .from('tags')
      .select('id')
      .eq('user_id', user.id);

    if (userTagsError) {
      console.error('Error fetching user tags for deletion:', userTagsError);
      throw userTagsError;
    }

    if (userTags && userTags.length > 0) {
      const tagIds = userTags.map(t => t.id);

      // Delete all associations in 'snippet_tags' for those tags.
      const { error: snippetTagsError } = await supabase
        .from('snippet_tags')
        .delete()
        .in('tag_id', tagIds);

      if (snippetTagsError) {
        console.error('Error deleting from snippet_tags:', snippetTagsError);
        throw snippetTagsError;
      }
    }

    // Now, delete the tags themselves.
    const { error: deleteTagsError } = await supabase
      .from('tags')
      .delete()
      .eq('user_id', user.id);

    if (deleteTagsError) throw deleteTagsError;
  },

  async getUsageCount(tagId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    const { count, error } = await supabase
      .from('snippet_tags')
      .select('snippet_id', { count: 'exact', head: true })
      .eq('tag_id', tagId)
      // .eq('user_id', user.id); // ensures counting only your own snippet relations

    if (error) throw error;
    return count || 0;
  },
};
