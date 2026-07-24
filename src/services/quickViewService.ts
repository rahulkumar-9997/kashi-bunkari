import { API_ENDPOINTS } from "@/config/api";
import type { QuickViewResponse } from "@/types/quickView";

export const quickViewService = {
  async get(
    parentSlug: string,
    attributeValueSlug?: string,
  ): Promise<QuickViewResponse> {
    const res = await fetch(
      API_ENDPOINTS.quickView(parentSlug, attributeValueSlug),
    );
    const json = await res.json();
    if (!res.ok || json.success === false) {
      throw new Error(json.message || "Could not load product.");
    }
    return json as QuickViewResponse;
  },
};
