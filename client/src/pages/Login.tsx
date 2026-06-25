import { useState } from "react";
import { useAuth, type AuthUser } from "@/App";
import { login, DEMO_USERS } from "@/lib/localData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const doLogin = (e: string, p: string) => {
    setLoading(true);
    const user = login(e, p);
    if (!user) {
      toast({ title: "Login failed", description: "Invalid email or password", variant: "destructive" });
      setLoading(false);
      return;
    }
    setUser(user as AuthUser);
    setLoading(false);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    doLogin(email, password);
  };

  const roleColors: Record<string, string> = {
    admin: "border-purple-200 bg-purple-50 text-purple-700",
    distributor: "border-blue-200 bg-blue-50 text-blue-700",
    dealer: "border-teal-200 bg-teal-50 text-teal-700",
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <svg aria-label="HVAC Pro Logo" viewBox="0 0 40 40" width="40" height="40" fill="none" className="flex-shrink-0">
            <rect width="40" height="40" rx="8" fill="#0070c0" />
            <path d="M20 8 L20 32" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 14 L20 8 L30 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 20 L30 20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="20" r="3" fill="white" />
            <circle cx="12" cy="26" r="2.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            <circle cx="28" cy="26" r="2.5" stroke="hsl(185 75% 45%)" strokeWidth="1.5" />
          </svg>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-none" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              HVAC Pro
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Product Catalog Platform</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
          <h2 className="text-lg font-semibold mb-1 text-gray-800">Sign in to your account</h2>
          <p className="text-sm text-gray-500 mb-6">Access your HVAC product catalog</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1.5 bg-gray-50 border-gray-200"
                data-testid="input-email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1.5 bg-gray-50 border-gray-200"
                data-testid="input-password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 font-semibold"
              disabled={loading}
              data-testid="button-login"
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          {/* Demo quick logins */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Demo Accounts
            </p>
            <div className="space-y-2">
              {DEMO_USERS.map(u => (
                <button
                  key={u.email}
                  onClick={() => doLogin(u.email, u.password)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all hover:brightness-110 ${roleColors[u.role] ?? ""}`}
                  data-testid={`button-demo-${u.role}`}
                >
                  <div>
                    <p className="text-sm font-medium leading-none">{u.name}</p>
                    <p className="text-xs opacity-70 mt-0.5">{u.email}</p>
                  </div>
                  <span className="text-xs font-semibold capitalize px-2 py-0.5 rounded-full border border-current/30 bg-current/10">
                    {u.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Created with Perplexity Computer
          </a>
        </p>
      </div>
    </div>
  );
}
