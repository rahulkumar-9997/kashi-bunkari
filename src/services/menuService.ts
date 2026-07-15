import { API_ENDPOINTS } from "@/config/api";
import type { MenuCategory, MenuApiResponse } from "@/types/menu";

export async function fetchMenu(): Promise<MenuCategory[]> {
  const res = await fetch(API_ENDPOINTS.menu, {
    // Cached on the server, revalidated at most once an hour.
    // Use `cache: "no-store"` if you need it fresh on every single request.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Menu API responded with status ${res.status}`);
  }

  const json: MenuApiResponse = await res.json();
  if (!json?.status || !Array.isArray(json.data)) {
    throw new Error("Menu API returned an unexpected response");
  }

  return json.data;
}