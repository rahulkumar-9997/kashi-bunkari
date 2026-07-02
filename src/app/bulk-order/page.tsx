// src/app/bulk-order/page.tsx
import type { Metadata } from "next";
import BulkOrderPage from "./BulkOrderPage";

export const metadata: Metadata = {
  title: "Bulk Orders | Kasibunkari — Weddings, Corporate Gifting & Retail",
  description:
    "Place a bulk order for handcrafted Banarasi sarees — perfect for weddings, corporate gifting, and retail partners. Fill out the form and our team will reach out with a custom quote.",
};

export default function Page() {
  return <BulkOrderPage />;
}
