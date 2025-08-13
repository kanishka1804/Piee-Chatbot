import React, { useState, useEffect } from 'react';
import { X, Key, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onSubmit: (openaiKey: string, groqKey: string) => void;
  onCancel: () => void;
  requiredModel: 'gpt-4o-mini' | 'llama-3.3-70b-versatile' | null;
  currentOpenAIKey: string;
  currentGroqKey: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onSubmit,
  onCancel,
  requiredModel,
  currentOpenAIKey,
  currentGroqKey
}) => {
  const [openaiKey, setOpenaiKey] = useState(currentOpenAIKey);
  const [groqKey, setGroqKey] = useState(currentGroqKey);

  useEffect(() => {
    setOpenaiKey(currentOpenAIKey);
    setGroqKey(currentGroqKey);
  }, [currentOpenAIKey, currentGroqKey]);

  if (!isOpen) return null;

  const isOpenAIRequired = requiredModel === 'gpt-4o-mini';
  const isGroqRequired = requiredModel === 'llama-3.3-70b-versatile';

  const canSubmit = () => {
    if (isOpenAIRequired) return openaiKey.trim().length > 0;
    if (isGroqRequired) return groqKey.trim().length > 0;
    return openaiKey.trim().length > 0 || groqKey.trim().length > 0;
  };

  const handleSubmit = () => {
    if (canSubmit()) {
      onSubmit(openaiKey, groqKey);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canSubmit()) {
      handleSubmit();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-yellow-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <Key className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-800">API Key Required</h2>
              <p className="text-sm text-amber-600">
                {isOpenAIRequired ? 'OpenAI API key needed for GPT-4o Mini' : 'Groq API key needed for Llama 3.3 70B'}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-yellow-100 rounded-full transition-colors"
          >
            <X size={20} className="text-amber-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-3 mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertCircle size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Model Switch Detected</p>
              <p>
                You're switching to {isOpenAIRequired ? 'GPT-4o Mini' : 'Llama 3.3 70B'}. 
                Please provide the required API key to continue chatting.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {isOpenAIRequired && (
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  OpenAI API Key *
                </label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="sk-proj-..."
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/90"
                  autoFocus
                />
              </div>
            )}

            {isGroqRequired && (
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Groq API Key *
                </label>
                <input
                  type="password"
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="gsk_..."
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white/90"
                  autoFocus
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 py-3 px-4 border border-yellow-300 text-amber-700 rounded-lg hover:bg-yellow-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit()}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  canSubmit()
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>

          <p className="text-xs text-amber-600 text-center mt-4">
            Your API key will be stored locally and used immediately for the selected model.
          </p>
        </div>
      </div>
    </div>
  );
};