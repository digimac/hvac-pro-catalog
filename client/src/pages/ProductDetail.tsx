import { useParams, Link } from "wouter";
import { useAuth, useSelect } from "@/App";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice, formatBtu, formatAfue, stagesLabel, efficiencyColor } from "@/lib/utils";
import { getProductById, getMatchupsForProduct } from "@/lib/localData";
import { ArrowLeft, CheckCircle2, Award, GitBranch } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { selected, toggle } = useSelect();

  const product = getProductById(Number(id));
  const matchups = getMatchupsForProduct(Number(id));

  if (!product) {
    return <AppLayout><div className="p-6 text-muted-foreground">Product not found.</div></AppLayout>;
  }

  const isSelected = selected.has(product.id);

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <Link href="/catalog">
          <a className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft size={14} /> Back to Catalog
          </a>
        </Link>

        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{product.brand}</span>
              {product.series && <span className="text-xs text-muted-foreground/60">· {product.series}</span>}
            </div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{product.name}</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">{product.modelNumber}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => toggle(product.id)} className={isSelected ? "border-primary text-primary bg-primary/10" : ""} data-testid="button-select-product">
            {isSelected ? <><CheckCircle2 size={14} className="mr-1.5" /> Selected</> : "Add to Selection"}
          </Button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {product.tonCapacity && <StatBox label="Capacity" value={`${product.tonCapacity}T`} sub={`${formatBtu(product.btuCooling)} cooling`} />}
          {product.seer2 && <StatBox label="SEER2" value={String(product.seer2)} color="text-green-400" sub="Cooling efficiency" />}
          {product.hspf2 && <StatBox label="HSPF2" value={String(product.hspf2)} color="text-blue-400" sub="Heating efficiency" />}
          {product.eer2 && <StatBox label="EER2" value={String(product.eer2)} sub="Energy efficiency" />}
          {product.afue && <StatBox label="AFUE" value={`${product.afue}%`} color="text-amber-400" sub="Heating efficiency" />}
          {product.soundLevel && <StatBox label="Sound" value={`${product.soundLevel} dBA`} sub="Operating noise" />}
          {product.btuHeating && !product.tonCapacity && <StatBox label="Heating" value={formatBtu(product.btuHeating)} color="text-amber-400" sub="BTU output" />}
          {product.stages && <StatBox label="Compressor" value={stagesLabel(product.stages)} sub="Stage type" />}
        </div>

        <Tabs defaultValue="specs">
          <TabsList className="bg-muted/50 border border-border mb-4 h-9">
            <TabsTrigger value="specs" className="text-sm">Specifications</TabsTrigger>
            <TabsTrigger value="matchups" className="text-sm">System Matchups {matchups.length > 0 ? `(${matchups.length})` : ""}</TabsTrigger>
            <TabsTrigger value="pricing" className="text-sm">Pricing</TabsTrigger>
            <TabsTrigger value="features" className="text-sm">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="specs">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SpecSection title="Performance">
                <SpecRow label="Cooling Capacity" value={formatBtu(product.btuCooling)} />
                <SpecRow label="Heating Capacity" value={formatBtu(product.btuHeating)} />
                <SpecRow label="SEER2 Rating" value={product.seer2 ? `${product.seer2} SEER2` : "—"} />
                <SpecRow label="EER2 Rating" value={product.eer2 ? `${product.eer2} EER2` : "—"} />
                <SpecRow label="HSPF2 Rating" value={product.hspf2 ? `${product.hspf2} HSPF2` : "—"} />
                <SpecRow label="AFUE Rating" value={formatAfue(product.afue)} />
                <SpecRow label="Compressor Stages" value={stagesLabel(product.stages)} />
              </SpecSection>
              <Separator className="bg-border" />
              <SpecSection title="Electrical">
                <SpecRow label="Voltage" value={product.voltage ?? "—"} />
                <SpecRow label="Phase" value={product.phase ? `${product.phase}-phase` : "—"} />
                <SpecRow label="Refrigerant" value={product.refrigerant ?? "—"} />
                <SpecRow label="Fuel Type" value={product.fuelType ?? "—"} />
              </SpecSection>
              <Separator className="bg-border" />
              <SpecSection title="Physical">
                <SpecRow label="Width" value={product.width ? `${product.width}"` : "—"} />
                <SpecRow label="Height" value={product.height ? `${product.height}"` : "—"} />
                <SpecRow label="Depth" value={product.depth ? `${product.depth}"` : "—"} />
                <SpecRow label="Weight" value={product.weight ? `${product.weight} lbs` : "—"} />
                <SpecRow label="Sound Level" value={product.soundLevel ? `${product.soundLevel} dBA` : "—"} />
              </SpecSection>
            </div>
          </TabsContent>

          <TabsContent value="matchups">
            {!matchups.length ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                <GitBranch size={28} className="mx-auto mb-2 opacity-30" />
                <p className="font-medium">No system matchups available</p>
                <p className="text-sm mt-1">Try the System Builder to create configurations</p>
              </div>
            ) : (
              <div className="space-y-3">
                {matchups.map(m => <MatchupCard key={m.id} matchup={m} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pricing">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SpecSection title="Pricing Tiers">
                <SpecRow label="List Price" value={formatPrice(product.listPrice)} bold />
                {user?.role !== "dealer" && <SpecRow label="Distributor Price" value={formatPrice(product.distributorPrice)} bold />}
                <SpecRow label="Dealer Price" value={formatPrice(product.dealerPrice)} bold />
              </SpecSection>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <div className="bg-card border border-border rounded-xl p-5">
              {product.description && <p className="text-sm text-muted-foreground mb-4">{product.description}</p>}
              {product.features?.length ? (
                <ul className="space-y-2">
                  {product.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-muted-foreground">No additional features listed.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

function StatBox({ label, value, sub, color = "text-foreground" }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-3">
      <p className="stat-label">{label}</p>
      <p className={`stat-value ${color}`}>{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function SpecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-4 py-2 bg-muted/30"><p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{title}</p></div>
      <div className="divide-y divide-border/50">{children}</div>
    </div>
  );
}

function SpecRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "font-semibold" : "font-medium"}>{value}</span>
    </div>
  );
}

function MatchupCard({ matchup }: { matchup: any }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {matchup.isAhriCertified && (
          <span className="badge-ahri text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <Award size={10} /> AHRI Certified
          </span>
        )}
        {matchup.systemType && (
          <span className="bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded-full font-medium border border-border">{matchup.systemType}</span>
        )}
        {matchup.ahriRefNumber && <span className="text-xs text-muted-foreground font-mono ml-auto">{matchup.ahriRefNumber}</span>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {matchup.outdoorUnit && <CompBox type="Outdoor" name={matchup.outdoorUnit.name} model={matchup.outdoorUnit.modelNumber} />}
        {matchup.indoorUnit && <CompBox type="Indoor" name={matchup.indoorUnit.name} model={matchup.indoorUnit.modelNumber} />}
        {matchup.coil && <CompBox type="Coil" name={matchup.coil.name} model={matchup.coil.modelNumber} />}
        {matchup.furnace && <CompBox type="Furnace" name={matchup.furnace.name} model={matchup.furnace.modelNumber} />}
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        {matchup.certifiedSeer2 && <div><span className="text-green-400 font-bold">{matchup.certifiedSeer2}</span><span className="text-muted-foreground text-xs ml-1">SEER2</span></div>}
        {matchup.certifiedEer2 && <div><span className="text-blue-400 font-bold">{matchup.certifiedEer2}</span><span className="text-muted-foreground text-xs ml-1">EER2</span></div>}
        {matchup.certifiedHspf2 && <div><span className="text-blue-300 font-bold">{matchup.certifiedHspf2}</span><span className="text-muted-foreground text-xs ml-1">HSPF2</span></div>}
        {matchup.certifiedBtuCooling && <div><span className="font-medium">{(matchup.certifiedBtuCooling / 1000).toFixed(0)}K BTU</span><span className="text-muted-foreground text-xs ml-1">cooling</span></div>}
      </div>
      {matchup.notes && <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/60 italic">{matchup.notes}</p>}
    </div>
  );
}

function CompBox({ type, name, model }: { type: string; name: string; model: string }) {
  return (
    <div className="bg-muted/40 rounded-lg p-2">
      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">{type}</p>
      <p className="text-xs font-medium leading-tight">{name}</p>
      <p className="text-[10px] text-muted-foreground font-mono">{model}</p>
    </div>
  );
}
