import { createClient } from "@supabase/supabase-js";

// Import types for a cleaner definition (optional, but good practice)
import type { SupabaseClient } from "@supabase/supabase-js";

// Define the custom fetch function type explicitly
const getCustomFetch = (token: string, supabaseAnonKey: string) => {
    // We explicitly define the function parameters to match the standard fetch signature, 
    // even though the internal logic only uses a subset of the types.
    const customFetch = (url: RequestInfo, options: RequestInit = {}) => {
        const headers = new Headers(options.headers);
        
        // --- 🚀 FIX FOR THE 401/42501 ERRORS ---
        // Force the Authorization header for every request this client makes
        headers.set('Authorization', `Bearer ${token}`);
        
        // Ensure the API key is also present
        if (!headers.has('apikey')) {
            headers.set('apikey', supabaseAnonKey);
        }

        return fetch(url, { ...options, headers });
    };

    // Cast the function to the generic fetch type to satisfy the compiler
    return customFetch as typeof fetch;
};


export function getTempClient(token: string): SupabaseClient {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Use the function to get the custom fetch implementation
    const customFetch = getCustomFetch(token, supabaseAnonKey);

    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            fetch: customFetch, // Use the custom fetch method
        },
        // --- 🚀 FIX FOR THE 403/USER-NOT-EXIST ERRORS ---
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
        },
        realtime: {
            autoConnect: false, // Prevents the 406 error
        },
    });
}