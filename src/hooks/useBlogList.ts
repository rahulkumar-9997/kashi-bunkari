"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogList } from "@/services/blogService";

export function useBlogList() {
  return useQuery({
    queryKey: ["blog-list"],
    queryFn: fetchBlogList,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
  });
}