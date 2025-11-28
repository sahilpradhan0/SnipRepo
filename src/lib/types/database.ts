export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          theme_preference: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          theme_preference?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          theme_preference?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      folders: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          color: string;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          color?: string;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          color?: string;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          color?: string;
          created_at?: string;
        };
      };
      snippets: {
        Row: {
          id: string;
          user_id: string;
          folder_id: string | null;
          title: string;
          description: string | null;
          code: string;
          language: string;
          output: string | null;
          explanation: string | null;
          is_favorite: boolean;
          is_public: boolean;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          folder_id?: string | null;
          title: string;
          description?: string | null;
          code: string;
          language: string;
          output?: string | null;
          explanation?: string | null;
          is_favorite?: boolean;
          is_public?: boolean;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          folder_id?: string | null;
          title?: string;
          description?: string | null;
          code?: string;
          language?: string;
          output?: string | null;
          explanation?: string | null;
          is_favorite?: boolean;
          is_public?: boolean;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      snippet_tags: {
        Row: {
          snippet_id: string;
          tag_id: string;
        };
        Insert: {
          snippet_id: string;
          tag_id: string;
        };
        Update: {
          snippet_id?: string;
          tag_id?: string;
        };
      };
      snippet_versions: {
        Row: {
          id: string;
          snippet_id: string;
          code: string;
          version_number: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          snippet_id: string;
          code: string;
          version_number: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          snippet_id?: string;
          code?: string;
          version_number?: number;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
