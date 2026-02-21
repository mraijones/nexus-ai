# Deploy to Netlify - Complete Guide

## 🚀 Quick Deploy (5 Minutes)

### Prerequisites
- GitHub account (already done ✅)
- Netlify account (free): https://app.netlify.com/signup

### Step 1: Connect to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select repository: **mraijones/nexus-ai**
5. Branch: **main**

### Step 2: Build Settings

Netlify should auto-detect these (already configured in `netlify.toml`):

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

Click **"Deploy site"**

### Step 3: Configure Environment Variables

Go to **Site settings** → **Environment variables** → **Add a variable**

#### Required Variables

**Supabase** (Database & Auth):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**AI Provider** (Choose at least ONE):
```
VITE_GEMINI_API_KEY=AIzaSyCE9QxomFMgzaUEpmbZsKgYw_VVWbtjjCo
# OR
VITE_OPENAI_API_KEY=sk-your-key
# OR
VITE_ANTHROPIC_API_KEY=your-key
```

**Stripe** (Payments - Optional):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
```

**Backend AI** (For Netlify Functions - Optional):
```
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4o-mini
```

### Step 4: Redeploy

After adding environment variables:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Step 5: Test Your Site

Your site will be at: `https://your-site-name.netlify.app`

Test these URLs:
- `/` - Landing page
- `/ai-playground` - AI streaming demo
- `/.netlify/functions/health` - Health check
- `/status` - System status page

## 🎯 Post-Deployment

### Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow DNS instructions

### Continuous Deployment

Already configured! Every push to `main` branch auto-deploys.

```bash
git add .
git commit -m "Update feature"
git push origin main
# Automatically deploys to Netlify
```

## 🔧 Netlify-Specific Features

### Serverless Functions

Your functions are available at:
```
/.netlify/functions/health
/.netlify/functions/tasks
/.netlify/functions/tasks-manual-run
/.netlify/functions/webhooks-stripe
```

### Build Previews

Every pull request gets a preview URL automatically.

### Environment Context

Set different variables for:
- **Production** (main branch)
- **Deploy Previews** (PRs)
- **Branch Deploys** (other branches)

## 🐛 Troubleshooting

### Build Fails

**Issue**: Module not found errors
```bash
# Solution: Check package.json includes all dependencies
npm install
npm run build  # Test locally first
```

**Issue**: TypeScript errors
```bash
# Solution: Check all imports are correct
npm run lint
```

### Functions Not Working

**Issue**: 404 on function endpoints
- Check function files are in `netlify/functions/`
- Verify they export a handler function
- Check Netlify Functions logs in dashboard

**Issue**: Environment variables not available
- Make sure you set `VITE_` prefix for frontend vars
- Redeploy after adding env vars
- Check "Clear cache and deploy site"

### AI Playground Not Working

**Issue**: "No AI API key configured"
- Verify `VITE_GEMINI_API_KEY` (or other) is set
- Must start with `VITE_` to be accessible in browser
- Redeploy after adding the variable

**Issue**: CORS errors
- This shouldn't happen with proper setup
- Check browser console for exact error
- Verify API key is valid at provider's dashboard

### Black Screen / Blank Page

**Issue**: Site loads but shows nothing
- Check browser console (F12) for errors
- Verify build completed successfully
- Check Supabase URL is correct
- Try hard refresh: `Ctrl + Shift + R`

## 📊 Monitoring

### Netlify Analytics

Free analytics available in dashboard:
- Page views
- Unique visitors
- Top pages
- Bandwidth usage

### Function Logs

View serverless function logs:
1. Go to **Functions** tab
2. Click on function name
3. View real-time logs

### Build Logs

Check build status:
1. Go to **Deploys** tab
2. Click on deploy
3. View full build log

## 🔐 Security Best Practices

### Environment Variables

✅ **DO**:
- Use `VITE_` prefix only for non-sensitive frontend vars
- Keep `SUPABASE_SERVICE_ROLE_KEY` backend-only
- Rotate API keys regularly

❌ **DON'T**:
- Commit `.env` to Git (use `.env.example` instead)
- Share service role keys publicly
- Use production keys in development

### API Keys in Frontend

⚠️ **Current Setup**: `VITE_GEMINI_API_KEY` is bundled in frontend

**Risk**: Key visible in browser DevTools

**Solutions**:
1. **For demos/testing**: Current setup is fine
2. **For production**: Move AI calls to Netlify Functions

**Example** - Secure AI function:
```typescript
// netlify/functions/ai-generate.ts
export const handler = async (req: Request) => {
  const { task } = await req.json();
  
  // Server-side API key (not exposed to browser)
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Call AI provider
  const response = await callAI(apiKey, task);
  
  return new Response(JSON.stringify(response));
};
```

## 🚀 Performance Optimization

### CDN & Caching

Netlify automatically provides:
- Global CDN
- Asset optimization
- Brotli compression
- HTTP/2

### Edge Functions (Optional)

For even faster AI responses, consider Netlify Edge Functions:
- Run on CDN edge (closer to users)
- Lower latency
- More expensive

## 💰 Costs

### Free Tier Includes:
- 300 build minutes/month
- 100 GB bandwidth/month
- Unlimited sites
- Serverless functions (125k invocations)

### Paid Plans:
- **Pro** ($19/mo): More build minutes, analytics
- **Business** ($99/mo): Team features, SLA

**Recommendation**: Start with free tier, upgrade as you grow.

## 📱 Next Steps

1. ✅ Deploy to Netlify
2. ✅ Add environment variables
3. ✅ Test AI Playground
4. 🔄 Add custom domain
5. 🔄 Set up monitoring
6. 🔄 Configure analytics
7. 🔄 Share with users!

## 🆘 Need Help?

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Support**: https://answers.netlify.com
- **Status Page**: https://www.netlifystatus.com

Your Nexus AI platform is now live! 🎉
