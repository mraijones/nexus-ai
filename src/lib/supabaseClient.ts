
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

type GlobalWithSupabase = typeof globalThis & {
  __supabase?: SupabaseClient;
};
const g = globalThis as GlobalWithSupabase;

if (!g.__supabase) {
  g.__supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'sb-auth-token',
    },
  });
}

export const supabase: SupabaseClient = g.__supabase;

