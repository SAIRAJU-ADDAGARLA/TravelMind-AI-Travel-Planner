"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTripStore } from "@/store/useTripStore";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Compass,
  Calendar,
  DollarSign,
  Briefcase,
  Heart,
  Plane,
  MapPin,
  Languages,
} from "lucide-react";

// Form validation schema for India Edition
const tripFormSchema = z.object({
  source: z.string().min(2, "Source city must be at least 2 characters"),
  destination: z.string().min(2, "Destination city must be at least 2 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  budget: z.string().min(1, "Budget tier is required"),
  mode: z.string().min(1, "Transport mode is required"),
  language: z.string().min(1, "Regional language is required"),
  attractionsPreferred: z.string().min(1, "Journey preference is required"),
  interests: z.array(z.string()).min(1, "Select at least one travel interest"),
});

type TripFormValues = z.infer<typeof tripFormSchema>;

function CreateTripForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { generateTrip, isGenerating, generationStep, generationStatus } = useTripStore();
  const [step, setStep] = useState(1);

  const languages = [
    "English", "Hindi", "Telugu", "Tamil", 
    "Kannada", "Malayalam", "Marathi", "Bengali"
  ];

  const modes = [
    { label: "Bike", desc: "For highway cruisers & riders" },
    { label: "Car", desc: "For family roadtrips & drives" },
    { label: "Train", desc: "For scenic railway journeys" },
    { label: "Flight", desc: "For rapid inter-city transits" }
  ];

  const smartPreferenceOptions = [
    { label: "Temples", emoji: "🛕", desc: "Spiritual Tourism & holy shrines" },
    { label: "Food", emoji: "🍛", desc: "Biryani hubs, local tiffins & dhabas" },
    { label: "Nature", emoji: "🌿", desc: "Waterfalls, scenic vistas & trails" },
    { label: "Adventure", emoji: "🏍️", desc: "Monolith treks & off-road sports" },
    { label: "History", emoji: "🏰", desc: "Heritage forts, palaces & ruins" },
    { label: "Photography", emoji: "📸", desc: "Instagram viewpoints & sights" }
  ];

  const interestOptions = [
    "Spiritual Tourism",
    "Food Discovery",
    "Heritage Routes",
    "Nature Trails",
    "Adventure Activities",
    "Local Shopping",
    "Nightlife & Cafes",
    "Trekking"
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      source: "Bhimavaram",
      destination: searchParams.get("destination") || "Hyderabad",
      startDate: "",
      endDate: "",
      budget: "Mid-range",
      mode: "Bike",
      language: "Telugu",
      attractionsPreferred: "Temples",
      interests: [],
    },
  });

  const selectedInterests = watch("interests");
  const selectedPreference = watch("attractionsPreferred");
  const selectedMode = watch("mode");
  const selectedLanguage = watch("language");
  const selectedBudget = watch("budget");

  // Sync destination if passed from query
  useEffect(() => {
    const dest = searchParams.get("destination");
    if (dest) {
      setValue("destination", dest);
    }
  }, [searchParams, setValue]);

  const handleNext = () => {
    if (step === 1) {
      const src = watch("source");
      const dest = watch("destination");
      if (!src || src.length < 2 || !dest || dest.length < 2) return;
    }
    if (step === 2) {
      const lang = watch("language");
      const md = watch("mode");
      if (!lang || !md) return;
    }
    if (step === 3) {
      const start = watch("startDate");
      const end = watch("endDate");
      if (!start || !end) return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: TripFormValues) => {
    try {
      const tripId = await generateTrip({
        ...data,
        mode: data.mode as "Bike" | "Car" | "Train" | "Flight" | "Bus",
        travelStyle: "Adventure" // default mapping
      });
      router.push(`/dashboard/itinerary/${tripId}`);
    } catch (e) {
      console.error(e);
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      {step > 1 && !isGenerating && (
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center space-x-1 text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      )}

      {isGenerating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-background/90 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-8 rounded-3xl border border-border/40 bg-card/60 glass-premium text-center space-y-6 shadow-2xl"
          >
            <div className="flex justify-center text-primary relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
              <Plane className="h-16 w-16 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-foreground">Journey Discovery Engine™</h2>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider h-5 overflow-hidden">
                {generationStatus}
              </p>
            </div>

            <div className="space-y-1">
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  animate={{ width: `${generationStep}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-right text-[10px] font-bold text-muted-foreground">{generationStep}%</p>
            </div>

            <div className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-border/20 pt-4">
              &ldquo;Discovering everything worth visiting between {watch("source")} and {watch("destination")}...&rdquo;
            </div>
          </motion.div>
        </div>
      )}

      {!isGenerating && (
        <div className="rounded-3xl border border-border/40 bg-card p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground font-semibold mb-8">
            <span className="uppercase tracking-wider">Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}% Completed</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {/* STEP 1: ROUTE SELECTION */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Compass className="h-5 w-5 text-primary" />
                      <span>Set Your Route</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Where is your roadtrip starting, and where is the final destination?
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-500" />
                        <span>Starting City (Source)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bhimavaram"
                        {...register("source")}
                        className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                          errors.source ? "border-destructive focus:ring-destructive" : "border-border/80 focus:border-primary focus:ring-primary"
                        }`}
                      />
                      {errors.source && <p className="text-xs text-destructive font-medium">{errors.source.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span>Destination City</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Hyderabad"
                        {...register("destination")}
                        className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                          errors.destination ? "border-destructive focus:ring-destructive" : "border-border/80 focus:border-primary focus:ring-primary"
                        }`}
                      />
                      {errors.destination && <p className="text-xs text-destructive font-medium">{errors.destination.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: REGIONAL LANGUAGE & MODE */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Languages className="h-5 w-5 text-purple-500" />
                      <span>Language & Mode</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select your regional interface preference and travel style mode.
                    </p>
                  </div>
                  
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Regional Intelligence Support</label>
                    <div className="grid grid-cols-4 gap-2">
                      {languages.map((lang) => (
                        <button
                          type="button"
                          key={lang}
                          onClick={() => setValue("language", lang)}
                          className={`py-2 px-1 text-xs font-semibold rounded-lg border text-center transition-all ${
                            selectedLanguage === lang
                              ? "bg-primary border-primary text-white"
                              : "border-border/85 bg-background/50 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Mode of Transport</label>
                    <div className="grid grid-cols-2 gap-2">
                      {modes.map((opt) => (
                        <button
                          type="button"
                          key={opt.label}
                          onClick={() => setValue("mode", opt.label)}
                          className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                            selectedMode === opt.label
                              ? "border-primary bg-primary/5 text-foreground font-bold"
                              : "border-border/80 hover:bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          <span className={`text-xs ${selectedMode === opt.label ? "text-primary font-bold" : "text-foreground font-semibold"}`}>
                            {opt.label}
                          </span>
                          <span className="text-[9px] text-muted-foreground font-normal mt-0.5">
                            {opt.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: DATES & BUDGET */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Calendar className="h-5 w-5 text-accent" />
                      <span>Dates & Budget</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Set your travel dates and choose your financial comfort tier.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Start Date</label>
                      <input
                        type="date"
                        {...register("startDate")}
                        className="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">End Date</label>
                      <input
                        type="date"
                        {...register("endDate")}
                        className="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Budget Category</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Budget", "Mid-range", "Luxury"].map((tier) => (
                        <button
                          type="button"
                          key={tier}
                          onClick={() => setValue("budget", tier)}
                          className={`flex flex-col items-center justify-center py-3 rounded-xl border text-xs transition-all ${
                            selectedBudget === tier
                              ? "border-primary bg-primary/10 text-primary font-bold"
                              : "border-border/80 hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          <span>{tier}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SMART SUGGESTIONS PREFERENCE */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
                      <span>Smart Stop Preferences</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Which categories should our Journey Discovery Engine™ prioritize and highlight along the route?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {smartPreferenceOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => setValue("attractionsPreferred", opt.label)}
                        className={`flex items-start p-3.5 rounded-xl border text-left transition-all ${
                          selectedPreference === opt.label
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border/85 bg-card hover:bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        <span className="text-2xl mr-2.5 mt-0.5">{opt.emoji}</span>
                        <div className="min-w-0">
                          <span className={`text-xs block ${selectedPreference === opt.label ? "text-primary font-bold" : "text-foreground font-semibold"}`}>
                            {opt.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground leading-normal font-normal">
                            {opt.desc}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: REGIONAL INTERESTS */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                      <span>Select Travel Interests</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Customize your route stops with India-specific travel categories (Select all that apply).
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() => {
                            if (isSelected) {
                              setValue("interests", selectedInterests.filter((i) => i !== interest));
                            } else {
                              setValue("interests", [...selectedInterests, interest]);
                            }
                          }}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            isSelected
                              ? "bg-primary border-primary text-white shadow shadow-primary/20"
                              : "border-border bg-background/50 hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests && <p className="text-xs text-destructive font-medium">{errors.interests.message}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Footer Controls */}
            <div className="pt-6 border-t border-border/40 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card px-4 text-xs font-semibold hover:bg-muted transition-colors text-foreground"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-xs font-semibold text-white shadow hover:bg-primary/95 transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-6 text-xs font-black text-white shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all"
                >
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  <span>Discover Journey</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function CreateTripPage() {
  return (
    <Suspense fallback={
      <div className="flex h-64 items-center justify-center bg-background text-foreground">
        <p className="text-sm font-semibold text-muted-foreground animate-pulse">
          Loading AI Trip Wizard...
        </p>
      </div>
    }>
      <CreateTripForm />
    </Suspense>
  );
}
