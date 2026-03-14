import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export function registerRoutes(httpServer: Server, app: Express) {

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const user = await storage.getUserByEmail(email);
    if (!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });
    const { password: _, ...safeUser } = user;
    return res.json({ user: safeUser });
  });

  app.get("/api/auth/demo-users", async (_req, res) => {
    res.json([
      { email: "admin@hvacpro.com", password: "admin123", role: "admin", name: "Admin" },
      { email: "dist@acmehvac.com", password: "dist123", role: "distributor", name: "Sarah Mitchell" },
      { email: "dealer@coolhvac.com", password: "dealer123", role: "dealer", name: "James Rivera" },
    ]);
  });

  app.get("/api/categories", async (_req, res) => {
    const cats = await storage.getCategories();
    res.json(cats);
  });

  app.get("/api/products", async (req, res) => {
    const { categoryId, brand, tonCapacity, type, search } = req.query;
    const filters: Record<string, any> = {};
    if (categoryId) filters.categoryId = Number(categoryId);
    if (brand) filters.brand = String(brand);
    if (tonCapacity) filters.tonCapacity = Number(tonCapacity);
    if (type) filters.type = String(type);
    if (search) filters.search = String(search);
    const products = await storage.getProducts(Object.keys(filters).length ? filters : undefined);
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProductById(Number(req.params.id));
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  });

  app.get("/api/products/:id/matchups", async (req, res) => {
    const productId = Number(req.params.id);
    const product = await storage.getProductById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    const matchups = product.type === "outdoor"
      ? await storage.getMatchupsForOutdoorUnit(productId)
      : await storage.getMatchupsForProduct(productId);
    const enriched = await Promise.all(matchups.map(async m => {
      const outdoorUnit = await storage.getProductById(m.outdoorUnitId);
      const indoorUnit = await storage.getProductById(m.indoorUnitId);
      const coil = m.coilId ? await storage.getProductById(m.coilId) : null;
      const furnace = m.furnaceId ? await storage.getProductById(m.furnaceId) : null;
      return { ...m, outdoorUnit, indoorUnit, coil, furnace };
    }));
    res.json(enriched);
  });

  app.get("/api/system-builder", async (req, res) => {
    const { outdoorId } = req.query;
    if (!outdoorId) {
      const products = await storage.getProducts();
      const outdoor = products.filter(p => p.type === "outdoor");
      return res.json({ outdoorUnits: outdoor });
    }
    const matchups = await storage.getMatchupsForOutdoorUnit(Number(outdoorId));
    const enriched = await Promise.all(matchups.map(async m => {
      const outdoorUnit = await storage.getProductById(m.outdoorUnitId);
      const indoorUnit = await storage.getProductById(m.indoorUnitId);
      const coil = m.coilId ? await storage.getProductById(m.coilId) : null;
      const furnace = m.furnaceId ? await storage.getProductById(m.furnaceId) : null;
      return { ...m, outdoorUnit, indoorUnit, coil, furnace };
    }));
    res.json({ matchups: enriched });
  });

  app.get("/api/catalogs/:userId", async (req, res) => {
    const catalogs = await storage.getCatalogsByUser(Number(req.params.userId));
    res.json(catalogs);
  });

  app.post("/api/catalogs", async (req, res) => {
    try {
      const catalog = await storage.createCatalog(req.body);
      res.status(201).json(catalog);
    } catch (e) {
      res.status(400).json({ error: "Invalid catalog data" });
    }
  });

  app.delete("/api/catalogs/:id", async (req, res) => {
    await storage.deleteCatalog(Number(req.params.id));
    res.status(204).send();
  });

  app.get("/api/shared/:token", async (req, res) => {
    const catalog = await storage.getCatalogByToken(req.params.token);
    if (!catalog) return res.status(404).json({ error: "Catalog not found" });
    const products = await Promise.all(
      catalog.productIds.map(id => storage.getProductById(id))
    );
    res.json({ catalog, products: products.filter(Boolean) });
  });
}
