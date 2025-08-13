import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 p-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 text-white flex items-center justify-center shadow-lg">
        <Bot size={18} />
      </div>
      <div className="bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg rounded-2xl rounded-bl-md border border-yellow-200 p-3">
        <div className="flex items-center gap-1">
          <span className="text-sm text-amber-700">Piee is thinking</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};