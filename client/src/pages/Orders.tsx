import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/App";
import { ORDERS, type Order } from "@/lib/localData";
import {
  Package, Truck, CheckCircle2, Clock, XCircle, ChevronDown,
  ChevronRight, Search, Filter, Download, Eye, RotateCcw,
} from "lucide-react";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<Order["status"], { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  processing: {
    label: "Processing",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    icon: <Clock size={13} className="text-amber-500" />,
  },
  shipped: {
    label: "Shipped",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    icon: <Truck size={13} className="text-blue-500" />,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    icon: <CheckCircle2 size={13} className="text-green-500" />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    icon: <XCircle size={13} className="text-red-500" />,
  },
  backordered: {
    label: "Backordered",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
    icon: <RotateCcw size={13} className="text-purple-500" />,
  },
};

// ── Order Row (expandable) ────────────────────────────────────────────────────
function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[order.status];

  return (
    <div className={`border rounded-lg overflow-hidden transition-shadow ${expanded ? "shadow-md" : "shadow-sm hover:shadow-md"} bg-white`}>
      {/* Summary row */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
      >
        {/* Expand chevron */}
        <span className="text-gray-400 flex-shrink-0">
          {expanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </span>

        {/* Order # */}
        <div className="flex-shrink-0 w-32">
          <p className="text-xs text-gray-500 font-medium">Order #</p>
          <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            {order.orderNumber}
          </p>
        </div>

        {/* Date */}
        <div className="flex-shrink-0 w-28 hidden sm:block">
          <p className="text-xs text-gray-500 font-medium">Placed</p>
          <p className="text-sm text-gray-800">{order.orderDate}</p>
        </div>

        {/* Buyer / ship-to */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-medium">Ship To</p>
          <p className="text-sm text-gray-800 truncate">{order.shipTo}</p>
        </div>

        {/* Items count */}
        <div className="flex-shrink-0 w-16 hidden md:block text-center">
          <p className="text-xs text-gray-500 font-medium">Items</p>
          <p className="text-sm text-gray-800">{order.items.length}</p>
        </div>

        {/* Status badge */}
        <div className="flex-shrink-0 w-32 flex justify-center">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
            {cfg.icon}
            {cfg.label}
          </span>
        </div>

        {/* Total */}
        <div className="flex-shrink-0 w-24 text-right">
          <p className="text-xs text-gray-500 font-medium">Total</p>
          <p className="text-sm font-bold text-gray-900">${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50">
          {/* Line items table */}
          <div className="px-4 pt-3 pb-2 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="text-left pb-2 font-semibold">Model #</th>
                  <th className="text-left pb-2 font-semibold hidden md:table-cell">Description</th>
                  <th className="text-left pb-2 font-semibold hidden sm:table-cell">Brand</th>
                  <th className="text-center pb-2 font-semibold">Qty</th>
                  <th className="text-right pb-2 font-semibold">Unit Price</th>
                  <th className="text-right pb-2 font-semibold">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 font-mono text-gray-800 font-medium pr-3">{item.modelNumber}</td>
                    <td className="py-2 text-gray-600 hidden md:table-cell pr-3 max-w-xs truncate">{item.description}</td>
                    <td className="py-2 text-gray-600 hidden sm:table-cell pr-3">{item.brand}</td>
                    <td className="py-2 text-center text-gray-800">{item.qty}</td>
                    <td className="py-2 text-right text-gray-700">${item.unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                    <td className="py-2 text-right font-semibold text-gray-900">${(item.qty * item.unitPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer strip */}
          <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-white">
            {/* Tracking / notes */}
            <div className="space-y-0.5">
              {order.trackingNumber && (
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">Tracking:</span>{" "}
                  <span className="font-mono text-[hsl(var(--primary))]">{order.trackingNumber}</span>
                  {order.carrier && <span className="text-gray-400"> via {order.carrier}</span>}
                </p>
              )}
              {order.estimatedDelivery && (
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Est. Delivery:</span> {order.estimatedDelivery}
                </p>
              )}
              {order.poNumber && (
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">PO #:</span> {order.poNumber}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors bg-white">
                <Eye size={12} /> View Invoice
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors bg-white">
                <Download size={12} /> Download PDF
              </button>
              {order.status === "delivered" && (
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[hsl(var(--primary))] text-xs font-medium text-[hsl(var(--primary))] hover:bg-teal-50 transition-colors bg-white">
                  <RotateCcw size={12} /> Reorder
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Orders Page ──────────────────────────────────────────────────────────
export default function OrdersPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");

  // Role-filter: admin sees all; distributor/dealer see only their orders
  const baseOrders = ORDERS.filter(o => {
    if (user?.role === "admin") return true;
    if (user?.role === "distributor") return o.distributorId === user.id;
    return o.dealerId === user?.id;
  });

  const filtered = baseOrders.filter(o => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.shipTo.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.modelNumber.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Summary stats
  const total = baseOrders.length;
  const shipped = baseOrders.filter(o => o.status === "shipped").length;
  const delivered = baseOrders.filter(o => o.status === "delivered").length;
  const processing = baseOrders.filter(o => o.status === "processing").length;

  const statCards = [
    { label: "Total Orders", value: total, icon: <Package size={16} className="text-gray-500" />, color: "border-gray-200" },
    { label: "Processing", value: processing, icon: <Clock size={16} className="text-amber-500" />, color: "border-amber-200" },
    { label: "Shipped", value: shipped, icon: <Truck size={16} className="text-blue-500" />, color: "border-blue-200" },
    { label: "Delivered", value: delivered, icon: <CheckCircle2 size={16} className="text-green-500" />, color: "border-green-200" },
  ];

  return (
    <AppLayout title="Orders">
      <div className="p-5 space-y-5 max-w-6xl mx-auto">

        {/* ── Stat cards ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statCards.map(s => (
            <div key={s.label} className={`bg-white rounded-lg border ${s.color} p-4 flex items-center gap-3 shadow-sm`}>
              <div className="p-2 bg-gray-50 rounded-md">{s.icon}</div>
              <div>
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search order #, model, ship-to…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/30"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter size={13} className="text-gray-400" />
            {(["all", "processing", "shipped", "delivered", "backordered", "cancelled"] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  statusFilter === s
                    ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {s === "all" ? "All" : STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Orders list ─────────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No orders match your filters</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <p className="text-xs text-gray-500 font-medium">
              Showing {filtered.length} of {baseOrders.length} orders
            </p>
            {filtered.map(order => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
