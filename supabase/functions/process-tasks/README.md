Process Tasks Edge Function

How it works
- This Edge Function polls the `tasks` table for tasks with `status = 'pending'` and `run_mode = 'auto'`.
- For each task it locks it (update status to 'processing' where status='pending') then runs the assigned AI employee prompt via OpenAI (if `OPENAI_API_KEY` is set) or a mock result.
- It updates the task with the result and inserts a `task_logs` entry.

Deploy
1. Install and login to Supabase CLI: `npm i -g supabase && supabase login`
2. Deploy: `supabase functions deploy process-tasks --project-ref <your-project-ref>`
3. Optionally schedule: `supabase functions deploy process-tasks --project-ref <your-project-ref> --schedule "*/1 * * * *"` (every minute)

Environment variables (set in Supabase Dashboard -> Functions -> Environment Variables):
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- OPENAI_API_KEY (optional)
- OPENAI_MODEL (optional)

Testing
- You can call the function directly with curl (after deploy):
  curl -X POST https://<project>.functions.supabase.co/process-tasks
- To run a specific manual task, pass a task id:
  curl -X POST https://<project>.functions.supabase.co/process-tasks \
    -H "Content-Type: application/json" \
    -d '{"task_id":"<task-id>"}'

Notes
- Scheduling the function as a cron lets Supabase run it in background on a schedule without a long-running process.
- For heavy workloads, consider batching/parallelism and rate-limits for OpenAI calls.