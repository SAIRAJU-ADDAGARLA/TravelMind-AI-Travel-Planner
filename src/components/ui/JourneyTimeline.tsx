"use client";

import { Stopover } from "@/store/useTripStore";
import { MapPin, Clock, Star, Sparkles, Map, Bike, Car, Train, Plane } from "lucide-react";
import { motion } from "framer-motion";

interface JourneyTimelineProps {
  source: string;
  destination: string;
  mode: string;
  stopovers: Stopover[];
}

export default function JourneyTimeline({ source, destination, mode, stopovers }: JourneyTimelineProps) {
  const getModeIcon = () => {
    switch (mode?.toLowerCase()) {
      case "bike": return Bike;
      case "car": return Car;
      case "train": return Train;
      case "flight": return Plane;
      default: return Car;
    }
  };

  const ModeIcon = getModeIcon();

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "Spiritual": return "🛕";
      case "Food": return "🍛";
      case "Heritage": return "🏰";
      case "Nature": return "🌿";
      case "Viewpoint": return "🌄";
      case "Adventure": return "🏍️";
      case "Instagram": return "📸";
      case "Beaches": return "🌊";
      default: return "📍";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Journey Discovery Engine™</h3>
          <p className="text-xs text-muted-foreground">Discovering points of interest along your roadtrip route</p>
        </div>
        <div className="flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-xl text-xs font-semibold">
          <ModeIcon className="h-4 w-4" />
          <span>Via {mode} Route</span>
        </div>
      </div>

      {/* Vertical Stepper Timeline */}
      <div className="relative pl-6 sm:pl-8 ml-3.5 border-l-2 border-dashed border-border/80 space-y-8">
        
        {/* SOURCE */}
        <div className="relative">
          <span className="absolute -left-[35px] sm:-left-[43px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white border-4 border-card ring-2 ring-emerald-500/20 font-bold text-xs shadow shadow-emerald-500/30">
            S
          </span>
          <div className="flex flex-col space-y-0.5">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Journey Start (Source)</span>
            <h4 className="text-base font-extrabold text-foreground">{source}</h4>
          </div>
        </div>

        {/* STOPOVERS */}
        {stopovers.map((stop, idx) => {
          const emoji = getCategoryEmoji(stop.category);
          
          return (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Pulsing indicator node */}
              <span className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-card border-2 border-primary/60 text-base shadow shadow-primary/20 group-hover:scale-110 group-hover:border-primary transition-all relative z-10">
                <span>{emoji}</span>
              </span>

              {/* Stopover Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl border border-border/40 bg-card hover:border-primary/20 hover:shadow-lg transition-all">
                
                {/* Visual Image */}
                <div className="relative h-32 md:h-full w-full rounded-xl overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stop.image}
                    alt={stop.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center space-x-1 rounded-lg bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md">
                    <span>{stop.category}</span>
                  </div>
                  {stop.imageAttribution && stop.imageSourceUrl && (
                    <a
                      href={stop.imageSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-2.5 right-2.5 text-[8px] bg-black/80 px-1.5 py-0.5 rounded-md text-white/95 hover:text-white opacity-70 hover:opacity-100 transition-opacity z-20"
                    >
                      Photo: {stop.imageAttribution}
                    </a>
                  )}
                </div>

                {/* Info Text */}
                <div className="md:col-span-2 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h5 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors flex items-center justify-between gap-1.5 flex-wrap">
                      <span>{stop.name}</span>
                      {stop.coords && stop.coords.lat !== undefined && stop.coords.lon !== undefined && (
                        <span className="text-[10px] text-muted-foreground font-normal tracking-wide bg-muted/60 px-2 py-0.5 rounded-md">
                          📍 {stop.coords.lat.toFixed(4)}° N, {stop.coords.lon.toFixed(4)}° E
                        </span>
                      )}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {stop.description}
                    </p>
                  </div>

                  {/* Metadata Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/40 text-[10px] text-muted-foreground font-semibold">
                    <div className="flex items-center space-x-1" title="Highway Distance and Detour Estimate">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">
                        {stop.distanceFromRoute} km (~{Math.max(5, Math.round(stop.distanceFromRoute * 2.2))}m detour)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1" title="Recommended Stay Duration">
                      <Clock className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                      <span className="truncate">{stop.recommendedVisitTime} stay</span>
                    </div>
                    <div className="flex items-center space-x-1 font-bold text-foreground" title="Live Weather Forecast">
                      <span className="text-xs shrink-0">⛅</span>
                      <span className="truncate">
                        {stop.temp !== undefined ? `${stop.temp}°C • ${stop.weatherText || "Live"}` : "Weather unavailable."}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 bg-primary/5 text-primary border border-primary/10 rounded-md px-1 py-0.5 justify-center font-bold">
                      <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{stop.aiScore}% Match</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* DESTINATION */}
        <div className="relative pt-2">
          <span className="absolute -left-[35px] sm:-left-[43px] top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white border-4 border-card ring-2 ring-primary/20 font-bold text-xs shadow shadow-primary/30">
            D
          </span>
          <div className="flex flex-col space-y-0.5">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Journey End (Destination)</span>
            <h4 className="text-base font-extrabold text-foreground">{destination}</h4>
          </div>
        </div>

      </div>
    </div>
  );
}
