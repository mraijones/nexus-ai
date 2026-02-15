-- Migration: Hire/Fire System with 30-day Lock-in and Subscription Management
-- This migration adds the necessary tables and logic for:
-- 1. 30-day lock-in period after hiring
-- 2. Subscription tracking and billing
-- 3. Payment events and audit logs
-- 4. Fired employees audit log

-- Add lock_in_expiry to account_roles if not exists
ALTER TABLE account_roles
  ADD COLUMN IF NOT EXISTS lock_in_expiry timestamptz;

-- Function to calculate lock-in expiry (30 days from hire)
CREATE OR REPLACE FUNCTION calculate_lock_in_expiry()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.hired_at IS NOT NULL AND NEW.lock_in_expiry IS NULL THEN
    NEW.lock_in_expiry = NEW.hired_at + INTERVAL '30 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically set lock_in_expiry on hire
DROP TRIGGER IF EXISTS trg_set_lock_in_expiry ON account_roles;
CREATE TRIGGER trg_set_lock_in_expiry
BEFORE INSERT OR UPDATE ON account_roles
FOR EACH ROW EXECUTE FUNCTION calculate_lock_in_expiry();

-- Subscriptions table to track user subscription status
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text CHECK (status IN ('active','canceled','past_due','unpaid','trialing')) DEFAULT 'active',
  tier text CHECK (tier IN ('free','starter','professional','enterprise','tier1','tier2','tier3','tier4')),
  amount decimal(10,2),
  currency text DEFAULT 'usd',
  billing_cycle text CHECK (billing_cycle IN ('monthly','annual')) DEFAULT 'monthly',
  next_billing_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  canceled_at timestamptz,
  UNIQUE(user_id, stripe_subscription_id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Trigger to update subscriptions updated_at
CREATE TRIGGER set_subscriptions_updated_at 
BEFORE UPDATE ON subscriptions 
FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- Payment events table for audit log of all transactions
CREATE TABLE IF NOT EXISTS payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  stripe_payment_intent_id text,
  stripe_invoice_id text,
  event_type text CHECK (event_type IN (
    'subscription_created',
    'subscription_updated', 
    'subscription_canceled',
    'payment_succeeded',
    'payment_failed',
    'invoice_created',
    'invoice_paid',
    'invoice_payment_failed'
  )),
  amount decimal(10,2),
  currency text DEFAULT 'usd',
  status text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_events_user ON payment_events(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_subscription ON payment_events(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_type ON payment_events(event_type);
CREATE INDEX IF NOT EXISTS idx_payment_events_created ON payment_events(created_at DESC);

-- Fired employees audit log
CREATE TABLE IF NOT EXISTS fired_employees_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_role_id uuid REFERENCES account_roles(id),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  role_id text,
  persona_id uuid,
  hired_at timestamptz,
  fired_at timestamptz DEFAULT now(),
  lock_in_expired boolean DEFAULT false,
  reason text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fired_employees_user ON fired_employees_log(user_id);
CREATE INDEX IF NOT EXISTS idx_fired_employees_role ON fired_employees_log(role_id);
CREATE INDEX IF NOT EXISTS idx_fired_employees_fired_at ON fired_employees_log(fired_at DESC);

-- Function to check if lock-in period has expired
CREATE OR REPLACE FUNCTION can_fire_employee(p_account_role_id uuid)
RETURNS boolean AS $$
DECLARE
  v_lock_in_expiry timestamptz;
BEGIN
  SELECT lock_in_expiry INTO v_lock_in_expiry
  FROM account_roles
  WHERE id = p_account_role_id AND status = 'active';
  
  IF v_lock_in_expiry IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN now() >= v_lock_in_expiry;
END;
$$ LANGUAGE plpgsql;

-- Function to get days remaining in lock-in period
CREATE OR REPLACE FUNCTION lock_in_days_remaining(p_account_role_id uuid)
RETURNS integer AS $$
DECLARE
  v_lock_in_expiry timestamptz;
  v_days_remaining integer;
BEGIN
  SELECT lock_in_expiry INTO v_lock_in_expiry
  FROM account_roles
  WHERE id = p_account_role_id AND status = 'active';
  
  IF v_lock_in_expiry IS NULL THEN
    RETURN NULL;
  END IF;
  
  v_days_remaining := EXTRACT(DAY FROM (v_lock_in_expiry - now()));
  
  IF v_days_remaining < 0 THEN
    RETURN 0;
  END IF;
  
  RETURN v_days_remaining;
END;
$$ LANGUAGE plpgsql;

-- Add user profile fields for subscription tracking if not exists
-- Note: Assuming profiles table exists from auth setup
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    ALTER TABLE profiles
      ADD COLUMN IF NOT EXISTS subscription_tier text,
      ADD COLUMN IF NOT EXISTS stripe_customer_id text,
      ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'free',
      ADD COLUMN IF NOT EXISTS next_billing_date timestamptz;
  END IF;
END $$;

-- Comments for documentation
COMMENT ON TABLE subscriptions IS 'Tracks user subscription status and billing information';
COMMENT ON TABLE payment_events IS 'Audit log of all payment and subscription events';
COMMENT ON TABLE fired_employees_log IS 'Historical record of all fired employees';
COMMENT ON COLUMN account_roles.lock_in_expiry IS '30-day lock-in period expiry date (hired_at + 30 days)';
COMMENT ON FUNCTION can_fire_employee IS 'Returns true if the 30-day lock-in period has expired';
COMMENT ON FUNCTION lock_in_days_remaining IS 'Returns number of days remaining in lock-in period, 0 if expired';
