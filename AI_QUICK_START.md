# 🤖 AI Integration - Quick Start

Your Nexus AI platform now has **LIVE AI INTEGRATION** with real-time streaming!

## ✅ What's Been Added

### 1. AI Service (`src/lib/aiService.ts`)
- Unified API for OpenAI, Anthropic Claude, and Google Gemini
- Real-time streaming support
- Automatic provider selection
- Employee context generation

### 2. Updated AgentTerminal Component
- Live streaming text animation
- Animated cursor during processing
- Auto-scrolling output
- Professional terminal UI

### 3. AI Playground (`/ai-playground`)
- Interactive testing environment
- Real-time AI task execution
- Employee selection
- Sample tasks and templates

### 4. Routes & Integration
- Added `/ai-playground` route to App.tsx
- Updated .env.example with AI provider keys
- Created comprehensive documentation

## 🚀 Get Started in 3 Steps

### Step 1: Get an API Key (Choose ONE)

**Option A: Google Gemini (FREE)**
```bash
# Visit: https://aistudio.google.com/app/apikey
# Create key and add to .env:
VITE_GEMINI_API_KEY=your-key-here
```

**Option B: OpenAI (Cheapest paid)**
```bash
# Visit: https://platform.openai.com/api-keys
# Create key and add to .env:
VITE_OPENAI_API_KEY=sk-your-key-here
```

**Option C: Anthropic Claude (Most capable)**
```bash
# Visit: https://console.anthropic.com/account/keys
# Create key and add to .env:
VITE_ANTHROPIC_API_KEY=your-key-here
```

### Step 2: Create/Update `.env` File

```bash
# Copy from example
cp .env.example .env

# Then edit .env and add your API key
# (Already has Supabase keys? Just add AI key at bottom)
```

### Step 3: Test It!

```bash
# Start dev server
npm run dev

# Open browser to:
# http://localhost:5173/ai-playground
```

## 🎮 Using the AI Playground

1. **Select an Employee** - Choose from different tiers/roles
2. **Enter a Task** - Or click a sample task template
3. **Execute** - Watch the AI stream response in real-time!

## 📝 Example Tasks to Try

- "Write a professional email to a client about our new features"
- "Create a social media post announcing our product launch"
- "Analyze Q4 revenue trends and provide recommendations"
- "Generate blog post ideas about AI in business"

## 💻 Use AI in Your Code

```tsx
import { streamAIResponse, createEmployeeMessages } from '@/lib/aiService';

// In your component
const runAITask = async () => {
  const messages = createEmployeeMessages(
    'Aurora-7',
    'Strategic Director',
    'Write an email to investors'
  );

  let fullText = '';
  for await (const chunk of streamAIResponse(messages)) {
    if (!chunk.done) {
      fullText += chunk.text;
      setOutput(fullText); // Update your state
    }
  }
};
```

## 🔗 What's Connected

✅ **Frontend**: AI service with streaming  
✅ **Component**: AgentTerminal with live updates  
✅ **Page**: AI Playground for testing  
✅ **Routing**: `/ai-playground` route added  

## 🔄 What's Next (Optional)

Want to connect AI to your existing task system?

1. **Update CreateTask page** - Stream AI responses when tasks are created
2. **Update Task page** - Show live AI processing
3. **Supabase Functions** - Move API calls server-side (more secure)
4. **Auto-run tasks** - Background AI processing

See `docs/ai-integration.md` for detailed integration guide.

## ⚠️ Important Notes

### Security
- Current setup uses frontend API keys (`VITE_*` prefix)
- **Keys are visible in browser** - OK for testing/demos
- For production: Move to Supabase Edge Functions or backend API

### Costs
- **Gemini**: FREE tier (15 req/min)
- **OpenAI GPT-4o-mini**: ~$0.15 per 1M tokens (very cheap)
- **Claude**: ~$3 per 1M tokens

Start with Gemini (free) or GPT-4o-mini (pennies per request).

## 🐛 Troubleshooting

**"No AI API key configured"**
- Make sure `.env` has `VITE_OPENAI_API_KEY` (or other provider)
- Restart dev server: `Ctrl+C` then `npm run dev`

**"Failed to connect"**
- Check API key is valid
- Verify you have credits/quota
- Check browser console for details

**Not seeing the playground?**
- Navigate to: `http://localhost:5173/ai-playground`
- Check browser console for errors
- Verify route was added to App.tsx

## 📚 Documentation

- **AI Integration Guide**: `docs/ai-integration.md`
- **Component Docs**: See `src/components/AgentTerminal.tsx`
- **Service API**: See `src/lib/aiService.ts`

## 🎉 You're Ready!

Your AI employees are now connected and ready to work. Test them in the playground, then integrate into your workflow.

**Next:** Visit `/ai-playground` and watch AI magic happen! ✨
