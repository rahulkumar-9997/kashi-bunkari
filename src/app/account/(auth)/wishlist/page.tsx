import type { Metadata } from "next";
import WishlistPage from "./WishlistPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "View and manage your saved favorite products on Kasibunkari.",
  alternates: {
    canonical: `${SITE_URL}/account/wishlist`,
  },
  openGraph: {
    title: "My Wishlist | Kasibunkari",
    description: "View and manage your saved favorite products on Kasibunkari.",
    url: `${SITE_URL}/account/wishlist`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Wishlist | Kasibunkari",
    description: "View and manage your saved favorite products on Kasibunkari.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <WishlistPage />;
}
