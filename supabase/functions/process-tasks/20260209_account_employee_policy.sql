-- Account-level Employee Policy Table
CREATE TABLE IF NOT EXISTS account_employee_policies (
  account_id uuid references account_settings(account_id),
  employee_id uuid references employees(id),
  enabled boolean DEFAULT true,
  oversight_mode text CHECK (oversight_mode IN ('autonomous', 'review', 'approval')),
  updated_by_user_id uuid references profiles(id),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (account_id, employee_id)
);

-- Audit event for owner policy changes
CREATE TABLE IF NOT EXISTS audit_owner_policy_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid references account_settings(account_id),
  actor_user_id uuid references profiles(id),
  employee_id uuid references employees(id),
  before jsonb,
  after jsonb,
  manifest_id uuid,
  manifest_version text,
  created_at timestamptz DEFAULT now()
);

-- Add fields to tasks for policy/audit trace
ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS effective_oversight_mode text,
  ADD COLUMN IF NOT EXISTS owner_approval_required boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS owner_approval_granted boolean DEFAULT false;
