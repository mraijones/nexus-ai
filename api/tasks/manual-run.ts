import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

function getSupabaseHeaders(extra?: Record<string, string>) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function supabaseFetch(path: string, options: RequestInit) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase environment variables are missing');
  }
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  return fetch(url, options);
}

function getFunctionsBaseUrl() {
  if (!SUPABASE_URL) return '';
  return SUPABASE_URL.replace('.supabase.co', '.functions.supabase.co');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase environment variables are missing' });
  }

  try {
    const authUserId = req.headers['x-user-id'] || null;
    const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    const { task_id } = body;

    if (!task_id) {
      return res.status(400).json({ error: 'Missing task_id' });
    }

    const taskResponse = await supabaseFetch(
      `tasks?id=eq.${encodeURIComponent(task_id)}&select=id,user_id,status,run_mode&limit=1`,
      { method: 'GET', headers: getSupabaseHeaders() }
    );
    const taskData = await taskResponse.json();
    const task = Array.isArray(taskData) ? taskData[0] : null;

    if (!taskResponse.ok || !task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (authUserId && task.user_id !== authUserId) {
      return res.status(403).json({ error: 'You are not authorized to run this task.' });
    }

    if (task.status !== 'pending') {
      return res.status(409).json({ error: 'Task is not pending.' });
    }

    const functionsBaseUrl = getFunctionsBaseUrl();
    if (!functionsBaseUrl) {
      return res.status(500).json({ error: 'Supabase Functions URL is missing' });
    }

    const functionResponse = await fetch(`${functionsBaseUrl}/process-tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({ task_id }),
    });

    const responseText = await functionResponse.text();
    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      responseJson = { raw: responseText };
    }

    if (!functionResponse.ok) {
      return res.status(500).json({ error: 'Failed to trigger task execution', details: responseJson });
    }

    return res.status(200).json({ ok: true, result: responseJson });
  } catch (err) {
    console.error('API /api/tasks/manual-run error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
