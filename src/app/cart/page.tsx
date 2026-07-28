import type { Metadata } from "next";
import CartPage from "./CartPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review the items in your shopping cart before proceeding to checkout on Kasibunkari.",
  alternates: {
    canonical: `${SITE_URL}/cart`,
  },
  openGraph: {
    title: "Shopping Cart | Kasibunkari",
    description:
      "Review the items in your shopping cart before proceeding to checkout on Kasibunkari.",
    url: `${SITE_URL}/cart`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopping Cart | Kasibunkari",
    description:
      "Review the items in your shopping cart before proceeding to checkout on Kasibunkari.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <CartPage />;
}
