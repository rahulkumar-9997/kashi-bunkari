import { API_ENDPOINTS } from "@/config/api";
import { getToken } from "@/lib/authSession";
import { getCartToken } from "@/lib/cartToken";
import type {
  PlaceOrderPayload,
  PlaceOrderCodResponse,
  PlaceOrderRazorpayResponse,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "@/types/checkout";

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const token = getToken();
  if (token) h.Authorization = `Bearer ${token}`;
  const cartToken = getCartToken();
  if (cartToken) h["X-Cart-Token"] = cartToken;
  return h;
}

async function handle<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok || json.success === false)
    throw new Error(json.message || "Request failed.");
  return json as T;
}

export const checkoutService = {
  async placeOrder(
    payload: PlaceOrderPayload,
  ): Promise<PlaceOrderCodResponse | PlaceOrderRazorpayResponse> {
    const res = await fetch(API_ENDPOINTS.checkout.placeOrder, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
    });
    return handle(res);
  },
  async verifyPayment(
    payload: VerifyPaymentPayload,
  ): Promise<VerifyPaymentResponse> {
    const res = await fetch(API_ENDPOINTS.checkout.verifyPayment, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
    });
    return handle(res);
  },
};
