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

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return new Response(JSON.stringify({ error: 'Supabase environment variables are missing' }), { status: 500 });
  }

  try {
    const authUserId = req.headers.get('x-user-id') || null;
    const body = await req.json();
    const { task_id } = body;

    if (!task_id) {
      return new Response(JSON.stringify({ error: 'Missing task_id' }), { status: 400 });
    }

    const taskResponse = await supabaseFetch(
      `tasks?id=eq.${encodeURIComponent(task_id)}&select=id,user_id,status,run_mode&limit=1`,
      { method: 'GET', headers: getSupabaseHeaders() }
    );
    const taskData = await taskResponse.json();
    const task = Array.isArray(taskData) ? taskData[0] : null;

    if (!taskResponse.ok || !task) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }

    if (authUserId && task.user_id !== authUserId) {
      return new Response(JSON.stringify({ error: 'You are not authorized to run this task.' }), { status: 403 });
    }

    if (task.status !== 'pending') {
      return new Response(JSON.stringify({ error: 'Task is not pending.' }), { status: 409 });
    }

    const functionsBaseUrl = getFunctionsBaseUrl();
    if (!functionsBaseUrl) {
      return new Response(JSON.stringify({ error: 'Supabase Functions URL is missing' }), { status: 500 });
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
    let responseJson: unknown = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      responseJson = { raw: responseText };
    }

    if (!functionResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to trigger task execution', details: responseJson }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true, result: responseJson }), { status: 200 });
  } catch (err) {
    console.error('API /tasks/manual-run error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
