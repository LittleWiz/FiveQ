import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { llmService } from './llmService';

export interface MCPQuestion {
  id: number;
  text: string;
  category?: string;
}

class MCPService {
  private client: Client | null = null;
  private isConnected = false;

  async connect() {
    try {
      // For now, we'll use a direct API approach since MCP server setup is complex
      // This is a placeholder for when you have an MCP server running
      this.isConnected = true;
      console.log('MCP Service initialized (using direct API mode)');
    } catch (error) {
      console.error('Failed to connect to MCP server:', error);
      throw error;
    }
  }

  async generateQuestions(count: number = 10): Promise<MCPQuestion[]> {
    if (!this.isConnected) {
      throw new Error('MCP Service not connected');
    }

    try {
      // For now, we'll use a direct API call
      // Replace this with actual MCP server call when available
      const response = await this.callLLMDirectly(count);
      return response;
    } catch (error) {
      console.error('Failed to generate questions:', error);
      // Fallback to mock data if LLM fails
      return this.getFallbackQuestions(count);
    }
  }

  private async callLLMDirectly(count: number): Promise<MCPQuestion[]> {
    // Use our LLM service to generate questions
    return await llmService.generateQuestions(count);
  }

  private getFallbackQuestions(count: number): MCPQuestion[] {
    const fallbackQuestions = [
      "Name 3 favorite foods",
      "Name 3 places you want to travel",
      "Name 3 songs you both love",
      "Name 3 funny habits",
      "Name 3 movies to rewatch",
      "Name 3 dream jobs",
      "Name 3 romantic date ideas",
      "Name 3 weekend activities",
      "Name 3 favorite desserts",
      "Name 3 things you admire about each other"
    ];

    return fallbackQuestions.slice(0, count).map((text, index) => ({
      id: index + 1,
      text,
      category: this.getRandomCategory()
    }));
  }

  private getRandomCategory(): string {
    const categories = ['Personal', 'Relationship', 'Dreams', 'Fun', 'Life'];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  disconnect() {
    this.isConnected = false;
    this.client = null;
  }
}

export const mcpService = new MCPService();
