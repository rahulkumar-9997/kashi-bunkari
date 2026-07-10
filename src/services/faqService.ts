import { API_ENDPOINTS } from "@/config/api";
import type { Faq, FaqApiResponse } from "@/types/faq";
export async function fetchFaqs(): Promise<Faq[]> {
  const res = await fetch(API_ENDPOINTS.faqs);
  if (!res.ok) {
    throw new Error(`FAQ API responded with status ${res.status}`);
  }
  const json: FaqApiResponse = await res.json();
  if (!json?.status || !Array.isArray(json.data)) {
    throw new Error("FAQ API returned an unexpected response");
  }

  return json.data;
}
