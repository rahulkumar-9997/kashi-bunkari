"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSearchResults } from "@/services/searchResultsService";

export function useSearchResults(
  query: string,
  filterParams: Record<string, string>,
) {
  const filterKey = JSON.stringify(filterParams);

  return useInfiniteQuery({
    queryKey: ["search-results", query, filterKey],
    queryFn: ({ pageParam }) =>
      fetchSearchResults(query, {
        ...filterParams,
        ...(pageParam > 1 ? { page: String(pageParam) } : {}),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: query.trim().length > 0,
    staleTime: 60 * 1000,
  });
}
