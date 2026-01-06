import { supabase } from '../supabase';
import type { Database } from '../types/database';

type Snippet = Database['public']['Tables']['snippets']['Row'];
type SnippetInsert = Database['public']['Tables']['snippets']['Insert'];
type SnippetUpdate = Database['public']['Tables']['snippets']['Update'];

export interface SnippetWithTags extends Snippet {
  tags?: { id: string; name: string; color: string }[];
  folder?: { id: string; name: string; color: string } | null;
}

export const snippetApi = {
  async getCount(userId: string) {
    const { count, error } = await supabase
      .from('snippets')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      throw error;
    }
    return count ?? 0;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('snippets')
      .select(`
        *,
        folder:folders(id, name, color),
        snippet_tags(
          tag:tags(id, name, color)
        )
      `)
      .order('created_at', { ascending: false })
      .eq('user_id', userId);

    if (error) throw error;

    return data.map(snippet => ({
      ...snippet,
      tags: snippet.snippet_tags?.map(st => (st as any).tag).filter(Boolean) || [],
    })) as SnippetWithTags[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('snippets')
      .select(`
        *,
        folder:folders(id, name, color),
        snippet_tags(
          tag:tags(id, name, color)
        )
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      tags: data.snippet_tags?.map(st => (st as any).tag).filter(Boolean) || [],
    } as SnippetWithTags;
  },

  async create(snippet: SnippetInsert, tagIds: string[] = []) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: created, error } = await supabase
      .from("snippets")
      .insert({
        ...snippet,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;

    // Insert mapping rows
    if (tagIds.length > 0) {
      await supabase
        .from("snippet_tags")
        .insert(tagIds.map(id => ({ snippet_id: created.id, tag_id: id })));
    }

    return created;
  },


 async update(
  id: string,
  snippet: SnippetUpdate & { tags?: string[]; originalTagIds?: string[] }
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const tagIds = snippet.tags ?? [];
  const originalTagIds = snippet.originalTagIds ?? [];

  delete snippet.tags;
  delete snippet.originalTagIds;

  // STEP 1: Check snippet existence and ownership
  const { data: existingSnippet, error: existenceError } = await supabase
    .from('snippets')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (existenceError || !existingSnippet) {
    throw new Error('Snippet not found or you do not have permission to update it');
  }

  // STEP 2: Update the snippet itself
  const { data: updated, error: updateError } = await supabase
    .from('snippets')
    .update(snippet)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (updateError) throw updateError;

  // STEP 3: Remove deleted tags
  const removed = originalTagIds.filter(t => !tagIds.includes(t));
  if (removed.length > 0) {
    await supabase
      .from('snippet_tags')
      .delete()
      .eq('snippet_id', id)
      .in('tag_id', removed);

    // After removing associations, check if any of these tags are now orphaned.
    for (const tagId of removed) {
      const { count, error } = await supabase
        .from('snippet_tags')
        .select('*', { count: 'exact', head: true })
        .eq('tag_id', tagId);

      if (error) {
        console.error(`Error checking usage for tag ${tagId}:`, error);
        continue; // Don't block the update process
      }

      // If no other snippets are using this tag, delete it.
      if (count === 0) {
        await supabase.from('tags').delete().eq('id', tagId);
      }
    }
  }

  // STEP 4: Add new tags
  const added = tagIds.filter(t => !originalTagIds.includes(t));
  if (added.length > 0) {
    await supabase
      .from('snippet_tags')
      .insert(added.map(t => ({ snippet_id: id, tag_id: t })));
  }

  return updated;
},



  async delete(id: string) {
    // Find all tags associated with the snippet to be deleted.
    const { data: snippetTags, error: snippetTagsError } = await supabase
      .from('snippet_tags')
      .select('tag_id')
      .eq('snippet_id', id);

    if (snippetTagsError) {
      console.error('Error fetching tags for snippet deletion:', snippetTagsError);
      // We can still proceed to delete the snippet itself
    }

    if (snippetTags && snippetTags.length > 0) {
      const tagIds = snippetTags.map(st => st.tag_id);

      for (const tagId of tagIds) {
        // Check if the tag is used by any other snippet.
        const { count, error: countError } = await supabase
          .from('snippet_tags')
          .select('snippet_id', { count: 'exact', head: true })
          .eq('tag_id', tagId);

        if (countError) {
          console.error(`Error checking usage for tag ${tagId}:`, countError);
          continue; // Skip to the next tag
        }

        // If the tag is only used by this one snippet, delete the tag.
        if (count === 1) {
          await supabase.from('tags').delete().eq('id', tagId);
        }
      }
    }

    const { error } = await supabase.from('snippets').delete().eq('id', id);
    if (error) throw error;
  },

  async toggleFavorite(id: string, isFavorite: boolean) {
    const { data, error } = await supabase
      .from('snippets')
      .update({ is_favorite: isFavorite })
      .eq('id', id)
      .select()
      .single();


    if (!data) throw new Error("Unauthorized.");

    if (error) throw error;
    return data;
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('snippets')
      .select(`
        *,
        folder:folders(id, name, color),
        snippet_tags(
          tag:tags(id, name, color)
        )
      `)
      .textSearch('title', query, { type: 'websearch' })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(snippet => ({
      ...snippet,
      tags: snippet.snippet_tags?.map(st => (st as any).tag).filter(Boolean) || [],
    })) as SnippetWithTags[];
  },

  async getByLanguage(language: string) {
    const { data, error } = await supabase
      .from('snippets')
      .select(`
        *,
        folder:folders(id, name, color),
        snippet_tags(
          tag:tags(id, name, color)
        )
      `)
      .eq('language', language)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(snippet => ({
      ...snippet,
      tags: snippet.snippet_tags?.map(st => (st as any).tag).filter(Boolean) || [],
    })) as SnippetWithTags[];
  },

  async getByFolder(folderId: string | null) {
    const query = supabase
      .from('snippets')
      .select(`
        *,
        folder:folders(id, name, color),
        snippet_tags(
          tag:tags(id, name, color)
        )
      `)
      .order('created_at', { ascending: false });

    if (folderId === null) {
      query.is('folder_id', null);
    } else {
      query.eq('folder_id', folderId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(snippet => ({
      ...snippet,
      tags: snippet.snippet_tags?.map(st => (st as any).tag).filter(Boolean) || [],
    })) as SnippetWithTags[];
  },

  async getFavorites() {
    const { data, error } = await supabase
      .from('snippets')
      .select(`
        *,
        folder:folders(id, name, color),
        snippet_tags(
          tag:tags(id, name, color)
        )
      `)
      .eq('is_favorite', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(snippet => ({
      ...snippet,
      tags: snippet.snippet_tags?.map(st => (st as any).tag).filter(Boolean) || [],
    })) as SnippetWithTags[];
  },
};
