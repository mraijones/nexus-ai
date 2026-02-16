import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const config = { api: { bodyParser: false } };

function buffer(readable: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readable.on('data', (chunk: Buffer | string) => chunks.push(Buffer.from(chunk)));
    readable.on('end', () => resolve(Buffer.concat(chunks)));
    readable.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeKey) return res.status(500).json({ error: 'Missing STRIPE_SECRET_KEY' });
  if (!webhookSecret) return res.status(500).json({ error: 'Missing STRIPE_WEBHOOK_SECRET' });
  if (!supabaseUrl) return res.status(500).json({ error: 'Missing SUPABASE_URL' });
  if (!supabaseServiceKey) return res.status(500).json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' });

  const stripe = new Stripe(stripeKey);
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  const sig = req.headers['stripe-signature'];
  if (!sig) {
    return res.status(400).json({ error: 'Missing stripe-signature header' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  console.log('Received Stripe webhook event:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(stripe, supabase, session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(supabase, subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(supabase, subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(supabase, invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(supabase, invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true, type: event.type });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleCheckoutCompleted(
  stripe: Stripe,
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.user_id;
  const employeeId = session.metadata?.employee_id;
  const roleId = session.metadata?.role_id;
  const personaId = session.metadata?.persona_id;

  if (!userId) {
    console.error('No user_id in checkout session metadata');
    return;
  }

  // Create subscription record
  if (session.subscription) {
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string
    )) as Stripe.Subscription;

    await supabase.from('subscriptions').insert({
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      tier: session.metadata?.tier || 'tier1',
      amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
      currency: subscription.currency,
      billing_cycle: subscription.items.data[0]?.price.recurring?.interval === 'year' ? 'annual' : 'monthly',
      next_billing_date: new Date((subscription.current_period_end as number) * 1000).toISOString(),
    });

    // Create payment event
    await supabase.from('payment_events').insert({
      user_id: userId,
      stripe_payment_intent_id: session.payment_intent as string,
      event_type: 'subscription_created',
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      status: 'succeeded',
      metadata: { session_id: session.id, employee_id: employeeId },
    });
  }

  // If hiring an employee, create account_role record
  if (employeeId && roleId) {
    const { error } = await supabase.from('account_roles').insert({
      account_id: userId,
      role_id: roleId,
      persona_id: personaId,
      status: 'active',
      hired_by_user_id: userId,
      hired_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error creating account_role:', error);
    }
  }

  // Update user profile
  await supabase.from('profiles').update({
    subscription_tier: session.metadata?.tier || 'tier1',
    subscription_status: 'active',
    stripe_customer_id: session.customer as string,
  }).eq('id', userId);

  console.log('Checkout completed for user:', userId);
}

async function handleSubscriptionUpdate(
  supabase: SupabaseClient,
  subscription: Stripe.Subscription
) {
  const { data: existingSubscription } = await supabase
    .from('subscriptions')
    .select('id, user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!existingSubscription) {
    console.error('Subscription not found:', subscription.id);
    return;
  }

  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
      next_billing_date: subscription.current_period_end ? new Date((subscription.current_period_end as any as number) * 1000).toISOString() : null,
    })
    .eq('stripe_subscription_id', subscription.id);

  await supabase.from('payment_events').insert({
    user_id: existingSubscription.user_id,
    event_type: 'subscription_updated',
    status: subscription.status,
    metadata: { subscription_id: subscription.id },
  });

  console.log('Subscription updated:', subscription.id);
}

async function handleSubscriptionDeleted(
  supabase: SupabaseClient,
  subscription: Stripe.Subscription
) {
  const { data: existingSubscription } = await supabase
    .from('subscriptions')
    .select('id, user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!existingSubscription) {
    console.error('Subscription not found:', subscription.id);
    return;
  }

  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  // Create payment event
  await supabase.from('payment_events').insert({
    user_id: existingSubscription.user_id,
    event_type: 'subscription_canceled',
    status: 'canceled',
    metadata: { subscription_id: subscription.id },
  });

  // Update user profile
  await supabase.from('profiles').update({
    subscription_status: 'canceled',
  }).eq('id', existingSubscription.user_id);

  console.log('Subscription canceled:', subscription.id);
}

async function handleInvoicePaymentSucceeded(
  supabase: SupabaseClient,
  invoice: Stripe.Invoice
) {
  const customerId = invoice.customer as string;

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('id, user_id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (!subscription) {
    console.error('Subscription not found for customer:', customerId);
    return;
  }

  await supabase.from('payment_events').insert({
    user_id: subscription.user_id,
    subscription_id: subscription.id,
    stripe_invoice_id: invoice.id,
    event_type: 'invoice_paid',
    amount: invoice.amount_paid ? invoice.amount_paid / 100 : 0,
    currency: invoice.currency,
    status: 'succeeded',
    metadata: { invoice_id: invoice.id },
  });

  console.log('Invoice payment succeeded:', invoice.id);
}

async function handleInvoicePaymentFailed(
  supabase: SupabaseClient,
  invoice: Stripe.Invoice
) {
  const customerId = invoice.customer as string;

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('id, user_id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (!subscription) {
    console.error('Subscription not found for customer:', customerId);
    return;
  }

  await supabase.from('payment_events').insert({
    user_id: subscription.user_id,
    subscription_id: subscription.id,
    stripe_invoice_id: invoice.id,
    event_type: 'invoice_payment_failed',
    amount: invoice.amount_due ? invoice.amount_due / 100 : 0,
    currency: invoice.currency,
    status: 'failed',
    metadata: { invoice_id: invoice.id, attempt_count: invoice.attempt_count },
  });

  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('id', subscription.id);

  console.log('Invoice payment failed:', invoice.id);
}
