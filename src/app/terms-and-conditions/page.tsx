import type { Metadata } from "next";
import TermsAndConditionsPage from "./TermsAndConditionsPage";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const metadata: Metadata = {
  title: "Terms & Conditions | Kasibunkari - Premium Ethnic Wear",
  description:
    "Read Kasibunkari's terms and conditions, including product terms, website usage, disclaimers, and liability limitations.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  openGraph: {
    title: "Terms & Conditions | Kasibunkari",
    description:
      "Read our terms and conditions for using the Kasibunkari website and purchasing products.",
    url: `${SITE_URL}/terms-and-conditions`,
    siteName: "Kasibunkari",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Kasibunkari",
    description:
      "Read our terms and conditions for using the Kasibunkari website and purchasing products.",
  },
};

export default function TermsAndConditions() {
  return <TermsAndConditionsPage />;
}
