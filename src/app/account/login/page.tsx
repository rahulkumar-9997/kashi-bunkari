// src/app/login/page.tsx
import type { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: "Login | Kasibunkari",
  description: "Login to your Kasibunkari account with OTP.",
};

export default function Page() {
  return <LoginPage />;
}
