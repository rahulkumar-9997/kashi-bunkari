import WishlistPage from "./WishlistPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "View and manage your favorite items in your wishlist.",
};

export default function Page() {
  return <WishlistPage />;
}
