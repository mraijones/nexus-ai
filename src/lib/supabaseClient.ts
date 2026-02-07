import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Vite client-side env vars (must be prefixed with VITE_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const SUPABASE_CONFIG_OK = Boolean(supabaseUrl && supabaseAnonKey);

// IMPORTANT: do NOT crash at import-time if env vars are missing.
// Export null so the app can still mount and show a useful message.
export const supabase: SupabaseClient | null = SUPABASE_CONFIG_OK
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
  
