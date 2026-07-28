import type { Metadata } from "next";
import LoginPage from "./LoginPage";
import { Suspense } from "react";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Kasibunkari account securely using OTP.",
  alternates: {
    canonical: `${SITE_URL}/account/login`,
  },
  openGraph: {
    title: "Login | Kasibunkari",
    description: "Login to your Kasibunkari account securely using OTP.",
    url: `${SITE_URL}/account/login`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Kasibunkari",
    description: "Login to your Kasibunkari account securely using OTP.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
