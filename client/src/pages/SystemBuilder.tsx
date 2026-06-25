import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { PRODUCTS, getMatchupsForOutdoorUnit } from "@/lib/localData";
import { formatPrice, efficiencyColor } from "@/lib/utils";
import { useAuth } from "@/App";
import {
  ArrowRight, CheckCircle2, Award, Wrench, RefreshCw,
  Snowflake, Wind, ChevronRight
} from "lucide-react";

export default function SystemBuilderPage() {
  const { user } = useAuth();
  const [selectedOutdoorId, setSelectedOutdoorId] = useState<number | null>(null);
  const [brandFilter, setBrandFilter] = useState<string>("");

  // All outdoor units (type "outdoor") from local data
  const outdoorUnits = useMemo(
    () => PRODUCTS.filter(p => p.type === "outdoor"),
    []
  );

  const brands = useMemo(
    () => [...new Set(outdoorUnits.map(p => p.brand))],
    [outdoorUnits]
  );

  const filteredOutdoor = useMemo(
    () => outdoorUnits.filter(p => !brandFilter || p.brand === brandFilter),
    [outdoorUnits, brandFilter]
  );

  const matchups = useMemo(
    () => (selectedOutdoorId ? getMatchupsForOutdoorUnit(selectedOutdoorId) : []),
    [selectedOutdoorId]
  );

  const selectedOutdoor = outdoorUnits.find(p => p.id === selectedOutdoorId);

  return (
    <AppLayout title="System Builder">
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <p className="text-sm text-muted-foreground mb-6">
          Start with an outdoor unit to see AHRI-certified system matchups with compatible indoor units, air handlers, and furnaces.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Step 1 — Select Outdoor Unit */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">1</div>
              <h2 className="font-semibold text-sm" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Select Outdoor Unit</h2>
              {selectedOutdoorId && (
                <button onClick={() => setSelectedOutdoorId(null)} className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <RefreshCw size={11} /> Reset
                </button>
              )}
            </div>

            {/* Brand filter pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <button
                onClick={() => setBrandFilter("")}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${!brandFilter ? "bg-primary/15 border-primary/40 text-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`}
              >
                All
              </button>
              {brands.map(b => (
                <button
                  key={b}
                  onClick={() => setBrandFilter(brandFilter === b ? "" : b)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${brandFilter === b ? "bg-primary/15 border-primary/40 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredOutdoor.map(unit => {
                const isSelected = selectedOutdoorId === unit.id;
                const isHP = unit.categoryId === 2;
                const Icon = isHP ? Wind : Snowflake;
                return (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedOutdoorId(isSelected ? null : unit.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-primary/10 border-primary/50"
                        : "bg-card border-border hover:border-muted-foreground/40"
                    }`}
                    data-testid={`outdoor-unit-${unit.id}`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isHP ? "bg-blue-500/15" : "bg-teal-500/15"}`}>
                      <Icon size={16} className={isHP ? "text-blue-400" : "text-teal-400"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{unit.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{unit.modelNumber}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {unit.seer2 && (
                        <p className={`text-sm font-bold ${efficiencyColor(unit.seer2)}`}>{unit.seer2} SEER2</p>
                      )}
                      <p className="text-xs text-muted-foreground">{unit.tonCapacity}T</p>
                    </div>
                    {isSelected && <CheckCircle2 size={16} className="text-primary flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 — Matchups */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${selectedOutdoorId ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>2</div>
              <h2 className="font-semibold text-sm" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Compatible Systems</h2>
            </div>

            {!selectedOutdoorId ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground h-64 flex flex-col items-center justify-center">
                <Wrench size={28} className="mb-2 opacity-25" />
                <p className="font-medium text-sm">Select an outdoor unit</p>
                <p className="text-xs mt-1">Compatible systems will appear here</p>
              </div>
            ) : matchups.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground h-64 flex flex-col items-center justify-center">
                <p className="font-medium text-sm">No matchups found</p>
                <p className="text-xs mt-1">for {selectedOutdoor?.name}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {matchups.map(m => (
                  <div key={m.id} className="bg-card border border-border rounded-xl p-4">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {m.isAhriCertified && (
                        <span className="badge-ahri text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <Award size={10} /> AHRI Certified
                        </span>
                      )}
                      {m.systemType && (
                        <span className="bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded-full font-medium border border-border">
                          {m.systemType}
                        </span>
                      )}
                      {m.ahriRefNumber && (
                        <span className="text-[10px] text-muted-foreground font-mono ml-auto">{m.ahriRefNumber}</span>
                      )}
                    </div>

                    {/* Components flow */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3">
                      {m.outdoorUnit && (
                        <ComponentPill type="Outdoor" name={m.outdoorUnit.modelNumber} />
                      )}
                      {m.indoorUnit && (
                        <><ChevronRight size={12} className="text-muted-foreground flex-shrink-0" />
                        <ComponentPill type="Indoor" name={m.indoorUnit.modelNumber} /></>
                      )}
                      {m.coil && (
                        <><ChevronRight size={12} className="text-muted-foreground flex-shrink-0" />
                        <ComponentPill type="Coil" name={m.coil.modelNumber} /></>
                      )}
                      {m.furnace && (
                        <><ChevronRight size={12} className="text-muted-foreground flex-shrink-0" />
                        <ComponentPill type="Furnace" name={m.furnace.modelNumber} /></>
                      )}
                    </div>

                    {/* AHRI performance */}
                    <div className="flex flex-wrap gap-3 text-sm border-t border-border/60 pt-2.5">
                      {m.certifiedSeer2 && (
                        <div><span className={`font-bold ${efficiencyColor(m.certifiedSeer2)}`}>{m.certifiedSeer2}</span><span className="text-muted-foreground text-xs ml-1">SEER2</span></div>
                      )}
                      {m.certifiedEer2 && (
                        <div><span className="font-bold text-blue-400">{m.certifiedEer2}</span><span className="text-muted-foreground text-xs ml-1">EER2</span></div>
                      )}
                      {m.certifiedHspf2 && (
                        <div><span className="font-bold text-blue-300">{m.certifiedHspf2}</span><span className="text-muted-foreground text-xs ml-1">HSPF2</span></div>
                      )}
                      {m.certifiedBtuCooling && (
                        <div><span className="font-medium">{(m.certifiedBtuCooling / 1000).toFixed(0)}K BTU</span><span className="text-muted-foreground text-xs ml-1">cooling</span></div>
                      )}
                      {m.certifiedBtuHeating && (
                        <div><span className="font-medium">{(m.certifiedBtuHeating / 1000).toFixed(0)}K BTU</span><span className="text-muted-foreground text-xs ml-1">heating</span></div>
                      )}
                    </div>

                    {m.notes && (
                      <p className="text-xs text-muted-foreground mt-2 italic">{m.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function ComponentPill({ type, name }: { type: string; name: string }) {
  return (
    <div className="flex-shrink-0 bg-muted/60 border border-border rounded-lg px-2 py-1 text-center">
      <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">{type}</p>
      <p className="text-[10px] font-mono font-medium truncate max-w-[90px]">{name}</p>
    </div>
  );
}
