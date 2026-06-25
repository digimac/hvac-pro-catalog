import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useAuth, useSelect } from "@/App";
import AppLayout from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { formatPrice, efficiencyColor, stagesLabel } from "@/lib/utils";
import { getProducts, CATEGORIES, PRODUCTS } from "@/lib/localData";
import { Search, CheckCircle2, Grid3X3, List, X, Snowflake, Wind, Fan, Flame, Layers, ArrowRight } from "lucide-react";

// ── System types matching the rendering ──────────────────────────────────────
const SYSTEM_TYPES = [
  { label: "Split Gas/Electric", icon: "⚡", bg: "#f0f4f8", filterCat: 1 },
  { label: "Ductless Split",     icon: "❄️", bg: "#f0f8f4", filterCat: null },
  { label: "Split Heat Pump",    icon: "🔥", bg: "#f8f4f0", filterCat: 2 },
  { label: "Split Dual Fuel",    icon: "⛽", bg: "#f4f0f8", filterCat: null },
  { label: "Ductless Multi-Zone",icon: "🌬️", bg: "#f0f8f8", filterCat: null },
  { label: "Condenser/Coil",     icon: "🔧", bg: "#f8f8f0", filterCat: null },
  { label: "Split Electric",     icon: "⚡", bg: "#f8f0f4", filterCat: null },
];

const EQUIPMENT_TYPES = [
  { label: "Condenser",        icon: "❄️",  bg: "#e8f4fd", catSlug: "air-conditioners" },
  { label: "Heat Pump",        icon: "🔥",  bg: "#fdf4e8", catSlug: "heat-pumps" },
  { label: "Furnace",          icon: "🌡️",  bg: "#fde8e8", catSlug: "gas-furnaces" },
  { label: "Air Handler",      icon: "💨",  bg: "#e8fdf0", catSlug: "air-handlers" },
  { label: "Evaporator Coil",  icon: "🧊",  bg: "#e8f4fd", catSlug: "evaporator-coils" },
  { label: "Packaged HP",      icon: "📦",  bg: "#f4e8fd", catSlug: "heat-pumps" },
  { label: "Packaged Gas/AC",  icon: "📦",  bg: "#fdf4e8", catSlug: "air-conditioners" },
];

const categoryIcons: Record<string, any> = {
  "air-conditioners": Snowflake,
  "heat-pumps": Wind,
  "air-handlers": Fan,
  "gas-furnaces": Flame,
  "evaporator-coils": Layers,
};

const BRANDS = ["All Brands", "Carrier", "Trane", "Lennox"];
const TONS = [1.5, 2, 2.5, 3, 3.5, 4, 5];

// ── SVG icons for system tiles (outline-style matching the rendering) ─────────
function SystemTileIcon({ type, bg }: { type: string; bg: string }) {
  const color = "#4a7fb5";
  return (
    <div className="browse-tile-img" style={{ background: bg }}>
      <svg viewBox="0 0 80 80" width="72" height="72" fill="none">
        {/* Generic outdoor unit shape */}
        <rect x="15" y="20" width="50" height="40" rx="4" stroke={color} strokeWidth="2" fill="white" fillOpacity="0.7" />
        <rect x="20" y="25" width="18" height="28" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
        {/* Fan grill circles */}
        <circle cx="29" cy="39" r="8" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="29" cy="39" r="4" stroke={color} strokeWidth="1" fill="none" />
        {/* Fins */}
        <line x1="42" y1="28" x2="42" y2="50" stroke={color} strokeWidth="1" />
        <line x1="46" y1="28" x2="46" y2="50" stroke={color} strokeWidth="1" />
        <line x1="50" y1="28" x2="50" y2="50" stroke={color} strokeWidth="1" />
        <line x1="54" y1="28" x2="54" y2="50" stroke={color} strokeWidth="1" />
        <line x1="58" y1="28" x2="58" y2="50" stroke={color} strokeWidth="1" />
        {/* Base */}
        <rect x="12" y="58" width="56" height="4" rx="2" fill={color} fillOpacity="0.2" />
      </svg>
    </div>
  );
}

function EquipTileIcon({ type, bg }: { type: string; bg: string }) {
  const color = "#4a7fb5";
  const isFurnace = type === "Furnace";
  const isAH = type === "Air Handler";
  const isCoil = type === "Evaporator Coil";

  return (
    <div className="browse-tile-img" style={{ background: bg }}>
      <svg viewBox="0 0 80 80" width="72" height="72" fill="none">
        {isCoil ? (
          <>
            <rect x="12" y="20" width="56" height="40" rx="3" stroke={color} strokeWidth="1.5" fill="white" fillOpacity="0.8" />
            {[0,1,2,3,4,5,6].map(i => (
              <line key={i} x1="15" y1={26 + i * 5} x2="65" y2={26 + i * 5} stroke={color} strokeWidth="1" />
            ))}
            <path d="M25 24 Q35 18 45 24 Q55 30 65 24" stroke="#e05a2b" strokeWidth="1.5" fill="none" />
          </>
        ) : isFurnace ? (
          <>
            <rect x="22" y="15" width="36" height="52" rx="3" stroke={color} strokeWidth="1.5" fill="white" fillOpacity="0.8" />
            <rect x="27" y="20" width="26" height="20" rx="2" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="40" cy="52" r="6" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="40" cy="52" r="2.5" fill={color} fillOpacity="0.4" />
          </>
        ) : isAH ? (
          <>
            <rect x="15" y="18" width="50" height="44" rx="3" stroke={color} strokeWidth="1.5" fill="white" fillOpacity="0.8" />
            <circle cx="40" cy="40" r="14" stroke={color} strokeWidth="1.5" fill="none" />
            {[0,60,120,180,240,300].map((deg, i) => (
              <line key={i}
                x1={40}
                y1={40}
                x2={40 + 12 * Math.cos(deg * Math.PI / 180)}
                y2={40 + 12 * Math.sin(deg * Math.PI / 180)}
                stroke={color} strokeWidth="1.5" strokeLinecap="round"
              />
            ))}
          </>
        ) : (
          <>
            <rect x="15" y="20" width="50" height="40" rx="4" stroke={color} strokeWidth="2" fill="white" fillOpacity="0.7" />
            <circle cx="40" cy="40" r="10" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="40" cy="40" r="5" stroke={color} strokeWidth="1" fill="none" />
            <line x1="55" y1="40" x2="62" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="40" x2="25" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="12" y="58" width="56" height="4" rx="2" fill={color} fillOpacity="0.15" />
          </>
        )}
      </svg>
    </div>
  );
}

export default function CatalogPage() {
  const { user } = useAuth();
  const { selected, toggle } = useSelect();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [brand, setBrand] = useState("All Brands");
  const [ton, setTon] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"browse" | "grid" | "list">("browse");

  const products = useMemo(() => getProducts({
    categoryId: activeCat ?? undefined,
    brand: brand !== "All Brands" ? brand : undefined,
    tonCapacity: ton ?? undefined,
    search: search || undefined,
  }), [activeCat, brand, ton, search]);

  const activeCount = (brand !== "All Brands" ? 1 : 0) + (ton ? 1 : 0) + (activeCat ? 1 : 0);

  function enterCategory(catSlug: string | null) {
    if (!catSlug) { setViewMode("grid"); return; }
    const cat = CATEGORIES.find(c => c.slug === catSlug);
    if (cat) { setActiveCat(cat.id); }
    setViewMode("grid");
  }

  // ── Browse landing view ─────────────────────────────────────────────────────
  if (viewMode === "browse") {
    return (
      <AppLayout>
        <div className="p-5 bg-white min-h-full">

          {/* ── Browse by Systems ─────────────────────────────────────────── */}
          <section className="mb-8">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="border-b border-gray-100 px-5 py-3">
                <h2 className="font-bold text-base text-gray-800" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Browse by Systems</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                  {SYSTEM_TYPES.map(sys => (
                    <button
                      key={sys.label}
                      onClick={() => { sys.filterCat ? setActiveCat(sys.filterCat) : null; setViewMode("grid"); }}
                      className="browse-tile"
                      data-testid={`system-tile-${sys.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <SystemTileIcon type={sys.label} bg={sys.bg} />
                      <span className="browse-tile-label">{sys.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Browse by Equipment Type ──────────────────────────────────── */}
          <section>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="border-b border-gray-100 px-5 py-3">
                <h2 className="font-bold text-base text-gray-800" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Browse by Equipment Type</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                  {EQUIPMENT_TYPES.map(eq => (
                    <button
                      key={eq.label}
                      onClick={() => enterCategory(eq.catSlug)}
                      className="browse-tile"
                      data-testid={`equip-tile-${eq.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <EquipTileIcon type={eq.label} bg={eq.bg} />
                      <span className="browse-tile-label">{eq.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Quick access: View all products ───────────────────────────── */}
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-[hsl(var(--primary))] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              data-testid="btn-view-all-products"
            >
              View All Products <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // ── Product grid / list view ──────────────────────────────────────────────
  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Inner category filter panel */}
        <aside className="hidden md:flex flex-col w-44 border-r border-gray-200 bg-white flex-shrink-0 py-2">
          <button
            onClick={() => setViewMode("browse")}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[hsl(var(--primary))] hover:bg-gray-50 font-medium mb-1"
          >
            ← Browse Landing
          </button>
          <div className="h-px bg-gray-100 mb-2" />
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">Category</p>
          <button
            onClick={() => setActiveCat(null)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm transition-all ${!activeCat ? "text-[hsl(var(--primary))] font-semibold bg-[hsl(var(--primary)/0.06)]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Grid3X3 size={13} /> All Products
          </button>
          {CATEGORIES.map(cat => {
            const Icon = categoryIcons[cat.slug] ?? Layers;
            const active = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(active ? null : cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm transition-all text-left ${active ? "text-[hsl(var(--primary))] font-semibold bg-[hsl(var(--primary)/0.06)] border-l-2 border-[hsl(var(--primary))]" : "text-[hsl(var(--hvac-blue))] hover:bg-gray-50"}`}
                data-testid={`cat-${cat.slug}`}
              >
                <Icon size={13} />{cat.name}
              </button>
            );
          })}
        </aside>

        {/* Main grid */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="border-b border-gray-200 bg-white px-4 py-2.5 flex items-center gap-2.5 flex-wrap">
            <div className="flex-1 relative min-w-36">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search model, brand, series…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 h-8 text-sm border border-gray-200 rounded bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary)/0.2)]"
                data-testid="input-search"
              />
            </div>
            <select
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="h-8 px-2.5 text-sm border border-gray-200 rounded bg-white text-gray-700 cursor-pointer focus:outline-none"
              data-testid="select-brand"
            >
              {BRANDS.map(b => <option key={b}>{b}</option>)}
            </select>
            <select
              value={ton ?? ""}
              onChange={e => setTon(e.target.value ? Number(e.target.value) : null)}
              className="h-8 px-2.5 text-sm border border-gray-200 rounded bg-white text-gray-700 cursor-pointer focus:outline-none"
              data-testid="select-ton"
            >
              <option value="">All Sizes</option>
              {TONS.map(t => <option key={t} value={t}>{t} Ton</option>)}
            </select>
            {activeCount > 0 && (
              <button
                onClick={() => { setBrand("All Brands"); setTon(null); setActiveCat(null); setSearch(""); }}
                className="h-8 px-2.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded flex items-center gap-1 bg-white"
              >
                <X size={11} /> Clear
              </button>
            )}
            <div className="flex items-center gap-1 ml-auto">
              <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]" : "text-gray-400 hover:text-gray-600"}`}>
                <Grid3X3 size={14} />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-1.5 rounded ${viewMode === "list" ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]" : "text-gray-400 hover:text-gray-600"}`}>
                <List size={14} />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-auto p-4 bg-[hsl(var(--background))]">
            {!products.length ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Search size={32} className="mb-3 opacity-30" />
                <p className="font-medium text-gray-600">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} selected={selected.has(product.id)} onSelect={() => toggle(product.id)} role={user?.role ?? "dealer"} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {products.map(product => (
                  <ProductRow key={product.id} product={product} selected={selected.has(product.id)} onSelect={() => toggle(product.id)} role={user?.role ?? "dealer"} />
                ))}
              </div>
            )}
            {products.length > 0 && (
              <p className="text-xs text-gray-400 mt-4 text-center">{products.length} product{products.length !== 1 ? "s" : ""}</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function ProductCard({ product, selected, onSelect, role }: { product: any; selected: boolean; onSelect: () => void; role: string }) {
  return (
    <div className={`product-card relative bg-white border rounded-lg p-4 cursor-pointer ${selected ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.03)]" : "border-gray-200"}`} data-testid={`card-product-${product.id}`}>
      <button
        onClick={onSelect}
        className={`absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selected ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))]" : "border-gray-300 hover:border-[hsl(var(--primary)/0.6)]"}`}
      >
        {selected && <CheckCircle2 size={12} className="text-white" />}
      </button>

      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
        {product.series && <span className="text-[10px] text-gray-300">· {product.series}</span>}
      </div>

      <h3 className="font-semibold text-sm leading-tight mb-1 text-gray-800 pr-6" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{product.name}</h3>
      <p className="text-xs text-gray-400 mb-3 font-mono">{product.modelNumber}</p>

      {/* Key specs */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {product.tonCapacity && (
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800 leading-none">{product.tonCapacity}T</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Tons</span>
          </div>
        )}
        {product.seer2 && (
          <div className="flex flex-col">
            <span className={`text-lg font-bold leading-none ${efficiencyColor(product.seer2)}`}>{product.seer2}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">SEER2</span>
          </div>
        )}
        {product.hspf2 && (
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-blue-600">{product.hspf2}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">HSPF2</span>
          </div>
        )}
        {product.afue && (
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-amber-600">{product.afue}%</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">AFUE</span>
          </div>
        )}
        {product.btuHeating && !product.tonCapacity && (
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-amber-600">{product.btuHeating / 1000}K</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">BTU</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {product.stages && (
          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-blue-50 text-blue-700 border border-blue-100">{stagesLabel(product.stages)}</span>
        )}
        {product.refrigerant && (
          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-gray-100 text-gray-500 border border-gray-200">{product.refrigerant}</span>
        )}
      </div>

      {/* Price & CTA */}
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        <div>
          <p className="text-sm font-bold text-gray-800">
            {role !== "dealer" ? formatPrice(product.distributorPrice) : formatPrice(product.dealerPrice)}
          </p>
          <p className="text-[10px] text-gray-400">{role !== "dealer" ? "Dist. Price" : "Dealer Price"}</p>
        </div>
        <Link href={`/product/${product.id}`}>
          <a className="text-xs font-semibold text-[hsl(var(--primary))] hover:opacity-80 transition-opacity" data-testid={`link-product-${product.id}`}>
            Details →
          </a>
        </Link>
      </div>
    </div>
  );
}

function ProductRow({ product, selected, onSelect, role }: { product: any; selected: boolean; onSelect: () => void; role: string }) {
  return (
    <div className={`product-card flex items-center gap-4 bg-white border rounded-lg px-4 py-3 ${selected ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.02)]" : "border-gray-200"}`}>
      <button onClick={onSelect} className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))]" : "border-gray-300 hover:border-[hsl(var(--primary)/0.6)]"}`}>
        {selected && <CheckCircle2 size={12} className="text-white" />}
      </button>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.brand} · {product.series}</span>
        <h3 className="font-semibold text-sm text-gray-800">{product.name}</h3>
        <p className="text-xs text-gray-400 font-mono">{product.modelNumber}</p>
      </div>
      <div className="hidden sm:flex items-center gap-4 text-sm">
        {product.tonCapacity && <span className="font-medium text-gray-700">{product.tonCapacity}T</span>}
        {product.seer2 && <span className={`font-bold ${efficiencyColor(product.seer2)}`}>{product.seer2} SEER2</span>}
        {product.afue && <span className="font-bold text-amber-600">{product.afue}% AFUE</span>}
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-gray-800">{role !== "dealer" ? formatPrice(product.distributorPrice) : formatPrice(product.dealerPrice)}</p>
        <p className="text-[10px] text-gray-400">{role !== "dealer" ? "Dist." : "Dealer"}</p>
      </div>
      <Link href={`/product/${product.id}`}>
        <a className="text-xs text-[hsl(var(--primary))] hover:opacity-80 font-semibold flex-shrink-0">Details →</a>
      </Link>
    </div>
  );
}
