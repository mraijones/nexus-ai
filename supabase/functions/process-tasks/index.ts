// Supabase Edge Function (Deno) — process pending tasks (auto run)
// Deploy with `supabase functions deploy process-tasks --project-ref <project-ref>`

// @ts-nocheck
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = (globalThis as any).Deno?.env?.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = (globalThis as any).Deno?.env?.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const OPENAI_KEY = (globalThis as any).Deno?.env?.get('OPENAI_API_KEY') || '';
const OPENAI_MODEL = (globalThis as any).Deno?.env?.get('OPENAI_MODEL') || 'gpt-4o-mini';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
async function processTask(task: any) {
  await supabaseAdmin.from('tasks').update({ status: 'processing' }).eq('id', task.id);
  await supabaseAdmin.from('task_logs').insert({ task_id: task.id, message: 'Function started processing task' });

  try {
    const { data: employee } = await supabaseAdmin.from('ai_employees').select('*').eq('id', task.employee_id).single();
    const role = employee?.role || 'Assistant';

    let result: any;

    if (OPENAI_KEY) {
      const prompt = `You are an AI ${role}. Task: ${task.title}. Details: ${task.description}`;
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800,
        }),
      });

      const json = await resp.json();
      result = { provider: 'openai', raw: json, text: json?.choices?.[0]?.message?.content || '' };
    } else {
      result = { provider: 'mock', text: `Mock ${role} result for task: ${task.title}` };
    }

    await supabaseAdmin.from('tasks').update({ status: 'done', result }).eq('id', task.id);
    await supabaseAdmin.from('task_logs').insert({ task_id: task.id, message: 'Function completed task', meta: result });

    return { id: task.id, status: 'done' };
  } catch (err) {
    await supabaseAdmin.from('tasks').update({ status: 'failed' }).eq('id', task.id);
    await supabaseAdmin.from('task_logs').insert({ task_id: task.id, message: 'Function failed', meta: { error: String(err) } });
    return { id: task.id, status: 'failed', error: String(err) };
  }
}

serve(async (_req) => {
  try {
    // Fetch pending auto-run tasks
    const { data: tasks } = await supabaseAdmin
      .from('tasks')
      .select('*')
      .eq('status', 'pending')
      .eq('run_mode', 'auto')
      .order('created_at', { ascending: true })
      .limit(10);

    if (!tasks || tasks.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), { status: 200 });
    }

    const results = [];
    for (const task of tasks) {
      // Fetch user profile to check auto_run_tasks
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('auto_run_tasks')
        .eq('id', task.user_id)
        .single();

      if (profileError) {
        console.warn('Profile fetch error for user', task.user_id, profileError);
        continue;
      }
      if (!profile || profile.auto_run_tasks !== true) {
        // Skip this task, user does not allow auto-run
        continue;
      }

      // Basic lock: attempt to set status to 'processing' only if still 'pending'
      const { error: lockError } = await supabaseAdmin
        .from('tasks')
        .update({ status: 'processing' })
        .eq('id', task.id)
        .eq('status', 'pending');

      if (lockError) {
        console.warn('Lock error for task', task.id, lockError);
        continue;
      }
      results.push(await processTask(task));
    }

    return new Response(JSON.stringify({ processed: results.length, results }), { status: 200 });
  } catch (err) {
    console.error('Function error', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
