import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/App";
import { getProducts, getMatchupsForOutdoorUnit } from "@/lib/localData";
import { formatPrice, efficiencyColor } from "@/lib/utils";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Zap, Flame, Wind } from "lucide-react";

export default function SystemBuilderPage() {
  const { user } = useAuth();
  const [selectedOutdoorId, setSelectedOutdoorId] = useState<number | null>(null);

  const outdoorUnits = useMemo(() =>
    getProducts().filter(p => p.type === "outdoor"),
  []);

  const matchups = useMemo(() =>
    selectedOutdoorId ? getMatchupsForOutdoorUnit(selectedOutdoorId) : [],
  [selectedOutdoorId]);

  const selectedOutdoor = outdoorUnits.find(p => p.id === selectedOutdoorId);

  return (
    <AppLayout title="System Builder">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">

        {/* Step 1: Select outdoor unit */}
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
            <h2 className="font-semibold text-sm">Step 1: Select Outdoor Unit</h2>
            <span className="text-xs text-muted-foreground">{outdoorUnits.length} units</span>
          </div>
          <div className="p-3">
            <div className="relative">
              <select
                value={selectedOutdoorId ?? ""}
                onChange={e => setSelectedOutdoorId(e.target.value ? Number(e.target.value) : null)}
                className="w-full h-10 pl-3 pr-8 text-sm bg-muted border border-border rounded-lg appearance-none cursor-pointer text-foreground"
              >
                <option value="">-- Choose an outdoor unit --</option>
                {outdoorUnits.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.modelNumber} — {u.name} ({u.tonCapacity}T{u.seer2 ? `, ${u.seer2} SEER2` : ""})
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            {selectedOutdoor && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{selectedOutdoor.brand} {selectedOutdoor.series}</span>
                {selectedOutdoor.seer2 && <span className={`text-xs px-2 py-1 rounded bg-muted font-semibold ${efficiencyColor(selectedOutdoor.seer2)}`}>{selectedOutdoor.seer2} SEER2</span>}
                {selectedOutdoor.hspf2 && <span className="text-xs px-2 py-1 rounded bg-muted text-blue-400 font-semibold">{selectedOutdoor.hspf2} HSPF2</span>}
                {selectedOutdoor.refrigerant && <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{selectedOutdoor.refrigerant}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Compatible systems */}
        {selectedOutdoorId && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
              <h2 className="font-semibold text-sm">Step 2: Compatible System Configurations</h2>
              <span className="text-xs text-muted-foreground">{matchups.length} matchup{matchups.length !== 1 ? "s" : ""}</span>
            </div>

            {matchups.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No matchups found for this outdoor unit.
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {matchups.map(m => {
                  const systemIcon = m.systemType?.includes("HP") ? Wind :
                    m.systemType?.includes("Gas") ? Flame : Zap;
                  const SystemIcon = systemIcon;
                  return (
                    <div key={m.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <SystemIcon size={13} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{m.systemType} System</p>
                            <p className="text-xs text-muted-foreground font-mono">{m.ahriRefNumber}</p>
                          </div>
                        </div>
                        {m.isAhriCertified && (
                          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded font-semibold">AHRI Certified</span>
                        )}
                      </div>

                      {/* Efficiency badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {m.certifiedSeer2 && <span className={`text-xs font-semibold px-2 py-0.5 rounded bg-muted ${efficiencyColor(m.certifiedSeer2)}`}>{m.certifiedSeer2} SEER2</span>}
                        {m.certifiedEer2 && <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-sky-400">{m.certifiedEer2} EER2</span>}
                        {m.certifiedHspf2 && <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-blue-400">{m.certifiedHspf2} HSPF2</span>}
                      </div>

                      {/* System components */}
                      <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                        {m.outdoorUnit && (
                          <ComponentRow label="Outdoor" product={m.outdoorUnit} userRole={user?.role} />
                        )}
                        {m.indoorUnit && (
                          <ComponentRow label="Indoor" product={m.indoorUnit} userRole={user?.role} />
                        )}
                        {m.coil && (
                          <ComponentRow label="Coil" product={m.coil} userRole={user?.role} />
                        )}
                        {m.furnace && (
                          <ComponentRow label="Furnace" product={m.furnace} userRole={user?.role} />
                        )}
                      </div>

                      {m.notes && (
                        <p className="text-xs text-muted-foreground mt-2 italic">{m.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {!selectedOutdoorId && (
          <div className="text-center py-12 text-muted-foreground">
            <ArrowRight size={28} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">Select an outdoor unit above to see compatible system configurations.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function ComponentRow({ label, product, userRole }: { label: string; product: any; userRole?: string }) {
  const price = userRole === "distributor" ? product.distributorPrice :
    userRole === "dealer" ? product.dealerPrice :
    product.listPrice;
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-muted-foreground w-14 flex-shrink-0">{label}</span>
        <Link href={`/product/${product.id}`} className="font-mono text-primary hover:underline truncate">{product.modelNumber}</Link>
      </div>
      {price && (
        <span className="font-semibold flex-shrink-0">
          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price)}
        </span>
      )}
    </div>
  );
}
