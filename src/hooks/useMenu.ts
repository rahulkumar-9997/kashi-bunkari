import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "@/services/menuService";
import type { MenuData } from "@/types/menu";

export function useMenu() {
  return useQuery<MenuData>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}