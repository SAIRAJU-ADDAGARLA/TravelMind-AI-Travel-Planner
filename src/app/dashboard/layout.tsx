"use client";

import Navbar from "@/components/navigation/Navbar";
import DashboardSidebar from "@/components/navigation/DashboardSidebar";
import MobileNav from "@/components/navigation/MobileNav";
import AICopilotFloating from "@/components/copilot/AICopilotFloating";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm font-semibold text-muted-foreground animate-pulse">
          Loading credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Global top navbar */}
      <Navbar />

      {/* Main dashboard arrangement */}
      <div className="flex flex-1 relative max-w-7xl w-full mx-auto">
        {/* Left-hand side navigation for desktop */}
        <DashboardSidebar />

        {/* Dynamic page content container */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:p-8 pb-24 md:pb-8 max-w-5xl">
          {children}
        </main>
      </div>

      {/* Chat Copilot Widget */}
      <AICopilotFloating />

      {/* Mobile navigation bar */}
      <MobileNav />
    </div>
  );
}
