"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNewArrivals } from "@/services/productServices";

export function useNewArrivals() {
  return useQuery({
    queryKey: ["newArrivals"],
    queryFn: fetchNewArrivals,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}