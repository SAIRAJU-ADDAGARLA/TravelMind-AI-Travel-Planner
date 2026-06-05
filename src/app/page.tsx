"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { FeatureCard } from "@/components/ui/Cards";
import {
  Sparkles,
  DollarSign,
  Compass,
  Cloud,
  Navigation,
  MessageSquare,
  ArrowRight,
  Play,
  Check,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: "AI Itinerary Generation",
      description: "Get personalized schedules based on your style, travel speed, and specific interests. No more cookie-cutter itineraries.",
    },
    {
      icon: DollarSign,
      title: "Budget Optimization",
      description: "Our AI adjusts transport, lodging, and activity costs to align perfectly with your budget. Maximize travel value.",
    },
    {
      icon: Compass,
      title: "Smart Recommendations",
      description: "Discover off-the-beaten-path locations, top local restaurants, and secret viewpoints, curated from thousands of data points.",
    },
    {
      icon: Cloud,
      title: "Weather Awareness",
      description: "Itineraries adapt dynamically to the local seasonal forecasts. Indoor museum activities scheduled automatically if it rains.",
    },
    {
      icon: Navigation,
      title: "Interactive Maps",
      description: "Geographically sequenced activities. Walk, drive, or ride-share from one destination to the next with minimal travel time.",
    },
    {
      icon: MessageSquare,
      title: "AI Travel Assistant",
      description: "A copilot in your pocket. Adjust plans on the fly, replace hotels, and get local translation prompts directly in chat.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Enter Preferences",
      description: "Input your travel dates, destination, target budget, and select your interests or activities.",
    },
    {
      num: "02",
      title: "AI Builds Plan",
      description: "Our algorithm calculates weather patterns, map coordinates, local dining, and routes the ideal itinerary.",
    },
    {
      num: "03",
      title: "Travel Smarter",
      description: "Sync plans to your dashboard, chat with your Copilot for adjustments, and share details with travel partners.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Solo Backpacker",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=128&h=128",
      comment: "TravelMind AI helped me plan a 10-day trip to Kyoto in minutes. The local food recommendations were absolute hidden gems!",
      rating: 5,
    },
    {
      name: "Marcus Vance",
      role: "Family Traveler",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=128&h=128",
      comment: "Traveling with three kids is tough, but the family-style itinerary balanced rest times and fun activities perfectly. Highly recommend!",
      rating: 5,
    },
    {
      name: "Elisa Thorne",
      role: "Luxury Explorer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=128&h=128",
      comment: "The luxury suggestions match elite concierge levels. Rooftop dinners, private tours, and premium stays were coordinated beautifully.",
      rating: 5,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-36 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute top-1/3 right-10 -z-10 h-60 w-60 rounded-full bg-accent/5 blur-[90px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Version 2.0 is officially live</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground max-w-4xl mx-auto leading-none"
            >
              Plan Perfect Trips with{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Generate personalized itineraries in seconds. Enter your dates, budget, and travel interests, and watch our AI structure your dream journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/dashboard/create"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all hover:-translate-y-0.5"
              >
                <span>Start Planning</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button
                onClick={() => setShowDemo(true)}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-border/80 bg-card/50 px-6 text-sm font-semibold text-foreground hover:bg-muted transition-all"
              >
                <Play className="mr-2 h-4 w-4 fill-foreground" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Simulated Desktop App Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative mx-auto max-w-5xl rounded-2xl border border-border/40 bg-card p-2 shadow-2xl mt-12 overflow-hidden aspect-[16/9]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-accent/5 to-secondary/5 z-0" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200&h=675"
                alt="App Interface preview"
                className="rounded-xl object-cover h-full w-full relative z-10 border border-border/20 shadow"
              />
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-24 border-t border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Supercharged Travel Capabilities
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No more spreadsheets or endless browser tabs. We synthesize millions of data points to deliver premium travels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feat, idx) => (
                <FeatureCard
                  key={idx}
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-muted/30 border-t border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
                Three simple steps to unlock your next customized holiday adventure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                  <div className="text-6xl font-black bg-gradient-to-br from-primary/30 to-accent/5 bg-clip-text text-transparent select-none">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Loved by Global Explorers
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Read how modern jetsetters use TravelMind AI to explore destinations with absolute confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((test, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between p-6 rounded-2xl border border-border/40 bg-card shadow-sm"
                >
                  <div>
                    <div className="flex space-x-1 text-amber-500 mb-4">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic leading-relaxed mb-6">
                      &ldquo;{test.comment}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{test.name}</h4>
                      <p className="text-xs text-muted-foreground">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="pricing" className="py-24 border-t border-border/20 bg-gradient-to-t from-background via-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect level of AI power for your travel style. Cancel anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Free Plan */}
              <div className="flex flex-col justify-between p-8 rounded-3xl border border-border/40 bg-card shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Explorer</h3>
                  <p className="text-xs text-muted-foreground mb-6">Perfect for weekend getaways.</p>
                  <div className="flex items-baseline text-foreground mb-6">
                    <span className="text-4xl font-extrabold">$0</span>
                    <span className="text-xs font-semibold text-muted-foreground ml-2">/ month</span>
                  </div>
                  <hr className="border-border/40 mb-6" />
                  <ul className="space-y-4 text-sm text-muted-foreground mb-8">
                    <li className="flex items-center space-x-2.5">
                      <Check className="h-4 w-4 text-primary" />
                      <span>3 AI Itinerary Builds / mo</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Standard Day-by-Day timelines</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Export options (PDF text)</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/dashboard"
                  className="flex h-11 w-full items-center justify-center rounded-xl border border-border/80 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col justify-between p-8 rounded-3xl border border-primary/30 bg-card shadow-xl shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                  Popular
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Globetrotter</h3>
                  <p className="text-xs text-muted-foreground mb-6">Unlock full AI capacity & Copilot.</p>
                  <div className="flex items-baseline text-foreground mb-6">
                    <span className="text-4xl font-extrabold">$12</span>
                    <span className="text-xs font-semibold text-muted-foreground ml-2">/ month</span>
                  </div>
                  <hr className="border-border/40 mb-6" />
                  <ul className="space-y-4 text-sm text-muted-foreground mb-8">
                    <li className="flex items-center space-x-2.5">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Unlimited AI Itinerary Builds</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Interactive Weather & Maps</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="h-4 w-4 text-primary" />
                      <span>AI Travel Copilot Integration</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Detailed Cost Optimization breakdowns</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/dashboard/create"
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white shadow shadow-primary/20 hover:bg-primary/95 transition-colors"
                >
                  Start 7-Day Pro Trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO VIDEO MODAL OVERLAY */}
        {showDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-card border border-border/40 shadow-2xl aspect-video"
            >
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              {/* Embed mock beautiful travel video */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="TravelMind AI Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
