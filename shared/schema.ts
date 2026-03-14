import { pgTable, text, integer, real, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("dealer"),
  companyName: text("company_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export const products = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  categoryId: integer("category_id").notNull(),
  modelNumber: text("model_number").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  series: text("series"),
  type: text("type").notNull(),
  fuelType: text("fuel_type"),
  tonCapacity: real("ton_capacity"),
  btuHeating: integer("btu_heating"),
  btuCooling: integer("btu_cooling"),
  seer2: real("seer2"),
  eer2: real("eer2"),
  hspf2: real("hspf2"),
  afue: real("afue"),
  stages: text("stages"),
  voltage: text("voltage"),
  phase: text("phase"),
  refrigerant: text("refrigerant"),
  soundLevel: real("sound_level"),
  width: real("width"),
  height: real("height"),
  depth: real("depth"),
  weight: integer("weight"),
  distributorPrice: real("distributor_price"),
  dealerPrice: real("dealer_price"),
  listPrice: real("list_price"),
  description: text("description"),
  features: text("features").array(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const systemMatchups = pgTable("system_matchups", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  outdoorUnitId: integer("outdoor_unit_id").notNull(),
  indoorUnitId: integer("indoor_unit_id").notNull(),
  coilId: integer("coil_id"),
  furnaceId: integer("furnace_id"),
  ahriRefNumber: text("ahri_ref_number"),
  certifiedSeer2: real("certified_seer2"),
  certifiedEer2: real("certified_eer2"),
  certifiedHspf2: real("certified_hspf2"),
  certifiedBtuCooling: integer("certified_btu_cooling"),
  certifiedBtuHeating: integer("certified_btu_heating"),
  systemType: text("system_type"),
  isAhriCertified: boolean("is_ahri_certified").default(false),
  notes: text("notes"),
});

export const insertSystemMatchupSchema = createInsertSchema(systemMatchups).omit({ id: true });
export type InsertSystemMatchup = z.infer<typeof insertSystemMatchupSchema>;
export type SystemMatchup = typeof systemMatchups.$inferSelect;

export const savedCatalogs = pgTable("saved_catalogs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  productIds: integer("product_ids").array().notNull(),
  shareToken: text("share_token").unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSavedCatalogSchema = createInsertSchema(savedCatalogs).omit({ id: true, createdAt: true });
export type InsertSavedCatalog = z.infer<typeof insertSavedCatalogSchema>;
export type SavedCatalog = typeof savedCatalogs.$inferSelect;
