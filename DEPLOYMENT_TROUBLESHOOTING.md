# Deployment Troubleshooting Guide

## Current Deployment Issue

### Problem
**All deployments are failing with the error:**
```
flag needs an argument: --token
Try rerunning the command with --debug to troubleshoot the error.
Process completed with exit code 1.
```

### Root Cause
The GitHub Actions workflow `.github/workflows/deploy-supabase-functions.yml` is failing because the required GitHub Secrets are **not configured** or are **empty**.

The workflow expects these environment variables:
- `SUPABASE_ACCESS_TOKEN` - Currently empty/not set
- `SUPABASE_PROJECT_REF` - Currently empty/not set

### Evidence
From the GitHub Actions logs (Run #25 - most recent):
```
env:
  SUPABASE_ACCESS_TOKEN: 
  SUPABASE_PROJECT_REF: 
```

Both secrets are empty, causing the Supabase CLI `login` command to fail.

## How to Fix

### Step 1: Get Your Supabase Credentials

#### Get SUPABASE_ACCESS_TOKEN:
1. Go to https://supabase.com/dashboard
2. Navigate to your account settings (click your profile icon)
3. Go to "Access Tokens" section
4. Create a new access token or use an existing one
5. Copy the token value

#### Get SUPABASE_PROJECT_REF:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to "Project Settings" (gear icon)
4. Under "General Settings", find "Reference ID"
5. Copy the Reference ID (format: `xxxxxxxxxxxxx`)

### Step 2: Add Secrets to GitHub Repository

1. Go to your GitHub repository: https://github.com/mraijones/nexus-ai
2. Click on "Settings" tab
3. In the left sidebar, navigate to "Secrets and variables" > "Actions"
4. Click "New repository secret" button
5. Add the first secret:
   - Name: `SUPABASE_ACCESS_TOKEN`
   - Value: (paste your Supabase access token)
   - Click "Add secret"
6. Add the second secret:
   - Name: `SUPABASE_PROJECT_REF`
   - Value: (paste your Supabase project reference ID)
   - Click "Add secret"

### Step 3: Verify the Deployment

After adding the secrets:
1. Push a new commit to the `main` branch, OR
2. Re-run the failed workflow manually:
   - Go to "Actions" tab in GitHub
   - Select the "Deploy Supabase Functions" workflow
   - Click "Re-run jobs" on the most recent run

The deployment should now succeed.

## Deployment Workflow Details

The deployment workflow (`.github/workflows/deploy-supabase-functions.yml`) performs these steps:

1. **Checkout code** - Gets the latest code from the repository
2. **Setup Node.js** - Installs Node.js v20
3. **Login to Supabase** - Authenticates with Supabase using the access token
4. **Deploy Function** - Deploys the `process-tasks` function to your Supabase project

### Function Being Deployed
The workflow deploys the Supabase Edge Function located at:
```
supabase/functions/process-tasks/
```

This function is deployed to your Supabase project and can be invoked as an edge function.

## Monitoring Deployments

### Check Deployment Status:
1. Go to https://github.com/mraijones/nexus-ai/actions
2. Look for "Deploy Supabase Functions" workflow runs
3. Green checkmark = successful deployment
4. Red X = failed deployment (click to see logs)

### Recent Deployment History:
- **Run #25 (latest)**: FAILED - Missing secrets
- **Run #24**: FAILED - Missing secrets
- **Run #23**: FAILED - Missing secrets
- All 25 runs have failed due to missing/empty secrets

## Additional Resources

- [Supabase CLI Documentation](https://supabase.com/docs/reference/cli/about)
- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)

## Testing Locally

Before deploying, you can test the Supabase functions locally:

```bash
# Login to Supabase
npx supabase login

# Link to your project
npx supabase link --project-ref YOUR_PROJECT_REF

# Start local Supabase instance
npx supabase start

# Deploy functions locally for testing
npx supabase functions serve

# Deploy to production
npx supabase functions deploy process-tasks --project-ref YOUR_PROJECT_REF
```

## Security Notes

⚠️ **Important Security Reminders:**
- Never commit secrets directly to the repository
- Never log or expose secrets in console output
- Rotate access tokens regularly
- Use GitHub Secrets for all sensitive credentials
- Limit access token permissions to only what's needed
