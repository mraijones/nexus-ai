-- ROLES TABLE (authority binds here)
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_key text UNIQUE NOT NULL,
  display_name text NOT NULL,
  department text,
  authority_tier int,
  default_oversight text CHECK (default_oversight IN ('autonomous','review','approval')),
  status text CHECK (status IN ('available','coming_soon','internal')),
  description text,
  handles jsonb,
  boundaries jsonb,
  created_at timestamptz DEFAULT now()
);

-- ROLE_PERSONAS TABLE (representation options)
CREATE TABLE IF NOT EXISTS role_personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid REFERENCES roles(id),
  persona_name text NOT NULL,
  gender text CHECK (gender IN ('female','male','nonbinary','unspecified')),
  ethnicity text,
  age_range text,
  avatar_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_role_personas_role_id_active ON role_personas(role_id, is_active);

-- ACCOUNT_ROLES TABLE (the "hire"; locks persona)
CREATE TABLE IF NOT EXISTS account_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES accounts(id),
  role_id uuid REFERENCES roles(id),
  persona_id uuid REFERENCES role_personas(id),
  status text CHECK (status IN ('active','inactive','fired','removed')),
  hired_by_user_id uuid REFERENCES profiles(id),
  hired_at timestamptz DEFAULT now(),
  fired_by_user_id uuid,
  fired_at timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_account_roles_unique_active ON account_roles(account_id, role_id) WHERE status = 'active';

-- Prevent persona_id update after insert (enforce immutability)
CREATE OR REPLACE FUNCTION prevent_persona_id_update()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.persona_id <> OLD.persona_id THEN
    RAISE EXCEPTION 'Persona cannot be changed after hire. Remove and rehire to change.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_persona_id_update ON account_roles;
CREATE TRIGGER trg_prevent_persona_id_update
BEFORE UPDATE OF persona_id ON account_roles
FOR EACH ROW EXECUTE FUNCTION prevent_persona_id_update();

-- TASKS TABLE: add account_role_id, role_id, persona_id
ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS account_role_id uuid REFERENCES account_roles(id),
  ADD COLUMN IF NOT EXISTS role_id uuid REFERENCES roles(id),
  ADD COLUMN IF NOT EXISTS persona_id uuid REFERENCES role_personas(id);

-- AUDIT LOGS: ensure details can store account_role_id, role_id, persona_id
-- (Assume audit_logs.details is already jsonb and can store these fields)

-- SEED: Insert Legal Assistant and Finance Assistant roles and personas
INSERT INTO roles (role_key, display_name, department, authority_tier, default_oversight, status, description, handles, boundaries)
VALUES
  ('legal_assistant', 'Legal Assistant', 'Legal', 2, 'review', 'available', 'Handles contracts, compliance, and legal research.', '["Drafts contracts","Reviews documents","Ensures compliance"]', '["Cannot sign documents","Cannot provide legal advice"]'),
  ('finance_assistant', 'Finance Assistant', 'Finance', 2, 'approval', 'available', 'Manages budgets, expenses, and invoices.', '["Tracks expenses","Generates invoices","Manages budgets"]', '["Cannot approve payments","Cannot modify bank accounts"]')
ON CONFLICT (role_key) DO NOTHING;

-- Insert personas for Legal Assistant
WITH legal_role AS (SELECT id FROM roles WHERE role_key = 'legal_assistant')
INSERT INTO role_personas (role_id, persona_name, gender, ethnicity, age_range, avatar_url)
SELECT id, 'Kierra', 'female', 'Caucasian', '30-40', 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kierra&hair=curly&hairColor=brown&skinColor=light' FROM legal_role
ON CONFLICT DO NOTHING;
WITH legal_role AS (SELECT id FROM roles WHERE role_key = 'legal_assistant')
INSERT INTO role_personas (role_id, persona_name, gender, ethnicity, age_range, avatar_url)
SELECT id, 'Marcus', 'male', 'Black', '40-55', 'https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus&hair=short&hairColor=black&skinColor=dark' FROM legal_role
ON CONFLICT DO NOTHING;

-- Insert personas for Finance Assistant
WITH finance_role AS (SELECT id FROM roles WHERE role_key = 'finance_assistant')
INSERT INTO role_personas (role_id, persona_name, gender, ethnicity, age_range, avatar_url)
SELECT id, 'Kahlynn', 'female', 'Latina', '25-35', 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kahlynn&hair=long&hairColor=brown&skinColor=light' FROM finance_role
ON CONFLICT DO NOTHING;
WITH finance_role AS (SELECT id FROM roles WHERE role_key = 'finance_assistant')
INSERT INTO role_personas (role_id, persona_name, gender, ethnicity, age_range, avatar_url)
SELECT id, 'David', 'male', 'Asian', '30-45', 'https://api.dicebear.com/7.x/adventurer/svg?seed=David&hair=short&hairColor=black&skinColor=yellow' FROM finance_role
ON CONFLICT DO NOTHING;
