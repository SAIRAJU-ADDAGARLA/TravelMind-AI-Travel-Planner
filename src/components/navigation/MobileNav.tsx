"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { Compass, LayoutDashboard, Plus, User, MessageSquare } from "lucide-react";

export default function MobileNav() {
  const { isAuthenticated } = useAuthStore();
  const { setIsOpen: setChatOpen, isOpen: isChatOpen } = useChatStore();
  const pathname = usePathname();

  if (!isAuthenticated) return null;

  const links = [
    { name: "Explore", href: "/", icon: Compass },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Create", href: "/dashboard/create", icon: Plus, isAction: true },
    { name: "Copilot", href: "#copilot", icon: MessageSquare, isChatToggle: true },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block md:hidden border-t border-border/40 bg-background/80 backdrop-blur-md pb-safe-bottom">
      <div className="flex h-16 items-center justify-around px-2">
        {links.map((link) => {
          const Icon = link.icon;

          if (link.isAction) {
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform active:scale-95"
                aria-label="Create Trip"
              >
                <Icon className="h-6 w-6" />
              </Link>
            );
          }

          if (link.isChatToggle) {
            return (
              <button
                key={link.name}
                onClick={() => setChatOpen(!isChatOpen)}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                  isChatOpen ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] mt-0.5 font-medium">{link.name}</span>
              </button>
            );
          }

          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] mt-0.5 font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
