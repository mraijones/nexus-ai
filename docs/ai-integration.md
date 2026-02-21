# AI Integration Guide

## Overview

Nexus AI now supports **real-time AI streaming** with three major providers:

- **OpenAI** (GPT-4, GPT-4o-mini)
- **Anthropic** (Claude 3.5 Sonnet)
- **Google Gemini** (Gemini 1.5 Flash)

## Quick Setup

### 1. Get an API Key

Choose at least one provider:

**OpenAI (Recommended)**
- Visit: https://platform.openai.com/api-keys
- Create new secret key
- Copy the key (starts with `sk-`)

**Anthropic Claude**
- Visit: https://console.anthropic.com/account/keys
- Create new API key
- Copy the key

**Google Gemini (Free tier available)**
- Visit: https://aistudio.google.com/app/apikey
- Create API key
- Copy the key

### 2. Add to `.env` File

Open or create `.env` in your project root:

```env
# Choose ONE or MORE providers:

# OpenAI
VITE_OPENAI_API_KEY=sk-your-key-here

# OR Anthropic
VITE_ANTHROPIC_API_KEY=your-key-here

# OR Google Gemini (free tier)
VITE_GEMINI_API_KEY=your-key-here
```

**Important:** Use `VITE_` prefix for frontend access!

### 3. Test the Integration

```bash
npm run dev
```

Navigate to: **http://localhost:5173/ai-playground**

## Features

### AI Playground (`/ai-playground`)

Interactive testing environment where you can:
- Select any AI employee
- Assign tasks in real-time
- Watch AI responses stream live in the terminal
- Test different employee roles and tiers

### AgentTerminal Component

Futuristic terminal UI with:
- Real-time text streaming
- Animated cursor
- Auto-scrolling output
- Cyberpunk aesthetic

### AI Service (`src/lib/aiService.ts`)

Unified API for all three providers:

```typescript
import { streamAIResponse, createEmployeeMessages } from '@/lib/aiService';

// Stream AI responses
for await (const chunk of streamAIResponse(messages)) {
  console.log(chunk.text);
}
```

## Usage Examples

### In a React Component

```tsx
import { streamAIResponse } from '@/lib/aiService';

const [output, setOutput] = useState('');

const runTask = async () => {
  const messages = [
    { role: 'system', content: 'You are a professional writer.' },
    { role: 'user', content: 'Write a blog post intro.' }
  ];

  for await (const chunk of streamAIResponse(messages)) {
    if (!chunk.done) {
      setOutput(prev => prev + chunk.text);
    }
  }
};
```

### With Employee Context

```tsx
import { createEmployeeMessages } from '@/lib/aiService';

const messages = createEmployeeMessages(
  'Aurora-7',
  'Strategic Operations Director',
  'Analyze Q4 revenue and provide recommendations'
);

for await (const chunk of streamAIResponse(messages)) {
  // Handle streaming...
}
```

## Provider Selection

The system automatically selects the first available provider:

1. **Google Gemini** (if `VITE_GEMINI_API_KEY` is set)
2. **Anthropic Claude** (if `VITE_ANTHROPIC_API_KEY` is set)
3. **OpenAI** (if `VITE_OPENAI_API_KEY` is set)

Override manually:

```typescript
streamAIResponse(messages, { provider: 'openai' });
```

## Integration Points

### Current Integration

✅ **Frontend streaming** - Working in AI Playground  
✅ **AgentTerminal component** - Live streaming UI  
✅ **Multi-provider support** - OpenAI, Anthropic, Gemini

### Ready to Connect

🔄 **Task execution** - Wire to `CreateTask` and `Task` pages  
🔄 **Supabase Edge Functions** - Update `process-tasks` function  
🔄 **Auto-run tasks** - Enable background AI processing

## Costs & Limits

### OpenAI
- GPT-4o-mini: ~$0.15 per 1M input tokens
- GPT-4: ~$30 per 1M input tokens

### Anthropic
- Claude 3.5 Sonnet: ~$3 per 1M tokens

### Google Gemini
- **Free tier**: 15 requests/minute
- Paid: ~$0.075 per 1M tokens

**Recommendation:** Start with Google Gemini (free) or GPT-4o-mini (cheapest).

## Security Notes

⚠️ **Frontend API Keys**

The current implementation uses `VITE_` environment variables, which means:
- API keys are bundled in your frontend code
- Keys are visible in browser DevTools
- **Only use for testing/demos**

### Production Security

For production, move AI calls to:
1. **Supabase Edge Functions** (recommended)
2. **Backend API routes** with server-side keys
3. **Proxy service** that validates user auth

Example structure:
```
Frontend → Supabase Function → AI Provider
        (no API key)      (has secure key)
```

## Troubleshooting

### "No AI API key configured"

- Check `.env` file has `VITE_OPENAI_API_KEY` (or other provider)
- Restart dev server: `npm run dev`
- Check browser console for actual env value

### "Failed to connect to AI service"

- Verify API key is valid
- Check you have credits/quota remaining
- Test key directly with provider's dashboard

### Streaming not working

- Make sure you're using modern browser (Chrome, Firefox, Edge)
- Check network tab - should see streaming response
- Try different provider

### Import errors

- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript: `npm run build`

## Next Steps

1. ✅ Test in AI Playground
2. 🔄 Wire to task creation flow
3. 🔄 Add to employee hire confirmation
4. 🔄 Connect to Supabase Edge Functions
5. 🔄 Add usage tracking/billing

## Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [AI Playground Route](/ai-playground)
