Integration Guide: Tasks + AI Worker

Overview:
- `supabase/migrations/001_create_tasks_and_employees.sql` creates schema and seeds employees.
- `api/tasks.ts` inserts tasks into the `tasks` table.
- `scripts/worker.js` polls for pending tasks and processes them (mock or OpenAI).

Environment variables (set in Vercel or local env):
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (server-only)
- OPENAI_API_KEY (optional)
- OPENAI_MODEL (optional, default gpt-4o-mini)

Local dev:
1. Run migrations in Supabase SQL editor.
2. Set env vars locally (use a .env file and a startup script that loads it for the worker).
3. Start the app: `npm run dev` and the worker: `npm run worker`.

Security notes:
- Never commit `SUPABASE_SERVICE_ROLE_KEY` or `OPENAI_API_KEY` to version control.
- Use Vercel / Supabase environment variables for production deployment.

Next improvements:
- Convert worker to Supabase Edge Function for tighter security.
- Add realtime updates with Supabase Realtime subscriptions.
- Add per-user default `run_mode` preference to their profile and expose in Settings UI.
