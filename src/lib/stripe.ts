import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export const stripePromise = loadStripe(stripePublishableKey);

export const STRIPE_PRICES = {
  starter: {
    monthly: import.meta.env.VITE_STRIPE_STARTER_MONTHLY || '',
    yearly: import.meta.env.VITE_STRIPE_STARTER_YEARLY || '',
  },
  professional: {
    monthly: import.meta.env.VITE_STRIPE_PROFESSIONAL_MONTHLY || '',
    yearly: import.meta.env.VITE_STRIPE_PROFESSIONAL_YEARLY || '',
  },
  enterprise: {
    monthly: import.meta.env.VITE_STRIPE_ENTERPRISE_MONTHLY || '',
    yearly: import.meta.env.VITE_STRIPE_ENTERPRISE_YEARLY || '',
  },
};

export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';

export interface PricingPlan {
  id: SubscriptionTier;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  employeeLimit: number;
  taskLimit: number;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Try Nexus AI with limited access',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '1 AI Employee',
      '10 tasks/month',
      'Email support',
      'Basic analytics',
    ],
    employeeLimit: 1,
    taskLimit: 10,
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      '3 AI Employees',
      '100 tasks/month',
      'Priority email support',
      'Advanced analytics',
      'API access',
    ],
    employeeLimit: 3,
    taskLimit: 100,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Best for growing teams and businesses',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      '10 AI Employees',
      'Unlimited tasks',
      'Priority support',
      'Advanced analytics',
      'Full API access',
      'Custom training',
      'Team collaboration',
    ],
    employeeLimit: 10,
    taskLimit: -1, // unlimited
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    features: [
      'Unlimited AI Employees',
      'Unlimited tasks',
      '24/7 dedicated support',
      'Enterprise analytics',
      'Full API access',
      'Custom AI training',
      'SSO & Security',
      'SLA guarantee',
    ],
    employeeLimit: -1,
    taskLimit: -1,
  },
];
