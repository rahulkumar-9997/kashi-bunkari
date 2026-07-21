import { API_ENDPOINTS } from "@/config/api";
import type { CartApiResponse, CartErrorResponse } from "@/types/cart";
import { getCartToken } from "@/lib/cartToken";
import { getToken } from "@/lib/authSession";

async function handleResponse(res: Response): Promise<CartApiResponse> {
  const json = await res.json();

  if (!res.ok || json.success === false) {
    const err = json as CartErrorResponse;
    throw new Error(err.message || "Something went wrong with the cart.");
  }

  return json as CartApiResponse;
}

function jsonHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Cart-Token": getCartToken(),
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export const cartService = {
  async getCart(): Promise<CartApiResponse> {
    const res = await fetch(API_ENDPOINTS.cart.list, {
      method: "GET",
      credentials: "include",
      headers: jsonHeaders(),
    });
    return handleResponse(res);
  },

  async addToCart(
    productId: number,
    quantity: number = 1,
  ): Promise<CartApiResponse> {
    const res = await fetch(API_ENDPOINTS.cart.add, {
      method: "POST",
      credentials: "include",
      headers: jsonHeaders(),
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    return handleResponse(res);
  },

  async updateQuantity(
    productId: number,
    quantity: number,
  ): Promise<CartApiResponse> {
    const res = await fetch(API_ENDPOINTS.cart.update(productId), {
      method: "PUT",
      credentials: "include",
      headers: jsonHeaders(),
      body: JSON.stringify({ quantity }),
    });
    return handleResponse(res);
  },

  async removeFromCart(productId: number): Promise<CartApiResponse> {
    const res = await fetch(API_ENDPOINTS.cart.remove(productId), {
      method: "DELETE",
      credentials: "include",
      headers: jsonHeaders(),
    });
    return handleResponse(res);
  },

  async clearCart(): Promise<CartApiResponse> {
    const res = await fetch(API_ENDPOINTS.cart.clear, {
      method: "DELETE",
      credentials: "include",
      headers: jsonHeaders(),
    });
    return handleResponse(res);
  },
};
