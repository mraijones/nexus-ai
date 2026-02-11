

import { createClient } from '@supabase/supabase-js';

// 1) Read env FIRST
const rawUrl = import.meta.env.VITE_SUPABASE_URL as string;
const rawAnon = (import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as string;

// 2) Clean/validate SECOND
const supabaseUrl = (rawUrl ?? '').trim().replace(/\s+/g, '');
const supabaseAnonKey = (rawAnon ?? '').trim();

console.log('[ENV] rawUrl=', JSON.stringify(rawUrl));
console.log('[ENV] cleanedUrl=', JSON.stringify(supabaseUrl));

try {
  new URL(supabaseUrl);
} catch {
  throw new Error(`VITE_SUPABASE_URL invalid after cleanup: ${JSON.stringify(supabaseUrl)}`);
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) is missing');
}

// 3) Create client LAST
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

