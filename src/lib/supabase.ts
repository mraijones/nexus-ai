export type User = {
  id: string;
  email: string;
  full_name: string;
  company?: string;
  subscription_tier: 'free' | 'starter' | 'professional' | 'enterprise';
  subscription_status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
};

export type AIEmployee = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  skills: string[];
  hourly_rate: number;
  is_available: boolean;
};

export type Task = {
  id: string;
  user_id: string;
  employee_id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  deliverables?: string;
  created_at: string;
  completed_at?: string;
};
