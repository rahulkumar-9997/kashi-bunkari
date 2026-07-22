import { API_ENDPOINTS } from "@/config/api";
import { getToken } from "@/lib/authSession";
import type {
  CreateOrderResponse,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "@/types/payment";

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok || json.success === false) {
    throw new Error(json.message || "Payment request failed.");
  }
  return json as T;
}

export const paymentService = {
  async createOrder(): Promise<CreateOrderResponse> {
    const res = await fetch(API_ENDPOINTS.payment.createOrder, {
      method: "POST",
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  async verifyPayment(
    payload: VerifyPaymentPayload,
  ): Promise<VerifyPaymentResponse> {
    const res = await fetch(API_ENDPOINTS.payment.verify, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },
};
