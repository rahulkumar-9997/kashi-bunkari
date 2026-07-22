import { API_ENDPOINTS } from "@/config/api";
import { getToken } from "@/lib/authSession";
import type {
  AddressListResponse,
  AddressResponse,
  AddressPayload,
  StateListResponse,
} from "@/types/address";

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
    throw new Error(json.message || "Request failed.");
  }
  return json as T;
}

export const addressService = {
  async list(): Promise<AddressListResponse> {
    const res = await fetch(API_ENDPOINTS.addresses.list, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
  async create(payload: AddressPayload): Promise<AddressResponse> {
    const res = await fetch(API_ENDPOINTS.addresses.create, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },
  async update(id: number, payload: AddressPayload): Promise<AddressResponse> {
    const res = await fetch(API_ENDPOINTS.addresses.update(id), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },
  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(API_ENDPOINTS.addresses.delete(id), {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
  async setDefault(id: number): Promise<AddressResponse> {
    const res = await fetch(API_ENDPOINTS.addresses.setDefault(id), {
      method: "PATCH",
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
};

export const stateService = {
  async list(): Promise<StateListResponse> {
    const res = await fetch(API_ENDPOINTS.states, {
      headers: { Accept: "application/json" },
    });
    return handleResponse(res);
  },
};
