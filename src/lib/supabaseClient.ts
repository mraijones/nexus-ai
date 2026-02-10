
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseUrl = (rawUrl ?? '').replace(/\s+/g, ''); // removes ALL whitespace anywhere
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

console.log('[ATLAS ENV] rawUrl =', JSON.stringify(rawUrl));
console.log('[ATLAS ENV] cleanedUrl =', JSON.stringify(supabaseUrl));

try {
  // strict validation that matches what supabase-js expects
  new URL(supabaseUrl);
} catch {
  throw new Error(`VITE_SUPABASE_URL invalid after cleanup: ${JSON.stringify(supabaseUrl)}`);
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is missing');
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

