import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { createContext, useContext, useState } from "react";

import LoginPage from "@/pages/Login";
import CatalogPage from "@/pages/Catalog";
import ProductDetailPage from "@/pages/ProductDetail";
import SystemBuilderPage from "@/pages/SystemBuilder";
import MyCatalogsPage from "@/pages/MyCatalogs";
import SharedCatalogPage from "@/pages/SharedCatalog";
import AdminPage from "@/pages/Admin";

// ── Auth Context ──────────────────────────────────────────────────────────────
export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: "admin" | "distributor" | "dealer";
  companyName?: string | null;
}

interface AuthCtx {
  user: AuthUser | null;
  setUser: (u: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthCtx>({ user: null, setUser: () => {} });
export function useAuth() { return useContext(AuthContext); }

// ── Cart / selection Context ──────────────────────────────────────────────────
interface SelectCtx {
  selected: Set<number>;
  toggle: (id: number) => void;
  clear: () => void;
}

export const SelectContext = createContext<SelectCtx>({
  selected: new Set(), toggle: () => {}, clear: () => {},
});
export function useSelect() { return useContext(SelectContext); }

// ── App Shell ─────────────────────────────────────────────────────────────────
function AppShell() {
  const { user } = useAuth();

  if (!user) return <LoginPage />;

  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={CatalogPage} />
        <Route path="/catalog" component={CatalogPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/system-builder" component={SystemBuilderPage} />
        <Route path="/my-catalogs" component={MyCatalogsPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/shared/:token" component={SharedCatalogPage} />
        <Route>
          <div className="flex items-center justify-center h-screen text-muted-foreground">
            Page not found
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (id: number) =>
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const clear = () => setSelected(new Set());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser }}>
        <SelectContext.Provider value={{ selected, toggle, clear }}>
          <div className="dark">
            <AppShell />
            <Toaster />
          </div>
        </SelectContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
