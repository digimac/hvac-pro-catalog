// ── Fully client-side data store ─────────────────────────────────────────────
// All HVAC product data lives here so the app works with NO backend.

export const DEMO_USERS = [
  { id: 1, email: "admin@hvacpro.com", password: "admin123", name: "Admin User", role: "admin" as const, companyName: "HVAC Pro Platform" },
  { id: 2, email: "dist@acmehvac.com", password: "dist123", name: "Sarah Mitchell", role: "distributor" as const, companyName: "Acme HVAC Supply Co." },
  { id: 3, email: "dealer@coolhvac.com", password: "dealer123", name: "James Rivera", role: "dealer" as const, companyName: "Cool HVAC Services" },
];

export const CATEGORIES = [
  { id: 1, name: "Air Conditioners", slug: "air-conditioners", icon: "Snowflake" },
  { id: 2, name: "Heat Pumps", slug: "heat-pumps", icon: "Wind" },
  { id: 3, name: "Air Handlers", slug: "air-handlers", icon: "Fan" },
  { id: 4, name: "Gas Furnaces", slug: "gas-furnaces", icon: "Flame" },
  { id: 5, name: "Evaporator Coils", slug: "evaporator-coils", icon: "Layers" },
];

export const PRODUCTS = [
  // Carrier Air Conditioners
  {
    id: 1, categoryId: 1, modelNumber: "24ACC636A003", name: "Carrier 3-Ton AC 26 SEER2",
    brand: "Carrier", series: "Infinity", type: "outdoor", fuelType: "electric",
    tonCapacity: 3, btuCooling: 36000, btuHeating: null,
    seer2: 26, eer2: 16.5, hspf2: null, afue: null,
    stages: "variable", voltage: "208/230V", phase: "single", refrigerant: "R-454B", soundLevel: 55,
    width: 35.25, height: 33.5, depth: 35.25, weight: 228,
    distributorPrice: 1820, dealerPrice: 2240, listPrice: 3100,
    description: "Carrier Infinity Series variable-speed compressor for ultimate efficiency and comfort.",
    features: ["Variable-speed compressor", "Greenspeed Intelligence", "R-454B refrigerant", "Communicating", "10-yr parts warranty"],
    isActive: true,
  },
  {
    id: 2, categoryId: 1, modelNumber: "24ACC624A003", name: "Carrier 2-Ton AC 26 SEER2",
    brand: "Carrier", series: "Infinity", type: "outdoor", fuelType: "electric",
    tonCapacity: 2, btuCooling: 24000, btuHeating: null,
    seer2: 26, eer2: 16.0, hspf2: null, afue: null,
    stages: "variable", voltage: "208/230V", phase: "single", refrigerant: "R-454B", soundLevel: 53,
    width: 31, height: 30, depth: 31, weight: 186,
    distributorPrice: 1620, dealerPrice: 1980, listPrice: 2750,
    description: "Carrier Infinity 2-Ton variable-speed central air conditioner.",
    features: ["Variable-speed compressor", "Greenspeed Intelligence", "R-454B refrigerant", "WiFi-enabled"],
    isActive: true,
  },
  {
    id: 3, categoryId: 1, modelNumber: "24SCA536A003", name: "Carrier 3-Ton AC 18 SEER2",
    brand: "Carrier", series: "Performance", type: "outdoor", fuelType: "electric",
    tonCapacity: 3, btuCooling: 36000, btuHeating: null,
    seer2: 18, eer2: 13.0, hspf2: null, afue: null,
    stages: "two-stage", voltage: "208/230V", phase: "single", refrigerant: "R-410A", soundLevel: 72,
    width: 35.25, height: 33.5, depth: 35.25, weight: 210,
    distributorPrice: 1090, dealerPrice: 1340, listPrice: 1950,
    description: "Carrier Performance Series two-stage central air conditioner.",
    features: ["Two-stage compressor", "WeatherArmor Ultra protection", "Scroll compressor"],
    isActive: true,
  },
  // Trane Air Conditioners
  {
    id: 4, categoryId: 1, modelNumber: "4TTR8036L1000A", name: "Trane 3-Ton AC 22 SEER2",
    brand: "Trane", series: "XV20i", type: "outdoor", fuelType: "electric",
    tonCapacity: 3, btuCooling: 36000, btuHeating: null,
    seer2: 22, eer2: 14.5, hspf2: null, afue: null,
    stages: "variable", voltage: "208/230V", phase: "single", refrigerant: "R-410A", soundLevel: 57,
    width: 36, height: 34, depth: 36, weight: 235,
    distributorPrice: 1750, dealerPrice: 2150, listPrice: 2980,
    description: "Trane XV20i TruComfort variable-speed air conditioner.",
    features: ["TruComfort variable-speed", "TCS system", "Spine Fin coil", "10-yr warranty"],
    isActive: true,
  },
  {
    id: 5, categoryId: 1, modelNumber: "4TTR4048E1000A", name: "Trane 4-Ton AC 17 SEER2",
    brand: "Trane", series: "XR17", type: "outdoor", fuelType: "electric",
    tonCapacity: 4, btuCooling: 48000, btuHeating: null,
    seer2: 17, eer2: 13.0, hspf2: null, afue: null,
    stages: "two-stage", voltage: "208/230V", phase: "single", refrigerant: "R-410A", soundLevel: 76,
    width: 39, height: 40, depth: 39, weight: 265,
    distributorPrice: 1380, dealerPrice: 1690, listPrice: 2350,
    description: "Trane XR17 two-stage 4-ton air conditioner for larger homes.",
    features: ["Two-stage compressor", "Spine Fin coil", "All-aluminum construction"],
    isActive: true,
  },
  // Lennox Air Conditioners
  {
    id: 6, categoryId: 1, modelNumber: "XC21-036-230", name: "Lennox 3-Ton AC 21 SEER2",
    brand: "Lennox", series: "XC21", type: "outdoor", fuelType: "electric",
    tonCapacity: 3, btuCooling: 36000, btuHeating: null,
    seer2: 21, eer2: 14.0, hspf2: null, afue: null,
    stages: "variable", voltage: "208/230V", phase: "single", refrigerant: "R-410A", soundLevel: 59,
    width: 34, height: 32, depth: 34, weight: 220,
    distributorPrice: 1680, dealerPrice: 2060, listPrice: 2850,
    description: "Lennox XC21 variable-capacity air conditioner with iComfort technology.",
    features: ["Variable-capacity compressor", "iComfort S30 compatible", "Louvered cabinet"],
    isActive: true,
  },
  // Heat Pumps
  {
    id: 7, categoryId: 2, modelNumber: "25VNA636A003", name: "Carrier 3-Ton Heat Pump 20 SEER2",
    brand: "Carrier", series: "Infinity", type: "outdoor", fuelType: "electric",
    tonCapacity: 3, btuCooling: 36000, btuHeating: 38000,
    seer2: 20, eer2: 13.0, hspf2: 10.5, afue: null,
    stages: "variable", voltage: "208/230V", phase: "single", refrigerant: "R-454B", soundLevel: 56,
    width: 35.25, height: 40, depth: 35.25, weight: 252,
    distributorPrice: 2090, dealerPrice: 2560, listPrice: 3550,
    description: "Carrier Infinity heat pump with Greenspeed Intelligence for year-round comfort.",
    features: ["Greenspeed Intelligence", "Cold-climate capable", "R-454B refrigerant", "Communicating"],
    isActive: true,
  },
  {
    id: 8, categoryId: 2, modelNumber: "4TWR8036E1000A", name: "Trane 3-Ton Heat Pump 18 SEER2",
    brand: "Trane", series: "XR18", type: "outdoor", fuelType: "electric",
    tonCapacity: 3, btuCooling: 36000, btuHeating: 36000,
    seer2: 18, eer2: 12.5, hspf2: 9.5, afue: null,
    stages: "two-stage", voltage: "208/230V", phase: "single", refrigerant: "R-410A", soundLevel: 68,
    width: 36, height: 38, depth: 36, weight: 240,
    distributorPrice: 1650, dealerPrice: 2020, listPrice: 2800,
    description: "Trane XR18 two-stage heat pump for efficient year-round climate control.",
    features: ["Two-stage compressor", "Spine Fin coil", "Dual-fuel compatible"],
    isActive: true,
  },
  // Air Handlers
  {
    id: 9, categoryId: 3, modelNumber: "FE4ANF003000", name: "Carrier 2.5-Ton Air Handler",
    brand: "Carrier", series: "Fan Coil", type: "indoor", fuelType: "electric",
    tonCapacity: 2.5, btuCooling: 30000, btuHeating: null,
    seer2: null, eer2: null, hspf2: null, afue: null,
    stages: "variable", voltage: "208/230V", phase: "single", refrigerant: "R-410A", soundLevel: null,
    width: 17.5, height: 47, depth: 21, weight: 95,
    distributorPrice: 680, dealerPrice: 835, listPrice: 1180,
    description: "Carrier multi-position variable-speed air handler for use with matching outdoor units.",
    features: ["Multi-position installation", "Variable-speed ECM blower", "Stainless drain pan", "Easy filter access"],
    isActive: true,
  },
  {
    id: 10, categoryId: 3, modelNumber: "4MXCBN036BC3HCA", name: "Trane 3-Ton Air Handler",
    brand: "Trane", series: "Multipoise", type: "indoor", fuelType: "electric",
    tonCapacity: 3, btuCooling: 36000, btuHeating: null,
    seer2: null, eer2: null, hspf2: null, afue: null,
    stages: "variable", voltage: "208/230V", phase: "single", refrigerant: "R-410A", soundLevel: null,
    width: 17.5, height: 53, depth: 21, weight: 105,
    distributorPrice: 760, dealerPrice: 930, listPrice: 1290,
    description: "Trane Multipoise variable-speed air handler.",
    features: ["Multiple installation positions", "Variable-speed ECM motor", "Ez-Fit cabinet design"],
    isActive: true,
  },
  // Gas Furnaces
  {
    id: 11, categoryId: 4, modelNumber: "59MN7A100S21--14", name: "Carrier 100K BTU Furnace 96.7 AFUE",
    brand: "Carrier", series: "Infinity 96", type: "indoor", fuelType: "gas",
    tonCapacity: null, btuCooling: null, btuHeating: 100000,
    seer2: null, eer2: null, hspf2: null, afue: 96.7,
    stages: "variable", voltage: "115V", phase: "single", refrigerant: null, soundLevel: 55,
    width: 17.5, height: 46, depth: 28, weight: 142,
    distributorPrice: 1250, dealerPrice: 1530, listPrice: 2150,
    description: "Carrier Infinity 96 two-stage modulating gas furnace with variable-speed blower.",
    features: ["Two-stage gas valve", "Variable-speed ECM blower", "Perfect Heat Technology", "Communicating"],
    isActive: true,
  },
  {
    id: 12, categoryId: 4, modelNumber: "TDD2B080A9V4VA", name: "Trane 80K BTU Furnace 96 AFUE",
    brand: "Trane", series: "S9V2", type: "indoor", fuelType: "gas",
    tonCapacity: null, btuCooling: null, btuHeating: 80000,
    seer2: null, eer2: null, hspf2: null, afue: 96,
    stages: "two-stage", voltage: "115V", phase: "single", refrigerant: null, soundLevel: 58,
    width: 17.5, height: 40, depth: 28, weight: 130,
    distributorPrice: 1050, dealerPrice: 1280, listPrice: 1800,
    description: "Trane S9V2 two-stage variable-speed gas furnace.",
    features: ["Two-stage heating", "Variable-speed ECM blower", "SureLight silicon nitride igniter"],
    isActive: true,
  },
  // Evaporator Coils
  {
    id: 13, categoryId: 5, modelNumber: "CNPVP3617ALA", name: "Carrier 1.5-3 Ton Cased Coil",
    brand: "Carrier", series: "A-Coil", type: "coil", fuelType: null,
    tonCapacity: 3, btuCooling: 36000, btuHeating: null,
    seer2: null, eer2: null, hspf2: null, afue: null,
    stages: null, voltage: null, phase: null, refrigerant: "R-410A", soundLevel: null,
    width: 17.5, height: 16, depth: 21, weight: 28,
    distributorPrice: 290, dealerPrice: 355, listPrice: 520,
    description: "Carrier cased A-coil evaporator coil for use with gas furnace systems.",
    features: ["Cased design for easy installation", "Aluminum fins", "Copper tubing", "Bi-flow capable"],
    isActive: true,
  },
];

export const MATCHUPS = [
  {
    id: 1, outdoorUnitId: 1, indoorUnitId: 9, coilId: null, furnaceId: null,
    ahriRefNumber: "AHRI-202345678", certifiedSeer2: 26.0, certifiedEer2: 16.5,
    certifiedHspf2: null, certifiedBtuCooling: 35800, certifiedBtuHeating: null,
    systemType: "AC", isAhriCertified: true,
    notes: "Optimal pairing for Carrier Infinity variable-speed system.",
  },
  {
    id: 2, outdoorUnitId: 1, indoorUnitId: 9, coilId: 13, furnaceId: 11,
    ahriRefNumber: "AHRI-202345679", certifiedSeer2: 25.8, certifiedEer2: 16.2,
    certifiedHspf2: null, certifiedBtuCooling: 35600, certifiedBtuHeating: null,
    systemType: "AC+Gas", isAhriCertified: true,
    notes: "Carrier Infinity complete system with gas furnace.",
  },
  {
    id: 3, outdoorUnitId: 7, indoorUnitId: 9, coilId: null, furnaceId: null,
    ahriRefNumber: "AHRI-202389012", certifiedSeer2: 20.0, certifiedEer2: 13.0,
    certifiedHspf2: 10.5, certifiedBtuCooling: 35600, certifiedBtuHeating: 37800,
    systemType: "HP", isAhriCertified: true,
    notes: "Carrier Infinity all-electric heat pump system.",
  },
  {
    id: 4, outdoorUnitId: 4, indoorUnitId: 10, coilId: null, furnaceId: null,
    ahriRefNumber: "AHRI-202356789", certifiedSeer2: 22.0, certifiedEer2: 14.5,
    certifiedHspf2: null, certifiedBtuCooling: 35800, certifiedBtuHeating: null,
    systemType: "AC", isAhriCertified: true,
    notes: "Trane XV20i TruComfort matched system.",
  },
  {
    id: 5, outdoorUnitId: 8, indoorUnitId: 10, coilId: null, furnaceId: 12,
    ahriRefNumber: "AHRI-202312345", certifiedSeer2: 17.8, certifiedEer2: 12.2,
    certifiedHspf2: 9.2, certifiedBtuCooling: 35400, certifiedBtuHeating: 35600,
    systemType: "HP+Gas", isAhriCertified: true,
    notes: "Trane XR18 dual-fuel heat pump system.",
  },
];

// ── Helper functions ──────────────────────────────────────────────────────────

export function login(email: string, password: string) {
  const user = DEMO_USERS.find(u => u.email === email && u.password === password);
  if (!user) return null;
  const { password: _, ...safe } = user;
  return safe;
}

export function getProducts(filters?: {
  categoryId?: number; brand?: string; tonCapacity?: number; search?: string;
}) {
  let list = PRODUCTS.filter(p => p.isActive);
  if (!filters) return list;
  if (filters.categoryId) list = list.filter(p => p.categoryId === filters.categoryId);
  if (filters.brand) list = list.filter(p => p.brand === filters.brand);
  if (filters.tonCapacity) list = list.filter(p => p.tonCapacity === filters.tonCapacity);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.modelNumber.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.series ?? "").toLowerCase().includes(q)
    );
  }
  return list;
}

export function getProductById(id: number) {
  return PRODUCTS.find(p => p.id === id) ?? null;
}

export function getMatchupsForProduct(productId: number) {
  return MATCHUPS.filter(
    m => m.outdoorUnitId === productId || m.indoorUnitId === productId ||
         m.coilId === productId || m.furnaceId === productId
  ).map(m => ({
    ...m,
    outdoorUnit: getProductById(m.outdoorUnitId),
    indoorUnit: getProductById(m.indoorUnitId),
    coil: m.coilId ? getProductById(m.coilId) : null,
    furnace: m.furnaceId ? getProductById(m.furnaceId) : null,
  }));
}

export function getMatchupsForOutdoorUnit(outdoorUnitId: number) {
  return MATCHUPS.filter(m => m.outdoorUnitId === outdoorUnitId).map(m => ({
    ...m,
    outdoorUnit: getProductById(m.outdoorUnitId),
    indoorUnit: getProductById(m.indoorUnitId),
    coil: m.coilId ? getProductById(m.coilId) : null,
    furnace: m.furnaceId ? getProductById(m.furnaceId) : null,
  }));
}

// ── Orders ────────────────────────────────────────────────────────────────────
export interface OrderItem {
  modelNumber: string;
  description: string;
  brand: string;
  qty: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  status: "processing" | "shipped" | "delivered" | "cancelled" | "backordered";
  shipTo: string;
  distributorId: number;   // 2 = Sarah Mitchell (Acme HVAC)
  dealerId: number;        // 3 = James Rivera (Cool HVAC)
  poNumber?: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  total: number;
  items: OrderItem[];
}

export const ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-2026-0841",
    orderDate: "Jul 5, 2026",
    status: "shipped",
    shipTo: "Cool HVAC Services — Louisville, KY",
    distributorId: 2, dealerId: 3,
    poNumber: "PO-CH-00412",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS Ground",
    estimatedDelivery: "Jul 10, 2026",
    total: 8360.00,
    items: [
      { modelNumber: "24ACC636A003", description: "Carrier 3-Ton AC 26 SEER2 Infinity Series", brand: "Carrier", qty: 2, unitPrice: 1820.00 },
      { modelNumber: "FK4DNF003", description: "Carrier 2.5-Ton Air Handler Fan Coil", brand: "Carrier", qty: 2, unitPrice: 1180.00 },
      { modelNumber: "58CTX080-16", description: "Carrier 80k BTU 2-Stage Furnace 96% AFUE", brand: "Carrier", qty: 2, unitPrice: 890.00 },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD-2026-0829",
    orderDate: "Jun 28, 2026",
    status: "delivered",
    shipTo: "Cool HVAC Services — Louisville, KY",
    distributorId: 2, dealerId: 3,
    poNumber: "PO-CH-00398",
    trackingNumber: "1Z999AA10198765432",
    carrier: "FedEx Freight",
    estimatedDelivery: "Jul 3, 2026",
    total: 5490.00,
    items: [
      { modelNumber: "4TTR8036L1000A", description: "Trane XV20i 3-Ton AC 22 SEER2", brand: "Trane", qty: 1, unitPrice: 1750.00 },
      { modelNumber: "4TTR4048E1000A", description: "Trane XR17 4-Ton AC 17 SEER2", brand: "Trane", qty: 1, unitPrice: 1290.00 },
      { modelNumber: "TAM9A0B36V41DB", description: "Trane 3-Ton Variable Speed Air Handler", brand: "Trane", qty: 1, unitPrice: 1050.00 },
      { modelNumber: "TUH2C080A9V4VB", description: "Trane S9V2 80k BTU Variable Gas Furnace", brand: "Trane", qty: 1, unitPrice: 1400.00 },
    ],
  },
  {
    id: 3,
    orderNumber: "ORD-2026-0814",
    orderDate: "Jun 18, 2026",
    status: "delivered",
    shipTo: "Cool HVAC Services — Lexington, KY",
    distributorId: 2, dealerId: 3,
    poNumber: "PO-CH-00381",
    trackingNumber: "794644792798",
    carrier: "FedEx Ground",
    total: 3240.00,
    items: [
      { modelNumber: "XC20-024-230", description: "Lennox XC20 2-Ton AC 28 SEER2", brand: "Lennox", qty: 1, unitPrice: 1980.00 },
      { modelNumber: "CBX40UHV-024", description: "Lennox 2-Ton Variable Speed Air Handler", brand: "Lennox", qty: 1, unitPrice: 1260.00 },
    ],
  },
  {
    id: 4,
    orderNumber: "ORD-2026-0856",
    orderDate: "Jul 7, 2026",
    status: "processing",
    shipTo: "Cool HVAC Services — Louisville, KY",
    distributorId: 2, dealerId: 3,
    poNumber: "PO-CH-00427",
    total: 12750.00,
    items: [
      { modelNumber: "24ACC636A003", description: "Carrier 3-Ton AC 26 SEER2 Infinity Series", brand: "Carrier", qty: 3, unitPrice: 1820.00 },
      { modelNumber: "24VNA948A003", description: "Carrier 4-Ton Heat Pump Infinity 24 HSPF2", brand: "Carrier", qty: 2, unitPrice: 2145.00 },
      { modelNumber: "CNPVP4821ALA", description: "Carrier 4-Ton Evaporator Coil N-Coil", brand: "Carrier", qty: 2, unitPrice: 620.00 },
    ],
  },
  {
    id: 5,
    orderNumber: "ORD-2026-0791",
    orderDate: "Jun 5, 2026",
    status: "backordered",
    shipTo: "Cool HVAC Services — Louisville, KY",
    distributorId: 2, dealerId: 3,
    poNumber: "PO-CH-00362",
    estimatedDelivery: "Jul 22, 2026",
    total: 4860.00,
    items: [
      { modelNumber: "GSX160601", description: "Goodman 5-Ton AC 17 SEER2 Single Stage", brand: "Goodman", qty: 3, unitPrice: 920.00 },
      { modelNumber: "ARUF61D14", description: "Goodman 5-Ton Multi-Speed Air Handler", brand: "Goodman", qty: 3, unitPrice: 700.00 },
    ],
  },
  {
    id: 6,
    orderNumber: "ORD-2026-0768",
    orderDate: "May 28, 2026",
    status: "cancelled",
    shipTo: "Cool HVAC Services — Louisville, KY",
    distributorId: 2, dealerId: 3,
    poNumber: "PO-CH-00344",
    total: 2240.00,
    items: [
      { modelNumber: "24SCA536A003", description: "Carrier 3-Ton AC 18 SEER2 Performance Series", brand: "Carrier", qty: 2, unitPrice: 1120.00 },
    ],
  },
  // Additional orders visible only to admin (different dealer)
  {
    id: 7,
    orderNumber: "ORD-2026-0802",
    orderDate: "Jun 12, 2026",
    status: "delivered",
    shipTo: "Midwest HVAC Solutions — Cincinnati, OH",
    distributorId: 2, dealerId: 99,
    poNumber: "PO-MW-00119",
    trackingNumber: "9400111298370842840900",
    carrier: "USPS Priority",
    total: 7680.00,
    items: [
      { modelNumber: "XP20-036-230", description: "Lennox XP20 3-Ton Heat Pump 20 SEER2", brand: "Lennox", qty: 2, unitPrice: 2340.00 },
      { modelNumber: "EL296UH110XV60C", description: "Lennox Elite 110k BTU Variable Gas Furnace", brand: "Lennox", qty: 2, unitPrice: 1500.00 },
    ],
  },
  {
    id: 8,
    orderNumber: "ORD-2026-0817",
    orderDate: "Jun 22, 2026",
    status: "shipped",
    shipTo: "BlueSky Comfort Systems — Indianapolis, IN",
    distributorId: 2, dealerId: 88,
    poNumber: "PO-BS-00077",
    trackingNumber: "1ZX075W30394185088",
    carrier: "UPS Ground",
    estimatedDelivery: "Jul 9, 2026",
    total: 9450.00,
    items: [
      { modelNumber: "GSX160361", description: "Goodman 3-Ton AC 17 SEER2 Single Stage", brand: "Goodman", qty: 5, unitPrice: 790.00 },
      { modelNumber: "ARUF37C14", description: "Goodman 3-Ton Multi-Speed Air Handler", brand: "Goodman", qty: 5, unitPrice: 620.00 },
      { modelNumber: "GCVC960804CX", description: "Goodman 80k BTU Variable Speed Furnace 96%", brand: "Goodman", qty: 2, unitPrice: 980.00 },
    ],
  },
];
