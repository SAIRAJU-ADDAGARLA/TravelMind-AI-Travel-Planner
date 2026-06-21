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

export interface Stopover {
  id: string;
  name: string;
  category: "Spiritual" | "Food" | "Heritage" | "Nature" | "Viewpoint" | "Adventure" | "Instagram" | "Beaches";
  description: string;
  image: string;
  imageAttribution?: string;
  imageSourceUrl?: string;
  distanceFromRoute: number;
  recommendedVisitTime: string;
  popularityScore: number;
  aiScore: number;
  coords: { x: number; y: number; lat?: number; lon?: number };
  weatherText?: string;
  temp?: number;
}

export interface Trip {
  id: string;
  destination: string;
  source?: string;
  sourceCoords?: { lat: number; lon: number };
  destinationCoords?: { lat: number; lon: number };
  routeGeometry?: [number, number][];
  mode?: "Bike" | "Car" | "Train" | "Flight" | "Bus";
  language?: string;
  attractionsPreferred?: string;
  stopovers?: Stopover[];
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
    source?: string;
    mode?: "Bike" | "Car" | "Train" | "Flight" | "Bus";
    language?: string;
    attractionsPreferred?: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelStyle: string;
    interests: string[];
  }) => Promise<string>;
  regenerateTrip: (id: string) => Promise<void>;
  reRankStopovers: (tripId: string, preference: string) => void;
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

// Preseeded Indian Road Trip showing Journey Discovery Engine
const mockIndiaTrip: Trip = {
  id: "bhimavaram-hyderabad-roadtrip",
  destination: "Hyderabad, Telangana",
  source: "Bhimavaram, Andhra Pradesh",
  mode: "Bike",
  language: "Telugu",
  attractionsPreferred: "Temples",
  startDate: "2026-06-25",
  endDate: "2026-06-27",
  daysCount: 3,
  budget: "Mid-range",
  travelStyle: "Adventure",
  interests: ["Spiritual Tourism", "Highway Dhabas", "Nature Trails"],
  createdAt: "2026-06-05T12:00:00.000Z",
  costs: {
    hotels: 300,
    food: 150,
    activities: 120,
    transport: 80,
  },
  weather: [
    { day: "Thu", temp: 32, condition: "sunny" },
    { day: "Fri", temp: 30, condition: "cloudy" },
    { day: "Sat", temp: 31, condition: "sunny" },
  ],
  hotels: [
    {
      name: "Taj Krishna Hyderabad",
      rating: 4.8,
      pricePerNight: 180,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Highway Residency Suryapet",
      rating: 4.1,
      pricePerNight: 50,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=400",
    },
  ],
  restaurants: [
    { name: "Suryapet Highway Durbar", cuisine: "Indian (Biryani & Tandoori)", rating: 4.5, priceLevel: "$$" },
    { name: "Famous Tanuku Tiffin Stop", cuisine: "South Indian Breakfast", rating: 4.6, priceLevel: "$" },
  ],
  transports: [
    { type: "bus", description: "Bike fuel and checkups", cost: 45 },
    { type: "taxi", description: "Highway Toll Charges", cost: 10 },
  ],
  stopovers: [
    {
      id: "stop-tanuku",
      name: "Tanuku Local Tiffin Stop",
      category: "Food",
      description: "Famous roadside spot serving piping hot idlis, crispy dosas, and authentic filter coffee.",
      image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 1.5,
      recommendedVisitTime: "30 mins",
      popularityScore: 88,
      aiScore: 82,
      coords: { x: 38, y: 56 },
    },
    {
      id: "stop-kolleru",
      name: "Kolleru Bird Sanctuary & Lake",
      category: "Nature",
      description: "One of India's largest freshwater lakes, hosting beautiful wetland viewing points and migratory birds.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 4.2,
      recommendedVisitTime: "45 mins",
      popularityScore: 79,
      aiScore: 80,
      coords: { x: 44, y: 54 },
    },
    {
      id: "stop-durga",
      name: "Vijayawada Kanaka Durga Hilltop Shrine",
      category: "Spiritual",
      description: "Majestic temple located on Indrakeeladri Hill along the banks of the Krishna River.",
      image: "https://images.unsplash.com/photo-1608958416738-f9167df3c965?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 2.5,
      recommendedVisitTime: "1 hour",
      popularityScore: 97,
      aiScore: 94,
      coords: { x: 50, y: 58 },
    },
    {
      id: "stop-fort",
      name: "Kondapalli Fort & Toy Village",
      category: "Heritage",
      description: "Explore a historic 14th-century fort ruins and visit local craftsmen making famous wooden toys.",
      image: "https://images.unsplash.com/photo-1599839617650-77a83d330541?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 7.0,
      recommendedVisitTime: "1.5 hours",
      popularityScore: 85,
      aiScore: 84,
      coords: { x: 56, y: 55 },
    },
    {
      id: "stop-dhaba",
      name: "Suryapet Seven Highway Dhaba",
      category: "Food",
      description: "Legendary highway stopover famous for spicy chicken biryani and butter roti.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 0.2,
      recommendedVisitTime: "40 mins",
      popularityScore: 92,
      aiScore: 86,
      coords: { x: 66, y: 53 },
    },
    {
      id: "stop-bhongir",
      name: "Bhongir Fort & Rock Climb",
      category: "Adventure",
      description: "Scale a massive monolithic rock structure to view historical fort ruins and panoramic valleys.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 1.2,
      recommendedVisitTime: "2 hours",
      popularityScore: 90,
      aiScore: 88,
      coords: { x: 74, y: 50 },
    },
  ],
  itinerary: [
    {
      day: 1,
      date: "Jun 25",
      morning: {
        title: "Bhimavaram departure & Breakfast in Tanuku",
        description: "Kickoff your bike roadtrip from Bhimavaram. Stop in Tanuku for early morning tiffins and coffee.",
        time: "07:30 AM",
        cost: 5,
        location: "Tanuku",
      },
      afternoon: {
        title: "Kolleru Lake Views & Ride to Vijayawada",
        description: "Ride along scenic canals towards Eluru. Enjoy scenic bird watching views at Kolleru Lake.",
        time: "11:30 AM",
        cost: 2,
        location: "Kolleru",
      },
      evening: {
        title: "Kanaka Durga Temple Darshan",
        description: "Arrive in Vijayawada and climb to the Indrakeeladri shrine for sunset views over the Krishna River.",
        time: "05:30 PM",
        cost: 10,
        location: "Vijayawada",
      },
      night: {
        title: "Stay at Highway Residency",
        description: "Relax after the first leg of riding at a comfortable highway-side lodge.",
        time: "08:30 PM",
        cost: 50,
        location: "Vijayawada",
      },
    },
    {
      day: 2,
      date: "Jun 26",
      morning: {
        title: "Kondapalli Fort Exploration",
        description: "Ride up the forest roads to Kondapalli Fort ruins. Shop for local wooden toys in the village below.",
        time: "08:30 AM",
        cost: 8,
        location: "Kondapalli",
      },
      afternoon: {
        title: "Highway ride towards Suryapet",
        description: "Enjoy a smooth cruise on NH65. Stop at roadside tea stalls for coconut water and tea.",
        time: "01:00 PM",
        cost: 3,
        location: "National Highway 65",
      },
      evening: {
        title: "Seven Highway Dhaba Dinner",
        description: "Stop at the Suryapet transit hub for a legendary spicy biryani and tandoori feast.",
        time: "06:30 PM",
        cost: 12,
        location: "Suryapet",
      },
      night: {
        title: "Relax at Suryapet pitstop",
        description: "Stargazing at the highway lounge and chatting with other roadtrippers.",
        time: "09:30 PM",
        cost: 0,
        location: "Suryapet",
      },
    },
    {
      day: 3,
      date: "Jun 27",
      morning: {
        title: "Bhongir Fort Monolith Trek",
        description: "Scale the unique egg-shaped monolith hill early before the heat. Take in the dramatic panoramic views.",
        time: "06:30 AM",
        cost: 4,
        location: "Bhongir",
      },
      afternoon: {
        title: "Ride into Hyderabad city lines",
        description: "Complete the final stretch of the roadtrip entering Hyderabad via Uppal.",
        time: "01:30 PM",
        cost: 0,
        location: "Hyderabad Gateway",
      },
      evening: {
        title: "Charminar Photography & Irani Chai",
        description: "Celebrate the trip completion with hot Irani Chai and Osmania biscuits near Charminar.",
        time: "05:00 PM",
        cost: 5,
        location: "Old City, Hyderabad",
      },
      night: {
        title: "Grand dinner at Jewel of Nizam",
        description: "End the roadtrip journey with fine Mughlai dining overlooking the lake.",
        time: "08:30 PM",
        cost: 60,
        location: "Gandipet, Hyderabad",
      },
    },
  ],
};

const generateMockStopovers = (source: string, destination: string) => {
  const src = source.toLowerCase();
  const dest = destination.toLowerCase();

  if (src.includes("bhimavaram") && dest.includes("hyderabad")) {
    return [
      {
        id: "stop-tanuku",
        name: "Tanuku Local Tiffin Stop",
        category: "Food" as const,
        description: "Famous roadside spot serving piping hot idlis, crispy dosas, and authentic filter coffee.",
        image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=400",
        distanceFromRoute: 1.5,
        recommendedVisitTime: "30 mins",
        popularityScore: 88,
        aiScore: 82,
        coords: { x: 38, y: 56 },
      },
      {
        id: "stop-kolleru",
        name: "Kolleru Bird Sanctuary & Lake",
        category: "Nature" as const,
        description: "One of India's largest freshwater lakes, hosting beautiful wetland viewing points and migratory birds.",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=400",
        distanceFromRoute: 4.2,
        recommendedVisitTime: "45 mins",
        popularityScore: 79,
        aiScore: 80,
        coords: { x: 44, y: 54 },
      },
      {
        id: "stop-durga",
        name: "Vijayawada Kanaka Durga Hilltop Shrine",
        category: "Spiritual" as const,
        description: "Majestic temple located on Indrakeeladri Hill along the banks of the Krishna River.",
        image: "https://images.unsplash.com/photo-1608958416738-f9167df3c965?auto=format&fit=crop&q=80&w=400",
        distanceFromRoute: 2.5,
        recommendedVisitTime: "1 hour",
        popularityScore: 97,
        aiScore: 94,
        coords: { x: 50, y: 58 },
      },
      {
        id: "stop-fort",
        name: "Kondapalli Fort & Toy Village",
        category: "Heritage" as const,
        description: "Explore a historic 14th-century fort ruins and visit local craftsmen making famous wooden toys.",
        image: "https://images.unsplash.com/photo-1599839617650-77a83d330541?auto=format&fit=crop&q=80&w=400",
        distanceFromRoute: 7.0,
        recommendedVisitTime: "1.5 hours",
        popularityScore: 85,
        aiScore: 84,
        coords: { x: 56, y: 55 },
      },
      {
        id: "stop-dhaba",
        name: "Suryapet Seven Highway Dhaba",
        category: "Food" as const,
        description: "Legendary highway stopover famous for spicy chicken biryani and butter roti.",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
        distanceFromRoute: 0.2,
        recommendedVisitTime: "40 mins",
        popularityScore: 92,
        aiScore: 86,
        coords: { x: 66, y: 53 },
      },
      {
        id: "stop-bhongir",
        name: "Bhongir Fort & Rock Climb",
        category: "Adventure" as const,
        description: "Scale a massive monolithic rock structure to view historical fort ruins and panoramic valleys.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400",
        distanceFromRoute: 1.2,
        recommendedVisitTime: "2 hours",
        popularityScore: 90,
        aiScore: 88,
        coords: { x: 74, y: 50 },
      },
    ];
  }

  return [
    {
      id: "gen-stop-1",
      name: `Green Valley Viewpoint near ${source}`,
      category: "Nature" as const,
      description: "Scenic roadside overlook featuring pristine landscapes and photography platforms.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 3.5,
      recommendedVisitTime: "20 mins",
      popularityScore: 81,
      aiScore: 78,
      coords: { x: 42, y: 54 },
    },
    {
      id: "gen-stop-2",
      name: "Heritage Roadside Temple Complex",
      category: "Spiritual" as const,
      description: "Historic temple featuring beautiful regional stone craftsmanship and quiet prayer halls.",
      image: "https://images.unsplash.com/photo-1608958416738-f9167df3c965?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 1.8,
      recommendedVisitTime: "45 mins",
      popularityScore: 90,
      aiScore: 85,
      coords: { x: 55, y: 56 },
    },
    {
      id: "gen-stop-3",
      name: "Highway Star Plaza & Dhaba",
      category: "Food" as const,
      description: "Comfortable highway dining complex serving regional specialties and hot tea.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
      distanceFromRoute: 0.1,
      recommendedVisitTime: "30 mins",
      popularityScore: 86,
      aiScore: 82,
      coords: { x: 68, y: 52 },
    },
  ];
};

export const useTripStore = create<TripState>((set, get) => ({
  trips: [mockIndiaTrip, mockTokyoTrip, mockParisTrip],
  activeTrip: mockIndiaTrip,
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
    set({ isGenerating: true, generationStep: 5, generationStatus: "Initializing TravelMind AI engine..." });

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await sleep(400);
      set({ generationStep: 20, generationStatus: "Geocoding source & destination..." });
      
      const responsePromise = fetch("/api/trip/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      await sleep(800);
      set({ generationStep: 45, generationStatus: "Calculating actual route via OSRM..." });
      await sleep(800);
      set({ generationStep: 70, generationStatus: "Discovering real attractions via Overpass API..." });
      await sleep(800);
      set({ generationStep: 90, generationStatus: "Fetching live weather and Wikipedia photographs..." });

      const res = await responsePromise;
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Live data currently unavailable.");
      }

      const newTrip: Trip = await res.json();
      
      set({ generationStep: 100, generationStatus: "Finalizing itinerary details..." });
      await sleep(200);

      set({
        trips: [newTrip, ...get().trips],
        activeTrip: newTrip,
        isGenerating: false,
        generationStep: 0,
        generationStatus: "",
      });

      return newTrip.id;
    } catch (err: any) {
      set({
        isGenerating: false,
        generationStep: 0,
        generationStatus: "",
      });
      alert(err.message || "Live data currently unavailable.");
      throw err;
    }
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

  reRankStopovers: (tripId, preference) => {
    const trips = get().trips.map((trip) => {
      if (trip.id !== tripId) return trip;
      if (!trip.stopovers) return trip;

      const updatedStopovers = trip.stopovers.map((stop) => {
        let scoreBoost = 0;
        const cat = stop.category.toLowerCase();
        const pref = preference.toLowerCase();

        if (pref === "temples" && cat === "spiritual") scoreBoost = 22;
        else if (pref === "nature" && (cat === "nature" || cat === "viewpoint")) scoreBoost = 22;
        else if (pref === "food" && cat === "food") scoreBoost = 22;
        else if (pref === "adventure" && cat === "adventure") scoreBoost = 22;
        else if (pref === "history" && cat === "heritage") scoreBoost = 22;
        else if (pref === "photography" && cat === "instagram") scoreBoost = 22;

        const newAiScore = Math.min(99, Math.max(42, Math.floor((stop.aiScore || 80) + scoreBoost - (scoreBoost === 0 ? 8 : 0))));

        return {
          ...stop,
          aiScore: newAiScore,
        };
      });

      return {
        ...trip,
        stopovers: updatedStopovers,
        attractionsPreferred: preference,
      };
    });

    const active = get().activeTrip?.id === tripId ? trips.find((t) => t.id === tripId) || null : get().activeTrip;
    set({ trips, activeTrip: active });
  },
}));
