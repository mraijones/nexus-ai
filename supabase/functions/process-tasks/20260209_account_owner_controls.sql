-- Account Settings Table
CREATE TABLE IF NOT EXISTS account_settings (
  account_id uuid PRIMARY KEY references profiles(id),
  notify_owner boolean DEFAULT false,
  notify_events jsonb DEFAULT '["task_failed","task_blocked"]',
  require_owner_approval boolean DEFAULT false,
  allow_admin_approval boolean DEFAULT false
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid references account_settings(account_id),
  user_id uuid references profiles(id),
  type text,
  task_id uuid references tasks(id),
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Tasks Table (add approval fields and new statuses)
ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS status text,
  ADD COLUMN IF NOT EXISTS approved_by_user_id uuid references profiles(id),
  ADD COLUMN IF NOT EXISTS approved_at timestamptz,
  ADD COLUMN IF NOT EXISTS rejected_by_user_id uuid references profiles(id),
  ADD COLUMN IF NOT EXISTS rejected_at timestamptz;

-- Audit Log Table (if not already present)
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid references tasks(id),
  user_id uuid references profiles(id),
  employee_id uuid references employees(id),
  manifest_id uuid,
  manifest_version text,
  event text,
  details jsonb,
  created_at timestamptz DEFAULT now()
);
