import { API_ENDPOINTS } from "@/config/api";
import { getToken } from "@/lib/authSession";
import type {
  WishlistApiResponse,
  WishlistToggleApiResponse,
  WishlistErrorResponse,
} from "@/types/wishlist";

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok || json.success === false) {
    const err = json as WishlistErrorResponse;
    throw new Error(err.message || "Something went wrong with your wishlist.");
  }
  return json as T;
}

export const wishlistService = {
  async list(): Promise<WishlistApiResponse> {
    const res = await fetch(API_ENDPOINTS.wishlist.list, {
      method: "GET",
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  async add(productId: number): Promise<WishlistApiResponse> {
    const res = await fetch(API_ENDPOINTS.wishlist.add, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ product_id: productId }),
    });
    return handleResponse(res);
  },

  async remove(productId: number): Promise<WishlistApiResponse> {
    const res = await fetch(API_ENDPOINTS.wishlist.remove(productId), {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  async toggle(productId: number): Promise<WishlistToggleApiResponse> {
    const res = await fetch(API_ENDPOINTS.wishlist.toggle, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ product_id: productId }),
    });
    return handleResponse(res);
  },
};
