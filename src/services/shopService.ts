import { API_BASE_URL } from "@/config/api";
import type { ShopApiResponse, ShopResponseData } from "@/types/shop";

export async function fetchShop(
  segments: string[],
  params: Record<string, string> = {},
): Promise<ShopResponseData> {
  const path = segments.filter(Boolean).join("/");
  const qs = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/api/shop/${path}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Shop API responded with status ${res.status}`);
  }

  const json: ShopApiResponse = await res.json();

  if (!json?.success || !json.data) {
    throw new Error("Shop API returned an unexpected response");
  }

  return json.data;
}
