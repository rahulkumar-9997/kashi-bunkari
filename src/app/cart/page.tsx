import type { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review the items in your cart before checkout.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CartPage />;
}
