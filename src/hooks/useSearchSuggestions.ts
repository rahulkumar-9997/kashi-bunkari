"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchSearchSuggestions } from "@/services/searchService";
import { useDebouncedValue } from "./useDebouncedValue";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 250;

export function useSearchSuggestions(rawQuery: string) {
  const query = useDebouncedValue(rawQuery.trim(), DEBOUNCE_MS);
  const enabled = query.length >= MIN_QUERY_LENGTH;

  const result = useQuery({
    queryKey: ["search-suggestions", query],
    queryFn: ({ signal }) => fetchSearchSuggestions(query, signal),
    enabled,
    placeholderData: keepPreviousData, // no flicker between keystrokes
    staleTime: 60 * 1000,
  });

  const isSearching = enabled && result.isFetching;

  return {
    ...result,
    query,
    isSearching,
    hasQuery: rawQuery.trim().length > 0,
    isTooShort:
      rawQuery.trim().length > 0 && rawQuery.trim().length < MIN_QUERY_LENGTH,
  };
}
