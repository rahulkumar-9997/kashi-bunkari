import type { Metadata } from "next";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchBlogDetail } from "@/services/blogService";
import BlogDetailsPage from "./BlogDetailsPage";
import BlogDetailsPageSkeleton from "./BlogDetailsPageSkeleton";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { blog } = await fetchBlogDetail(slug);
    const title = blog.meta_title || `${blog.title} | Kasibunkari Journal`;
    const description =
      blog.meta_description?.replace(/\r\n/g, " ").trim() ||
      blog.short_desc ||"";
    const url = `${SITE_URL}/blogs/${slug}`;
    const image = blog.page_image || blog.main_image;
    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Kasibunkari",
        type: "article",
        images: image
          ? [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch {
    return { title: "Kasibunkari Journal" };
  }
}

async function BlogDetailData({ slug }: { slug: string }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blog-detail", slug],
    queryFn: () => fetchBlogDetail(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetailsPage slug={slug} />
    </HydrationBoundary>
  );
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<BlogDetailsPageSkeleton />}>
      <BlogDetailData slug={slug} />
    </Suspense>
  );
}
