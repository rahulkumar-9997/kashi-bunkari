"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "@/services/testimonialService";
export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // background poll every 5 minutes
    refetchIntervalInBackground: false,
  });
}