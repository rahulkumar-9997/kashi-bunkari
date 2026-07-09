import { API_ENDPOINTS } from "@/config/api";
import type { Banner, BannerApiResponse } from "@/types/banner";

export async function fetchBanners(): Promise<Banner[]> {
  const res = await fetch(API_ENDPOINTS.banners);
  if (!res.ok)
    throw new Error(`Banner API responded with status ${res.status}`);
  const json: BannerApiResponse = await res.json();
  if (!json?.status || !Array.isArray(json.data)) {
    throw new Error("Banner API returned an unexpected response");
  }
  return json.data;
}
