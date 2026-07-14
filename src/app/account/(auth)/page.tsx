import type { Metadata } from "next";
import AccountPage from "./AccountPage";

export const metadata: Metadata = {
  title: "My Profile | Kasibunkari",
  description: "View and edit your personal information.",
};

export default function Page() {
  return <AccountPage/>;
}