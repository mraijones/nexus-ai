// ATLAS Decision Record Handler (Vercel Serverless Function)
// Canon: Only for Tier-4 (atlas.tier4_members), append-only, service-role key required

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, serviceRoleKey);

// Only Tier-4 members can create ATLAS records
async function isTier4Member(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('atlas_tier4_members')
    .select('user_id')
    .eq('user_id', userId)
    .single();
  return !!data && !error;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, decision_record } = req.body;
  if (!user_id || !decision_record) {
    return res.status(400).json({ error: 'Missing user_id or decision_record' });
  }

  // Enforce Tier-4 membership
  if (!(await isTier4Member(user_id))) {
    return res.status(403).json({ error: 'Forbidden: Not a Tier-4 member' });
  }

  // Insert append-only record
  const { error } = await supabase
    .from('atlas_decision_records')
    .insert([
      {
        user_id,
        decision_record,
        created_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    return res.status(500).json({ error: 'Failed to insert record', details: error.message });
  }

  return res.status(201).json({ success: true });
}
