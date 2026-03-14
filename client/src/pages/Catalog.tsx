import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useAuth, useSelect } from "@/App";
import AppLayout from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { formatPrice, efficiencyColor, stagesLabel } from "@/lib/utils";
import { getProducts, CATEGORIES } from "@/lib/localData";
import { Search, CheckCircle2, Grid3X3, List, X, Snowflake, Wind, Fan, Flame, Layers } from "lucide-react";

const categoryIcons: Record<string, any> = {
  "air-conditioners": Snowflake,
  "heat-pumps": Wind,
  "air-handlers": Fan,
  "gas-furnaces": Flame,
  "evaporator-coils": Layers,
};

const BRANDS = ["All Brands", "Carrier", "Trane", "Lennox"];
const TONS = [1.5, 2, 2.5, 3, 3.5, 4, 5];

export default function CatalogPage() {
  const { user } = useAuth();
  const { selected, toggle } = useSelect();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [brand, setBrand] = useState("All Brands");
  const [ton, setTon] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const products = useMemo(() => getProducts({
    categoryId: activeCat ?? undefined,
    brand: brand !== "All Brands" ? brand : undefined,
    tonCapacity: ton ?? undefined,
    search: search || undefined,
  }), [activeCat, brand, ton, search]);

  const activeCount = (brand !== "All Brands" ? 1 : 0) + (ton ? 1 : 0) + (activeCat ? 1 : 0);

  return (
    <AppLayout title="Product Catalog">
      <div className="flex h-full">
        <aside className="hidden md:flex flex-col w-52 border-r border-border bg-card/50 flex-shrink-0 p-3 gap-1">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2 mb-1">Categories</p>
          <button
            onClick={() => setActiveCat(null)}
            className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-all ${!activeCat ? "bg-primary/12 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
          >
            <Grid3X3 size={14} /> All Products
          </button>
          {CATEGORIES.map(cat => {
            const Icon = categoryIcons[cat.slug] ?? Layers;
            const active = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(active ? null : cat.id)}
                className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-all text-left ${active ? "bg-primary/12 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              >
                <Icon size={14} />{cat.name}
              </button>
            );
          })}
        </aside>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="border-b border-border bg-card/30 px-4 py-3 flex items-center gap-3 flex-wrap">
            <div className="flex-1 relative min-w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search model, brand, series…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 h-9 bg-muted/50 border-border text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={12} />
                </button>
              )}
            </div>
            <select
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="h-9 px-3 text-sm bg-muted border border-border rounded-md text-foreground cursor-pointer"
            >
              {BRANDS.map(b => <option key={b}>{b}</option>)}
            </select>
            <select
              value={ton ?? ""}
              onChange={e => setTon(e.target.value ? Number(e.target.value) : null)}
              className="h-9 px-3 text-sm bg-muted border border-border rounded-md text-foreground cursor-pointer"
            >
              <option value="">All Sizes</option>
              {TONS.map(t => <option key={t} value={t}>{t} Ton</option>)}
            </select>
            {activeCount > 0 && (
              <button
                onClick={() => { setBrand("All Brands"); setTon(null); setActiveCat(null); setSearch(""); }}
                className="h-9 px-3 text-sm text-muted-foreground hover:text-foreground border border-border rounded-md flex items-center gap-1.5 bg-muted/50"
              >
                <X size={12} /> Clear {activeCount > 1 ? `(${activeCount})` : ""}
              </button>
            )}
            <div className="flex items-center gap-1 ml-auto">
              <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-muted" : "hover:bg-muted/50"}`}><Grid3X3 size={14} /></button>
              <button onClick={() => setViewMode("list")} className={`p-1.5 rounded ${viewMode === "list" ? "bg-muted" : "hover:bg-muted/50"}`}><List size={14} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <Search size={32} className="mb-3 opacity-30" />
                <p className="text-sm">No products match your filters.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="catalog-grid">
                {products.map(p => {
                  const sel = selected.has(p.id);
                  return (
                    <div key={p.id} className={`product-card bg-card border rounded-xl overflow-hidden ${sel ? "border-primary/60 ring-1 ring-primary/30" : "border-border"}`}>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0">
                            <p className="text-xs font-mono text-muted-foreground truncate">{p.modelNumber}</p>
                            <h3 className="font-semibold text-sm leading-tight mt-0.5 line-clamp-2">{p.name}</h3>
                          </div>
                          {user && (
                            <button onClick={() => toggle(p.id)} className={`flex-shrink-0 mt-0.5 ${sel ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                              <CheckCircle2 size={18} strokeWidth={sel ? 2.5 : 1.5} />
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {p.seer2 && <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded bg-muted ${efficiencyColor(p.seer2)}`}>{p.seer2} SEER2</span>}
                          {p.afue && <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-muted text-orange-400">{p.afue}% AFUE</span>}
                          {p.tonCapacity && <span className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{p.tonCapacity}T</span>}
                          <span className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">{stagesLabel(p.stages)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {user?.role === "distributor" && <p className="text-sm font-semibold">{formatPrice(p.distributorPrice)}</p>}
                            {user?.role === "dealer" && <p className="text-sm font-semibold">{formatPrice(p.dealerPrice)}</p>}
                            {user?.role === "admin" && <p className="text-sm font-semibold">{formatPrice(p.dealerPrice)}</p>}
                            {!user && <p className="text-sm font-semibold">{formatPrice(p.listPrice)}</p>}
                            <p className="text-[10px] text-muted-foreground">{p.brand} · {p.series}</p>
                          </div>
                          <Link href={`/product/${p.id}`} className="text-xs text-primary hover:underline font-medium">Details</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {products.map(p => {
                  const sel = selected.has(p.id);
                  return (
                    <div key={p.id} className={`product-card bg-card border rounded-xl px-4 py-3 flex items-center gap-4 ${sel ? "border-primary/60 ring-1 ring-primary/30" : "border-border"}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-mono text-muted-foreground">{p.modelNumber}</p>
                          {p.seer2 && <span className={`text-[10px] font-semibold px-1 py-0.5 rounded bg-muted ${efficiencyColor(p.seer2)}`}>{p.seer2} SEER2</span>}
                        </div>
                        <p className="font-semibold text-sm mt-0.5">{p.name}</p>
                      </div>
                      <div className="hidden sm:block text-right">
                        {user?.role === "distributor" && <p className="text-sm font-semibold">{formatPrice(p.distributorPrice)}</p>}
                        {user?.role === "dealer" && <p className="text-sm font-semibold">{formatPrice(p.dealerPrice)}</p>}
                        {(user?.role === "admin" || !user) && <p className="text-sm font-semibold">{formatPrice(p.listPrice)}</p>}
                        <p className="text-[10px] text-muted-foreground">{p.brand}</p>
                      </div>
                      <Link href={`/product/${p.id}`} className="text-xs text-primary hover:underline font-medium flex-shrink-0">Details</Link>
                      {user && (
                        <button onClick={() => toggle(p.id)} className={`flex-shrink-0 ${sel ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                          <CheckCircle2 size={16} strokeWidth={sel ? 2.5 : 1.5} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
