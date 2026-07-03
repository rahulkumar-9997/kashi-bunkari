import type { Metadata } from "next";
import FaqsPage from "./FaqsPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Kasibunkari",
  description:
    "Answers to common questions about Kasibunkari sarees, orders, shipping, returns, bulk orders, and customisation.",
};

export default function Page() {
  return <FaqsPage />;
}
