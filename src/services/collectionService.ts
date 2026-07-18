import { API_ENDPOINTS } from "@/config/api";
import type {
  CollectionsApiResponse,
  CollectionItem,
} from "@/types/collection";

export async function fetchCollections(): Promise<CollectionItem[]> {
  const res = await fetch(API_ENDPOINTS.collections, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Collections API responded with status ${res.status}`);
  }

  const json: CollectionsApiResponse = await res.json();

  if (!json?.status || !Array.isArray(json.data)) {
    throw new Error("Collections API returned an unexpected response");
  }

  return json.data;
}
