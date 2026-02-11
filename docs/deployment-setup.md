# Deployment Setup Guide

## Quick Start - Fix Deployment Issues

### The Problem
Your deployments are currently failing because required secrets are not configured in GitHub.

### The Solution (5 minutes)

#### Step 1: Get Supabase Credentials
1. **Access Token**:
   - Visit: https://supabase.com/dashboard/account/tokens
   - Click "Generate new token"
   - Give it a name (e.g., "GitHub Actions")
   - Copy the token immediately (you won't see it again!)

2. **Project Reference ID**:
   - Visit: https://supabase.com/dashboard
   - Select your project
   - Click Settings (gear icon) → General
   - Copy the "Reference ID" value

#### Step 2: Add to GitHub
1. Go to: https://github.com/mraijones/nexus-ai/settings/secrets/actions
2. Click "New repository secret"
3. Add first secret:
   ```
   Name: SUPABASE_ACCESS_TOKEN
   Value: [paste your access token]
   ```
4. Add second secret:
   ```
   Name: SUPABASE_PROJECT_REF
   Value: [paste your reference ID]
   ```

#### Step 3: Deploy
Push a commit to `main` branch or manually re-run the workflow:
- Go to: https://github.com/mraijones/nexus-ai/actions
- Select latest "Deploy Supabase Functions" run
- Click "Re-run jobs"

### What Gets Deployed
The workflow automatically deploys the Supabase Edge Function:
```
supabase/functions/process-tasks/
```

This runs as a serverless function in your Supabase project.

### Verification
After setup, check deployment status:
- ✅ Green checkmark = Success
- ❌ Red X = Check logs for errors

### Common Issues

**"flag needs an argument: --token"**
→ Secret `SUPABASE_ACCESS_TOKEN` is missing or empty. Add it in GitHub Settings.

**"invalid project ref"**
→ Secret `SUPABASE_PROJECT_REF` is incorrect. Verify the Reference ID from Supabase.

**"unauthorized"**
→ Access token is invalid or expired. Generate a new token.

### Need More Help?
See the comprehensive [Deployment Troubleshooting Guide](../DEPLOYMENT_TROUBLESHOOTING.md) for detailed information.

## Architecture

### Deployment Flow
```
GitHub Push (main branch)
    ↓
GitHub Actions Workflow Triggered
    ↓
1. Checkout Code
2. Setup Node.js v20
3. Login to Supabase CLI (uses SUPABASE_ACCESS_TOKEN)
4. Deploy process-tasks function (uses SUPABASE_PROJECT_REF)
    ↓
Function deployed to: https://[project-ref].supabase.co/functions/v1/process-tasks
```

### Security Best Practices
✅ Use GitHub Secrets for credentials (never commit them)  
✅ Rotate access tokens every 90 days  
✅ Use minimal token permissions  
✅ Monitor deployment logs for security issues  
✅ Review changes before merging to main  

### Local Development
Test functions locally before deploying:

```bash
# Install Supabase CLI
npm install -D supabase

# Login
npx supabase login

# Link project
npx supabase link --project-ref YOUR_PROJECT_REF

# Start local Supabase
npx supabase start

# Serve functions locally
npx supabase functions serve

# Test the function
curl http://localhost:54321/functions/v1/process-tasks

# Deploy when ready
npx supabase functions deploy process-tasks --project-ref YOUR_PROJECT_REF
```

### Monitoring & Logs
View function logs in Supabase Dashboard:
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Navigate to: Edge Functions → process-tasks
4. View invocations and logs

### Rollback
To rollback a deployment:
1. Find the working commit SHA in GitHub
2. Revert to that commit: `git revert <commit-sha>`
3. Push to main branch
4. Automatic deployment will restore previous version

---

**Last Updated**: 2026-02-09  
**Status**: Deployment blocked - awaiting secret configuration
