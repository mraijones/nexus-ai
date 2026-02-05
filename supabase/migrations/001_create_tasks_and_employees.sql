-- Migration: Create tables for AI employees, tasks, and logs
-- Run with Supabase SQL editor or psql (see README)

-- Enable pgcrypto for gen_random_uuid()
create extension if not exists "pgcrypto";

-- Enums
create type task_status as enum ('pending','processing','done','failed','cancelled');
create type task_priority as enum ('low','medium','high');

-- AI Employees table
create table if not exists ai_employees (
  id text primary key,
  name text not null,
  role text not null,
  description text,
  image text,
  skills text[] default '{}',
  stats jsonb default '{}'::jsonb,
  color text,
  created_at timestamptz default now()
);

-- Tasks table
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  employee_id text references ai_employees(id) on delete set null,
  title text not null,
  description text,
  priority task_priority default 'medium',
  status task_status default 'pending',
  result jsonb,
  run_mode text default 'auto', -- 'auto' or 'manual'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to keep updated_at fresh
create or replace function trigger_set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end; $$ language plpgsql;

create trigger set_updated_at before update on tasks for each row execute function trigger_set_updated_at();

-- Task logs
create table if not exists task_logs (
  id bigserial primary key,
  task_id uuid references tasks(id) on delete cascade,
  message text,
  meta jsonb,
  created_at timestamptz default now()
);

-- Seed AI employees (id values match UI definitions)
insert into ai_employees (id, name, role, description, image, skills, stats, color)
values
('alex','Alex','Copywriter','AI-powered content creator specializing in compelling copy, blog posts, marketing materials, and brand storytelling. Alex crafts words that convert.','/alex-copywriter.png',ARRAY['Blog Writing','Ad Copy','Email Campaigns','SEO Content','Social Media'], '{"tasksCompleted":15420,"satisfaction":98,"responseTime":"< 1 min"}', 'from-blue-500 to-cyan-500'),
('bob','Bob','Designer','Creative AI designer with expertise in UI/UX, branding, illustrations, and visual identity. Bob brings your vision to life with stunning visuals.','/bob-designer.png',ARRAY['UI/UX Design','Brand Identity','Illustrations','Motion Graphics','Prototyping'], '{"tasksCompleted":8930,"satisfaction":97,"responseTime":"< 2 min"}', 'from-purple-500 to-pink-500'),
('charlie','Charlie','Developer','Full-stack AI developer proficient in multiple languages and frameworks. Charlie builds robust, scalable applications with clean code.','/charlie-developer.png',ARRAY['React/Next.js','Python','API Development','Database Design','DevOps'], '{"tasksCompleted":12350,"satisfaction":99,"responseTime":"< 30 sec"}', 'from-green-500 to-emerald-500'),
('david','David','Marketer','Strategic AI marketer who analyzes trends, optimizes campaigns, and drives growth. David knows how to reach your target audience.','/david-marketer.png',ARRAY['Campaign Management','Analytics','A/B Testing','Growth Strategy','CRM'], '{"tasksCompleted":18760,"satisfaction":96,"responseTime":"< 1 min"}', 'from-orange-500 to-red-500')
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  description = excluded.description,
  image = excluded.image,
  skills = excluded.skills,
  stats = excluded.stats,
  color = excluded.color;

-- Indexes
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_tasks_employee on tasks(employee_id);
create index if not exists idx_tasks_user on tasks(user_id);
