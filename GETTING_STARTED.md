# Getting Started with NEXUS AI - Developer Guide

Welcome! This guide will walk you through setting up and running the NEXUS AI project on your local machine.

## Prerequisites

Before you start, make sure you have installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Git** - [Download here](https://git-scm.com/)

## Step 1: Open the Project in VS Code

1. Open VS Code
2. Click **File** → **Open Folder**
3. Navigate to where you cloned this repository
4. Click **Select Folder**

## Step 2: Install Dependencies

Open the integrated terminal in VS Code:
- **Windows/Linux**: Press `Ctrl + `` (backtick)
- **Mac**: Press `Cmd + `` (backtick)

Then run:

```bash
npm install
```

This will install all the required packages. It may take a few minutes.

## Step 3: Set Up Environment Variables

1. Look for the file `.env.example` in the root of the project
2. Create a NEW file called `.env` (copy from .env.example)
3. Fill in your actual values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key
STRIPE_SECRET_KEY=sk_test_your_secret_test_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Where to Get These Keys:

#### Supabase (Free to start):
1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to **Settings** → **API**
5. Copy your **Project URL** and **anon/public key**

#### Stripe (Test Mode - Free):
1. Go to [stripe.com](https://stripe.com)
2. Create a free account
3. Switch to **Test Mode** (toggle in top right)
4. Go to **Developers** → **API Keys**
5. Copy your **Publishable key** and **Secret key**

**Note**: Don't worry about the webhook secret for now - you can add it later when deploying.

## Step 4: Set Up the Database

1. Log into your Supabase dashboard
2. Click on **SQL Editor** (in the left sidebar)
3. Run each migration file in order:

Navigate to `supabase/migrations/` folder and run these SQL files in order:
- `001_initial_schema.sql`
- `002_add_analytics.sql`
- `003_add_subscriptions.sql`
- `004_hire_fire_subscription_system.sql`

For each file:
- Copy the contents
- Paste into the SQL Editor in Supabase
- Click **Run**

## Step 5: Start the Development Server

In your VS Code terminal, run:

```bash
npm run dev
```

You should see output like:
```
  VITE v7.2.4  ready in 543 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 6: Open the Application

1. Hold `Ctrl` (or `Cmd` on Mac) and click the `http://localhost:5173/` link in the terminal
2. OR manually open your browser and go to: `http://localhost:5173/`

## What You Should See

The application has several pages you can visit:

- **`/`** - Landing page with hero, features, 60 employees, pricing
- **`/directory`** - Employee directory with search and filters
- **`/auth`** - Login/signup page
- **`/my-business`** - Dashboard (requires login)

## Common Commands

Open your terminal in VS Code and use these commands:

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Check code for errors
```

## Project Structure

Here's what the main folders contain:

```
nexus-ai/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── EmployeeCard.tsx
│   │   ├── CountdownTimer.tsx
│   │   └── ParticleBackground.tsx
│   ├── pages/            # Main page components
│   │   ├── LandingPage.tsx
│   │   ├── EmployeeDirectory.tsx
│   │   └── MyBusinessNew.tsx
│   ├── data/             # Employee data
│   │   └── complete60Employees.ts
│   ├── lib/              # Utility functions
│   │   └── hireFireSystem.ts
│   └── App.tsx           # Main app with routing
├── supabase/
│   └── migrations/       # Database setup files
├── api/
│   └── webhooks/         # Stripe webhook handlers
└── public/               # Static assets
```

## Making Changes

### To Edit the Landing Page:
Open `src/pages/LandingPage.tsx`

### To Edit Employee Data:
Open `src/data/complete60Employees.ts`

### To Change Styling:
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`

### To Add a New Page:
1. Create file in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Port 5173 already in use
```bash
# Kill the process using the port, then restart
npm run dev
```

### Environment variables not loading
- Make sure your `.env` file is in the ROOT of the project
- Restart the dev server after changing `.env`
- Variables must start with `VITE_` to be accessible in the browser

### Database connection errors
- Double-check your Supabase URL and keys in `.env`
- Make sure you ran all migration files

## VS Code Extensions (Recommended)

Install these extensions for a better experience:

1. **ES7+ React/Redux/React-Native snippets** - Quick React snippets
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
3. **ESLint** - Code quality checking
4. **Prettier** - Code formatting
5. **TypeScript and JavaScript** - Better JS/TS support

To install:
1. Click the Extensions icon in VS Code (or press `Ctrl+Shift+X`)
2. Search for each extension
3. Click **Install**

## Next Steps

Now that you're set up, you can:

1. **Explore the code** - Start with `src/App.tsx` and `src/pages/LandingPage.tsx`
2. **Make changes** - Try changing some text or colors
3. **Test features** - Click around the site and see how it works
4. **Build features** - Add new components or pages

## Need Help?

- Check the `IMPLEMENTATION_SUMMARY.md` for feature documentation
- Look at existing components as examples
- The code has comments explaining key sections

## Quick Reference Card

```bash
# Install everything
npm install

# Start working
npm run dev

# Check your code
npm run lint

# Build for production
npm run build
```

**Environment files:**
- `.env.example` - Template (DON'T edit)
- `.env` - Your actual keys (CREATE this)

**Main files to start with:**
- `src/App.tsx` - Routing
- `src/pages/LandingPage.tsx` - Homepage
- `src/data/complete60Employees.ts` - Employee data

---

**You're all set! 🚀 Start the dev server and happy coding!**
