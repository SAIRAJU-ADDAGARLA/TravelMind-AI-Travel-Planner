"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  User,
  Settings,
  Sparkles,
  MapPin,
  TrendingUp,
  Award,
  Globe,
  Compass,
  BookmarkCheck,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, updateProfile, updatePreferences } = useAuthStore();
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    updateProfile(data.name, data.email);
    triggerSuccess("Profile updated successfully!");
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleStyleChange = (style: string) => {
    updatePreferences({ travelStyle: style });
    triggerSuccess(`Travel style updated to ${style}!`);
  };

  const styleOptions = ["Adventure", "Luxury", "Budget", "Family", "Solo", "Backpacking"];
  const interestOptions = ["Beaches", "Food", "Nature", "History", "Shopping", "Photography", "Nightlife", "Trekking"];

  const toggleInterest = (interest: string) => {
    if (!user) return;
    const current = user.preferences.interests;
    const next = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];

    updatePreferences({ interests: next });
    triggerSuccess("Interests updated!");
  };

  const stats = [
    { label: "Countries Visited", value: user?.stats.countriesVisited || 0, icon: Globe, color: "text-blue-500" },
    { label: "AI Plans Created", value: user?.stats.tripsCount || 0, icon: Compass, color: "text-purple-500" },
    { label: "Saved Locations", value: user?.stats.savedDestinations || 0, icon: BookmarkCheck, color: "text-cyan-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold shadow-xl flex items-center space-x-1.5"
          >
            <CheckCircle className="h-4 w-4" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <span>Profile & Settings</span>
          <Settings className="h-5.5 w-5.5 text-primary" />
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your travel profile details, defaults, and review your statistics.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((st) => {
          const Icon = st.icon;
          return (
            <div key={st.label} className="p-5 rounded-2xl border border-border/40 bg-card/60 flex items-center space-x-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-muted`}>
                <Icon className={`h-5 w-5 ${st.color}`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{st.label}</p>
                <p className="text-xl font-black text-foreground mt-0.5">{st.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Form & Settings Group */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: General Info Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl border border-border/40 bg-card space-y-6">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-primary" />
              <span>Personal Information</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Display Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name")}
                  className={`w-full rounded-xl border bg-background/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 ${
                    errors.name
                      ? "border-destructive focus:ring-destructive"
                      : "border-border/80 focus:border-primary focus:ring-primary"
                  }`}
                />
                {errors.name && <p className="text-xs text-destructive font-medium">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("email")}
                  className={`w-full rounded-xl border bg-background/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 ${
                    errors.email
                      ? "border-destructive focus:ring-destructive"
                      : "border-border/80 focus:border-primary focus:ring-primary"
                  }`}
                />
                {errors.email && <p className="text-xs text-destructive font-medium">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-xs font-semibold text-white shadow hover:bg-primary/95 disabled:opacity-50"
              >
                {isSubmitting ? "Saving Updates..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Travel Interests Preferences Card */}
          <div className="p-6 rounded-3xl border border-border/40 bg-card space-y-6">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-accent" />
              <span>Interests & Activities Preferences</span>
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              These will pre-fill whenever you launch the AI Travel Creator wizard.
            </p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => {
                const isSelected = user?.preferences.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isSelected
                        ? "bg-primary border-primary text-white"
                        : "border-border bg-background/50 hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Preference defaults (Travel Style selection) */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-border/40 bg-card space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-secondary" />
              <span>Default Travel Theme</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your select theme maps hotel recommendations by default.
            </p>
            <div className="grid grid-cols-1 gap-2">
              {styleOptions.map((style) => {
                const isSelected = user?.preferences.travelStyle === style;
                return (
                  <button
                    key={style}
                    onClick={() => handleStyleChange(style)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background/30 hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>{style}</span>
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
