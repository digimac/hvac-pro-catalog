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

// ── Helper functions ─────────────────────────────────────────────────────────

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
