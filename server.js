import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));

app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  console.log('📊 Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Body keys:', Object.keys(req.body));
  }
  next();
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'Server is working', timestamp: new Date().toISOString() });
});

// Proxy endpoint for Anthropic API
app.post('/api/anthropic', async (req, res) => {
  try {
    console.log('🚀 Server: Proxying request to Anthropic API');
    
    // Get API key from environment (try both VITE_ prefixed and non-prefixed)
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;
    
    console.log('🔑 API Key exists:', !!apiKey);
    console.log('🔑 API Key starts with sk-ant:', apiKey?.startsWith('sk-ant-'));
    
    if (!apiKey) {
      console.error('❌ No API key found in environment variables');
      return res.status(401).json({ error: 'API key not configured' });
    }
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ Anthropic API Error:', response.status, data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Server: Successfully got response from Anthropic');
    res.json(data);
  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
