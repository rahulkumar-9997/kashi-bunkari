import type { Metadata } from "next";
import ContactUsPage from "./ContactUsPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "Contact Us | Kasibunkari — Essence to Elegance",
  description:
    "Get in touch with Kasibunkari for orders, product queries, pricing, or shipping. Visit our Varanasi store or reach out by email, phone, or WhatsApp.",
  alternates: {
    canonical: `${SITE_URL}/contact-us`,
  },
  openGraph: {
    title: "Contact Us | Kasibunkari — Essence to Elegance",
    description:
      "Get in touch with Kasibunkari for orders, product queries, pricing, or shipping. Visit our Varanasi store or reach out by email, phone, or WhatsApp.",
    url: `${SITE_URL}/contact-us`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Kasibunkari — Essence to Elegance",
    description:
      "Get in touch with Kasibunkari for orders, product queries, pricing, or shipping. Visit our Varanasi store or reach out by email, phone, or WhatsApp.",
  },
};

export default function Page() {
  return <ContactUsPage />;
}
