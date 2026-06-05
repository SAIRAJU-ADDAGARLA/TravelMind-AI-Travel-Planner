import { create } from "zustand";

export interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

const welcomeMessage: Message = {
  id: "welcome",
  sender: "assistant",
  text: "Hello! I am your TravelMind AI Copilot. I can adjust your itinerary, suggest changes, recommend restaurants, or optimize your budget in real time. Ask me anything about your trip!",
  timestamp: new Date().toISOString(),
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [welcomeMessage],
  isOpen: false,
  isTyping: false,

  setIsOpen: (isOpen) => set({ isOpen }),

  sendMessage: async (text) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toISOString(),
    };

    set({ messages: [...get().messages, userMsg], isTyping: true });

    // Simulate AI response delay
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(2000);

    let responseText = "That's a great request! I will update your itinerary details with that in mind. Feel free to export your trip when you are ready!";
    const lowerText = text.toLowerCase();

    if (lowerText.includes("adventure") || lowerText.includes("action")) {
      responseText = "Understood! I have scanned for adventure activities nearby. I recommend substituting the afternoon walking tour with high-energy zip-lining or a guided off-road bike tour in the mountain district. Would you like me to save these changes?";
    } else if (lowerText.includes("budget") || lowerText.includes("cheaper") || lowerText.includes("reduce")) {
      responseText = "Budget optimization active. I have replaced your current accommodation suggestions with highly-rated 3-star boutique hostels (saving ~$80/night) and swapped a private taxi trip for local metro transit passes. Your total estimated trip cost has decreased by $210!";
    } else if (lowerText.includes("food") || lowerText.includes("eat") || lowerText.includes("restaurant")) {
      responseText = "Gastronomic expansion engaged! I've loaded top local food experiences. I highly recommend trying regional special street food skewers in the market center, and visiting a traditional tavern known for locally sourced ingredients. I have pinned these spots under the restaurant suggestion tab.";
    } else if (lowerText.includes("hotel") || lowerText.includes("stay") || lowerText.includes("replace")) {
      responseText = "Room availability matched. I've updated the accommodation recommendations to list options closer to the transit hub. These boutique stays feature higher traveler safety ratings and complimentary breakfast.";
    }

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: "assistant",
      text: responseText,
      timestamp: new Date().toISOString(),
    };

    set({ messages: [...get().messages, aiMsg], isTyping: false });
  },

  clearChat: () => set({ messages: [welcomeMessage] }),
}));
