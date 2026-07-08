import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth, useSelect } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PRODUCTS } from "@/lib/localData";
import type { Product } from "@shared/schema";
import { FolderOpen, Plus, Trash2, BookOpen, Package } from "lucide-react";

// Local-only saved catalog shape — no backend needed for prototype
type LocalCatalog = {
  id: number;
  name: string;
  description: string;
  productIds: number[];
  createdAt: string;
};

// Pre-seeded demo carts so the page isn't empty on first load
const DEMO_CATALOGS: LocalCatalog[] = [
  {
    id: 1,
    name: "High-Efficiency Summer Line",
    description: "Top SEER2 units for residential replacement jobs",
    productIds: [1, 2, 4, 7],
    createdAt: "2026-07-01T09:15:00.000Z",
  },
  {
    id: 2,
    name: "Carrier Infinity Bundle — Q3",
    description: "Full Carrier Infinity system packages for large residential installs",
    productIds: [1, 2, 6, 8, 11],
    createdAt: "2026-06-28T14:30:00.000Z",
  },
  {
    id: 3,
    name: "Trane Heat Pump Replacements",
    description: "Trane XV series heat pump + air handler combos for retrofit projects",
    productIds: [4, 5, 9, 10],
    createdAt: "2026-06-22T08:00:00.000Z",
  },
  {
    id: 4,
    name: "Budget Tier — Goodman Value Pack",
    description: "Entry-level Goodman units for price-sensitive dealer accounts",
    productIds: [12, 13],
    createdAt: "2026-06-15T11:45:00.000Z",
  },
  {
    id: 5,
    name: "Ductless Mini-Split Showcase",
    description: "Multi-zone and single-zone ductless systems for additions and retrofits",
    productIds: [3, 6, 7],
    createdAt: "2026-07-03T16:00:00.000Z",
  },
  {
    id: 6,
    name: "Commercial Light-Commercial Package",
    description: "Packaged rooftop and split systems for small commercial applications",
    productIds: [5, 8, 10, 13],
    createdAt: "2026-07-06T07:30:00.000Z",
  },
];

export default function MyCatalogsPage() {
  const { user } = useAuth();
  const { selected, clear } = useSelect();
  const { toast } = useToast();
  const [createOpen, setCreateOpen] = useState(false);
  const [catalogName, setCatalogName] = useState("");
  const [catalogDesc, setCatalogDesc] = useState("");
  const [catalogs, setCatalogs] = useState<LocalCatalog[]>(DEMO_CATALOGS);
  const [nextId, setNextId] = useState(7);

  function handleCreate() {
    if (!catalogName.trim()) return;
    const newCat: LocalCatalog = {
      id: nextId,
      name: catalogName.trim(),
      description: catalogDesc.trim(),
      productIds: Array.from(selected),
      createdAt: new Date().toISOString(),
    };
    setCatalogs(prev => [newCat, ...prev]);
    setNextId(n => n + 1);
    setCreateOpen(false);
    setCatalogName("");
    setCatalogDesc("");
    clear();
    toast({ title: "Catalog created", description: "Your catalog has been saved." });
  }

  function handleDelete(id: number) {
    setCatalogs(prev => prev.filter(c => c.id !== id));
    toast({ title: "Catalog deleted" });
  }

  return (
    <AppLayout title="My Catalogs">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {/* Selection banner */}
        {selected.size > 0 && (
          <div className="mb-4 flex items-center justify-between bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
            <p className="text-sm font-medium text-primary">{selected.size} product{selected.size !== 1 ? "s" : ""} selected</p>
            <div className="flex items-center gap-2">
              <button onClick={() => clear()} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">
                    <Plus size={12} className="mr-1.5" /> Save as Catalog
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>Create New Catalog</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div>
                      <Label className="text-sm">Catalog Name</Label>
                      <Input
                        value={catalogName}
                        onChange={e => setCatalogName(e.target.value)}
                        placeholder="e.g. Spring 2026 High Efficiency"
                        className="mt-1.5 bg-muted border-border"
                        data-testid="input-catalog-name"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Description (optional)</Label>
                      <Input
                        value={catalogDesc}
                        onChange={e => setCatalogDesc(e.target.value)}
                        placeholder="Short description…"
                        className="mt-1.5 bg-muted border-border"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{selected.size} product{selected.size !== 1 ? "s" : ""} will be included</p>
                    <Button
                      onClick={handleCreate}
                      disabled={!catalogName.trim()}
                      className="w-full bg-primary hover:bg-primary/90"
                      data-testid="button-create-catalog"
                    >
                      Create Catalog
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {/* Empty state */}
        {catalogs.length === 0 && selected.size === 0 && (
          <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
            <FolderOpen size={36} className="mx-auto mb-3 opacity-25" />
            <h3 className="font-semibold text-foreground mb-1">No catalogs yet</h3>
            <p className="text-sm">Select products from the catalog and save them as a curated list.</p>
          </div>
        )}

        {/* Catalog list */}
        <div className="space-y-3">
          {catalogs.map(cat => (
            <CatalogCard
              key={cat.id}
              catalog={cat}
              onDelete={() => handleDelete(cat.id)}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function CatalogCard({ catalog, onDelete }: { catalog: LocalCatalog; onDelete: () => void }) {
  // Resolve product objects from local data
  const products = PRODUCTS.filter(p => catalog.productIds.includes(p.id));

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <BookOpen size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{catalog.name}</h3>
            {catalog.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{catalog.description}</p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Package size={11} /> {catalog.productIds.length} product{catalog.productIds.length !== 1 ? "s" : ""}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(catalog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-red-400"
          data-testid={`button-delete-catalog-${catalog.id}`}
        >
          <Trash2 size={14} />
        </Button>
      </div>

      {/* Product preview */}
      {products.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap gap-1.5">
          {products.slice(0, 4).map(p => (
            <span key={p.id} className="text-[10px] bg-muted border border-border rounded px-1.5 py-0.5 font-mono text-muted-foreground">
              {p.modelNumber}
            </span>
          ))}
          {products.length > 4 && (
            <span className="text-[10px] text-muted-foreground">+{products.length - 4} more</span>
          )}
        </div>
      )}
    </div>
  );
}
