import { create } from "zustand";

export interface Activity {
  title: string;
  description: string;
  time: string;
  cost: number;
  location?: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
  night: Activity;
}

export interface WeatherDay {
  day: string;
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy";
}

export interface HotelRecommendation {
  name: string;
  rating: number;
  pricePerNight: number;
  image: string;
}

export interface RestaurantRecommendation {
  name: string;
  cuisine: string;
  rating: number;
  priceLevel: string;
}

export interface TransportSuggestion {
  type: "train" | "bus" | "taxi" | "walk" | "metro" | "flight";
  description: string;
  cost: number;
}

export interface CostBreakdown {
  hotels: number;
  food: number;
  activities: number;
  transport: number;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  budget: string;
  travelStyle: string;
  interests: string[];
  itinerary: DayItinerary[];
  hotels: HotelRecommendation[];
  restaurants: RestaurantRecommendation[];
  transports: TransportSuggestion[];
  weather: WeatherDay[];
  costs: CostBreakdown;
  createdAt: string;
}

interface TripState {
  trips: Trip[];
  activeTrip: Trip | null;
  isGenerating: boolean;
  generationStep: number;
  generationStatus: string;
  setActiveTrip: (id: string) => void;
  deleteTrip: (id: string) => void;
  addTrip: (trip: Trip) => void;
  generateTrip: (params: {
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelStyle: string;
    interests: string[];
  }) => Promise<string>;
  regenerateTrip: (id: string) => Promise<void>;
}

// Preseeded beautiful itineraries
const mockTokyoTrip: Trip = {
  id: "tokyo-adventure",
  destination: "Tokyo, Japan",
  startDate: "2026-10-12",
  endDate: "2026-10-15",
  daysCount: 3,
  budget: "Mid-range",
  travelStyle: "Adventure",
  interests: ["Food", "Nature", "Photography", "Shopping"],
  createdAt: "2026-06-01T12:00:00.000Z",
  costs: {
    hotels: 450,
    food: 220,
    activities: 180,
    transport: 90,
  },
  weather: [
    { day: "Mon", temp: 22, condition: "sunny" },
    { day: "Tue", temp: 21, condition: "sunny" },
    { day: "Wed", temp: 19, condition: "cloudy" },
    { day: "Thu", temp: 18, condition: "rainy" },
  ],
  hotels: [
    {
      name: "The Prince Gallery Tokyo Kioicho",
      rating: 4.8,
      pricePerNight: 240,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Hotel Gracery Shinjuku",
      rating: 4.3,
      pricePerNight: 120,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=400",
    },
  ],
  restaurants: [
    { name: "Ichiran Ramen Shinjuku", cuisine: "Japanese (Ramen)", rating: 4.6, priceLevel: "$" },
    { name: "Sukiyabashi Jiro", cuisine: "Sushi (Fine Dining)", rating: 4.9, priceLevel: "$$$$" },
    { name: "Rokurinsha Tokyo Station", cuisine: "Tsukemen noodles", rating: 4.5, priceLevel: "$" },
  ],
  transports: [
    { type: "metro", description: "Tokyo Metro 72-Hour Pass", cost: 12 },
    { type: "train", description: "JR Yamanote Line Daily Travel", cost: 8 },
    { type: "taxi", description: "Taxi ride from Ginza to Shinjuku", cost: 35 },
  ],
  itinerary: [
    {
      day: 1,
      date: "Oct 12",
      morning: {
        title: "Meiji Shrine & Yoyogi Park",
        description: "Walk through the forested entry to Meiji Shrine, an oasis in central Tokyo. Watch traditional Shinto ceremonies.",
        time: "09:00 AM",
        cost: 0,
        location: "Shibuya",
      },
      afternoon: {
        title: "Harajuku Takeshita Street & Crepes",
        description: "Explore the wild youth culture, fashion boutiques, and grab a famous sweet crepe at Marion Crepes.",
        time: "01:00 PM",
        cost: 15,
        location: "Harajuku",
      },
      evening: {
        title: "Shibuya Crossing & Hachiko Statue",
        description: "Stand at the busiest pedestrian intersection in the world. Photograph from the second floor of Starbucks.",
        time: "06:00 PM",
        cost: 0,
        location: "Shibuya",
      },
      night: {
        title: "Izakaya Hopping in Nonbei Yokocho",
        description: "Squeeze into tiny wooden bars for yakitori skewers and draft beer. Converse with local travelers and hosts.",
        time: "09:00 PM",
        cost: 40,
        location: "Shibuya",
      },
    },
    {
      day: 2,
      date: "Oct 13",
      morning: {
        title: "Toyosu Fish Market Auction & Sushi Breakfast",
        description: "Witness the early morning tuna auction from the observation decks, followed by premium fresh sushi at Daiwa Sushi.",
        time: "07:00 AM",
        cost: 55,
        location: "Toyosu",
      },
      afternoon: {
        title: "teamLab Planets Digital Art Museum",
        description: "Step into an immersive, multi-sensory world of lights, water projections, and giant floating flower gardens.",
        time: "01:30 PM",
        cost: 28,
        location: "Toyosu",
      },
      evening: {
        title: "Asakusa Senso-ji Temple",
        description: "Explore Tokyo's oldest temple complex. Walk Nakamise Street for street snacks like melonpan and dango.",
        time: "05:30 PM",
        cost: 10,
        location: "Asakusa",
      },
      night: {
        title: "Skytree Observation Deck Panoramic View",
        description: "Take the high-speed elevator 450 meters up for an endless glowing look at the Tokyo metropolis at night.",
        time: "08:30 PM",
        cost: 32,
        location: "Sumida",
      },
    },
    {
      day: 3,
      date: "Oct 14",
      morning: {
        title: "Shinjuku Gyoen National Garden",
        description: "Relax in beautiful landscaping combining Japanese traditional garden bridges with French formal layouts.",
        time: "09:30 AM",
        cost: 4,
        location: "Shinjuku",
      },
      afternoon: {
        title: "Akihabara Electric Town Tech & Anime",
        description: "Browse retro video games at Super Potato, check massive anime stores, and visit an arcade for crane games.",
        time: "01:00 PM",
        cost: 20,
        location: "Akihabara",
      },
      evening: {
        title: "Shinjuku Metropolitan Building Sunset",
        description: "Capture the city silhouette against Mt. Fuji at sunset from the free 45th floor observation desk.",
        time: "05:30 PM",
        cost: 0,
        location: "Shinjuku",
      },
      night: {
        title: "Golden Gai Drinks & Ramen",
        description: "Explore 200+ micro-bars in compact alleys. Cap off the night with a hot bowl of sardine broth ramen at Nagi.",
        time: "08:30 PM",
        cost: 45,
        location: "Shinjuku",
      },
    },
  ],
};

const mockParisTrip: Trip = {
  id: "paris-romance",
  destination: "Paris, France",
  startDate: "2026-07-20",
  endDate: "2026-07-22",
  daysCount: 2,
  budget: "Luxury",
  travelStyle: "Luxury",
  interests: ["History", "Food", "Photography", "Shopping"],
  createdAt: "2026-06-03T10:30:00.000Z",
  costs: {
    hotels: 950,
    food: 480,
    activities: 320,
    transport: 120,
  },
  weather: [
    { day: "Mon", temp: 26, condition: "sunny" },
    { day: "Tue", temp: 28, condition: "sunny" },
    { day: "Wed", temp: 27, condition: "sunny" },
  ],
  hotels: [
    {
      name: "Le Meurice",
      rating: 4.9,
      pricePerNight: 550,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
    },
  ],
  restaurants: [
    { name: "Le Jules Verne (Eiffel Tower)", cuisine: "French Haute Cuisine", rating: 4.8, priceLevel: "$$$$" },
    { name: "Angelina Paris", cuisine: "Patisserie & Hot Chocolate", rating: 4.4, priceLevel: "$$$" },
  ],
  transports: [
    { type: "taxi", description: "Private Airport Transfer", cost: 80 },
    { type: "metro", description: "Paris Metro Tickets", cost: 15 },
  ],
  itinerary: [
    {
      day: 1,
      date: "Jul 20",
      morning: {
        title: "Eiffel Tower Early Photography",
        description: "Beat the crowds at Trocadero Plaza for premium views and photos of the Eiffel Tower, then climb to the summit.",
        time: "08:30 AM",
        cost: 28,
        location: "7th Arrondissement",
      },
      afternoon: {
        title: "Louvre Museum Highlight Tour",
        description: "Skip-the-line guided tour focusing on the Mona Lisa, Venus de Milo, and Winged Victory of Samothrace.",
        time: "01:00 PM",
        cost: 65,
        location: "1st Arrondissement",
      },
      evening: {
        title: "Seine River Dinner Cruise",
        description: "Gliding under illuminated bridges while enjoying a 3-course dinner with champagne and live violin music.",
        time: "07:30 PM",
        cost: 110,
        location: "Port de la Bourdonnais",
      },
      night: {
        title: "Arc de Triomphe Light Show",
        description: "Climb the Arc de Triomphe to witness the Champs-Élysées headlights glowing down 12 spokes of the roundabout.",
        time: "10:30 PM",
        cost: 13,
        location: "Champs-Élysées",
      },
    },
    {
      day: 2,
      date: "Jul 21",
      morning: {
        title: "Montmartre & Sacré-Cœur",
        description: "Stroll the cobblestone streets of the artist district. View the stunning white dome and a panoramic vista of Paris.",
        time: "09:00 AM",
        cost: 0,
        location: "18th Arrondissement",
      },
      afternoon: {
        title: "Champs-Élysées Shopping & Angelina Cafe",
        description: "Indulge in premium retail shopping and taste the legendary L'Africain hot chocolate and Mont-Blanc pastry.",
        time: "01:30 PM",
        cost: 45,
        location: "8th Arrondissement",
      },
      evening: {
        title: "Palace of Versailles Garden Sunset",
        description: "Walk the grand gardens, hall of mirrors, and capture beautiful fountain lights during the sunset.",
        time: "05:00 PM",
        cost: 30,
        location: "Versailles",
      },
      night: {
        title: "Cocktails at Le Syndicat",
        description: "Innovative mixology using exclusive French spirits in a vibrant speakeasy hidden behind street posters.",
        time: "09:30 PM",
        cost: 40,
        location: "10th Arrondissement",
      },
    },
  ],
};

export const useTripStore = create<TripState>((set, get) => ({
  trips: [mockTokyoTrip, mockParisTrip],
  activeTrip: mockTokyoTrip,
  isGenerating: false,
  generationStep: 0,
  generationStatus: "",

  setActiveTrip: (id) => {
    const trip = get().trips.find((t) => t.id === id);
    if (trip) {
      set({ activeTrip: trip });
    }
  },

  deleteTrip: (id) => {
    const remaining = get().trips.filter((t) => t.id !== id);
    const active = get().activeTrip?.id === id ? remaining[0] || null : get().activeTrip;
    set({ trips: remaining, activeTrip: active });
  },

  addTrip: (trip) => {
    set({ trips: [trip, ...get().trips], activeTrip: trip });
  },

  generateTrip: async (params) => {
    set({ isGenerating: true, generationStep: 0, generationStatus: "Initializing TravelMind AI engine..." });

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    await sleep(1000);
    set({ generationStep: 20, generationStatus: "Fetching historical weather patterns for " + params.destination + "..." });
    await sleep(1000);
    set({ generationStep: 40, generationStatus: "Curating sights based on style: " + params.travelStyle + "..." });
    await sleep(1200);
    set({ generationStep: 60, generationStatus: "Matching dining options with interests: " + params.interests.join(", ") + "..." });
    await sleep(1000);
    set({ generationStep: 80, generationStatus: "Optimizing geographic pathing and transport logistics..." });
    await sleep(1000);
    set({ generationStep: 95, generationStatus: "Structuring final timeline and pricing charts..." });
    await sleep(800);

    const start = new Date(params.startDate);
    const end = new Date(params.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const daysCount = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);

    const baseCostMultiplier = params.budget === "Luxury" ? 500 : params.budget === "Mid-range" ? 200 : 80;
    const costs: CostBreakdown = {
      hotels: baseCostMultiplier * daysCount * 1.5,
      food: baseCostMultiplier * daysCount * 0.7,
      activities: baseCostMultiplier * daysCount * 0.5,
      transport: baseCostMultiplier * daysCount * 0.3,
    };

    // Generate dynamic itinerary items based on interests and destination
    const weatherConditions: ("sunny" | "cloudy" | "rainy")[] = ["sunny", "cloudy", "rainy"];
    const weather = Array.from({ length: Math.min(daysCount + 1, 4) }, (_, i) => {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const dayIndex = (start.getDay() + i) % 7;
      return {
        day: days[dayIndex],
        temp: Math.floor(Math.random() * 10) + 15,
        condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)] as any,
      };
    });

    const itinerary: DayItinerary[] = Array.from({ length: daysCount }, (_, idx) => {
      const dayNum = idx + 1;
      const curDate = new Date(start);
      curDate.setDate(start.getDate() + idx);
      const dateStr = curDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      return {
        day: dayNum,
        date: dateStr,
        morning: {
          title: `Explore historical highlights of ${params.destination}`,
          description: `Enjoy a peaceful morning walk focusing on the unique culture. Capture photography during the golden hour.`,
          time: "09:00 AM",
          cost: Math.floor(baseCostMultiplier * 0.2),
          location: "Downtown",
        },
        afternoon: {
          title: `Curated ${params.travelStyle} experience`,
          description: `Participate in top rated local activities highlighting the ${params.interests[0] || "scenery"} and local atmosphere.`,
          time: "01:30 PM",
          cost: Math.floor(baseCostMultiplier * 0.4),
          location: "Cultural Quarter",
        },
        evening: {
          title: `Gourmet dining and leisure walk`,
          description: `Dine at a highly recommended culinary spot serving authentic cuisine. Walk through vibrant evening streets.`,
          time: "06:00 PM",
          cost: Math.floor(baseCostMultiplier * 0.3),
          location: "Waterfront District",
        },
        night: {
          title: `Local night market / Skyline observatory`,
          description: `Conclude the day enjoying panoramic night views and sipping craft signature beverages from local mixologists.`,
          time: "09:00 PM",
          cost: Math.floor(baseCostMultiplier * 0.2),
          location: "Skyline District",
        },
      };
    });

    const newTrip: Trip = {
      id: `${params.destination.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`,
      destination: params.destination,
      startDate: params.startDate,
      endDate: params.endDate,
      daysCount,
      budget: params.budget,
      travelStyle: params.travelStyle,
      interests: params.interests,
      itinerary,
      weather,
      costs,
      hotels: [
        {
          name: `Grand Palace Oasis ${params.destination.split(",")[0]}`,
          rating: 4.7,
          pricePerNight: baseCostMultiplier * 1.2,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
        },
        {
          name: `Boutique Urban Nest`,
          rating: 4.4,
          pricePerNight: baseCostMultiplier * 0.8,
          image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400",
        },
      ],
      restaurants: [
        {
          name: `The Kitchen Table`,
          cuisine: `Local Signature Fusion`,
          rating: 4.6,
          priceLevel: params.budget === "Luxury" ? "$$$$" : params.budget === "Mid-range" ? "$$" : "$",
        },
        {
          name: `Starlight Rooftop Eatery`,
          cuisine: `Modern Cuisine & Bistro`,
          rating: 4.5,
          priceLevel: "$$$",
        },
      ],
      transports: [
        { type: "train", description: "City Metro Transit Pass", cost: 15 },
        { type: "taxi", description: "Rideshare local transport", cost: 40 },
      ],
      createdAt: new Date().toISOString(),
    };

    set({
      trips: [newTrip, ...get().trips],
      activeTrip: newTrip,
      isGenerating: false,
      generationStep: 0,
      generationStatus: "",
    });

    return newTrip.id;
  },

  regenerateTrip: async (id) => {
    set({ isGenerating: true, generationStep: 20, generationStatus: "Regenerating itinerary recommendations..." });
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(1500);

    const trip = get().trips.find((t) => t.id === id);
    if (!trip) {
      set({ isGenerating: false });
      return;
    }

    // Shuffle a few activities and update costs slightly to simulate AI logic
    const updatedItinerary = trip.itinerary.map((day) => ({
      ...day,
      morning: {
        ...day.morning,
        title: "Regenerated alternative activity: " + day.morning.title,
        description: "AI updated search: " + day.morning.description,
      },
    }));

    const updatedTrip = {
      ...trip,
      itinerary: updatedItinerary,
      costs: {
        ...trip.costs,
        activities: Math.max(50, trip.costs.activities + (Math.random() > 0.5 ? 20 : -15)),
      },
    };

    const updatedTrips = get().trips.map((t) => (t.id === id ? updatedTrip : t));

    set({
      trips: updatedTrips,
      activeTrip: updatedTrip,
      isGenerating: false,
      generationStep: 0,
      generationStatus: "",
    });
  },
}));
