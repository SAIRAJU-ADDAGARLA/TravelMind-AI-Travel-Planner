"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
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
} from "lucide-react";

// Form validation schema
const tripFormSchema = z.object({
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  budget: z.string().min(1, "Budget is required"),
  travelStyle: z.string().min(1, "Travel style is required"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
});

type TripFormValues = z.infer<typeof tripFormSchema>;

function CreateTripForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { generateTrip, isGenerating, generationStep, generationStatus } = useTripStore();
  const [step, setStep] = useState(1);

  const styleOptions = [
    { label: "Adventure", desc: "High energy, outdoors, trekking" },
    { label: "Luxury", desc: "Premium hotels, fine dining, private tours" },
    { label: "Budget", desc: "Cost-efficient stays, street eats, public transport" },
    { label: "Family", desc: "Kid-friendly spots, relaxed speed, family suites" },
    { label: "Solo", desc: "Flexible schedule, social meetups, hostel guides" },
    { label: "Backpacking", desc: "Nature walks, local exchanges, lightweight packing" },
  ];

  const interestOptions = [
    "Beaches",
    "Food",
    "Nature",
    "History",
    "Shopping",
    "Photography",
    "Nightlife",
    "Trekking",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      destination: searchParams.get("destination") || "",
      startDate: "",
      endDate: "",
      budget: "Mid-range",
      travelStyle: "Adventure",
      interests: [],
    },
  });

  const selectedInterests = watch("interests");
  const selectedStyle = watch("travelStyle");
  const selectedBudget = watch("budget");

  // Sync destination if passed from query
  useEffect(() => {
    const dest = searchParams.get("destination");
    if (dest) {
      setValue("destination", dest);
    }
  }, [searchParams, setValue]);

  const handleNext = () => {
    // Basic local validations for stepper
    if (step === 1) {
      const dest = watch("destination");
      if (!dest || dest.length < 2) return;
    }
    if (step === 2) {
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
      const tripId = await generateTrip(data);
      router.push(`/dashboard/itinerary/${tripId}`);
    } catch (e) {
      console.error(e);
    }
  };

  // Stepper animations
  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      {/* Back button */}
      {step > 1 && !isGenerating && (
        <button
          onClick={handleBack}
          className="inline-flex items-center space-x-1 text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      )}

      {/* Generating Progress State Overlay */}
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
              <h2 className="text-xl font-extrabold text-foreground">Assembling Your Itinerary</h2>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider h-5 overflow-hidden">
                {generationStatus}
              </p>
            </div>

            {/* Progress Bar */}
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
              &ldquo;Weather conditions, local operating hours, and transit schedules are being structured for you.&rdquo;
            </div>
          </motion.div>
        </div>
      )}

      {/* Main card */}
      {!isGenerating && (
        <div className="rounded-3xl border border-border/40 bg-card p-8 shadow-xl relative overflow-hidden">
          {/* Top Progress bar */}
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
              {/* STEP 1: DESTINATION */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Compass className="h-5 w-5 text-primary" />
                      <span>Where to?</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enter a city, region, or tourist country (e.g. Tokyo, Paris, Bali).
                    </p>
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="e.g. Kyoto, Japan"
                      {...register("destination")}
                      className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                        errors.destination ? "border-destructive focus:ring-destructive" : "border-border/80 focus:border-primary focus:ring-primary"
                      }`}
                    />
                    {errors.destination && <p className="text-xs text-destructive font-medium">{errors.destination.message}</p>}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DATES */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <span>When are you going?</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select your travel start and end dates to lock local calendar rates.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Start Date</label>
                      <input
                        type="date"
                        {...register("startDate")}
                        className="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">End Date</label>
                      <input
                        type="date"
                        {...register("endDate")}
                        className="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  {(errors.startDate || errors.endDate) && (
                    <p className="text-xs text-destructive font-medium">Please pick valid start and end dates.</p>
                  )}
                </motion.div>
              )}

              {/* STEP 3: BUDGET */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <DollarSign className="h-5 w-5 text-emerald-500" />
                      <span>Select Budget Tier</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      How do you intend to allocate your funds?
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["Budget", "Mid-range", "Luxury"].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setValue("budget", tier)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                          selectedBudget === tier
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "border-border/80 hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <span className="text-sm">{tier}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: STYLE */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Briefcase className="h-5 w-5 text-accent" />
                      <span>Travel Style</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pick a theme matching your travel pace and party requirements.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {styleOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => setValue("travelStyle", opt.label)}
                        className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                          selectedStyle === opt.label
                            ? "border-primary bg-primary/5 text-foreground font-bold shadow-sm"
                            : "border-border/80 hover:bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        <span className={`text-sm ${selectedStyle === opt.label ? "text-primary" : "text-foreground"}`}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-normal mt-0.5 leading-relaxed">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: INTERESTS */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-1.5">
                      <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                      <span>What do you like?</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select interests to help the AI map dining, routes, and hotspots (Select all that apply).
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {interestOptions.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() => {
                            if (isSelected) {
                              setValue(
                                "interests",
                                selectedInterests.filter((i) => i !== interest)
                              );
                            } else {
                              setValue("interests", [...selectedInterests, interest]);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
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
                  <span>Generate Itinerary</span>
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
