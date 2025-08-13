export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface ChatConfig {
  model: 'gpt-4o-mini' | 'llama-3.3-70b-versatile';
  allowSearch: boolean;
  systemPrompt?: string;
}