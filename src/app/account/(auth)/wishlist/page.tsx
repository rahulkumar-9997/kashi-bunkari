import type { Metadata } from "next";
import WishlistPage from "./WishlistPage";

export const metadata: Metadata = {
  title: "My Wishlist | Kasibunkari",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <WishlistPage />;
}
