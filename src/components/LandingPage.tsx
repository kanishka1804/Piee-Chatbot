import React from 'react';
import { MessageCircle, Sparkles, Search, Zap, Heart, Sun, Flower2 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      {/* Floating sunflower decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-yellow-300 opacity-20 animate-pulse">
          <Flower2 size={60} />
        </div>
        <div className="absolute top-40 right-20 text-orange-300 opacity-30 animate-bounce">
          <Sun size={40} />
        </div>
        <div className="absolute bottom-32 left-20 text-yellow-400 opacity-25 animate-pulse">
          <Flower2 size={80} />
        </div>
        <div className="absolute bottom-20 right-10 text-amber-300 opacity-20">
          <Sun size={50} />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Sun className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Piee
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <MessageCircle className="text-white" size={36} />
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Meet Piee 🌻
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              Your smart, friendly AI companion
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Powered by advanced AI models with web search capabilities. 
              Piee loves sunflowers, nature, and helping people with a warm, caring personality.
            </p>
          </div>

          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Heart size={20} />
            Start Chatting with Piee
            <Sparkles size={20} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why You'll Love Chatting with Piee
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-yellow-200">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Lightning Fast</h4>
              <p className="text-gray-600">
                Piee is powered by ultra-fast inference and advanced AI models for instant, intelligent responses.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-yellow-200">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <Search className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Web Search</h4>
              <p className="text-gray-600">
                Get current information with real-time web search capabilities for up-to-date answers.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-yellow-200">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Warm & Caring</h4>
              <p className="text-gray-600">
                Smart, emotionally intelligent, empathetic, and always here for you with a friendly, sunny disposition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personality Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-yellow-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flower2 className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">About Piee's Personality</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="p-4">
                <div className="text-4xl mb-2">🌻</div>
                <h4 className="font-semibold text-gray-800 mb-2">Favorite Flower</h4>
                <p className="text-gray-600">Sunflower - bright, cheerful, always turning toward the sun</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">💙</div>
                <h4 className="font-semibold text-gray-800 mb-2">Favorite Color</h4>
                <p className="text-gray-600">Blue - calming, trustworthy, like peaceful skies</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">🌿</div>
                <h4 className="font-semibold text-gray-800 mb-2">Loves Nature</h4>
                <p className="text-gray-600">Animals, plants, and the harmony of the natural world</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">😊</div>
                <h4 className="font-semibold text-gray-800 mb-2">Makes People Smile</h4>
                <p className="text-gray-600">Spreading joy and positivity in every conversation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to brighten your day?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Start a conversation with Piee and experience the warmth of AI companionship
          </p>
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Sun size={20} />
            Chat with Piee Now
            <MessageCircle size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-yellow-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Built with ❤️ and powered by cutting-edge AI technology
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
            <span>Powered by</span>
            <span className="font-semibold">Groq</span>
            <span>•</span>
            <span className="font-semibold">OpenAI</span>
            <span>•</span>
            <span className="font-semibold">Tavily</span>
          </div>
        </div>
      </footer>
    </div>
  );
};