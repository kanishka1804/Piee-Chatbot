import React from 'react';
import { User, Bot, Search } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  hasSearchResults?: boolean;
}

const formatAIResponse = (message: string) => {
  // Split message into paragraphs and format
  const paragraphs = message.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map((paragraph, index) => {
    // Check if it's a list item
    if (paragraph.includes('•') || paragraph.includes('-') || paragraph.includes('*')) {
      const items = paragraph.split(/[•\-*]/).filter(item => item.trim());
      return (
        <ul key={index} className="list-disc list-inside space-y-1 mb-3">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="text-sm leading-relaxed">{item.trim()}</li>
          ))}
        </ul>
      );
    }
    
    // Regular paragraph
    return (
      <p key={index} className="text-sm leading-relaxed mb-2 last:mb-0">
        {paragraph}
      </p>
    );
  });
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp, hasSearchResults }) => {
  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg' 
          : 'bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 text-white shadow-lg'
      }`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-3 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-br-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg rounded-bl-md border border-yellow-200'
        }`}>
          <div className="text-sm leading-relaxed">
            {isUser ? (
              <p>{message}</p>
            ) : (
              <div>{formatAIResponse(message)}</div>
            )}
          </div>
          {hasSearchResults && !isUser && (
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-yellow-200">
              <Search size={12} className="text-amber-600" />
              <span className="text-xs text-amber-600">Enhanced with web search</span>
            </div>
          )}
        </div>
        <p className={`text-xs text-amber-600 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};