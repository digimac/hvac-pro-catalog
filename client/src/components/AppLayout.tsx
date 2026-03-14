import { Link, useLocation } from "wouter";
import { useAuth, useSelect } from "@/App";
import { useState } from "react";
import {
  LayoutGrid, Wind, Thermometer, Layers, FolderOpen,
  Settings, LogOut, Menu, X, Snowflake, Fan, Flame,
  ChevronRight, Bell, ShoppingCart, Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import PerplexityAttribution from "@/components/PerplexityAttribution";

const navItems = [
  { href: "/catalog", label: "Product Catalog", icon: LayoutGrid },
  { href: "/system-builder", label: "System Builder", icon: Wrench },
  { href: "/my-catalogs", label: "My Catalogs", icon: FolderOpen },
];

const adminItems = [
  { href: "/admin", label: "Admin", icon: Settings },
];

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  const { user, setUser } = useAuth();
  const { selected, clear } = useSelect();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleColor: Record<string, string> = {
    admin: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    distributor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    dealer: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  };

  const items = user?.role === "admin" ? [...navItems, ...adminItems] : navItems;

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
          <svg aria-label="HVAC Pro" viewBox="0 0 32 32" width="30" height="30" fill="none">
            <rect width="32" height="32" rx="7" fill="hsl(210 90% 52% / 0.15)" />
            <path d="M16 5 L16 27" stroke="hsl(210 90% 52%)" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 11 L16 5 L24 11" stroke="hsl(210 90% 52%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 17 L24 17" stroke="hsl(185 75% 45%)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="17" r="2.5" fill="hsl(210 90% 52%)" />
            <circle cx="10" cy="22" r="2" stroke="hsl(185 75% 45%)" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="2" stroke="hsl(185 75% 45%)" strokeWidth="1.5" />
          </svg>
          <div>
            <span className="font-bold text-sm" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>HVAC Pro</span>
            <span className="block text-[10px] text-muted-foreground leading-none">Catalog Platform</span>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {items.map(item => {
            const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/12 text-primary border-r-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-testid={`nav-${item.href.replace("/", "")}`}
                >
                  <Icon size={16} />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          {selected.size > 0 && (
            <div className="mb-3 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-xs text-primary font-medium">{selected.size} product{selected.size > 1 ? "s" : ""} selected</p>
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground mt-0.5">Clear selection</button>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  {user?.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate leading-none">{user?.name}</p>
                  <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border font-medium mt-0.5 ${roleColor[user?.role ?? "dealer"]}`}>
                    {user?.role}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setUser(null)} className="text-red-400 hover:text-red-300">
                <LogOut size={14} className="mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="mt-3 text-center">
            <PerplexityAttribution />
          </div>
        </div>
      </aside>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
            <rect width="28" height="28" rx="6" fill="hsl(210 90% 52% / 0.15)" />
            <path d="M14 4L14 24" stroke="hsl(210 90% 52%)" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 10L14 4L21 10" stroke="hsl(210 90% 52%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="14" cy="15" r="2" fill="hsl(210 90% 52%)" />
          </svg>
          <span className="font-bold text-sm" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>HVAC Pro</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-muted">
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border pt-16" onClick={e => e.stopPropagation()}>
            <nav className="p-3 space-y-0.5">
              {items.map(item => {
                const active = location === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <a
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${active ? "bg-primary/12 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </a>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-border">
              <button onClick={() => { setUser(null); setMobileOpen(false); }} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1 flex flex-col min-w-0 lg:pt-0 pt-14">
        {title && (
          <div className="border-b border-border px-6 py-4 bg-card">
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{title}</h1>
          </div>
        )}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
