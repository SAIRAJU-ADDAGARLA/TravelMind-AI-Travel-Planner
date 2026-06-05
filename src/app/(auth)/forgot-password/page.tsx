"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-tr from-background via-primary/5 to-background">
      <div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-64 w-64 rounded-full bg-accent/5 blur-[100px]" />

      <Link
        href="/login"
        className="absolute top-6 left-6 flex items-center space-x-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to sign in</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px] rounded-3xl border border-border/40 glass-premium shadow-2xl p-8 space-y-6"
      >
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            {submitted
              ? "Check your inbox for a recovery link."
              : "We'll send you instructions to reset your password."}
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="flex justify-center text-emerald-500">
              <CheckCircle className="h-16 w-16" />
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="font-semibold text-foreground">Recovery email sent successfully!</p>
              <p className="text-muted-foreground">
                We have emailed a password reset link to your address. It may take a few minutes to arrive.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full flex h-11 items-center justify-center rounded-xl border border-border/80 bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Resend Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                placeholder="alex@example.com"
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
              className="w-full flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/15 hover:bg-primary/95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-xs text-center text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
