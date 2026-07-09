"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogDetail } from "@/services/blogService";

export function useBlogDetail(slug: string) {
  return useQuery({
    queryKey: ["blog-detail", slug],
    queryFn: () => fetchBlogDetail(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
  });
}