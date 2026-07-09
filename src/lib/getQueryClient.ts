import { QueryClient } from "@tanstack/react-query";
const STALE_TIME = 5 * 60 * 1000; // 5 minutes — how long data stays "fresh"
const GC_TIME = 15 * 60 * 1000; // 15 minutes — how long unused data stays in memory before removal

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined;
export function getQueryClient() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}