"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchFaqs } from "@/services/faqService";
export function useFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
  });
}