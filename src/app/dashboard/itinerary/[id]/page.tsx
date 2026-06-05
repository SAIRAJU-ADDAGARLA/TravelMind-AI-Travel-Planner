"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useTripStore, DayItinerary } from "@/store/useTripStore";
import { BudgetCard } from "@/components/ui/Cards";
import {
  Calendar,
  DollarSign,
  MapPin,
  Compass,
  Download,
  Share2,
  RefreshCw,
  BookmarkCheck,
  Sun,
  Cloud,
  CloudRain,
  Map,
  ArrowLeft,
  Navigation,
  Utensils,
  Star,
  Hotel,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ItineraryViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { trips, regenerateTrip, isGenerating } = useTripStore();
  const [activeDay, setActiveDay] = useState(1);
  const [toastMsg, setToastMsg] = useState("");

  const trip = trips.find((t) => t.id === resolvedParams.id);

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Itinerary not found</h2>
        <p className="text-sm text-muted-foreground">
          The requested trip layout could not be fetched or has been deleted.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-white"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleShare = () => {
    const mockUrl = `${window.location.origin}/dashboard/itinerary/${trip.id}`;
    navigator.clipboard.writeText(mockUrl);
    triggerToast("Trip URL copied to clipboard!");
  };

  const handleExport = () => {
    triggerToast("PDF generation initiated... Download will begin shortly.");
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const activeDayItinerary = trip.itinerary.find((d) => d.day === activeDay) || trip.itinerary[0];

  const weatherIcons = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain,
    snowy: Cloud, // simple fallback
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold shadow-xl border border-border/10 flex items-center space-x-2"
          >
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation and Top Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center space-x-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mr-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => regenerateTrip(trip.id)}
            disabled={isGenerating}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>Regenerate AI</span>
          </button>
          <button
            onClick={handleExport}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handleShare}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <Share2 className="mr-1.5 h-3.5 w-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={() => triggerToast("Itinerary saved successfully!")}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow shadow-primary/20 hover:bg-primary/95"
          >
            <BookmarkCheck className="mr-1.5 h-3.5 w-3.5" />
            <span>Saved</span>
          </button>
        </div>
      </div>

      {/* Header Info Block */}
      <div className="p-6 rounded-3xl border border-border/40 bg-card space-y-4">
        <div className="flex items-center space-x-2.5 text-xs text-primary font-bold uppercase tracking-wider">
          <Compass className="h-4 w-4 animate-spin" style={{ animationDuration: "12s" }} />
          <span>AI GENERATED TRAVEL PLAN</span>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">{trip.destination}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1.5">
            <Calendar className="h-4.5 w-4.5 text-purple-500" />
            <span>
              {new Date(trip.startDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              -{" "}
              {new Date(trip.endDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <DollarSign className="h-4.5 w-4.5 text-emerald-500" />
            <span>{trip.budget} Budget</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <MapPin className="h-4.5 w-4.5 text-cyan-500" />
            <span>{trip.travelStyle} Theme</span>
          </div>
        </div>
      </div>

      {/* Main layout grid: Map & Timeline vs Side Recs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Timeline & Map (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Day Navigation Tabs */}
          <div className="flex items-center space-x-2 border-b border-border/40 pb-2 overflow-x-auto no-scrollbar">
            {trip.itinerary.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                  activeDay === day.day
                    ? "bg-primary text-white shadow shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Day {day.day} ({day.date})
              </button>
            ))}
          </div>

          {/* Map mockup */}
          <div className="rounded-3xl border border-border/40 bg-card p-4 overflow-hidden shadow-sm relative">
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              <Map className="h-3 w-3 text-accent" />
              <span>AI Route Visualizer</span>
            </div>
            {/* SVG stylized map outline */}
            <div className="h-48 w-full bg-slate-900/10 dark:bg-slate-900/50 rounded-2xl border border-border/30 overflow-hidden flex items-center justify-center relative">
              <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M10,20 Q30,50 60,30 T90,80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" />
                <circle cx="10" cy="20" r="1.5" fill="currentColor" />
                <circle cx="90" cy="80" r="1.5" fill="currentColor" />
              </svg>
              {/* Route Markers */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-1.5">
                <MapPin className="h-8 w-8 text-primary animate-bounce" />
                <p className="text-xs font-bold text-foreground">Sequencing route pins near {trip.destination.split(",")[0]}</p>
                <p className="text-[10px] text-muted-foreground">Morning &rarr; Afternoon &rarr; Dinner &rarr; Night Lounge</p>
              </div>
            </div>
          </div>

          {/* Timeline Schedule for selected day */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Timeline Schedule</h3>
            <div className="relative border-l border-border/80 ml-3.5 pl-6 space-y-6">
              {/* MORNING */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 border border-card ring-4 ring-background" />
                <div className="p-4 rounded-2xl border border-border/40 bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-amber-500 uppercase">09:00 AM • Morning Activity</span>
                    <span className="text-xs text-muted-foreground font-semibold">Cost: ${activeDayItinerary.morning.cost}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{activeDayItinerary.morning.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{activeDayItinerary.morning.description}</p>
                  <p className="text-[10px] font-bold text-primary flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{activeDayItinerary.morning.location}</span>
                  </p>
                </div>
              </div>

              {/* AFTERNOON */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary border border-card ring-4 ring-background" />
                <div className="p-4 rounded-2xl border border-border/40 bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-primary uppercase">01:30 PM • Afternoon Sights</span>
                    <span className="text-xs text-muted-foreground font-semibold">Cost: ${activeDayItinerary.afternoon.cost}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{activeDayItinerary.afternoon.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{activeDayItinerary.afternoon.description}</p>
                  <p className="text-[10px] font-bold text-primary flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{activeDayItinerary.afternoon.location}</span>
                  </p>
                </div>
              </div>

              {/* EVENING */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-400 border border-card ring-4 ring-background" />
                <div className="p-4 rounded-2xl border border-border/40 bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-rose-500 uppercase">06:00 PM • Dinner Experience</span>
                    <span className="text-xs text-muted-foreground font-semibold">Cost: ${activeDayItinerary.evening.cost}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{activeDayItinerary.evening.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{activeDayItinerary.evening.description}</p>
                  <p className="text-[10px] font-bold text-primary flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{activeDayItinerary.evening.location}</span>
                  </p>
                </div>
              </div>

              {/* NIGHT */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 border border-card ring-4 ring-background" />
                <div className="p-4 rounded-2xl border border-border/40 bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-indigo-500 uppercase">09:00 PM • Night Leisure</span>
                    <span className="text-xs text-muted-foreground font-semibold">Cost: ${activeDayItinerary.night.cost}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{activeDayItinerary.night.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{activeDayItinerary.night.description}</p>
                  <p className="text-[10px] font-bold text-primary flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{activeDayItinerary.night.location}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Weather, Expenses, Dining & Hotels (1 Col) */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <div className="p-6 rounded-3xl border border-border/40 bg-card space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
              <Cloud className="h-4.5 w-4.5 text-cyan-500" />
              <span>Weather Outlook</span>
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {trip.weather.map((w) => {
                const Icon = weatherIcons[w.condition] || Sun;
                return (
                  <div key={w.day} className="flex flex-col items-center p-2 rounded-xl bg-muted/40 border border-border/30">
                    <span className="text-xs font-semibold text-muted-foreground">{w.day}</span>
                    <Icon className="h-5 w-5 text-primary my-2" />
                    <span className="text-xs font-bold text-foreground">{w.temp}°C</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget visualizer card */}
          <BudgetCard costs={trip.costs} />

          {/* Accommodation Recs */}
          <div className="p-6 rounded-3xl border border-border/40 bg-card space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
              <Hotel className="h-4.5 w-4.5 text-primary" />
              <span>AI Hotel Matches</span>
            </h3>
            <div className="space-y-3.5">
              {trip.hotels.map((h) => (
                <div key={h.name} className="flex items-center space-x-3 p-2 border border-border/30 rounded-2xl bg-muted/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={h.image} alt={h.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground truncate">{h.name}</h4>
                    <div className="flex items-center space-x-2 text-[10px] text-muted-foreground mt-0.5">
                      <span className="flex items-center text-amber-500 font-bold">
                        <Star className="h-3 w-3 fill-amber-500 mr-0.5" />
                        {h.rating}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-foreground">${h.pricePerNight}/night</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Food and Dining Recs */}
          <div className="p-6 rounded-3xl border border-border/40 bg-card space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
              <Utensils className="h-4.5 w-4.5 text-rose-500" />
              <span>AI Dining Pins</span>
            </h3>
            <div className="space-y-3">
              {trip.restaurants.map((r) => (
                <div key={r.name} className="flex items-center justify-between p-3 border border-border/30 rounded-2xl bg-muted/30 text-xs">
                  <div>
                    <h4 className="font-bold text-foreground">{r.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{r.cuisine}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-right">
                    <span className="text-[10px] font-bold text-emerald-500">{r.priceLevel}</span>
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="h-3 w-3 fill-amber-500 mr-0.5" />
                      {r.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transit Suggestions */}
          <div className="p-6 rounded-3xl border border-border/40 bg-card space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
              <Navigation className="h-4.5 w-4.5 text-purple-500" />
              <span>Transit Suggestions</span>
            </h3>
            <div className="space-y-3 text-xs">
              {trip.transports.map((t) => (
                <div key={t.description} className="flex items-center justify-between p-3 border border-border/30 rounded-2xl bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold uppercase text-[10px] text-primary">{t.type}</span>
                    <span className="text-muted-foreground">{t.description}</span>
                  </div>
                  <span className="font-bold text-foreground">${t.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
