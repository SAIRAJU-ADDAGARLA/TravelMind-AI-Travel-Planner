import { create } from "zustand";

export interface UserPreferences {
  destinations: string[];
  travelStyle: string;
  budget: string;
  interests: string[];
}

export interface UserStats {
  countriesVisited: number;
  tripsCount: number;
  savedDestinations: number;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  stats: UserStats;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  theme: "light" | "dark";
  login: (email: string, name?: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  updateProfile: (name: string, email: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: {
    name: "Alex Mercer",
    email: "alex.mercer@travelmind.ai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
    preferences: {
      destinations: ["Tokyo", "Kyoto", "Paris"],
      travelStyle: "Adventure",
      budget: "Mid-range",
      interests: ["Beaches", "Food", "Nature", "Photography"],
    },
    stats: {
      countriesVisited: 8,
      tripsCount: 12,
      savedDestinations: 15,
    },
  },
  isAuthenticated: true, // Default to true for premium demo experience, can toggle in auth screens
  theme: "dark",

  login: (email, name) => {
    set({
      isAuthenticated: true,
      user: {
        name: name || email.split("@")[0],
        email: email,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256&h=256",
        preferences: {
          destinations: [],
          travelStyle: "Adventure",
          budget: "Mid-range",
          interests: [],
        },
        stats: {
          countriesVisited: 1,
          tripsCount: 1,
          savedDestinations: 2,
        },
      },
    });
  },

  register: (email, name) => {
    set({
      isAuthenticated: true,
      user: {
        name: name,
        email: email,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256&h=256",
        preferences: {
          destinations: [],
          travelStyle: "Backpacking",
          budget: "Budget",
          interests: [],
        },
        stats: {
          countriesVisited: 0,
          tripsCount: 0,
          savedDestinations: 0,
        },
      },
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  toggleTheme: () => {
    const nextTheme = get().theme === "light" ? "dark" : "light";
    set({ theme: nextTheme });
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      if (nextTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  },

  initializeTheme: () => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      const currentTheme = get().theme;
      if (currentTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  },

  updatePreferences: (prefs) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: {
          ...currentUser,
          preferences: {
            ...currentUser.preferences,
            ...prefs,
          },
        },
      });
    }
  },

  updateProfile: (name, email) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: {
          ...currentUser,
          name,
          email,
        },
      });
    }
  },
}));
