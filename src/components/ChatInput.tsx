import React, { useState, KeyboardEvent } from 'react';
import { Send, Sun } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled, placeholder = "Ask me anything! 🌻" }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-yellow-200 bg-white/80 backdrop-blur-sm p-4">
      <div className="flex gap-2 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full p-3 pr-12 border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm bg-white/90 backdrop-blur-sm"
          />
          <Sun className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-500" size={16} />
        </div>
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-full hover:from-yellow-600 hover:to-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};