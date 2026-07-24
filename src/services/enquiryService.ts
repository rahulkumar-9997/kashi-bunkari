import { API_ENDPOINTS } from "@/config/api";
import type {
  ContactFormEnquiryPayload,
  ContactFormEnquiryResponse,
} from "@/types/enquiry";
export class ValidationError extends Error {
  errors: Record<string, string[]>;
  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}
export const contactFormEnquiryService = {
  async submit(payload: ContactFormEnquiryPayload): Promise<ContactFormEnquiryResponse> {
    const res = await fetch(API_ENDPOINTS.contactFormEnquiry, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
 
    if (res.status === 422 && json?.errors) {
      throw new ValidationError(json.message || "Please check the form for errors.", json.errors);
    }
    if (!res.ok || json.success === false) {
      throw new Error(json.message || "Could not send your enquiry.");
    }
    return json as ContactFormEnquiryResponse;
  },
};
