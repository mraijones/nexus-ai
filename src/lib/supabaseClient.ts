import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const SUPABASE_CONFIG_OK = Boolean(supabaseUrl && supabaseAnonKey)

type GlobalWithSupabase = typeof globalThis & {
  __supabase?: SupabaseClient | null
};

const g = globalThis as GlobalWithSupabase

export const supabase: SupabaseClient | null =
  SUPABASE_CONFIG_OK
    ? (g.__supabase ??
        createClient(supabaseUrl!, supabaseAnonKey!, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storageKey: 'sb-auth-token',
          },
        }))
    : null;

// 🔒 enforce singleton across module re-evaluation
if (SUPABASE_CONFIG_OK) {
  g.__supabase = supabase
}

