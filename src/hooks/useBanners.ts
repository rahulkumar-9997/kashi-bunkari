"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "@/services/bannerService";

export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // background poll every 5 minutes
    refetchIntervalInBackground: false, // only while the tab is active
  });
}
