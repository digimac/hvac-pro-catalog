import { Link, useLocation } from "wouter";
import { useAuth, useSelect } from "@/App";
import { useState } from "react";
import {
  Search, Bell, Settings, LogOut, Menu, X, ChevronRight,
  LayoutGrid, Wrench, FolderOpen, ShoppingCart, Download,
  Star, ChevronDown
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import PerplexityAttribution from "@/components/PerplexityAttribution";

// ── Brand logos (text-based, styled to match the rendering) ──────────────────
const BRANDS = [
  { name: "Carrier", color: "#0070c0", weight: "700" },
  { name: "Trane", color: "#c0392b", weight: "700" },
  { name: "Lennox", color: "#1a1a2e", weight: "700" },
  { name: "Goodman", color: "#e85d04", weight: "700" },
];

// ── Systems & Equipment category structure (mirrors design rendering) ─────────
const SYSTEMS_ITEMS = [
  "Split Gas/Electric",
  "Ductless Split",
  "Split Heat Pump",
  "Split Dual Fuel",
  "Ductless Multi-Zone",
  "Condenser/Coil",
  "Split Electric",
];

const EQUIPMENT_ITEMS = [
  "Condenser",
  "Heat Pump",
  "Furnace",
  "Air Handler",
  "Evaporator Coil",
  "Packaged Heat Pump",
  "Packaged Gas/AC",
];

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showCatalogSidebar?: boolean;
}

export default function AppLayout({ children, title, showCatalogSidebar = false }: AppLayoutProps) {
  const { user, setUser } = useAuth();
  const { selected, clear } = useSelect();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>(null);
  const [systemsOpen, setSystemsOpen] = useState(true);
  const [equipOpen, setEquipOpen] = useState(true);

  const navTabs = [
    { label: "Systems & Equipment", href: "/catalog", key: "catalog" },
    { label: "Carts", href: "/my-catalogs", key: "my-catalogs" },
    { label: "Orders", href: "/orders", key: "orders" },
    { label: "Download Catalogs", href: "/downloads", key: "downloads" },
  ];
  const isActive = (key: string) => location === `/${key}` || (key === "catalog" && (location === "/" || location === "/catalog" || location.startsWith("/product")));

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--background))]">
      {/* ── Top Navigation Bar ────────────────────────────────────────────────── */}
      <header className="top-nav flex items-center px-4 gap-3 z-30 sticky top-0">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mr-4 flex-shrink-0">
          <svg aria-label="HVAC Pro" viewBox="0 0 36 36" width="34" height="34" fill="none">
            <rect width="36" height="36" rx="4" fill="#0070c0" />
            <path d="M18 7 L18 29" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M9 14 L18 7 L27 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 20 L27 20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="20" r="3" fill="white" />
            <circle cx="11" cy="26" r="2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            <circle cx="25" cy="26" r="2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          </svg>
          <div className="leading-tight">
            <span className="font-bold text-sm text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>HVAC Pro</span>
            <span className="block text-[10px] text-gray-500">a member of Carrier group</span>
          </div>
        </div>

        {/* Nav tabs */}
        <nav className="hidden md:flex items-center gap-2 flex-1">
          {navTabs.map(tab => (
            <Link key={tab.key} href={tab.href}>
              <a
                className={`nav-tab ${isActive(tab.key) ? "active-green" : "inactive"}`}
                data-testid={`nav-tab-${tab.key}`}
              >
                {tab.label}
              </a>
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link href="/admin">
              <a className={`nav-tab ${location === "/admin" ? "active-green" : "inactive"}`}>
                Admin
              </a>
            </Link>
          )}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="p-2 rounded hover:bg-gray-100 text-gray-500" data-testid="btn-search">
            <Search size={16} />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 text-gray-500 relative">
            <Bell size={16} />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 text-gray-500">
            <Settings size={16} />
          </button>

          {/* User pill */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {user?.name.charAt(0)}
                </div>
                <div className="text-right leading-tight hidden sm:block">
                  <p className="text-xs font-semibold text-gray-800">{user?.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-gray-500">{user?.companyName?.split(" ").slice(0, 2).join(" ")}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-white">
              <div className="px-3 py-2">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded mt-1 font-medium ${
                  user?.role === "admin" ? "bg-purple-100 text-purple-700" :
                  user?.role === "distributor" ? "bg-blue-100 text-blue-700" :
                  "bg-teal-100 text-teal-700"
                }`}>{user?.role}</span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setUser(null)} className="text-red-600 hover:text-red-700 cursor-pointer">
                <LogOut size={14} className="mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded hover:bg-gray-100">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ── Brand Strip ───────────────────────────────────────────────────────── */}
      <div className="brand-strip px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap mr-1 flex-shrink-0">Browse by brand</span>
        {BRANDS.map(brand => (
          <button
            key={brand.name}
            onClick={() => setBrandFilter(brandFilter === brand.name ? null : brand.name)}
            className={`brand-pill flex-shrink-0 ${brandFilter === brand.name ? "active" : ""}`}
            data-testid={`brand-pill-${brand.name.toLowerCase()}`}
          >
            <span style={{ color: brand.color, fontWeight: brand.weight, fontSize: "0.875rem", fontFamily: "'Cabinet Grotesk', sans-serif", letterSpacing: "-0.01em" }}>
              {brand.name}
            </span>
          </button>
        ))}
      </div>

      {/* ── Body: Sidebar + Content ────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {/* ── Left Category Sidebar ───────────────────────────────────────────── */}
        <aside className="cat-sidebar hidden md:flex flex-col overflow-y-auto flex-shrink-0">
          <div className="p-3 border-b border-gray-100">
            <p className="font-bold text-sm text-gray-800" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Systems & Equipment</p>
          </div>

          {/* Catalog filter dropdown */}
          <div className="px-3 py-2 border-b border-gray-100">
            <select className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-700 cursor-pointer">
              <option>All Catalogs</option>
              <option>Carrier</option>
              <option>Trane</option>
              <option>Lennox</option>
              <option>Goodman</option>
            </select>
          </div>

          {/* Keyword search */}
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="relative">
              <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Keyword, model #, AHRI"
                className="w-full text-xs border border-gray-200 rounded pl-6 pr-2 py-1.5 bg-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Favorites */}
          <button className="cat-sidebar-item gap-1.5 border-b border-gray-100 py-2">
            <Star size={12} className="text-amber-500 fill-amber-500 flex-shrink-0" />
            <span className="font-semibold text-gray-700">Favorites</span>
          </button>

          {/* Systems group */}
          <div>
            <button
              onClick={() => setSystemsOpen(o => !o)}
              className="cat-sidebar-item parent w-full justify-between"
            >
              <span>Systems</span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${systemsOpen ? "rotate-0" : "-rotate-90"}`} />
            </button>
            {systemsOpen && (
              <div className="pl-2">
                {SYSTEMS_ITEMS.map(item => (
                  <button
                    key={item}
                    onClick={() => setActiveSidebarItem(activeSidebarItem === item ? null : item)}
                    className={`cat-sidebar-item w-full ${activeSidebarItem === item ? "active" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Equipment group */}
          <div>
            <button
              onClick={() => setEquipOpen(o => !o)}
              className="cat-sidebar-item parent w-full justify-between"
            >
              <span>Equipment</span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${equipOpen ? "rotate-0" : "-rotate-90"}`} />
            </button>
            {equipOpen && (
              <div className="pl-2">
                {EQUIPMENT_ITEMS.map(item => (
                  <button
                    key={item}
                    onClick={() => setActiveSidebarItem(activeSidebarItem === item ? null : item)}
                    className={`cat-sidebar-item w-full ${activeSidebarItem === item ? "active" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ── Main content area ────────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-auto">
          {/* Page header */}
          {title && (
            <div className="border-b border-gray-200 px-5 py-3 bg-white flex items-center justify-between">
              <h1 className="text-base font-bold text-gray-800" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{title}</h1>
              {selected.size > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[hsl(var(--primary))] font-medium">{selected.size} selected</span>
                  <button onClick={clear} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
              )}
            </div>
          )}
          <div className="flex-1">
            {children}
          </div>
          <footer className="border-t border-gray-200 px-5 py-3 bg-[hsl(220_25%_20%)] flex items-center justify-between">
            <PerplexityAttribution />
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Have a Question?</span>
              <a href="mailto:support@hvacpro.com" className="text-[hsl(var(--primary))] font-semibold hover:underline">
                Contact Distributor
              </a>
              <span>555-555-1234</span>
            </div>
          </footer>
        </main>
      </div>

      {/* ── Mobile nav drawer ─────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl pt-16" onClick={e => e.stopPropagation()}>
            <nav className="p-3 space-y-1">
              {navTabs.map(tab => (
                <Link key={tab.key} href={tab.href}>
                  <a onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded text-sm font-medium ${isActive(tab.key) ? "bg-[hsl(var(--primary))] text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                    {tab.label}
                  </a>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <button onClick={() => { setUser(null); setMobileOpen(false); }} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
