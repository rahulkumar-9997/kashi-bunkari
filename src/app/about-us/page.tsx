import type { Metadata } from "next";
import AboutUsPage from "./AboutUsPage";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const metadata: Metadata = {
  title: "About Us | Kasibunkari — Essence to Elegance",
  description:
    "Discover the heritage and artistry of Banaras with Kasibunkari's exclusive collection of handwoven Banarasi silk sarees.",
  alternates: {
    canonical: `${SITE_URL}/about-us`,
  },
  openGraph: {
    title: "About Us",
    description:
      "Discover the heritage and artistry of Banaras with Kasibunkari's exclusive collection of handwoven Banarasi silk sarees.",
    url: `${SITE_URL}/about-us`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Kasibunkari — Essence to Elegance",
    description:
      "Discover the heritage and artistry of Banaras with Kasibunkari's exclusive collection of handwoven Banarasi silk sarees.",
  },
};
export default function Page() {
  return <AboutUsPage />;
}
