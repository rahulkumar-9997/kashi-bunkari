import type { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Kasibunkari account with OTP.",
};

export default function Page() {
  return <LoginPage />;
}
