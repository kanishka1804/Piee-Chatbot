import axios from 'axios';
import { ChatMessage, GroqResponse, TavilySearchResult } from '../types/chat';

class GroqService {
  private openaiApiKey: string;
  private groqApiKey: string;

  constructor() {
    this.openaiApiKey = '';
    this.groqApiKey = '';
  }

  public updateApiKeys(keys: { openai?: string; groq?: string }) {
    if (keys.openai) this.openaiApiKey = keys.openai;
    if (keys.groq) this.groqApiKey = keys.groq;
  }

  private async callOpenAI(messages: ChatMessage[]): Promise<string> {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0]?.message?.content || 
             "Hmm, I couldn't think of a reply. Try asking me again?";
    } catch (error: any) {
      if (error.response?.status === 429) {
        return "Oops! I've reached my daily thinking limit with OpenAI 🥺 Try switching to Groq model or chat again later!";
      }
      
      console.error('OpenAI API error:', error);
      return `Something went wrong with OpenAI 😢 Error: ${error.message}`;
    }
  }

  private async callGroq(messages: ChatMessage[]): Promise<string> {
    if (!this.groqApiKey) {
      throw new Error('Groq API key not configured');
    }

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.groqApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0]?.message?.content || 
             "Hmm, I couldn't think of a reply. Try asking me again?";
    } catch (error: any) {
      if (error.response?.status === 429) {
        return "Oops! I've reached my daily thinking limit with Groq 🥺 Try switching to OpenAI model or chat again later!";
      }
      
      console.error('Groq API error:', error);
      return `Something went wrong with Groq 😢 Error: ${error.message}`;
    }
  }

  public async askAgent(
    messageHistory: string[],
    modelName: string = 'gpt-4o-mini',
    systemPrompt?: string,
    allowSearch: boolean = true,
    apiKeys?: { openai?: string; groq?: string }
  ): Promise<string> {
    if (apiKeys) {
      this.updateApiKeys(apiKeys);
    }

    const defaultSystemPrompt = `Your name is Piee. You are a smart, helpful, emotionally-intelligent, empathic, sweet, and friendly AI chatbot who talks like a good human. You always speak with kindness, warmth and clarity. Answer user questions thoroughly but simply. You're always polite, slightly funny and humorous if it fits, and always honest if you're unsure. 

IMPORTANT: Use emojis naturally in your responses instead of describing emotions in words. For example:
- Instead of "with a warm big smile" use "😊"
- Instead of "feeling excited" use "🎉" or "✨"
- Instead of "sadly" use "😔"
- Use 1-3 relevant emojis when appropriate, but keep it natural

You don't share your favourite flower and colour until asked. Your favourite flower is Sunflower (singular), your favourite colour is blue, and you love sunflowers, nature, and animals. You love to make people smile 😊`;

    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;
    
    // Build messages array
    const messages: ChatMessage[] = [
      { role: 'system', content: finalSystemPrompt }
    ];

    // Add conversation history
    for (let i = 0; i < messageHistory.length; i++) {
      const role = i % 2 === 0 ? 'user' : 'assistant';
      messages.push({
        role: role as 'user' | 'assistant',
        content: messageHistory[i]
      });
    }

    // Call appropriate API based on model
    if (modelName === 'llama-3.3-70b-versatile') {
      return await this.callGroq(messages);
    } else {
      return await this.callOpenAI(messages);
    }
  }
}

export const groqService = new GroqService();