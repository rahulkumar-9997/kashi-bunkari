import type { Metadata } from "next";
import OrdersPage from "./OrdersPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "My Orders",
  description:
    "View and track your Kasibunkari orders, order history, and shipment status.",
  alternates: {
    canonical: `${SITE_URL}/account/orders`,
  },
  openGraph: {
    title: "My Orders | Kasibunkari",
    description:
      "View and track your Kasibunkari orders, order history, and shipment status.",
    url: `${SITE_URL}/account/orders`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Orders | Kasibunkari",
    description:
      "View and track your Kasibunkari orders, order history, and shipment status.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <OrdersPage />;
}
