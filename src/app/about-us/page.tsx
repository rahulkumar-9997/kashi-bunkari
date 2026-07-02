import type { Metadata } from "next";
import AboutUsPage from "./AboutUsPage";

export const metadata: Metadata = {
  title: "About Us | Kasibunkari — Essence to Elegance",
  description:
    "Discover the heritage and artistry of Banaras with Kasibunkari's exclusive collection of handwoven Banarasi silk sarees.",
};

export default function Page() {
  return <AboutUsPage />;
}
