
import type { Metadata } from "next";
import BlogListPage from "./BlogListsPage";

export const metadata: Metadata = {
  title: "Journal | Buying Guides, Trends & Stories",
  description:
    "Buying guides, trend notes, and honest advice — written by our team to help you shop with confidence.",
};

export default function Page() {
  return <BlogListPage />;
}
