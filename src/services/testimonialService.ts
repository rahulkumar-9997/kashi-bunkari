import { API_ENDPOINTS } from "@/config/api";
import type { Testimonial, TestimonialApiResponse } from "@/types/testimonial";

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(API_ENDPOINTS.testimonials);
  if (!res.ok) {
    throw new Error(`Testimonials API responded with status ${res.status}`);
  }

  const json: TestimonialApiResponse = await res.json();
  if (!json?.success || !Array.isArray(json.data)) {
    throw new Error("Testimonials API returned an unexpected response");
  }

  return json.data;
}
