"use client";

import Link from "next/link";
import { useTripStore } from "@/store/useTripStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { ItineraryCard } from "@/components/ui/Cards";
import {
  Compass,
  Calendar,
  Sparkles,
  Plus,
  MessageSquare,
  Bookmark,
  MapPin,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHome() {
  const { trips, deleteTrip } = useTripStore();
  const { user } = useAuthStore();
  const { setIsOpen: setChatOpen } = useChatStore();

  const savedRecommendCount = user?.stats.savedDestinations || 0;

  const quickStats = [
    {
      name: "Total Trips",
      value: trips.length,
      icon: Compass,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      name: "Upcoming Trips",
      value: trips.filter((t) => new Date(t.startDate) > new Date()).length,
      icon: Calendar,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
    {
      name: "Saved Locations",
      value: savedRecommendCount,
      icon: Bookmark,
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      name: "AI Recommendations",
      value: "98%",
      icon: Sparkles,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  const quickActions = [
    {
      title: "Create Trip",
      description: "Launch multi-step AI builder",
      href: "/dashboard/create",
      icon: Plus,
      color: "from-primary to-blue-500",
    },
    {
      title: "Explore Places",
      description: "Browse curated sights",
      href: "/",
      icon: Compass,
      color: "from-secondary to-purple-500",
    },
  ];

  const aiDestinations = [
    { name: "Kyoto, Japan", tag: "Cultural & Temples", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=200" },
    { name: "Bali, Indonesia", tag: "Beaches & Relaxation", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=200" },
    { name: "Santorini, Greece", tag: "Scenery & Romance", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="space-y-8">
      {/* Header and Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <span>Welcome, {user?.name.split(" ")[0]}</span>
            <UserCheck className="h-5 w-5 text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground">
            Plan, explore, and adjust your AI travel itineraries from one dashboard.
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow shadow-primary/20 hover:bg-primary/95 transition-all hover:-translate-y-0.5"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          <span>New AI Plan</span>
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="p-5 rounded-2xl border border-border/40 bg-card flex items-center space-x-4"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.name}
                </p>
                <p className="text-xl font-black text-foreground mt-0.5">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Trips vs Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Trips list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-primary" />
              <span>Recent Itineraries</span>
            </h2>
            <span className="text-xs font-semibold text-muted-foreground">
              Total {trips.length} Saved
            </span>
          </div>

          {trips.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-dashed border-border/60 bg-card/50 text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Compass className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">No travel itineraries found</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  You haven&apos;t generated any plans yet. Get started by entering your preferences.
                </p>
              </div>
              <Link
                href="/dashboard/create"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-white hover:bg-primary/95"
              >
                Create First Trip
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trips.map((trip) => (
                <ItineraryCard key={trip.id} trip={trip} onDelete={deleteTrip} />
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Side Panel Actions */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((act) => {
                const Icon = act.icon;
                return (
                  <Link
                    key={act.title}
                    href={act.href}
                    className="group flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-card hover:border-primary/20 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${act.color} text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {act.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{act.description}</p>
                      </div>
                    </div>
                    <Plus className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}

              <button
                onClick={() => setChatOpen(true)}
                className="group w-full flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-card hover:border-accent/20 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-accent to-emerald-400 text-white shadow-sm">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                      Ask AI Copilot
                    </h4>
                    <p className="text-xs text-muted-foreground">Adjust trips with chat assistance</p>
                  </div>
                </div>
                <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" />
              </button>
            </div>
          </div>

          {/* AI Curated Places */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>AI Recommendations</span>
            </h2>
            <div className="space-y-3.5">
              {aiDestinations.map((dest) => (
                <div
                  key={dest.name}
                  className="flex items-center space-x-3 p-2.5 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:border-primary/20 transition-all cursor-pointer group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-12 w-12 rounded-xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-bold text-foreground truncate">{dest.name}</h5>
                    <p className="text-[11px] text-muted-foreground truncate">{dest.tag}</p>
                  </div>
                  <Link
                    href={`/dashboard/create?destination=${encodeURIComponent(dest.name)}`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
