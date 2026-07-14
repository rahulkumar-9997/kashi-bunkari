import { AUTH_ENDPOINTS } from "@/config/api";
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
    headers: { "Content-Type": "application/json" },
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


export async function logoutApi(token: string): Promise<{ success: boolean; message: string }> {
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

/** Updates the logged-in customer's profile fields (name, gender, DOB, bio). */
export async function updateProfile(
  token: string,
  data: Partial<Pick<Customer, "name" | "gender" | "date_of_birth" | "bio">>,
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
 
  if (!res.ok || !json?.success) {
    throw new Error(json?.message || "Failed to update profile");
  }
 
  return json;
}
