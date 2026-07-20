import { API_ENDPOINTS } from "@/config/api";
import type { SearchResultsData } from "@/types/product";

export async function fetchSearchResults(
  query: string,
  params: Record<string, string> = {},
  signal?: AbortSignal,
): Promise<SearchResultsData> {
  const qs = new URLSearchParams({ query, ...params }).toString();
  const res = await fetch(`${API_ENDPOINTS.search}?${qs}`, { signal });

  if (!res.ok) {
    throw new Error(`Search API responded with status ${res.status}`);
  }

  const json: SearchResultsData = await res.json();

  if (!Array.isArray(json?.products)) {
    throw new Error("Search API returned an unexpected response");
  }

  return json;
}
