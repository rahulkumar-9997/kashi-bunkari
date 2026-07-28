import type { Metadata } from "next";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchBlogList } from "@/services/blogService";
import BlogListPage from "./BlogListsPage";
import BlogListsPageSkeleton from "./BlogListsPageSkeleton";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "Banarasi Saree Blog | Buying Guides, Trends & Styling Tips | Kasibunkari",
  description:
    "Explore Banarasi saree buying guides, styling tips, handloom stories, fashion trends, and expert advice from Kasibunkari.",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    title: "Banarasi Saree Blog | Buying Guides, Trends & Styling Tips | Kasibunkari",
    description:
      "Explore Banarasi saree buying guides, styling tips, handloom stories, fashion trends, and expert advice from Kasibunkari.",
    url: `${SITE_URL}/blogs`,
    siteName: "Kasibunkari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banarasi Saree Blog | Buying Guides, Trends & Styling Tips | Kasibunkari",
    description:
      "Explore Banarasi saree buying guides, styling tips, handloom stories, fashion trends, and expert advice from Kasibunkari.",
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
