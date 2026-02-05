import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. Server-side Supabase client will fail without these.');
}

export const supabaseAdmin = createClient(SUPABASE_URL || '', SUPABASE_SERVICE_ROLE_KEY || '');
