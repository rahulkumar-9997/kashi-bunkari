import type { Metadata } from "next";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchBlogList } from "@/services/blogService";
import BlogListPage from "./BlogListsPage";
import BlogListsPageSkeleton from "./BlogListsPageSkeleton";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const metadata: Metadata = {
  title: "Journal | Buying Guides, Trends & Stories",
  description:
    "Buying guides, trend notes, and honest advice — written by our team to help you shop with confidence.",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },

  openGraph: {
    title: "Journal | Buying Guides, Trends & Stories",
    description:
      "Buying guides, trend notes, and honest advice — written by our team to help you shop with confidence.",
    url: `${SITE_URL}/blogs`,
    siteName: "Kasi Bunkari",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Journal | Buying Guides, Trends & Stories",
    description:
      "Buying guides, trend notes, and honest advice — written by our team to help you shop with confidence.",
  },
};

async function BlogListData() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blog-list"],
    queryFn: fetchBlogList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogListPage />
    </HydrationBoundary>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<BlogListsPageSkeleton />}>
      <BlogListData />
    </Suspense>
  );
}
