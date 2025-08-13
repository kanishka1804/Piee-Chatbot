# Piee - AI Chatbot with Groq Integration

A beautiful chatbot powered by fast AI models, with web search capabilities via Tavily.

## Features

- 🤖 **Multiple AI Models**: Choose between Llama 3.3 70B (Groq) and GPT-4o Mini (OpenAI)
- 🔍 **Web Search**: Real-time information via Tavily Search API
- 🌻 **Friendly Personality**: Meet Piee, your warm and helpful AI companion
- ⚡ **Fast Responses**: Powered by Groq's lightning-fast inference
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🔒 **Secure**: API keys stored in environment variables

## Setup

1. **Get API Keys**:
   - [Groq API Key](https://console.groq.com/keys) - For AI responses
   - [Tavily API Key](https://app.tavily.com/home) - For web search
   - [OpenAI API Key](https://platform.openai.com/api-keys) - For GPT-4 option

2. **Configure Environment**:
   Create a `.env` file in the project root:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_TAVILY_API_KEY=your_tavily_api_key_here
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Usage

- **Chat**: Simply type your message and press Enter
- **Model Selection**: Choose between Llama 3.3 70B or GPT-4o Mini
- **Web Search**: Toggle search to get current information
- **Personality**: Piee loves sunflowers, nature, and helping people!

## API Integration

This chatbot replicates the exact logic from the Python version:

- **Groq Integration**: Fast inference with Llama models
- **OpenAI Integration**: GPT-4o Mini for comparison
- **Tavily Search**: Automatic web search for current topics
- **Error Handling**: Graceful handling of rate limits and errors
- **Message History**: Maintains conversation context

## Technologies

- **Frontend**: React + TypeScript + Tailwind CSS
- **AI Models**: Groq (Llama 3.3 70B), OpenAI (GPT-4o Mini)
- **Search**: Tavily Search API
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Deployment

The app is ready for deployment to any static hosting service. Make sure to set your environment variables in your deployment platform.

---

Built with ❤️ and powered by cutting-edge AI technology.
