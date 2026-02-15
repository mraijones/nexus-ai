# 🚀 NEXUS AI Deployment Guide

## From Development to Production

This guide walks you through deploying NEXUS AI to production, step by step.

---

## 📋 Prerequisites

Before you start, make sure you have:

- [x] NEXUS AI code ready (you have this!)
- [ ] Supabase account (free tier works)
- [ ] Stripe account (free, no monthly fee)
- [ ] Vercel account (free tier works)
- [ ] GitHub repository (you have this!)
- [ ] Domain name (optional, Vercel gives you one free)

**Time Required:** 1-2 hours for MVP, 3-4 hours for full setup

---

## 🗄️ Part 1: Supabase Production Setup (30 minutes)

### Step 1: Create Production Project

1. **Go to** https://supabase.com
2. **Sign in** or create account
3. **Click** "New Project"
4. **Fill in:**
   - Name: `nexus-ai-production`
   - Database Password: (generate strong password, save it!)
   - Region: Choose closest to your users
   - Pricing: Free tier is fine to start
5. **Click** "Create new project"
6. **Wait** ~2 minutes for provisioning

### Step 2: Get Your Production Credentials

1. **Go to** Project Settings → API
2. **Copy** these values to a safe place:
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGc...
   service_role key: eyJhbGc... (keep this secret!)
   ```

### Step 3: Run Database Migrations

**Option A: Using Supabase CLI (Recommended)**

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

**Option B: Using SQL Editor**

1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/migrations/004_hire_fire_subscription_system.sql`
3. Copy the entire contents
4. Paste into SQL Editor
5. Click "Run"
6. Verify: "Success. No rows returned."

### Step 4: Configure Row Level Security (RLS)

**Why:** Protect user data so people can only see their own stuff

**How:**
1. Go to Supabase Dashboard → Authentication → Policies
2. For `hired_employees` table:
   ```sql
   -- Users can only see their own hired employees
   CREATE POLICY "Users can view own employees"
   ON hired_employees FOR SELECT
   USING (auth.uid() = user_id);
   
   -- Users can only insert their own hires
   CREATE POLICY "Users can hire employees"
   ON hired_employees FOR INSERT
   WITH CHECK (auth.uid() = user_id);
   ```

3. For `subscription_events` table:
   ```sql
   -- Users can only see their own subscriptions
   CREATE POLICY "Users can view own subscriptions"
   ON subscription_events FOR SELECT
   USING (auth.uid() = user_id);
   ```

### Step 5: Configure Authentication

1. **Go to** Authentication → Providers
2. **Enable** Email (already on by default)
3. **Optional:** Enable Google, GitHub, etc.
4. **Configure** Email Templates:
   - Go to Authentication → Email Templates
   - Customize "Confirm Signup" email
   - Customize "Magic Link" email
5. **Set** Site URL:
   - Go to Authentication → URL Configuration
   - Site URL: `https://yourdomain.vercel.app` (update after Vercel deployment)
   - Redirect URLs: Add your Vercel URL

### Step 6: Test Database Connection

```bash
# In your project
npm run dev

# Try to connect to Supabase
# Check browser console for connection errors
```

**✅ Checkpoint:** Supabase production database is ready!

---

## 💳 Part 2: Stripe Live Mode Setup (20 minutes)

### Step 1: Activate Your Stripe Account

1. **Go to** https://dashboard.stripe.com
2. **Sign in** or create account
3. **Complete** business verification (required for live mode)
   - Business info
   - Banking details (for payouts)
   - Identity verification
   - This can take a few hours for approval

### Step 2: Get Live API Keys

1. **Toggle** from "Test mode" to "Live mode" (top right)
2. **Go to** Developers → API keys
3. **Copy** these keys to a safe place:
   ```
   Publishable key: pk_live_xxxxx (safe to expose)
   Secret key: sk_live_xxxxx (keep secret!)
   ```

### Step 3: Create Live Products

1. **Go to** Products → Add Product
2. **Create** products for each tier:

**Tier 1 Product:**
- Name: `NEXUS AI - Tier 1 Employee`
- Description: `Entry-level AI employee subscription`
- Pricing: `$150-$300/month` (recurring)

**Tier 2 Product:**
- Name: `NEXUS AI - Tier 2 Employee`
- Description: `Professional AI employee subscription`
- Pricing: `$350-$600/month` (recurring)

**Tier 3 Product:**
- Name: `NEXUS AI - Tier 3 Employee`
- Description: `Expert AI employee subscription`
- Pricing: `$740-$980/month` (recurring)

**Tier 4 Product:**
- Name: `NEXUS AI - Tier 4 Employee`
- Description: `Executive AI employee subscription`
- Pricing: `$1,299/month` (recurring)

3. **Save** each Product ID - you'll need these

### Step 4: Create Live Webhook

1. **Go to** Developers → Webhooks
2. **Click** "Add endpoint"
3. **Endpoint URL:** `https://yourdomain.vercel.app/api/webhooks/stripe`
   (Update this after Vercel deployment)
4. **Listen to events:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. **Click** "Add endpoint"
6. **Copy** Signing secret: `whsec_xxxxx`

### Step 5: Test Payments

**Important:** Use a real card in live mode!

1. Visit your live site
2. Try to hire an employee
3. Use your real credit card
4. Complete the payment
5. Verify in Stripe Dashboard:
   - Customer created
   - Subscription active
   - Payment successful

**Then immediately cancel the test subscription!**

**✅ Checkpoint:** Stripe live mode is ready!

---

## ☁️ Part 3: Deploy to Vercel (15 minutes)

### Step 1: Prepare Your Repository

```bash
# Make sure everything is committed
git status

# If there are changes, commit them
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. **Go to** https://vercel.com
2. **Sign in** with GitHub
3. **Click** "Add New Project"
4. **Import** your `nexus-ai` repository
5. **Click** "Import"

### Step 3: Configure Project Settings

**Framework Preset:** Vite
**Root Directory:** ./
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Step 4: Add Environment Variables

**Critical:** Add ALL of these in Vercel

```bash
# Supabase (from Part 1)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Stripe (from Part 2)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# OpenAI (optional, for AI features)
OPENAI_API_KEY=sk-xxxxx
```

**How to add:**
1. Click "Environment Variables"
2. Add each variable name and value
3. Select all environments (Production, Preview, Development)
4. Click "Add"

### Step 5: Deploy!

1. **Click** "Deploy"
2. **Wait** ~2 minutes for build
3. **Watch** the build logs
4. **Get** your URL: `https://nexus-ai-xxxxx.vercel.app`

### Step 6: Update Webhook URL

1. **Go back to** Stripe Dashboard → Webhooks
2. **Edit** your webhook endpoint
3. **Update** URL to: `https://nexus-ai-xxxxx.vercel.app/api/webhooks/stripe`
4. **Save**

### Step 7: Update Supabase URLs

1. **Go to** Supabase Dashboard → Authentication → URL Configuration
2. **Update** Site URL: `https://nexus-ai-xxxxx.vercel.app`
3. **Add** Redirect URL: `https://nexus-ai-xxxxx.vercel.app/**`
4. **Save**

**✅ Checkpoint:** Your app is LIVE on the internet!

---

## 🌐 Part 4: Custom Domain (Optional, 10 minutes)

### If You Have a Domain

1. **Go to** Vercel Project → Settings → Domains
2. **Add** your domain: `nexusai.com`
3. **Add** DNS records (Vercel shows you what to add):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **Wait** for DNS propagation (5-30 minutes)
5. **Update** Stripe webhook URL again with new domain
6. **Update** Supabase URLs again with new domain

### If You Don't Have a Domain

- Vercel gives you `nexus-ai-xxxxx.vercel.app` for free
- It works perfectly!
- Buy a domain later if you want

---

## ✅ Part 5: Verify Everything Works

### Test the Full User Journey

1. **Visit** your live site
2. **Browse** employees
3. **Click** "Hire Now" on an employee
4. **Complete** payment with real card
5. **Verify** success message
6. **Check** My Business dashboard
7. **See** hired employee listed
8. **Check** countdown timer shows

### Verify Backend

1. **Check Supabase:**
   - Go to Table Editor
   - Open `hired_employees` table
   - See your test hire record

2. **Check Stripe:**
   - Go to Customers
   - See your test customer
   - Go to Subscriptions
   - See active subscription

3. **Check Webhook:**
   - Go to Webhooks
   - Click on your endpoint
   - See successful events (200 status)

### Test Mobile

1. Open site on phone
2. Verify responsive design works
3. Test user flow on mobile

**✅ Checkpoint:** Everything is working!

---

## 🎉 Part 6: Launch Checklist

Before announcing your launch:

### Technical
- [ ] All pages load without errors
- [ ] All buttons and links work
- [ ] Forms submit successfully
- [ ] Payments process correctly
- [ ] Database records save properly
- [ ] Webhooks receive events
- [ ] Mobile version works

### Content
- [ ] All text is correct (no typos)
- [ ] All images load
- [ ] Pricing is correct
- [ ] FAQ is accurate
- [ ] Terms of Service exist
- [ ] Privacy Policy exists
- [ ] Contact information is correct

### Business
- [ ] Stripe account fully activated
- [ ] Bank account connected for payouts
- [ ] Tax information submitted
- [ ] Business entity registered (if required)
- [ ] Liability insurance (optional but smart)

### Marketing
- [ ] Social media accounts created
- [ ] Launch announcement prepared
- [ ] Email to network drafted
- [ ] Press release ready (optional)
- [ ] Product Hunt submission planned (optional)

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Problem:** `npm run build` fails

**Solutions:**
1. Check build logs for specific error
2. Test `npm run build` locally
3. Fix TypeScript errors
4. Make sure all dependencies are in `package.json`

### Webhook Not Receiving Events

**Problem:** Stripe sends events but they're not processed

**Solutions:**
1. Check webhook URL is correct
2. Check webhook secret is correct in environment variables
3. Check Vercel function logs
4. Test with Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:5173/api/webhooks/stripe
   ```

### Database Connection Fails

**Problem:** Can't connect to Supabase

**Solutions:**
1. Check URL and keys are correct
2. Check RLS policies allow access
3. Check API key permissions
4. Test connection in Supabase SQL editor

### Payments Don't Work

**Problem:** Checkout fails or doesn't redirect

**Solutions:**
1. Check Stripe keys are live keys (not test)
2. Check webhook is registered
3. Check webhook signing secret is correct
4. Test with Stripe test cards first
5. Check browser console for errors

---

## 📊 Monitoring & Maintenance

### What to Check Daily

1. **Vercel Dashboard:**
   - Check for errors
   - Monitor usage
   - Review logs

2. **Stripe Dashboard:**
   - Check for failed payments
   - Review successful subscriptions
   - Monitor dispute/chargebacks

3. **Supabase Dashboard:**
   - Check database size
   - Review auth activity
   - Monitor API usage

### Set Up Alerts

1. **Vercel:**
   - Enable deployment notifications
   - Set up error alerts

2. **Stripe:**
   - Enable email notifications for:
     - Failed payments
     - Disputes
     - Account issues

3. **Supabase:**
   - Enable database size alerts
   - Enable auth rate limit alerts

---

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit `.env` to git
- ✅ Keep secret keys secret
- ✅ Use different keys for dev/prod
- ✅ Rotate keys periodically

### Stripe
- ✅ Always verify webhook signatures
- ✅ Never expose secret keys
- ✅ Use Stripe's test mode for development
- ✅ Enable 3D Secure for payments

### Supabase
- ✅ Always use RLS policies
- ✅ Never use service_role key in frontend
- ✅ Validate all user inputs
- ✅ Use proper authentication

---

## 📈 Scaling Considerations

### When You Grow

**Database:**
- Supabase free tier: 500MB, 50MB storage
- Upgrade to Pro when you hit limits
- Consider database indexes for performance

**Payments:**
- Stripe has no monthly fees
- Pay only per transaction (2.9% + 30¢)
- Volume discounts available at scale

**Hosting:**
- Vercel free tier: 100GB bandwidth
- Upgrade to Pro when you need more
- Consider CDN for static assets

---

## 🎯 Quick Reference

### Deployment Checklist
```
[ ] Part 1: Supabase Production (30m)
[ ] Part 2: Stripe Live Mode (20m)
[ ] Part 3: Deploy to Vercel (15m)
[ ] Part 4: Custom Domain (10m, optional)
[ ] Part 5: Verify Everything (15m)
[ ] Part 6: Launch! (announce it!)
```

### Key URLs to Bookmark
- Production site: https://nexus-ai-xxxxx.vercel.app
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com
- Stripe Dashboard: https://dashboard.stripe.com

### Emergency Contacts
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Stripe Support: https://support.stripe.com

---

## 🎉 You're Live!

Congratulations! Your NEXUS AI platform is now:
- ✅ Live on the internet
- ✅ Accepting real payments
- ✅ Ready for customers
- ✅ Generating revenue

### What to Do Next

1. **Test everything one more time**
2. **Make your first real hire** (then cancel it)
3. **Announce your launch** on social media
4. **Tell your network** about NEXUS AI
5. **Get your first customer!** 🎊

---

**You did it! Welcome to the world of SaaS! 🚀**

*Having issues? Check `DEPLOYMENT_TROUBLESHOOTING.md`*
*Ready to launch? Check `PRODUCTION_CHECKLIST.md`*
