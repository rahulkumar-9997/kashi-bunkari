import type { Metadata } from "next";
import PrivacyPolicyPage from "./PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Kasibunkari",
  description:
    "Learn how Kasibunkari collects, uses, and protects your personal information when you visit our website or make a purchase.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
