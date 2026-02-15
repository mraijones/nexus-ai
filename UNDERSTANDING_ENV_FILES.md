# Understanding Environment Variables (.env files)

## What is a `.env` file?

A `.env` file is like a **secret notebook** where you keep private information that your application needs to work, but you don't want to share publicly.

### Think of it like this:

Imagine you're building a house (your app). The `.env` file is where you store:
- 🔑 The keys to your doors (API keys)
- 📬 Your mailbox address (database URLs)
- 🔐 Your safe combination (secret keys)

You wouldn't write these on your house's blueprints that everyone can see, right? Same idea!

## Why Do We Need It?

### Problem Without .env:
If you put your passwords directly in your code:

```javascript
// ❌ BAD - Everyone can see this!
const password = "my-secret-123";
const database = "https://my-database.com";
```

When you share your code on GitHub, **everyone sees your passwords**. Bad people could:
- Delete your database 💥
- Steal your data 🕵️
- Charge your credit card 💳

### Solution With .env:
```javascript
// ✅ GOOD - Reads from .env file
const password = process.env.MY_SECRET_PASSWORD;
const database = process.env.DATABASE_URL;
```

The actual secrets stay in `.env` (which is NOT shared), while your code is safe to share.

## The Two Files You'll See

### 1. `.env.example` (Template - Safe to Share)
```env
# This shows WHAT you need, but not the actual secrets
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
```

Think of this as: "Here's what keys you need, but I'm not giving you mine!"

### 2. `.env` (Your Actual Secrets - NEVER Share)
```env
# This has your REAL secrets
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SECRET_KEY=sk_test_51Hab123XYZ...
```

This file is in `.gitignore` so it **never gets uploaded** to GitHub.

## Breaking Down Each Variable

Let's look at what each secret does:

### 🗄️ Database Secrets (Supabase)

```env
VITE_SUPABASE_URL=https://yourproject.supabase.co
```
**What it is:** The web address of your database
**Like:** Your database's home address
**Why you need it:** So your app knows WHERE to store and get data

```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**What it is:** A public key to read/write to your database
**Like:** A visitor pass to your building
**Why you need it:** Proves your app is allowed to access the database
**Note:** "Anon" means "anonymous" - it's safe-ish to use in browser code

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**What it is:** A SUPER powerful admin key
**Like:** The master key that opens everything
**Why you need it:** For admin tasks that need full access
**⚠️ WARNING:** This one is VERY secret - only use on server, never in browser!

### 💳 Payment Secrets (Stripe)

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```
**What it is:** Your public Stripe key (for the browser)
**Like:** Your store's public phone number
**Why you need it:** So customers can start payments
**Note:** "pk_test" means it's a TEST key - no real money!

```env
STRIPE_SECRET_KEY=sk_test_...
```
**What it is:** Your private Stripe key (for the server)
**Like:** Your store's bank account access
**Why you need it:** To actually process payments
**⚠️ WARNING:** Very secret! Never put in browser code!

### 🤖 AI Secrets (OpenAI - Optional)

```env
OPENAI_API_KEY=sk-...
```
**What it is:** Your OpenAI account key
**Why you need it:** To use ChatGPT/AI features
**Note:** This costs money per use

```env
OPENAI_MODEL=gpt-4o-mini
```
**What it is:** Which AI model to use
**Options:** 
- `gpt-4o-mini` - Cheaper, faster
- `gpt-4` - Smarter, more expensive

## How to Set This Up (Step by Step)

### Step 1: Copy the Template
In VS Code terminal:
```bash
# Windows/Linux
cp .env.example .env

# Or just manually:
# 1. Right-click .env.example
# 2. Click "Copy"
# 3. Right-click in folder
# 4. Click "Paste"
# 5. Rename to .env
```

### Step 2: Get Your Supabase Keys

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" (it's FREE!)
3. Create account (use Google to sign in quickly)
4. Click "New project"
5. Fill in:
   - **Name:** nexus-ai-dev
   - **Database Password:** Make up a strong password (save it!)
   - **Region:** Choose closest to you
   - Click "Create new project" (takes 2 minutes)
6. Once ready, click **Settings** (left sidebar)
7. Click **API**
8. You'll see:
   - **Project URL** → Copy this to `VITE_SUPABASE_URL`
   - **Project API keys** → Copy `anon public` to `VITE_SUPABASE_ANON_KEY`
   - **Project API keys** → Copy `service_role` to `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Get Your Stripe Keys

1. Go to [stripe.com](https://stripe.com)
2. Click "Start now" (it's FREE for testing!)
3. Create account
4. **IMPORTANT:** Toggle to "Test mode" (switch in top right - should be blue/purple)
5. Click **Developers** (top right)
6. Click **API keys**
7. You'll see:
   - **Publishable key** (starts with `pk_test_`) → Copy to `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (starts with `sk_test_`) → Click "Reveal", copy to `STRIPE_SECRET_KEY`

### Step 4: Save Your .env File

Your `.env` should now look like:

```env
VITE_SUPABASE_URL=https://abcxyz123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
SUPABASE_URL=https://abcxyz123.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51HaB...
STRIPE_SECRET_KEY=sk_test_51HaB...
```

**Note:** You can leave `OPENAI_API_KEY` empty for now if you're not using AI features.

## How Your App Uses These

### In Your Code:

```javascript
// Browser code (React components)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// VITE_ prefix means it's safe for browser

// Server code (API routes)
const secretKey = process.env.STRIPE_SECRET_KEY;
// No VITE_ prefix means server-only
```

### The Magic:
When you run `npm run dev`, Vite (your build tool):
1. Reads your `.env` file
2. Replaces `import.meta.env.VITE_XXX` with actual values
3. Keeps server-only secrets hidden from browser

## Common Questions

### Q: What if I don't have Stripe yet?
**A:** Leave those blank for now. You can add them later when you're ready to test payments.

### Q: What's the difference between VITE_SUPABASE_URL and SUPABASE_URL?
**A:** They're the same! Some parts of the app use one naming convention, others use another. Just put the same URL in both.

### Q: Can I share my `.env` file?
**A:** ❌ **NO! NEVER!** That's like sharing your bank password. Keep it secret!

### Q: What if I accidentally share it?
**A:** 
1. **Immediate:** Go to Supabase/Stripe and reset/regenerate all keys
2. Update your local `.env` with new keys
3. The old keys are now useless (safe!)

### Q: What's "test mode" in Stripe?
**A:** It means you use fake credit cards and no real money moves. Perfect for development!

Test card number: `4242 4242 4242 4242` (this is Stripe's test card)

### Q: Do I need ALL of these to start?
**A:** Minimum to get running:
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`
- ⭕ Stripe keys (optional until you test payments)
- ⭕ OpenAI key (optional if not using AI features)

## Security Tips

### ✅ DO:
- Keep `.env` in `.gitignore` (it already is!)
- Use different keys for development vs production
- Use Stripe TEST mode while developing
- Regenerate keys if you think they're compromised

### ❌ DON'T:
- Ever commit `.env` to GitHub
- Share your `.env` in screenshots
- Put secrets directly in code
- Use production keys while developing
- Share your service role key publicly

## Troubleshooting

### "Environment variable not found"
- Make sure `.env` exists (not just `.env.example`)
- File must be in ROOT of project (not in a subfolder)
- Variable names must match exactly (case-sensitive!)
- Restart dev server after changing `.env`

### "Invalid API key"
- Double-check you copied the full key (they're long!)
- Make sure no extra spaces before/after
- Check you're using TEST keys from Stripe (pk_test_, sk_test_)
- Verify keys are from the right project

### "Cannot connect to Supabase"
- Verify URL starts with `https://`
- Check URL ends with `.supabase.co`
- Make sure you copied from the right project

## Summary

**Environment variables** = Secret configuration your app needs
**`.env.example`** = Template showing what secrets you need (safe to share)
**`.env`** = Your actual secrets (NEVER share!)

Think of it as:
- 📋 `.env.example` = "Here's a blank form"
- 🔐 `.env` = "Here's the form filled out with my private info"

---

**You're now an expert on .env files! 🎓**

Next step: Follow the `GETTING_STARTED.md` guide to set up your keys and run the app!
