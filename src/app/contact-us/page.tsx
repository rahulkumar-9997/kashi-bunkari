// src/app/contact/page.tsx
import type { Metadata } from "next";
import ContactUsPage from "./ContactUsPage";

export const metadata: Metadata = {
  title: "Contact Us | Kasibunkari — Essence to Elegance",
  description:
    "Get in touch with Kasibunkari for orders, product queries, pricing, or shipping. Visit our Varanasi store or reach out by email, phone, or WhatsApp.",
};

export default function Page() {
  return <ContactUsPage />;
}
