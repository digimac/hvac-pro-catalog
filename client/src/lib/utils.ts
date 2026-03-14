import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);
}

export function formatSeer(val: number | null | undefined): string {
  if (val == null) return "—";
  return `${val} SEER2`;
}

export function formatHspf(val: number | null | undefined): string {
  if (val == null) return "—";
  return `${val} HSPF2`;
}

export function formatAfue(val: number | null | undefined): string {
  if (val == null) return "—";
  return `${val}% AFUE`;
}

export function formatBtu(val: number | null | undefined): string {
  if (val == null) return "—";
  if (val >= 1000) return `${(val / 1000).toFixed(0)}K BTU`;
  return `${val} BTU`;
}

export function formatTon(val: number | null | undefined): string {
  if (val == null) return "—";
  return `${val} Ton`;
}

export function efficiencyColor(seer2: number | null | undefined): string {
  if (!seer2) return "text-muted-foreground";
  if (seer2 >= 24) return "text-green-400";
  if (seer2 >= 18) return "text-blue-400";
  if (seer2 >= 16) return "text-yellow-400";
  return "text-muted-foreground";
}

export function stagesLabel(stages: string | null | undefined): string {
  if (!stages) return "—";
  const map: Record<string, string> = {
    "single": "Single Stage",
    "two-stage": "Two Stage",
    "variable": "Variable Speed",
  };
  return map[stages] ?? stages;
}
