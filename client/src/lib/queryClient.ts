import { QueryClient } from "@tanstack/react-query";

// Proxy port for deployed environments
const BASE =
  typeof window !== "undefined" && (window as any).__PORT_5000__
    ? (window as any).__PORT_5000__
    : "";

export async function apiRequest(
  method: string,
  path: string,
  body?: unknown
): Promise<Response> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [path] = queryKey as [string, ...unknown[]];
        const res = await fetch(`${BASE}${path}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      },
      staleTime: 30_000,
      retry: false,
    },
  },
});
