import fetch from 'node-fetch';
import { supabaseAdmin } from '../server/supabase.js';

// Configuration
const POLL_INTERVAL = parseInt(process.env.WORKER_POLL_INTERVAL || '5000', 10);
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

async function processTask(task) {
  console.log('Processing task', task.id, 'employee', task.employee_id);

  // mark processing
  await supabaseAdmin.from('tasks').update({ status: 'processing' }).eq('id', task.id);
  await supabaseAdmin.from('task_logs').insert({ task_id: task.id, message: 'Worker started processing task' });

  try {
    // Simple prompt mapping based on employee role
    const { data: employee } = await supabaseAdmin.from('ai_employees').select('*').eq('id', task.employee_id).single();
    const role = employee?.role || 'Assistant';

    let result;

    if (OPENAI_KEY) {
      // Call OpenAI
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
      // Mock result for local testing
      result = { provider: 'mock', text: `Mock ${role} result for task: ${task.title}` };
    }

    await supabaseAdmin.from('tasks').update({ status: 'done', result }).eq('id', task.id);
    await supabaseAdmin.from('task_logs').insert({ task_id: task.id, message: 'Worker completed task', meta: result });

    console.log('Completed task', task.id);
  } catch (err) {
    console.error('Worker error for task', task.id, err);
    await supabaseAdmin.from('tasks').update({ status: 'failed' }).eq('id', task.id);
    await supabaseAdmin.from('task_logs').insert({ task_id: task.id, message: 'Worker failed', meta: { error: String(err) } });
  }
}

async function poll() {
  try {
    const { data: tasks } = await supabaseAdmin
      .from('tasks')
      .select('*')
      .eq('status', 'pending')
      .eq('run_mode', 'auto')
      .limit(5)
      .order('created_at', { ascending: true });

    if (tasks && tasks.length) {
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

        await processTask(task);
      }
    }
  } catch (err) {
    console.error('Worker poll error', err);
  }
}

(async function main() {
  console.log('Worker started. Polling every', POLL_INTERVAL, 'ms');
  while (true) {
    await poll();
    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }
})();
