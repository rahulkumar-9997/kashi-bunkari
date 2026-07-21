import { AUTH_ENDPOINTS } from "@/config/api";
import { getCartToken } from "@/lib/cartToken";
import type {
  SendOtpResponse,
  ResendOtpResponse,
  VerifyOtpResponse,
  Customer,
} from "@/types/auth";

async function postJson<T>(
  url: string,
  body: Record<string, string>,
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
       "X-Cart-Token": getCartToken(),
      },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || "Something went wrong. Please try again.");
  }

  return json;
}

export function sendOtp(contact: string): Promise<SendOtpResponse> {
  return postJson<SendOtpResponse>(AUTH_ENDPOINTS.login, { contact });
}

export function verifyOtp(
  contact: string,
  otp: string,
): Promise<VerifyOtpResponse> {
  return postJson<VerifyOtpResponse>(AUTH_ENDPOINTS.verifyOtp, {
    contact,
    otp,
  });
}

export function resendOtp(contact: string): Promise<ResendOtpResponse> {
  return postJson<ResendOtpResponse>(AUTH_ENDPOINTS.resendOtp, { contact });
}

/**
 * Fetches the logged-in customer's latest profile data from the server.
 * Used on app load to validate the cached token and refresh customer data
 * (in case it changed elsewhere, e.g. from the admin panel).
 */
export async function fetchProfile(token: string): Promise<Customer> {
  const res = await fetch(AUTH_ENDPOINTS.profile, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok || !json?.success) {
    throw new Error(json?.message || "Failed to fetch profile");
  }

  return json.data;
}

export async function logoutApi(
  token: string,
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(AUTH_ENDPOINTS.logout, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || "Logout failed");
  }

  return json;
}

/** Thrown on a 422 validation response — carries Laravel's per-field
 *  errors object (e.g. { email: ["The email has already been taken."] })
 *  so the UI can show the message next to the right field. */
export class ValidationError extends Error {
  errors: Record<string, string[]>;
  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

/** Updates the logged-in customer's profile fields. */
export async function updateProfile(
  token: string,
  data: Partial<
    Pick<
      Customer,
      "name" | "email" | "phone_number" | "gender" | "date_of_birth" | "bio"
    >
  >,
): Promise<{ success: boolean; message: string; data: Customer }> {
  const res = await fetch(AUTH_ENDPOINTS.updateProfile, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (res.status === 422 && json?.errors) {
    throw new ValidationError(json.message || "Validation Error", json.errors);
  }
  if (!res.ok || !json?.success) {
    throw new Error(json?.message || "Failed to update profile");
  }
  return json;
}
