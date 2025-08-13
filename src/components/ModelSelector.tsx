import React from 'react';
import { Brain, Zap } from 'lucide-react';
import { ChatConfig } from '../types/chat';

interface ModelSelectorProps {
  config: ChatConfig;
  onConfigChange: (newModel: 'gpt-4o-mini' | 'llama-3.3-70b-versatile') => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ config, onConfigChange }) => {
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value as 'gpt-4o-mini' | 'llama-3.3-70b-versatile';
    onConfigChange(newModel);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm border-yellow-200">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Model:</span>
              <select
                value={config.model}
                onChange={handleModelChange}
                className="text-sm bg-white/90 border border-yellow-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-amber-800"
              >
                <option value="gpt-4o-mini">GPT-4o Mini (OpenAI)</option>
                <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Groq)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-600">
            <Zap size={12} />
            <span>
              {config.model === 'llama-3.3-70b-versatile' ? 'Powered by Groq' : 'Powered by OpenAI'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};