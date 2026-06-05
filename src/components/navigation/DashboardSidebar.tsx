"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { LayoutDashboard, Plus, User, MessageSquare, LogOut, Settings, Sparkles, ChevronRight } from "lucide-react";

export default function DashboardSidebar() {
  const { user, logout } = useAuthStore();
  const { isOpen: isChatOpen, setIsOpen: setChatOpen } = useChatStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Create Trip", href: "/dashboard/create", icon: Plus },
    { name: "Copilot Chat", href: "#copilot", icon: MessageSquare, isChatToggle: true },
    { name: "Profile & Settings", href: "/dashboard/profile", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border/40 bg-card p-6 h-[calc(100vh-4rem)] sticky top-16">
      {/* User Card */}
      {user && (
        <div className="flex items-center space-x-3 p-3 rounded-2xl bg-muted/40 border border-border/30 mb-8">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold truncate text-foreground">{user.name}</h4>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      )}

      {/* Nav Menu */}
      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.isChatToggle) {
            return (
              <button
                key={item.name}
                onClick={() => setChatOpen(!isChatOpen)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isChatOpen
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.name}</span>
                </div>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-[10px] text-accent font-bold">
                  AI
                </div>
              </button>
            );
          }

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold shadow-sm shadow-primary/5"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-4.5 w-4.5" />
                <span>{item.name}</span>
              </div>
              <ChevronRight className={`h-4 w-4 opacity-55 transition-transform ${isActive ? "translate-x-0.5 opacity-100" : ""}`} />
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="pt-4 border-t border-border/40">
        <button
          onClick={handleLogout}
          className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive/80 transition-all hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
