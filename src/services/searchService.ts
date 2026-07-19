import { API_ENDPOINTS } from "@/config/api";
import type {
  SearchSuggestionApiResponse,
  SearchSuggestionItem,
} from "@/types/search";

export async function fetchSearchSuggestions(
  query: string,
  signal?: AbortSignal,
): Promise<SearchSuggestionItem[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const url = `${API_ENDPOINTS.searchSuggestion}?query=${encodeURIComponent(trimmed)}`;
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(
      `Search suggestion API responded with status ${res.status}`,
    );
  }

  const json: SearchSuggestionApiResponse = await res.json();

  return Array.isArray(json.suggestions) ? json.suggestions : [];
}
