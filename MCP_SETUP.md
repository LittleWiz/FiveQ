# MCP and LLM Setup Guide for FiveQ

## Current Status ✅
Your application is now set up with MCP architecture and can integrate with LLM services! Currently running with enhanced mock questions, but ready for real LLM integration.

## Option 1: Use Anthropic Claude API (Recommended)

### Step 1: Get an Anthropic API Key
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or sign in
3. Go to "API Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

### Step 2: Configure Your API Key
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Step 3: Test LLM Integration
- Your app will now generate unique questions using Claude!
- Each time you click "Generate Next 10 Questions", it will create fresh, creative questions
- If the API fails, it gracefully falls back to enhanced mock questions

## Option 2: Set Up Full MCP Server (Advanced)

### What is MCP?
Model Context Protocol (MCP) is a standard for connecting AI models with external data sources and tools. It allows for more sophisticated integrations.

### MCP Server Setup
1. **Install MCP Server Dependencies**:
   ```bash
   npm install -g @modelcontextprotocol/cli
   ```

2. **Create MCP Server Configuration**:
   - This requires setting up a separate MCP server process
   - The server would handle question generation, user preferences, etc.
   - More complex but allows for advanced features like question history, user preferences, etc.

## Current Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   React App     │───▶│ MCP Service  │───▶│  LLM Service    │
│   (Frontend)    │    │   (Bridge)   │    │ (Claude API)    │
└─────────────────┘    └──────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────┐
                       │ Fallback     │
                       │ Questions    │
                       └──────────────┘
```

## Features Available Now

### ✅ Working Features:
- Enhanced question generation with 25+ unique questions
- Intelligent question categorization
- Graceful fallback if LLM service fails
- Random question selection for variety
- Professional error handling

### 🚀 With API Key:
- Real-time question generation using Claude
- Unique questions every time
- Natural language processing
- Contextual question categories

## Testing Your Setup

1. **Without API Key**: You'll see enhanced mock questions with better variety
2. **With API Key**: You'll get fresh, AI-generated questions each time

## Cost Considerations

- Anthropic Claude API costs approximately $0.003-0.015 per request
- Generating 10 questions costs roughly $0.01-0.05
- Very affordable for personal use
- You can set usage limits in the Anthropic console

## Troubleshooting

### Common Issues:
1. **API Key not working**: Make sure it's in `.env.local` and starts with `sk-ant-`
2. **CORS errors**: The app handles API calls server-side to avoid CORS
3. **Questions not changing**: Clear browser cache and restart dev server

### Check Integration Status:
- Open browser developer tools (F12)
- Look for console messages about MCP/LLM status
- "Enhanced mock questions" = no API key
- "LLM API call" messages = API integration working

## Next Steps

1. **Get API Key** → Add to `.env.local` → Restart server → Test!
2. **Customize Prompts** → Edit `llmService.ts` to change question styles
3. **Add Features** → Question history, user preferences, etc.

Your app is ready for real LLM integration! 🎉
