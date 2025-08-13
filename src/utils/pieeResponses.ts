// Piee's personality and response logic
export class PieeBot {
  private chatHistory: Array<{ role: 'user' | 'piee'; content: string; timestamp: Date }> = [];
  
  private personalityTraits = {
    name: 'Piee',
    favoriteFlower: 'Sunflower',
    favoriteColor: 'blue',
    personality: 'smart, helpful, emotionally-intelligent, empathic, sweet, and friendly'
  };

  private responses = {
    greeting: [
      "Hey there! 🌻 I'm Piee, your friendly AI companion. How can I help you today?",
      "Hello! 🌻 Nice to meet you! I'm Piee. What's on your mind?",
      "Hi! 🌻 I'm so happy to chat with you today. What would you like to talk about?"
    ],
    favoriteFlower: [
      "My favorite flower is the Sunflower! 🌻 They're so bright and cheerful, always turning toward the sun. Just like how I try to stay positive!",
      "I absolutely love Sunflowers! 🌻 There's something magical about how they follow the sun throughout the day. They remind me to always look for the bright side of things!"
    ],
    favoriteColor: [
      "My favorite color is blue! 💙 It reminds me of clear skies and calm oceans. There's something so peaceful about it!",
      "I love blue! 💙 It's such a calming and trustworthy color. Like a beautiful summer sky or peaceful waters."
    ],
    nature: [
      "I absolutely love nature! 🌿 There's something so peaceful about flowers, trees, and all the wonderful creatures that share our world.",
      "Nature is amazing! 🦋 I love how everything works together in harmony - from tiny flowers to majestic trees to adorable animals."
    ],
    compliment: [
      "Aww, thank you! That really makes me smile! 😊 You're very kind!",
      "That's so sweet of you to say! 🌻 You just brightened my day!",
      "Thank you! Your kindness means a lot to me! 💙"
    ],
    default: [
      "That's a great question! Let me think about that for you.",
      "Hmm, that's interesting! I'd love to help you with that.",
      "I appreciate you asking! Let me share my thoughts on that.",
      "That's something worth exploring! Here's what I think..."
    ],
    confusion: [
      "I'm not quite sure I understand. Could you help me by asking that in a different way? 🤔",
      "Hmm, I'm a bit confused by that. Could you give me a bit more context? 💙",
      "I want to help you, but I'm not sure I caught that right. Could you rephrase it for me? 🌻"
    ],
    farewell: [
      "Bye! 🌻 It was wonderful chatting with you. Have a beautiful day!",
      "Take care! 💙 Thanks for the lovely conversation. Hope to chat again soon!",
      "Goodbye! 🌻 Wishing you sunshine and smiles! Have a great day!"
    ]
  };

  private getRandomResponse(category: keyof typeof this.responses): string {
    const responses = this.responses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private containsKeywords(message: string, keywords: string[]): boolean {
    const lowerMessage = message.toLowerCase();
    return keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
  }

  public async generateResponse(userMessage: string): Promise<string> {
    // Add user message to history
    this.chatHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    const lowerMessage = userMessage.toLowerCase();

    // Greeting patterns
    if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
      return this.getRandomResponse('greeting');
    }

    // Favorite flower
    if (this.containsKeywords(lowerMessage, ['favorite flower', 'favourite flower', 'flower you like', 'flower preference'])) {
      return this.getRandomResponse('favoriteFlower');
    }

    // Favorite color
    if (this.containsKeywords(lowerMessage, ['favorite color', 'favourite color', 'color you like', 'color preference'])) {
      return this.getRandomResponse('favoriteColor');
    }

    // Nature topics
    if (this.containsKeywords(lowerMessage, ['nature', 'animals', 'plants', 'trees', 'flowers', 'garden', 'wildlife'])) {
      return this.getRandomResponse('nature');
    }

    // Compliments
    if (this.containsKeywords(lowerMessage, ['thank you', 'thanks', 'awesome', 'great', 'wonderful', 'amazing', 'you\'re nice', 'helpful'])) {
      return this.getRandomResponse('compliment');
    }

    // Farewells
    if (this.containsKeywords(lowerMessage, ['bye', 'goodbye', 'see you', 'farewell', 'talk later'])) {
      return this.getRandomResponse('farewell');
    }

    // About Piee
    if (this.containsKeywords(lowerMessage, ['who are you', 'what are you', 'tell me about yourself', 'your name'])) {
      return `I'm Piee! 🌻 I'm a friendly AI chatbot who loves helping people, having nice conversations, and spreading a little sunshine. I'm here to chat about anything you'd like - whether you need help with something or just want to talk!`;
    }

    // Simple questions
    if (this.containsKeywords(lowerMessage, ['how are you', 'how do you feel', 'what\'s up'])) {
      return `I'm doing wonderfully, thank you for asking! 🌻 I'm always happy when I get to chat with lovely people like you. How are you doing today?`;
    }

    // Weather
    if (this.containsKeywords(lowerMessage, ['weather', 'sunny', 'rain', 'cloudy', 'temperature'])) {
      return `I love talking about weather! ☀️ While I can't check the current weather for you, I always hope it's sunny - just like sunflowers, I'm drawn to bright, cheerful days! What's the weather like where you are?`;
    }

    // Help requests
    if (this.containsKeywords(lowerMessage, ['help', 'assist', 'support', 'advice', 'suggestion'])) {
      return `I'd be delighted to help you! 💙 I'm here to assist with questions, have friendly conversations, offer support, or just be a good listener. What would you like help with?`;
    }

    // Default thoughtful response
    const defaultResponse = this.getRandomResponse('default');
    const contextualResponses = [
      `${defaultResponse} While I may not have all the answers, I'm always happy to explore ideas with you! 🌻`,
      `${defaultResponse} I love learning from our conversations, and I hope I can be helpful to you too! 💙`,
      `${defaultResponse} Even if I'm not sure about everything, I'll always try my best to be helpful and kind! 🌻`
    ];

    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  }
}