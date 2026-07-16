"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchShop } from "@/services/shopService";

export function useShop(
  segments: string[],
  filterParams: Record<string, string>,
) {
  const filterKey = JSON.stringify(filterParams);

  return useInfiniteQuery({
    queryKey: ["shop", segments.join("/"), filterKey],
    queryFn: ({ pageParam }) =>
      fetchShop(segments, {
        ...filterParams,
        ...(pageParam > 1 ? { page: String(pageParam) } : {}),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
