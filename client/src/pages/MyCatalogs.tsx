import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth, useSelect } from "@/App";
import { getProductById, CATEGORIES } from "@/lib/localData";
import { formatPrice, efficiencyColor } from "@/lib/utils";
import { Link } from "wouter";
import { Trash2, Share2, CheckCircle2, BookOpen, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Catalog = { id: string; name: string; productIds: number[]; createdAt: string };

const STORAGE_KEY = "hvac_catalogs";

function loadCatalogs(): Catalog[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"); }
  catch { return []; }
}

function saveCatalogs(catalogs: Catalog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogs));
}

export default function MyCatalogsPage() {
  const { user } = useAuth();
  const { selected, clear } = useSelect();
  const { toast } = useToast();
  const [catalogs, setCatalogs] = useState<Catalog[]>(loadCatalogs);
  const [newName, setNewName] = useState("");
  const [activeCatalog, setActiveCatalog] = useState<string | null>(null);

  function createCatalog() {
    if (!newName.trim()) return;
    const c: Catalog = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      productIds: [...selected],
      createdAt: new Date().toISOString(),
    };
    const updated = [c, ...catalogs];
    setCatalogs(updated);
    saveCatalogs(updated);
    clear();
    setNewName("");
    toast({ title: "Catalog created", description: `"${c.name}" saved with ${c.productIds.length} product${c.productIds.length !== 1 ? "s" : ""}.` });
  }

  function deleteCatalog(id: string) {
    const updated = catalogs.filter(c => c.id !== id);
    setCatalogs(updated);
    saveCatalogs(updated);
    if (activeCatalog === id) setActiveCatalog(null);
  }

  function shareLink(id: string) {
    const url = `${window.location.origin}/shared/${id}`;
    navigator.clipboard.writeText(url).then(() =>
      toast({ title: "Link copied", description: "Share link copied to clipboard." })
    );
  }

  const active = activeCatalog ? catalogs.find(c => c.id === activeCatalog) : null;

  if (!user) {
    return (
      <AppLayout title="My Catalogs">
        <div className="p-6 text-muted-foreground text-sm">Please sign in to manage catalogs.</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="My Catalogs">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {/* Create new */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-sm mb-3">Create New Catalog</h2>
          {selected.size > 0 && (
            <p className="text-xs text-primary mb-3">{selected.size} product{selected.size !== 1 ? "s" : ""} selected from catalog</p>
          )}
          <div className="flex gap-2">
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Catalog name (e.g. \"Smith Residence Build\")"
              className="flex-1 bg-muted/50"
              onKeyDown={e => e.key === "Enter" && createCatalog()}
            />
            <Button onClick={createCatalog} disabled={!newName.trim()} size="sm" className="gap-1.5">
              <Plus size={14} /> Create
            </Button>
          </div>
        </div>

        {catalogs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No catalogs yet. Select products from the catalog and create one above.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {catalogs.map(c => (
              <div
                key={c.id}
                className={`bg-card border rounded-xl overflow-hidden transition-all ${activeCatalog === c.id ? "border-primary/50" : "border-border"}`}
              >
                <div
                  className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30"
                  onClick={() => setActiveCatalog(activeCatalog === c.id ? null : c.id)}
                >
                  <div>
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.productIds.length} product{c.productIds.length !== 1 ? "s" : ""} · {new Date(c.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={e => { e.stopPropagation(); shareLink(c.id); }} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"><Share2 size={14} /></button>
                    <button onClick={e => { e.stopPropagation(); deleteCatalog(c.id); }} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                  </div>
                </div>
                {activeCatalog === c.id && c.productIds.length > 0 && (
                  <div className="border-t border-border/60 divide-y divide-border/40">
                    {c.productIds.map(pid => {
                      const p = getProductById(pid);
                      if (!p) return null;
                      return (
                        <div key={pid} className="px-4 py-2.5 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">{p.modelNumber}</p>
                          </div>
                          <div className="text-right">
                            {p.seer2 && <p className={`text-xs font-semibold ${efficiencyColor(p.seer2)}`}>{p.seer2} SEER2</p>}
                            <p className="text-sm font-semibold">
                              {user.role === "distributor" ? formatPrice(p.distributorPrice) :
                               user.role === "dealer" ? formatPrice(p.dealerPrice) :
                               formatPrice(p.listPrice)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
