import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/App";
import { PRODUCTS, CATEGORIES } from "@/lib/localData";
import { formatPrice } from "@/lib/utils";
import { Shield, Package, Layers, Users, BarChart3 } from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return (
      <AppLayout title="Admin">
        <div className="p-6 text-muted-foreground flex items-center gap-2">
          <Shield size={16} /> Access restricted to admin users.
        </div>
      </AppLayout>
    );
  }

  const brands = [...new Set(PRODUCTS.map(p => p.brand))];
  const byBrand = brands.map(b => ({
    brand: b,
    count: PRODUCTS.filter(p => p.brand === b).length,
    avgSeer: (() => {
      const seerProds = PRODUCTS.filter(p => p.brand === b && p.seer2);
      if (!seerProds.length) return null;
      return (seerProds.reduce((s, p) => s + (p.seer2 ?? 0), 0) / seerProds.length).toFixed(1);
    })(),
  }));

  return (
    <AppLayout title="Admin Dashboard">
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatTile icon={Package} label="Total Products" value={String(PRODUCTS.length)} color="text-blue-400" />
          <StatTile icon={Layers} label="Categories" value={String(CATEGORIES.length)} color="text-teal-400" />
          <StatTile icon={Users} label="Brands" value={String(brands.length)} color="text-purple-400" />
          <StatTile icon={BarChart3} label="Active SKUs" value={String(PRODUCTS.filter(p => p.isActive).length)} color="text-green-400" />
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-sm">Products by Brand</h2>
          </div>
          <div className="divide-y divide-border/60">
            {byBrand.map(b => (
              <div key={b.brand} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium">{b.brand}</span>
                <div className="flex items-center gap-6">
                  {b.avgSeer && <span className="text-green-400 text-xs">{b.avgSeer} avg SEER2</span>}
                  <span className="text-muted-foreground">{b.count} SKU{b.count !== 1 ? "s" : ""}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-sm">All Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Model</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Type</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Dist. Price</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dealer Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {PRODUCTS.map(p => (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2.5 font-mono text-xs">{p.modelNumber}</td>
                    <td className="px-4 py-2.5">{p.brand}</td>
                    <td className="px-4 py-2.5 capitalize text-muted-foreground hidden sm:table-cell">{p.type}</td>
                    <td className="px-4 py-2.5 text-right hidden md:table-cell">{formatPrice(p.distributorPrice)}</td>
                    <td className="px-4 py-2.5 text-right">{formatPrice(p.dealerPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatTile({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={color} />
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
