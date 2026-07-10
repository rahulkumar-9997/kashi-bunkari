import { AUTH_ENDPOINTS } from "@/config/api";
import type {
  SendOtpResponse,
  ResendOtpResponse,
  VerifyOtpResponse,
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
