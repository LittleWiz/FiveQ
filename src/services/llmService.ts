// LLM Integration Service for generating questions
import { MCPQuestion } from './mcpService';
import { createPrompt } from '../config/questionConfig';

interface LLMConfig {
  apiKey?: string;
  model?: string;
  maxTokens?: number;
}

class LLMService {
  private config: LLMConfig;

  constructor(config: LLMConfig = {}) {
    this.config = {
      model: 'claude-3-haiku-20240307',
      maxTokens: 1000,
      ...config
    };
  }

  async generateQuestions(count: number = 10): Promise<MCPQuestion[]> {
    // Check if we have an API key from environment
    const apiKey = (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || this.config.apiKey;
    
    console.log('🔍 LLM Service Debug:');
    console.log('- API Key exists:', !!apiKey);
    console.log('- API Key starts with sk-ant:', apiKey?.startsWith('sk-ant-'));
    console.log('- Questions requested:', count);
    
    if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
      console.log('❌ No valid API key found, using enhanced mock questions');
      return this.generateEnhancedMockQuestions(count);
    }

    try {
      console.log('🚀 Attempting to call Anthropic API...');
      return await this.callAnthropicAPI(apiKey, count);
    } catch (error) {
      console.error('❌ LLM API call failed:', error);
      console.log('🔄 Falling back to enhanced mock questions');
      return this.generateEnhancedMockQuestions(count);
    }
  }

  private async callAnthropicAPI(apiKey: string, count: number): Promise<MCPQuestion[]> {
    // Use the configurable prompt
    const prompt = createPrompt(count);
    const backendUrl = 'http://localhost:3001/api/anthropic';

    // Try backend server first
    try {
      console.log('� Trying backend server at localhost:3001...');
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Got response from backend server');
        
        const questionText = data.content[0].text;
        console.log('📝 Raw API Response from backend:', questionText);
        
        const parsedQuestions = this.parseQuestionsFromText(questionText);
        console.log('🎯 Parsed Questions from backend:', parsedQuestions.length, 'questions generated');
        
        return parsedQuestions;
      } else {
        console.log('⚠️ Backend server returned error, trying direct API...');
      }
    } catch (error) {
      console.log('⚠️ Backend server not available, trying direct API...');
    }

    // Fallback to direct API (will likely fail due to CORS in browser)
    console.log('📡 Making direct API call to Anthropic...');
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    console.log('📊 API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Response received, parsing questions...');
    
    const questionText = data.content[0].text;
    console.log('📝 Raw API Response:', questionText);
    
    const parsedQuestions = this.parseQuestionsFromText(questionText);
    console.log('🎯 Parsed Questions:', parsedQuestions.length, 'questions generated');
    
    return parsedQuestions;
  }

  private parseQuestionsFromText(text: string): MCPQuestion[] {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const questions: MCPQuestion[] = [];

    lines.forEach((line, index) => {
      const cleanLine = line.replace(/^[-*•]\s*/, '').trim();
      if (cleanLine.toLowerCase().startsWith('name 3')) {
        questions.push({
          id: index + 1,
          text: cleanLine,
          category: this.categorizeQuestion(cleanLine)
        });
      }
    });

    // If we didn't get enough questions, fill with mock questions
    while (questions.length < 10) {
      const mockQuestion = this.generateEnhancedMockQuestions(1)[0];
      mockQuestion.id = questions.length + 1;
      questions.push(mockQuestion);
    }

    return questions.slice(0, 10);
  }

  private categorizeQuestion(questionText: string): string {
    const text = questionText.toLowerCase();
    
    if (text.includes('food') || text.includes('eat') || text.includes('cook') || text.includes('dessert')) {
      return 'Food & Dining';
    } else if (text.includes('travel') || text.includes('place') || text.includes('vacation') || text.includes('adventure')) {
      return 'Travel & Adventure';
    } else if (text.includes('music') || text.includes('song') || text.includes('movie') || text.includes('book')) {
      return 'Entertainment';
    } else if (text.includes('love') || text.includes('romantic') || text.includes('date') || text.includes('relationship')) {
      return 'Relationship';
    } else if (text.includes('dream') || text.includes('goal') || text.includes('future') || text.includes('want')) {
      return 'Dreams & Goals';
    } else if (text.includes('childhood') || text.includes('memory') || text.includes('past')) {
      return 'Memories';
    } else {
      return 'Personal';
    }
  }

  private generateEnhancedMockQuestions(count: number): MCPQuestion[] {
    const questionBank = [
      { text: "Name 3 favorite foods", category: "Food & Dining" },
      { text: "Name 3 places you want to travel", category: "Travel & Adventure" },
      { text: "Name 3 songs you both love", category: "Entertainment" },
      { text: "Name 3 funny habits", category: "Personal" },
      { text: "Name 3 movies to rewatch", category: "Entertainment" },
      { text: "Name 3 dream jobs", category: "Dreams & Goals" },
      { text: "Name 3 romantic date ideas", category: "Relationship" },
      { text: "Name 3 weekend activities", category: "Personal" },
      { text: "Name 3 favorite desserts", category: "Food & Dining" },
      { text: "Name 3 things you admire about each other", category: "Relationship" },
      { text: "Name 3 childhood memories", category: "Memories" },
      { text: "Name 3 goals for next year", category: "Dreams & Goals" },
      { text: "Name 3 favorite seasons and why", category: "Personal" },
      { text: "Name 3 skills you want to learn", category: "Dreams & Goals" },
      { text: "Name 3 books that changed your life", category: "Entertainment" },
      { text: "Name 3 perfect vacation activities", category: "Travel & Adventure" },
      { text: "Name 3 ways to show love", category: "Relationship" },
      { text: "Name 3 favorite family traditions", category: "Memories" },
      { text: "Name 3 things that make you laugh", category: "Personal" },
      { text: "Name 3 dream adventures", category: "Travel & Adventure" },
      { text: "Name 3 hobbies you'd like to try", category: "Personal" },
      { text: "Name 3 ways to relax", category: "Personal" },
      { text: "Name 3 favorite childhood games", category: "Memories" },
      { text: "Name 3 things you're grateful for", category: "Personal" },
      { text: "Name 3 perfect morning activities", category: "Personal" }
    ];

    // Shuffle and select random questions
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((q, index) => ({
      id: index + 1,
      text: q.text,
      category: q.category
    }));
  }
}

export const llmService = new LLMService();
