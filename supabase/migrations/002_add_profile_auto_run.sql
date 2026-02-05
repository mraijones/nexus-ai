-- Migration: Add auto_run_tasks to profiles
alter table if exists profiles add column if not exists auto_run_tasks boolean default true;
