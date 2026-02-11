-- Migration: Add optional company field to profiles
alter table if exists profiles add column if not exists company text;
