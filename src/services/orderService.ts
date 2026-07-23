import { API_ENDPOINTS } from "@/config/api";
import { getToken } from "@/lib/authSession";
import type { OrderDetailResponse } from "@/types/order";

function headers(): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/json" };
  const token = getToken();
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export const orderService = {
  async getByNumber(orderNumber: string): Promise<OrderDetailResponse> {
    const res = await fetch(API_ENDPOINTS.orderDetail(orderNumber), {
      method: "GET",
      headers: headers(),
    });
    const json = await res.json();
    if (!res.ok || json.success === false) {
      throw new Error(json.message || "Could not load order details.");
    }
    return json as OrderDetailResponse;
  },
};