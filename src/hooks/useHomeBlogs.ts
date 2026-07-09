"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeBlogs } from "@/services/blogService";

export function useHomeBlogs() {
  return useQuery({
    queryKey: ["home-blogs"],
    queryFn: fetchHomeBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // background poll every 5 minutes
    refetchIntervalInBackground: false, // only while the tab is active
  });
}
