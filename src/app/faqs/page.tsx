import type { Metadata } from "next";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchFaqs } from "@/services/faqService";
import FaqsPage from "./FaqsPage";
import FaqsPageSkeleton from "./FaqsPageSkeleton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Kasibunkari",
  description:
    "Answers to common questions about Kasibunkari sarees, orders, shipping, returns, bulk orders, and customisation.",
  alternates: {
    canonical: `${SITE_URL}/faqs`,
  },
  openGraph: {
    title: "Frequently Asked Questions | Kasibunkari",
    description:
      "Answers to common questions about Kasibunkari sarees, orders, shipping, returns, bulk orders, and customisation.",
    url: `${SITE_URL}/faqs`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Kasibunkari",
    description:
      "Answers to common questions about Kasibunkari sarees, orders, shipping, returns, bulk orders, and customisation.",
  },
};

async function FaqsData() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FaqsPage />
    </HydrationBoundary>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<FaqsPageSkeleton />}>
      <FaqsData />
    </Suspense>
  );
}
