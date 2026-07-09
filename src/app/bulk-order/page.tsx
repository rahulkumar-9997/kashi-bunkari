import type { Metadata } from "next";
import BulkOrderPage from "./BulkOrderPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "Bulk Orders | Kasibunkari — Weddings, Corporate Gifting & Retail",
  description:
    "Place a bulk order for handcrafted Banarasi sarees — perfect for weddings, corporate gifting, and retail partners. Fill out the form and our team will reach out with a custom quote.",

  alternates: {
    canonical: `${SITE_URL}/bulk-order`,
  },

  openGraph: {
    title: "Bulk Orders | Kasibunkari — Weddings, Corporate Gifting & Retail",
    description:
      "Place a bulk order for handcrafted Banarasi sarees — perfect for weddings, corporate gifting, and retail partners. Fill out the form and our team will reach out with a custom quote.",
    url: `${SITE_URL}/bulk-order`,
    siteName: "Kasibunkari",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bulk Orders | Kasibunkari — Weddings, Corporate Gifting & Retail",
    description:
      "Place a bulk order for handcrafted Banarasi sarees — perfect for weddings, corporate gifting, and retail partners. Fill out the form and our team will reach out with a custom quote.",
  },
};

export default function Page() {
  return <BulkOrderPage />;
}
