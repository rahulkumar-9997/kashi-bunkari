import type { Metadata } from "next";
import FaqsPage from "./FaqsPage";
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

export default function Page() {
  return <FaqsPage />;
}
