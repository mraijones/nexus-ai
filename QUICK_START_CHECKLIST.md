# Quick Start Checklist ✅

Follow this checklist to get NEXUS AI running on your machine:

## Setup Checklist

- [ ] **1. Open VS Code**
  - Open the project folder in VS Code
  
- [ ] **2. Open Terminal**
  - Press `Ctrl + `` (Windows/Linux) or `Cmd + `` (Mac)
  
- [ ] **3. Install Dependencies**
  ```bash
  npm install
  ```
  - Wait for it to finish (may take 2-3 minutes)
  
- [ ] **4. Create .env File**
  - Copy `.env.example` to `.env`
  - Fill in your Supabase credentials
  - Fill in your Stripe test keys
  
- [ ] **5. Set Up Supabase**
  - Go to [supabase.com](https://supabase.com)
  - Create a new project (free)
  - Copy your URL and anon key to `.env`
  
- [ ] **6. Run Database Migrations**
  - Open Supabase SQL Editor
  - Run each file in `supabase/migrations/` folder in order:
    - [ ] `001_initial_schema.sql`
    - [ ] `002_add_analytics.sql`
    - [ ] `003_add_subscriptions.sql`
    - [ ] `004_hire_fire_subscription_system.sql`
  
- [ ] **7. Get Stripe Test Keys**
  - Go to [stripe.com](https://stripe.com)
  - Create account (free)
  - Switch to **Test Mode**
  - Get your test API keys
  - Add to `.env`
  
- [ ] **8. Start Dev Server**
  ```bash
  npm run dev
  ```
  
- [ ] **9. Open Browser**
  - Go to `http://localhost:5173/`
  
- [ ] **10. Verify It Works**
  - [ ] Landing page loads
  - [ ] You see 60 employees
  - [ ] Can click "Browse Elite Employees"
  - [ ] Can navigate to different pages

## You're Done! 🎉

If all checkboxes are complete, you're ready to start developing!

## Common First Tasks

Once running, try these:

- [ ] Change the hero headline in `src/pages/LandingPage.tsx`
- [ ] Edit an employee's description in `src/data/complete60Employees.ts`
- [ ] Modify a color in `tailwind.config.js`
- [ ] Add a new FAQ item to the landing page
- [ ] Create a test account via `/auth`

## Stuck? Check These:

1. **Terminal shows errors?**
   - Run `npm install` again
   - Check that Node.js is v18+

2. **Page is blank?**
   - Check browser console (F12) for errors
   - Verify `.env` file exists and has correct values

3. **Can't connect to database?**
   - Verify Supabase keys in `.env`
   - Check you ran all migrations

4. **Port already in use?**
   - Kill the other process
   - Or change port in `vite.config.ts`

## Key Files Reference

📄 **Configuration:**
- `.env` - Your credentials
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration

📄 **Main Code:**
- `src/App.tsx` - Routing
- `src/pages/LandingPage.tsx` - Homepage
- `src/data/complete60Employees.ts` - All employees

📄 **Documentation:**
- `GETTING_STARTED.md` - Full setup guide (read this!)
- `IMPLEMENTATION_SUMMARY.md` - Feature overview
- `README.md` - Project description

---

**Remember:** Save this file and check off items as you complete them!
