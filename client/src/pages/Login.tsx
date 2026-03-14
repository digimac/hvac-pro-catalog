import { useState } from "react";
import { useAuth, type AuthUser } from "@/App";
import { login as localLogin } from "@/lib/localData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wind } from "lucide-react";

export default function LoginPage() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 300));
    const user = localLogin(email, password);
    if (!user) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    setUser(user as AuthUser);
    setLoading(false);
  }

  const DEMOS = [
    { label: "Admin", email: "admin@hvacpro.com", password: "admin123" },
    { label: "Distributor", email: "dist@acmehvac.com", password: "dist123" },
    { label: "Dealer", email: "dealer@coolhvac.com", password: "dealer123" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Wind className="text-primary" size={28} />
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>HVAC Pro Catalog</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to access your catalog</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-muted/50"
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>
          <div className="mt-5 pt-5 border-t border-border/60">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-2.5 text-center">Demo Accounts</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMOS.map(d => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => { setEmail(d.email); setPassword(d.password); }}
                  className="text-xs py-2 px-1 rounded-lg border border-border bg-muted/40 hover:bg-muted transition-colors text-center"
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
