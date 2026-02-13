

import { createClient } from '@supabase/supabase-js';

// 1) Read env FIRST (never assume they exist)
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();

// Prefer the real anon key; allow fallback only if you intentionally support it
const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  ""
).trim();

// 2) Validate (fail fast with clear messages)
if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is missing (check .env.local or Vercel env vars)");
}
if (!supabaseAnonKey) {
 throw new Error("VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) is missing (check .env.local or Vercel env vars)");
}

// Optional: sanity-check URL format (kept minimal)
try {
  new URL(supabaseUrl);
} catch {
  throw new Error(`VITE_SUPABASE_URL is invalid: ${JSON.stringify(supabaseUrl)}`);
}

// 3) Create client LAST (reuse across HMR to avoid duplicate GoTrueClient warnings)
const globalScope = globalThis as typeof globalThis & { __supabaseClient?: ReturnType<typeof createClient<any>> };
export const supabase = globalScope.__supabaseClient ?? createClient<any>(supabaseUrl, supabaseAnonKey);
globalScope.__supabaseClient = supabase;

