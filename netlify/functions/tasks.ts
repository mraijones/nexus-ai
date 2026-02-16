import type { Context } from "@netlify/functions";

export const config = {
  path: "/api/nexus-execute",
  rateLimit: {
    windowLimit: 20,      // Max 20 tasks
    windowSize: 60,       // Per 60 seconds
    aggregateBy: ["ip"], // Per individual client IP
  },
};

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

// Simple mapping for auto-assignment
// Refined mapping: multiple keywords per employee, fuzzy matching, fallback to least busy
const templateToEmployee: Record<string, string> = {
  blog: 'alex',
  social: 'mia',
  design: 'bob',
  code: 'charlie',
  marketing: 'david',
  custom: 'alex',
};

const employeeKeywordMap: Array<{ id: string; keywords: string[] }> = [
  { id: 'alex', keywords: ['blog', 'copy', 'write', 'content', 'article', 'post', 'story'] },
  { id: 'bob', keywords: ['design', 'ui', 'ux', 'visual', 'logo', 'illustration', 'brand'] },
  { id: 'charlie', keywords: ['code', 'develop', 'build', 'app', 'feature', 'bug', 'python', 'react', 'api'] },
  { id: 'david', keywords: ['marketing', 'campaign', 'growth', 'crm', 'ad', 'analytics'] },
  { id: 'eve', keywords: ['data', 'analy', 'report', 'dashboard', 'sql', 'trend'] },
  { id: 'sam', keywords: ['support', 'ticket', 'help', 'faq', 'customer', 'chat'] },
  { id: 'sophia', keywords: ['seo', 'search', 'optimiz', 'keyword', 'backlink'] },
  { id: 'mia', keywords: ['social', 'media', 'engage', 'post', 'brand', 'schedule'] },
  { id: 'paul', keywords: ['project', 'manage', 'task', 'deadline', 'remind', 'team'] },
  { id: 'quinn', keywords: ['test', 'qa', 'bug', 'regress', 'automation'] },
  { id: 'riley', keywords: ['sales', 'lead', 'crm', 'outreach', 'follow'] },
  { id: 'harper', keywords: ['hr', 'resume', 'interview', 'onboard', 'policy'] },
  { id: 'luna', keywords: ['legal', 'contract', 'review', 'compliance', 'law'] },
  { id: 'finley', keywords: ['finance', 'expense', 'invoice', 'budget', 'summary'] },
  { id: 'sage', keywords: ['research', 'summary', 'brief', 'fact', 'analy'] },
  { id: 'taylor', keywords: ['translate', 'localiz', 'language', 'proofread', 'edit'] },
];

function fuzzyIncludes(text: string, keyword: string) {
  // Partial match, ignore case
  return text.includes(keyword);
}

async function autoAssignEmployee({ template, title, description }: { template?: string; title: string; description: string }): Promise<string> {
  if (template && templateToEmployee[template]) return templateToEmployee[template];
  const text = `${title} ${description}`.toLowerCase();
  let bestMatch = '';
  let bestScore = 0;
  for (const { id, keywords } of employeeKeywordMap) {
    let score = 0;
    for (const kw of keywords) {
      if (fuzzyIncludes(text, kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = id;
    }
  }
  if (bestMatch) return bestMatch;
  // Fallback: pick a random employee from DB
  const response = await supabaseFetch('ai_employees?select=id', { method: 'GET', headers: getSupabaseHeaders() });
  if (response.ok) {
    const employees = await response.json();
    if (Array.isArray(employees) && employees.length > 0) {
      return employees[Math.floor(Math.random() * employees.length)].id;
    }
  }
  return 'alex';
}

// Netlify-style serverless function handler
export default async function handler(req: Request, context: Context) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return new Response(JSON.stringify({ error: 'Supabase environment variables are missing' }), { status: 500 });
    }

    // Authentication: require user to be logged in (e.g., via header or session)
    // Example: expecting user_id in a custom header for demo; replace with real auth in production
    const authUserId = req.headers.get('x-user-id') || null;
    const body = await req.json();
    let { user_id, employee_id, title, description, priority = 'medium', run_mode = 'auto', template } = body;

    // Validate required fields
    if (!user_id || !title || !description) {
      return new Response(JSON.stringify({ error: 'Missing required fields: user_id, title, description' }), { status: 400 });
    }

    // Auto-assign employee if not provided
    if (!employee_id) {
      employee_id = await autoAssignEmployee({ template, title, description });
    }

    // Auth check: user can only create tasks for themselves
    if (authUserId && user_id !== authUserId) {
      return new Response(JSON.stringify({ error: 'You are not authorized to create tasks for this user.' }), { status: 403 });
    }

    // Validate employee exists
    const employeeResponse = await supabaseFetch(
      `ai_employees?id=eq.${encodeURIComponent(employee_id)}&select=id&limit=1`,
      { method: 'GET', headers: getSupabaseHeaders() }
    );
    const employee = await employeeResponse.json();
    if (!employeeResponse.ok || !Array.isArray(employee) || employee.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid employee_id' }), { status: 400 });
    }

    // Validate priority and run_mode
    const validPriorities = ['low', 'medium', 'high'];
    const validRunModes = ['auto', 'manual'];
    if (!validPriorities.includes(priority)) {
      return new Response(JSON.stringify({ error: 'Invalid priority value' }), { status: 400 });
    }
    if (!validRunModes.includes(run_mode)) {
      return new Response(JSON.stringify({ error: 'Invalid run_mode value' }), { status: 400 });
    }

    // Insert task
    const insertResponse = await supabaseFetch('tasks?select=*', {
      method: 'POST',
      headers: getSupabaseHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify([
        {
          user_id,
          employee_id,
          title: String(title).trim(),
          description: String(description).trim(),
          priority,
          run_mode,
        },
      ]),
    });

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();
      console.error('Insert task error:', errorText);
      return new Response(JSON.stringify({ error: errorText || 'Insert failed' }), { status: 500 });
    }

    const data = await insertResponse.json();
    const task = Array.isArray(data) ? data[0] : data;

    try {
      await supabaseFetch('task_logs', {
        method: 'POST',
        headers: getSupabaseHeaders(),
        body: JSON.stringify([
          {
            task_id: task.id,
            message: 'Task created',
            meta: { employee_id: task.employee_id, run_mode: task.run_mode },
          },
        ]),
      });
    } catch (logError) {
      console.warn('Failed to write task log:', logError);
    }

    return new Response(JSON.stringify({ task }), { status: 200 });
  } catch (err) {
    console.error('API /tasks error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
