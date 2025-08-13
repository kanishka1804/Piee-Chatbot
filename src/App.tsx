import React, { useState, useRef, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { ModelSelector } from './components/ModelSelector';
import { ApiKeyModal } from './components/ApiKeyModal';
import { groqService } from './services/groqService';
import { ChatConfig } from './types/chat';
import { Sun, MessageCircle, Settings } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  hasSearchResults?: boolean;
}

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showModelApiKeyModal, setShowModelApiKeyModal] = useState(false);
  const [pendingModel, setPendingModel] = useState<'gpt-4o-mini' | 'llama-3.3-70b-versatile' | null>(null);
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [groqApiKey, setGroqApiKey] = useState('');
  const [chatConfig, setChatConfig] = useState<ChatConfig>({
    model: 'llama-3.3-70b-versatile',
    allowSearch: true
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey! 🌻 I'm Piee — your smart and friendly AI companion. You can ask me anything! 😊",
      isUser: false,
      timestamp: new Date(),
      hasSearchResults: false
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Check if API keys are stored locally
    const storedOpenAIKey = localStorage.getItem('openai_api_key');
    const storedGroqKey = localStorage.getItem('groq_api_key');
    if (storedOpenAIKey) {
      setOpenaiApiKey(storedOpenAIKey);
    }
    if (storedGroqKey) {
      setGroqApiKey(storedGroqKey);
    }
    if (storedOpenAIKey || storedGroqKey) {
      groqService.updateApiKeys({ 
        openai: storedOpenAIKey || '', 
        groq: storedGroqKey || '' 
      });
    }
  }, []);

  const handleApiKeySubmit = (openaiKey: string, groqKey: string) => {
    setOpenaiApiKey(openaiKey);
    setGroqApiKey(groqKey);
    if (openaiKey) localStorage.setItem('openai_api_key', openaiKey);
    if (groqKey) localStorage.setItem('groq_api_key', groqKey);
    groqService.updateApiKeys({ openai: openaiKey, groq: groqKey });
    setShowApiKeyInput(false);
  };

  const handleModelChange = (newModel: 'gpt-4o-mini' | 'llama-3.3-70b-versatile') => {
    // Check if we have the required API key for the new model
    const needsOpenAI = newModel === 'gpt-4o-mini' && !openaiApiKey;
    const needsGroq = newModel === 'llama-3.3-70b-versatile' && !groqApiKey;
    
    if (needsOpenAI || needsGroq) {
      setPendingModel(newModel);
      setShowModelApiKeyModal(true);
    } else {
      setChatConfig(prev => ({ ...prev, model: newModel }));
    }
  };

  const handleModelApiKeySubmit = (openaiKey: string, groqKey: string) => {
    // Update the keys
    if (openaiKey && openaiKey !== openaiApiKey) {
      setOpenaiApiKey(openaiKey);
      localStorage.setItem('openai_api_key', openaiKey);
    }
    if (groqKey && groqKey !== groqApiKey) {
      setGroqApiKey(groqKey);
      localStorage.setItem('groq_api_key', groqKey);
    }
    
    // Update the service with new keys
    groqService.updateApiKeys({ 
      openai: openaiKey || openaiApiKey, 
      groq: groqKey || groqApiKey 
    });
    
    // Apply the pending model change
    if (pendingModel) {
      setChatConfig(prev => ({ ...prev, model: pendingModel }));
    }
    
    // Clean up
    setShowModelApiKeyModal(false);
    setPendingModel(null);
  };

  const handleModelApiKeyCancel = () => {
    setShowModelApiKeyModal(false);
    setPendingModel(null);
  };

  const canSendMessage = () => {
    if (chatConfig.model === 'gpt-4o-mini') {
      return !!openaiApiKey;
    } else {
      return !!groqApiKey;
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => {
      setShowLanding(false);
      if (!openaiApiKey && !groqApiKey) {
        setShowApiKeyInput(true);
      }
    }} />;
  }

  if (showApiKeyInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-yellow-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Settings className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-amber-800 mb-2">API Keys Setup</h2>
            <p className="text-amber-700 text-sm">
              Enter at least one API key to start chatting with Piee. You can switch between models anytime!
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                OpenAI API Key (for GPT-4o Mini)
              </label>
              <input
                type="password"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/90"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Groq API Key (for Llama 3.3 70B)
              </label>
              <input
                type="password"
                value={groqApiKey}
                onChange={(e) => setGroqApiKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/90"
              />
            </div>
            
            <button
              onClick={() => handleApiKeySubmit(openaiApiKey, groqApiKey)}
              disabled={!openaiApiKey.trim() && !groqApiKey.trim()}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                (openaiApiKey.trim() || groqApiKey.trim())
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Start Chatting 🌻
            </button>
            
            <p className="text-xs text-amber-600 text-center">
              Your API keys are stored locally and never shared. You need at least one key to continue.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSendMessage = async (content: string) => {
    if (!canSendMessage()) {
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
      hasSearchResults: false
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Update message history
    const newHistory = [...messageHistory, content];
    setMessageHistory(newHistory);

    // Simulate thinking time (1-3 seconds)
    const thinkingTime = Math.random() * 2000 + 1000;
    
    setTimeout(async () => {
      try {
        const response = await groqService.askAgent(
          newHistory,
          chatConfig.model,
          undefined,
          chatConfig.allowSearch,
          { openai: openaiApiKey, groq: groqApiKey }
        );
        
        const pieeMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          isUser: false,
          timestamp: new Date(),
          hasSearchResults: chatConfig.allowSearch
        };

        setMessages(prev => [...prev, pieeMessage]);
        setMessageHistory(prev => [...prev, response]);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Oops! Something went wrong on my side 😢 Could you try asking me again?",
          isUser: false,
          timestamp: new Date(),
          hasSearchResults: false
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, thinkingTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Sun className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Piee</h1>
              <p className="text-sm text-amber-700">
                Your friendly AI companion 🌻 • {chatConfig.model === 'llama-3.3-70b-versatile' ? 'Groq' : 'OpenAI'}
              </p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                Online
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Selector */}
      <ModelSelector config={chatConfig} onConfigChange={handleModelChange} />
      
      {/* API Key Modal for Model Switching */}
      {showModelApiKeyModal && (
        <ApiKeyModal
          isOpen={showModelApiKeyModal}
          onSubmit={handleModelApiKeySubmit}
          onCancel={handleModelApiKeyCancel}
          requiredModel={pendingModel}
          currentOpenAIKey={openaiApiKey}
          currentGroqKey={groqApiKey}
        />
      )}
      
      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-140px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto py-4">
            {messages.length === 1 && (
              <div className="text-center py-8 px-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <h2 className="text-lg font-semibold text-amber-800 mb-2">Welcome to chat with Piee!</h2>
                <p className="text-amber-700 max-w-md mx-auto text-sm leading-relaxed">
                  I'm powered by {chatConfig.model === 'llama-3.3-70b-versatile' ? "Groq's Llama 3.3 70B" : "OpenAI's GPT-4o Mini"} and ready to help you with anything! 😊
                  Feel free to ask me about anything! 🌻
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
                hasSearchResults={message.hasSearchResults}
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping || !canSendMessage()} 
          placeholder={!canSendMessage() ? `Please add ${chatConfig.model === 'gpt-4o-mini' ? 'OpenAI' : 'Groq'} API key to chat` : "Ask me anything! 🌻"}
        />
      </div>
    </div>
  );
}

export default App;