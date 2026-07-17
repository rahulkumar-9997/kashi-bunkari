"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularProducts } from "@/services/productServices";

export function usePopularProducts() {
  return useQuery({
    queryKey: ["popularProducts"],
    queryFn: fetchPopularProducts,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}