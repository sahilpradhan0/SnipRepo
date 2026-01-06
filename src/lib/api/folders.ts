import { supabase } from '../supabase';
import type { Database } from '../types/database';

type Folder = Database['public']['Tables']['folders']['Row'];
type FolderInsert = Database['public']['Tables']['folders']['Insert'];
type FolderUpdate = Database['public']['Tables']['folders']['Update'];

export const folderApi = {
  async getAll(userId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .eq('user_id', userId)
      .order('name');

    if (error) throw error;
    return data as Folder[];
  },

  async getById(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data as Folder | null;
  },

  async create(folder: FolderInsert) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");
    const { data, error } = await supabase
      .from('folders')
      .insert({
        ...folder,
        user_id: user.id,   // force secure value
      })
      .select()
      .single();

    if (error) throw error;
    return data as Folder;
  },

  async update(id: string, folder: FolderUpdate) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");
    const { data, error } = await supabase
      .from('folders')
      .update(folder)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("Folder not found or unauthorized.");
    return data as Folder;
  },

  async delete(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    const { error } = await supabase.from('folders').delete().eq('id', id).eq('user_id', user.id);
    if (error) throw error;
  },

  async deleteAll() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.");

    // First, disassociate all snippets from their folders for this user.
    // This prevents foreign key constraint errors.
    const { error: updateError } = await supabase
      .from('snippets')
      .update({ folder_id: null })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error un-setting folder_id on snippets:', updateError);
      throw updateError;
    }

    // Now, delete all folders for the user.
    const { error: deleteError } = await supabase
      .from('folders')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) throw deleteError;
  },
};
