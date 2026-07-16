import { API_ENDPOINTS } from "@/config/api";
import type { MenuData, MenuApiResponse } from "@/types/menu";

export async function fetchMenu(): Promise<MenuData> {
  const res = await fetch(API_ENDPOINTS.menu, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Menu API responded with status ${res.status}`);
  }

  const json: MenuApiResponse = await res.json();

  if (!json?.status || !json.data || !Array.isArray(json.data.categories)) {
    throw new Error("Menu API returned an unexpected response");
  }

  return {
    categories: json.data.categories,
    sections: Array.isArray(json.data.sections) ? json.data.sections : [],
  };
}