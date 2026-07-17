"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchOccasions } from "@/services/occasionService";

export function useOccasion() {
  return useQuery({
    queryKey: ["occasions"],
    queryFn: fetchOccasions,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
