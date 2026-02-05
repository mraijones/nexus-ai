import { supabaseAdmin } from '../server/supabase.js';

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
  // Fallback: least busy employee (random for now, could query task counts)
  // Optionally, query the DB for least busy employee
  // For now, pick a random employee from DB
  const { data: employees, error } = await supabaseAdmin.from('ai_employees').select('id');
  if (employees && employees.length > 0) {
    return employees[Math.floor(Math.random() * employees.length)].id;
  }
  return 'alex';
}
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Vercel-style serverless function handler
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Authentication: require user to be logged in (e.g., via header or session)
    // Example: expecting user_id in a custom header for demo; replace with real auth in production
    const authUserId = req.headers['x-user-id'] || null;
    const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    let { user_id, employee_id, title, description, priority = 'medium', run_mode = 'auto', template } = body;

    // Validate required fields
    if (!user_id || !title || !description) {
      return res.status(400).json({ error: 'Missing required fields: user_id, title, description' });
    }

    // Auto-assign employee if not provided
    if (!employee_id) {
      employee_id = await autoAssignEmployee({ template, title, description });
    }

    // Auth check: user can only create tasks for themselves
    if (authUserId && user_id !== authUserId) {
      return res.status(403).json({ error: 'You are not authorized to create tasks for this user.' });
    }

    // Validate employee exists
    const { data: employee, error: employeeError } = await supabaseAdmin
      .from('ai_employees')
      .select('id')
      .eq('id', employee_id)
      .single();
    if (employeeError || !employee) {
      return res.status(400).json({ error: 'Invalid employee_id' });
    }

    // Validate priority and run_mode
    const validPriorities = ['low', 'medium', 'high'];
    const validRunModes = ['auto', 'manual'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority value' });
    }
    if (!validRunModes.includes(run_mode)) {
      return res.status(400).json({ error: 'Invalid run_mode value' });
    }

    // Insert task
    const { data, error } = await supabaseAdmin
      .from('tasks')
      .insert([
        {
          user_id,
          employee_id,
          title: String(title).trim(),
          description: String(description).trim(),
          priority,
          run_mode,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Insert task error:', error);
      return res.status(500).json({ error: error.message || 'Insert failed' });
    }

    return res.status(200).json({ task: data });
  } catch (err) {
    console.error('API /api/tasks error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
