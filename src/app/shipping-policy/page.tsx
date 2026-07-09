import type { Metadata } from "next";
import ShippingPolicy from "./ShippingPolicy";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const metadata: Metadata = {
  title: "Shipping Policy | Kasibunkari - Premium Ethnic Wear",
  description:
    "Learn about Kasibunkari's shipping policy, delivery timelines, order tracking, and damaged package policies. We deliver premium ethnic wear across India.",

  alternates: {
    canonical: `${SITE_URL}/shipping-policy`,
  },
  openGraph: {
    title: "Shipping Policy | Kasibunkari",
    description:
      "Learn about Kasibunkari's shipping policy, delivery timelines, order tracking, and damaged package policies. We deliver premium ethnic wear across India.",
    url: `${SITE_URL}/shipping-policy`,
    siteName: "Kasibunkari",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping Policy | Kasibunkari",
    description:
      "Learn about Kasibunkari's shipping policy, delivery timelines, order tracking, and damaged package policies. We deliver premium ethnic wear across India.",
  },
};

export default function ShippingPolicyPage() {
  return <ShippingPolicy />;
}
