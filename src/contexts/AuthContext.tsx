import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { track, identifyUser } from '../lib/api/PostHogAnalytics';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateUserPassword: (password: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);

        const hash = window.location.hash;
        if (hash.includes("type=recovery")) {
          console.log("Detected PASSWORD_RECOVERY from URL");
          setIsRecoveringPassword(true);
        }

        if (event === "PASSWORD_RECOVERY") {
          console.log("Supabase event triggered");
          setIsRecoveringPassword(true);
        }
        if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session?.user) {
          // Check if migration is already in progress to prevent race conditions
          if (localStorage.getItem("migration_in_progress") === "true") {
            return;
          }

          const tempId = localStorage.getItem("migrate_temp_id");

          // Nothing to migrate
          if (!tempId) return;

          localStorage.setItem("migration_in_progress", "true");

          // 1. Fetch temp snippet
          const { data: tempSnippet, error: fetchError } = await supabase
            .from("temp_snippets")
            .select("*")
            .eq("temp_id", tempId)
            .single();

          if (fetchError || !tempSnippet) {
            // ⛔ DO NOT LOCK — allow retry
            localStorage.removeItem("migration_in_progress");
            console.warn("Temp snippet not ready yet");
            return;
          }

          // 2. Insert into snippets
          const { data: realSnippet, error: insertError } = await supabase
            .from("snippets")
            .insert({
              user_id: session.user.id,
              title: tempSnippet.title,
              description: tempSnippet.description,
              code: tempSnippet.code,
              language: tempSnippet.language,
              output: tempSnippet.output,
              explanation: tempSnippet.explanation,
            })
            .select()
            .single();

          if (insertError || !realSnippet) {
            localStorage.removeItem("migration_in_progress");
            console.error("Insert failed", insertError);
            return; 
          }

          // 3. Cleanup temp snippet
          await supabase
            .from("temp_snippets")
            .delete()
            .eq("id", tempSnippet.id);

          // ✅ FINALIZE: Dispatch a custom event to notify the app
          window.dispatchEvent(new CustomEvent('snippet-migrated'));
          localStorage.removeItem("migrate_temp_id");
          localStorage.removeItem("migration_in_progress");

          console.log("Temp snippet migrated successfully");

        }



      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const migrateTempId = localStorage.getItem("migrate_temp_id");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          migrate_temp_id: migrateTempId || null  // ← Passes it to user_metadata
        }
      }
    });
    if (error) {
      console.error("Error during sign up:", error);
    }
    if (!error && data?.user) {
      identifyUser({ id: data.user.id, email });
      track("user_signed_up", { email });
    }

    return { data, error };
  };


  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data?.user) {
      identifyUser({ id: data.user.id, email });
      track("user_logged_in", { email });
    }
    return { error };
  };

  const signOut = async () => {
    track("user_logged_out", { userId: user?.id });
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    track("password_reset_requested", { email });
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    });
    return { error };
  };

  const updateUserPassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (!error) {
      track("password_changed", { userId: user?.id });
    }
    await supabase.auth.signOut();
    navigate("/login");

    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateUserPassword,
    isRecoveringPassword,
    setIsRecoveringPassword
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
