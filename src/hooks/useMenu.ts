"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "@/services/menuService";

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
