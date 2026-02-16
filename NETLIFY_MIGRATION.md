# Migration: Vercel → Netlify Functions

**Status:** ✅ Complete - Ready for Netlify deployment

## ✅ What's Been Done

### 1. Folder Structure Created
- `netlify/functions/` directory created
- All serverless functions moved to Netlify format

### 2. Functions Migrated

| Function | Old Path | New Path | Status |
|----------|----------|----------|--------|
| Stripe Webhook | `/api/webhooks/stripe.ts` | `/.netlify/functions/webhooks-stripe.ts` | ✅ |
| Health Check | `/api/health.ts` | `/.netlify/functions/health.ts` | ✅ |
| Create Task | `/api/tasks.ts` | `/.netlify/functions/tasks.ts` | ✅ |
| Manual Run Task | `/api/tasks/manual-run.ts` | `/.netlify/functions/tasks-manual-run.ts` | ✅ |

### 3. Key Changes Made

**Webhook Handler (webhooks-stripe.ts):**
- Changed from `VercelRequest/VercelResponse` to `Request/Response` (Web API)
- Moved `new Stripe()` inside handler with env validation
- Disabled body parser (using `arrayBuffer()` instead)
- Added error guards for env variables
- All handler functions now receive `stripe` and `supabase` as parameters

**Other Functions:**
- Changed from Vercel request/response to standard Web API
- Updated JSON parsing using `req.json()` instead of `req.body`
- Updated header access using `req.headers.get()`
- All return `new Response()` instead of `res.status()`

### 4. Frontend Endpoints Updated

| Endpoint | Old URL | New URL |
|----------|---------|---------|
| Health Check | `/api/health` | `/.netlify/functions/health` |
| Create Task | `/api/tasks` | `/.netlify/functions/tasks` |
| Manual Run | `/api/tasks/manual-run` | `/.netlify/functions/tasks-manual-run` |

**Files Updated:**
- `src/pages/Status.tsx` - Health check endpoint
- `src/pages/Task.tsx` - Manual task run endpoint
- `src/pages/CreateTask.tsx` - Create task endpoint

### 5. Configuration File
- `netlify.toml` created with:
  ```
  [build]
    command = "npm run build"
    publish = "dist"

  [functions]
    directory = "netlify/functions"
  ```

## 🚀 Next Steps for Deployment

### 1. Connect Netlify Git
```bash
# Push to GitHub
git add .
git commit -m "Migrate from Vercel to Netlify functions"
git push origin main
```

### 2. Deploy on Netlify
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select `mraijones/nexus-ai` repository
5. Click "Deploy site"

### 3. Update Environment Variables
In Netlify Dashboard:
1. Go to "Site settings" → "Build & deploy" → "Environment"
2. Add all required variables:
   ```
   STRIPE_SECRET_KEY=sk_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=xxx
   VITE_STRIPE_PUBLISHABLE_KEY=pk_xxx
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxx
   VITE_STRIPE_STARTER_MONTHLY=price_xxx
   VITE_STRIPE_STARTER_YEARLY=price_xxx
   VITE_STRIPE_PROFESSIONAL_MONTHLY=price_xxx
   VITE_STRIPE_PROFESSIONAL_YEARLY=price_xxx
   VITE_STRIPE_ENTERPRISE_MONTHLY=price_xxx
   VITE_STRIPE_ENTERPRISE_YEARLY=price_xxx
   ```

### 4. Update Stripe Webhook
1. Go to https://dashboard.stripe.com → Developers → Webhooks
2. Delete old Vercel webhook (if exists)
3. Click "Add endpoint"
4. **Endpoint URL:** `https://your-netlify-site.netlify.app/.netlify/functions/webhooks-stripe`
5. **Events to listen:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Copy signing secret and add to Netlify env as `STRIPE_WEBHOOK_SECRET`

### 5. Test Functions
After deployment:
1. Health check: `https://your-site.netlify.app/.netlify/functions/health`
2. Create a task from dashboard
3. Trigger Stripe test webhook from Stripe Dashboard

## 📋 Checklist Before Going Live

- [ ] Git changes pushed
- [ ] Netlify site deployed
- [ ] All env variables added
- [ ] Stripe webhook updated
- [ ] Health check returns 200 OK
- [ ] Can create tasks in UI
- [ ] Can manually run tasks
- [ ] Stripe checkout creates subscription

## ⚠️ Important Notes

- **No API key in code:** Never hardcode secrets in functions
- **Environment variables:** Must be set in Netlify dashboard (not in `.env` file)
- **Stripe webhook:** Must update to new Netlify domain
- **Old `/api/` folder:** Can be deleted after confirming all functions work

## 🔧 Troubleshooting

**Functions return 404:**
- Ensure function files are `.ts` in `netlify/functions/`
- Wait for Netlify to rebuild (check "Deploys" tab)

**Stripe webhook failing:**
- Check signed secret is correct
- Verify Netlify endpoint URL is correct
- Check function logs in Netlify dashboard

**Env variables not found:**
- Rebuild site after adding variables
- Check variable names match exactly
