import type { Metadata } from "next";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const metadata: Metadata = {
  title: "Privacy Policy | Kasibunkari",
  description:
    "Learn how Kasibunkari collects, uses, and protects your personal information when you visit our website or make a purchase.",

  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },

  openGraph: {
    title: "Privacy Policy | Kasibunkari",
    description:
      "Learn how Kasibunkari collects, uses, and protects your personal information when you visit our website or make a purchase.",
    url: `${SITE_URL}/privacy-policy`,
    siteName: "Kasibunkari",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Kasibunkari",
    description:
      "Learn how Kasibunkari collects, uses, and protects your personal information when you visit our website or make a purchase.",
  },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
