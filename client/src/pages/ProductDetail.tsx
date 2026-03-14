import { useParams, Link } from "wouter";
import { useAuth, useSelect } from "@/App";
import AppLayout from "@/components/AppLayout";
import { getProductById, getMatchupsForProduct } from "@/lib/localData";
import { formatPrice, formatBtu, formatTon, efficiencyColor, stagesLabel } from "@/lib/utils";
import { CheckCircle2, ArrowLeft, Snowflake, Wind, Info, Star } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { selected, toggle } = useSelect();
  const product = getProductById(Number(id));
  const matchups = product ? getMatchupsForProduct(product.id) : [];

  if (!product) {
    return (
      <AppLayout title="Product">
        <div className="p-6 text-muted-foreground">Product not found.</div>
      </AppLayout>
    );
  }

  const sel = selected.has(product.id);

  const specRows = [
    { label: "Model Number", value: product.modelNumber },
    { label: "Brand / Series", value: `${product.brand} ${product.series ?? ""}`.trim() },
    { label: "Type", value: product.type },
    { label: "Fuel Type", value: product.fuelType ?? "—" },
    { label: "Capacity", value: product.tonCapacity ? formatTon(product.tonCapacity) : (product.btuHeating ? formatBtu(product.btuHeating) : "—") },
    { label: "Cooling BTU", value: formatBtu(product.btuCooling) },
    { label: "Heating BTU", value: formatBtu(product.btuHeating) },
    { label: "SEER2", value: product.seer2 ? `${product.seer2} SEER2` : "—" },
    { label: "EER2", value: product.eer2 ? `${product.eer2} EER2` : "—" },
    { label: "HSPF2", value: product.hspf2 ? `${product.hspf2} HSPF2` : "—" },
    { label: "AFUE", value: product.afue ? `${product.afue}% AFUE` : "—" },
    { label: "Stages", value: stagesLabel(product.stages) },
    { label: "Voltage", value: product.voltage ?? "—" },
    { label: "Phase", value: product.phase ?? "—" },
    { label: "Refrigerant", value: product.refrigerant ?? "—" },
    { label: "Sound Level", value: product.soundLevel ? `${product.soundLevel} dB` : "—" },
    { label: "Dimensions (W×H×D)", value: product.width ? `${product.width}″ × ${product.height}″ × ${product.depth}″` : "—" },
    { label: "Weight", value: product.weight ? `${product.weight} lbs` : "—" },
  ];

  return (
    <AppLayout title={product.name}>
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {/* Back */}
        <Link href="/catalog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft size={14} /> Back to Catalog
        </Link>

        {/* Header card */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-mono text-muted-foreground mb-1">{product.modelNumber}</p>
              <h1 className="text-xl font-bold leading-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{product.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{product.brand} &middot; {product.series}</p>
            </div>
            {user && (
              <button
                onClick={() => toggle(product.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all ${
                  sel
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                }`}
              >
                <CheckCircle2 size={14} strokeWidth={sel ? 2.5 : 1.5} />
                {sel ? "Selected" : "Select"}
              </button>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.seer2 && (
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted ${efficiencyColor(product.seer2)}`}>
                <Snowflake size={10} />{product.seer2} SEER2
              </span>
            )}
            {product.hspf2 && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-blue-400">
                <Wind size={10} />{product.hspf2} HSPF2
              </span>
            )}
            {product.afue && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-orange-400">
                {product.afue}% AFUE
              </span>
            )}
            {product.tonCapacity && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                {product.tonCapacity} Ton
              </span>
            )}
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground capitalize">
              {stagesLabel(product.stages)}
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Distributor</p>
              <p className={`text-base font-bold ${user?.role === "distributor" ? "text-foreground" : "text-muted-foreground/50"}`}>
                {user?.role === "distributor" || user?.role === "admin" ? formatPrice(product.distributorPrice) : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Dealer</p>
              <p className={`text-base font-bold ${user?.role === "dealer" ? "text-foreground" : (user?.role === "admin" || user?.role === "distributor" ? "text-foreground" : "text-muted-foreground/50")}`}>
                {user ? formatPrice(product.dealerPrice) : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">MSRP</p>
              <p className="text-base font-bold">{formatPrice(product.listPrice)}</p>
            </div>
          </div>
        </div>

        {/* Two-column: specs + features */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Specs */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-1.5">
              <Info size={12} className="text-muted-foreground" />
              <h2 className="font-semibold text-sm">Technical Specs</h2>
            </div>
            <div className="divide-y divide-border/40">
              {specRows.filter(r => r.value && r.value !== "—").map(r => (
                <div key={r.label} className="flex justify-between px-4 py-2 text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium text-right">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-1.5">
                <Star size={12} className="text-muted-foreground" />
                <h2 className="font-semibold text-sm">Key Features</h2>
              </div>
              <ul className="divide-y divide-border/40">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 px-4 py-2.5 text-sm">
                    <CheckCircle2 size={13} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="bg-card border border-border rounded-xl p-4 mb-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Matchups */}
        {matchups.length > 0 && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h2 className="font-semibold text-sm">Compatible System Matchups ({matchups.length})</h2>
            </div>
            <div className="divide-y divide-border/40">
              {matchups.map(m => (
                <div key={m.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-muted-foreground">{m.ahriRefNumber}</p>
                      <p className="text-xs font-semibold mt-0.5">{m.systemType} System</p>
                    </div>
                    {m.isAhriCertified && (
                      <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded font-semibold flex-shrink-0">AHRI Certified</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs">
                    {m.certifiedSeer2 && <span className={efficiencyColor(m.certifiedSeer2)}>{m.certifiedSeer2} SEER2</span>}
                    {m.certifiedHspf2 && <span className="text-blue-400">{m.certifiedHspf2} HSPF2</span>}
                    {m.certifiedBtuCooling && <span className="text-muted-foreground">{formatBtu(m.certifiedBtuCooling)} cooling</span>}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    {m.outdoorUnit && m.outdoorUnit.id !== product.id && (
                      <span>Outdoor: <Link href={`/product/${m.outdoorUnit.id}`} className="text-primary hover:underline">{m.outdoorUnit.modelNumber}</Link></span>
                    )}
                    {m.indoorUnit && m.indoorUnit.id !== product.id && (
                      <span>Indoor: <Link href={`/product/${m.indoorUnit.id}`} className="text-primary hover:underline">{m.indoorUnit.modelNumber}</Link></span>
                    )}
                    {m.furnace && (
                      <span>Furnace: <Link href={`/product/${m.furnace.id}`} className="text-primary hover:underline">{m.furnace.modelNumber}</Link></span>
                    )}
                    {m.coil && (
                      <span>Coil: <Link href={`/product/${m.coil.id}`} className="text-primary hover:underline">{m.coil.modelNumber}</Link></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
