"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, DollarSign, ArrowRight, Star, Heart, Compass, Sparkles, Hotel, Utensils, Route, Navigation } from "lucide-react";
import { Trip, CostBreakdown } from "@/store/useTripStore";

// 1. FEATURE CARD (Landing Page)
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-col p-6 rounded-2xl border border-border/40 bg-card hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
    </motion.div>
  );
}

// 2. DESTINATION CARD (Explore Sections)
interface DestinationCardProps {
  image: string;
  title: string;
  rating: number;
  activityCount: number;
  tags: string[];
}

export function DestinationCard({ image, title, rating, activityCount, tags }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm hover:shadow-xl hover:shadow-accent/5 transition-all cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex flex-col p-5">
        <div className="flex items-center space-x-1.5 text-xs text-muted-foreground mb-1">
          <MapPin className="h-3 w-3 text-primary" />
          <span>Popular Spot</span>
        </div>
        <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold bg-muted px-2 py-0.5 rounded-md text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40 text-xs font-medium text-muted-foreground">
          <span>{activityCount} AI Activities</span>
          <span className="text-primary flex items-center space-x-1 font-semibold group-hover:translate-x-0.5 transition-transform">
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// 3. ITINERARY CARD (Dashboard List)
interface ItineraryCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
}

export function ItineraryCard({ trip, onDelete }: ItineraryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col justify-between p-5 rounded-2xl border border-border/40 bg-card hover:border-primary/20 hover:shadow-lg transition-all"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {trip.destination}
              </h4>
              <p className="text-xs text-muted-foreground">Created {new Date(trip.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(trip.id);
              }}
              className="text-xs font-semibold text-destructive/80 hover:text-destructive px-2 py-1 rounded-lg hover:bg-destructive/10 transition-colors"
            >
              Delete
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-accent" />
            <span>{trip.daysCount} Days ({trip.startDate.substring(5)} to {trip.endDate.substring(5)})</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <DollarSign className="h-4 w-4 text-secondary" />
            <span>{trip.budget} Budget</span>
          </div>
        </div>

        {/* Mini Interests */}
        <div className="flex flex-wrap gap-1 mb-4">
          {trip.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="text-[10px] font-semibold bg-muted px-2 py-0.5 rounded-md text-muted-foreground"
            >
              {interest}
            </span>
          ))}
          {trip.interests.length > 3 && (
            <span className="text-[10px] font-bold text-primary px-1.5 py-0.5">
              +{trip.interests.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-auto">
        <span className="text-xs text-muted-foreground">
          Estimated: <strong className="text-foreground font-semibold">
            {trip.destination.toLowerCase().includes("india") ? "₹" : "$"}{Object.values(trip.costs).reduce((a, b) => a + b, 0)}
          </strong>
        </span>
        <Link
          href={`/dashboard/itinerary/${trip.id}`}
          className="inline-flex h-9 items-center justify-center rounded-xl bg-muted hover:bg-primary hover:text-white px-4 text-xs font-semibold text-foreground transition-all group-hover:translate-x-0.5"
        >
          View Plan
        </Link>
      </div>
    </motion.div>
  );
}

// 4. BUDGET CARD (Cost Breakdown visualizer)
interface BudgetCardProps {
  costs: CostBreakdown;
  currencySymbol?: string;
}

export function BudgetCard({ costs, currencySymbol = "$" }: BudgetCardProps) {
  const total = Object.values(costs).reduce((a, b) => a + b, 0);

  const categories = [
    { name: "Accommodation", amount: costs.hotels, color: "bg-primaryClass", rawColor: "#2563EB", icon: Hotel },
    { name: "Dining & Food", amount: costs.food, color: "bg-secondaryClass", rawColor: "#8B5CF6", icon: Utensils },
    { name: "Activities", amount: costs.activities, color: "bg-accentClass", rawColor: "#06B6D4", icon: Route },
    { name: "Transit", amount: costs.transport, color: "bg-amber-500", rawColor: "#F59E0B", icon: Navigation },
  ];

  return (
    <div className="rounded-2xl border border-border/40 bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-foreground">Estimated Expenses</h3>
        <span className="text-lg font-black text-primary">{currencySymbol}{total}</span>
      </div>

      {/* Aggregate Bar */}
      <div className="flex h-4.5 w-full rounded-lg overflow-hidden bg-muted mb-6">
        {categories.map((cat, idx) => {
          const pct = total > 0 ? (cat.amount / total) * 100 : 0;
          if (pct === 0) return null;

          // Inline styling overrides for background to ensure gradient alignment
          const colorStyles = [
            "bg-[#2563EB]", // primary
            "bg-[#8B5CF6]", // secondary
            "bg-[#06B6D4]", // accent
            "bg-amber-500",
          ];

          return (
            <div
              key={cat.name}
              style={{ width: `${pct}%` }}
              className={`${colorStyles[idx] || "bg-gray-400"} h-full`}
              title={`${cat.name}: ${currencySymbol}${cat.amount} (${pct.toFixed(0)}%)`}
            />
          );
        })}
      </div>

      {/* List items */}
      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const pct = total > 0 ? (cat.amount / total) * 100 : 0;
          const Icon = cat.icon;

          const borderColors = [
            "border-[#2563EB]",
            "border-[#8B5CF6]",
            "border-[#06B6D4]",
            "border-amber-500",
          ];
          const textColors = [
            "text-[#2563EB]",
            "text-[#8B5CF6]",
            "text-[#06B6D4]",
            "text-amber-500",
          ];

          return (
            <div key={cat.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${borderColors[idx]} ${textColors[idx]} bg-transparent`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{pct.toFixed(0)}% of budget</p>
                </div>
              </div>
              <span className="font-bold text-foreground">{currencySymbol}{cat.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
