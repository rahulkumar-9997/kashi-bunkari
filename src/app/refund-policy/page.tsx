import type { Metadata } from "next";
import RefundPolicy from "./RefundPolicy";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const metadata: Metadata = {
  title: "Refund & Exchange Policy | Kasibunkari",
  description:
    "Kasibunkari's refund, cancellation, and exchange policy. Learn about our 7-day return policy for damaged products and exchange guidelines.",

  alternates: {
    canonical: `${SITE_URL}/refund-policy`,
  },

  openGraph: {
    title: "Refund & Exchange Policy | Kasibunkari",
    description:
      "Kasibunkari's refund, cancellation, and exchange policy. Learn about our 7-day return policy for damaged products and exchange guidelines.",
    url: `${SITE_URL}/refund-policy`,
    siteName: "Kasibunkari",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Refund & Exchange Policy | Kasibunkari",
    description:
      "Kasibunkari's refund, cancellation, and exchange policy. Learn about our 7-day return policy for damaged products and exchange guidelines.",
  },
};

export default function RefundPolicyPage() {
  return <RefundPolicy />;
}
