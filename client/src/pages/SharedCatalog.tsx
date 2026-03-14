import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import type { Product, SavedCatalog } from "@shared/schema";
import { formatPrice, efficiencyColor, stagesLabel } from "@/lib/utils";
import { Award, Package } from "lucide-react";

export default function SharedCatalogPage() {
  const { token } = useParams<{ token: string }>();
  const { data, isLoading, isError } = useQuery<{ catalog: SavedCatalog; products: Product[] }>({
    queryKey: [`/api/shared/${token}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading catalog…</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="font-medium">Catalog not found</p>
          <p className="text-sm mt-1">This link may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  const { catalog, products } = data;

  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
          <rect width="28" height="28" rx="6" fill="hsl(210 90% 52% / 0.15)" />
          <path d="M14 4L14 24" stroke="hsl(210 90% 52%)" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 10L14 4L21 10" stroke="hsl(210 90% 52%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="15" r="2" fill="hsl(210 90% 52%)" />
        </svg>
        <span className="text-sm font-semibold">HVAC Pro · Shared Catalog</span>
      </div>
      <h1 className="text-2xl font-bold mt-4 mb-1">{catalog.name}</h1>
      {catalog.description && <p className="text-muted-foreground text-sm mb-2">{catalog.description}</p>}
      <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1.5">
        <Package size={11} /> {products.length} products
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {products.map(p => (
          <div key={p.id} className="bg-card border border-border rounded-xl p-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{p.brand} · {p.series}</div>
            <h3 className="font-semibold text-sm mb-0.5">{p.name}</h3>
            <p className="text-xs text-muted-foreground font-mono mb-3">{p.modelNumber}</p>
            <div className="flex gap-3 text-sm">
              {p.tonCapacity && <div><span className="font-bold">{p.tonCapacity}T</span></div>}
              {p.seer2 && <div><span className={`font-bold ${efficiencyColor(p.seer2)}`}>{p.seer2}</span><span className="text-muted-foreground text-xs ml-1">SEER2</span></div>}
              {p.afue && <div><span className="font-bold text-amber-400">{p.afue}%</span><span className="text-muted-foreground text-xs ml-1">AFUE</span></div>}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8">
        <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          Created with Perplexity Computer
        </a>
      </p>
    </div>
  );
}
