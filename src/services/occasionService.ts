import { API_ENDPOINTS } from "@/config/api";
import type { OccasionApiResponse, OccasionItem } from "@/types/occasion";

export async function fetchOccasions(): Promise<OccasionItem[]> {
  const res = await fetch(API_ENDPOINTS.occasion, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Occasion API responded with status ${res.status}`);
  }
  const json: OccasionApiResponse = await res.json();

  if (!json?.status || !Array.isArray(json.data)) {
    throw new Error("Occasion API returned an unexpected response");
  }

  return json.data;
}
