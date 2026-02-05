// Error Monitoring & Logging Setup

// Frontend (React):
// 1. Install Sentry: npm install @sentry/react @sentry/tracing
// 2. In src/main.tsx, add:
// import * as Sentry from '@sentry/react';
// Sentry.init({ dsn: 'YOUR_SENTRY_DSN', tracesSampleRate: 1.0 });

// Backend (API/worker):
// 1. Install Sentry: npm install @sentry/node
// 2. In your API/worker entry files, add:
// const Sentry = require('@sentry/node');
// Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });

// 3. Use Sentry.captureException(err) in catch blocks.

// Alternative: Use Vercel/Supabase built-in logging for serverless/Edge Functions.

// See https://docs.sentry.io/platforms/javascript/guides/react/ for full setup.
