import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

console.log('VITE_SUPABASE_URL:', supabaseUrl);
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '[REDACTED]' : 'MISSING');

if (!supabaseUrl?.startsWith('http')) {
  throw new Error('VITE_SUPABASE_URL is missing or invalid');
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

// 1. ROLES TABLE (authority binds here, mapped to ai_employees)
CREATE TABLE IF NOT EXISTS roles (
  id text PRIMARY KEY, -- matches ai_employees.id
  display_name text NOT NULL,
  department text,
  authority_tier int,
  default_oversight text,
  status text,
  description text,
  handles jsonb,
  boundaries jsonb,
  created_at timestamptz DEFAULT now()
);

// 2. ROLE_PERSONAS TABLE (representation options)
CREATE TABLE IF NOT EXISTS role_personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id text REFERENCES roles(id),
  persona_name text NOT NULL,
  gender text CHECK (gender IN ('female','male','nonbinary','unspecified')),
  ethnicity text,
  age_range text,
  avatar_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_role_personas_role_id_active ON role_personas(role_id, is_active);

// 3. ACCOUNT_ROLES TABLE (the "hire"; locks persona)
CREATE TABLE IF NOT EXISTS account_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES auth.users(id),
  role_id text REFERENCES roles(id),
  persona_id uuid REFERENCES role_personas(id),
  status text CHECK (status IN ('active','fired')) DEFAULT 'active',
  hired_by_user_id uuid REFERENCES auth.users(id),
  hired_at timestamptz DEFAULT now(),
  fired_by_user_id uuid REFERENCES auth.users(id),
  fired_at timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_account_roles_active_role ON account_roles(account_id, role_id) WHERE status = 'active';

// 4. PERSONA IMMUTABILITY TRIGGER
CREATE OR REPLACE FUNCTION prevent_persona_change()
RETURNS trigger AS $$
BEGIN
  IF NEW.persona_id <> OLD.persona_id THEN
    RAISE EXCEPTION 'Persona cannot be changed after hire. Remove and rehire to change.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_persona_change ON account_roles;
CREATE TRIGGER trg_prevent_persona_change
BEFORE UPDATE OF persona_id ON account_roles
FOR EACH ROW EXECUTE FUNCTION prevent_persona_change();

// 5. TASKS TABLE: add account_role_id, role_id, persona_id
ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS account_role_id uuid REFERENCES account_roles(id),
  ADD COLUMN IF NOT EXISTS role_id text REFERENCES roles(id),
  ADD COLUMN IF NOT EXISTS persona_id uuid REFERENCES role_personas(id);

// 6. AUDIT LOGS: ensure task_logs.meta can store account_role_id, role_id, persona_id
// (Assume task_logs.meta is already jsonb and can store these fields)
