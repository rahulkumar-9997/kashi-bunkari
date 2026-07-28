import type { Metadata } from "next";
import AddressesPage from "./AddressesPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "My Addresses",
  description:
    "Manage your saved shipping and billing addresses on Kasibunkari.",
  alternates: {
    canonical: `${SITE_URL}/account/addresses`,
  },
  openGraph: {
    title: "My Addresses | Kasibunkari",
    description:
      "Manage your saved shipping and billing addresses on Kasibunkari.",
    url: `${SITE_URL}/account/addresses`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Addresses | Kasibunkari",
    description:
      "Manage your saved shipping and billing addresses on Kasibunkari.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <AddressesPage />;
}
