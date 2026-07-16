import { Suspense } from "react";
import type { Metadata } from "next";
import ShopPage from "./ShopPage";
import { fetchShop } from "@/services/shopService";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const canonical = `${baseUrl}/shop/${slug.join("/")}`;

  try {
    const data = await fetchShop(slug, {});
    return {
      title: data.meta.title,
      description: data.meta.description,
      keywords: data.meta.keywords,
      alternates: { canonical },
      openGraph: {
        title: data.meta.title,
        description: data.meta.description,
        url: canonical,
      },
    };
  } catch {
    const slugStr = slug.join("-");
    const label =
      slugStr.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Collection";
    return {
      title: `${label}`,
      description: `Explore our collection of ${slugStr.replace(/-/g, " ") || "ethnic wear"} at Kasibunkari.`,
      alternates: { canonical },
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={null}>
      <ShopPage slug={slug} />
    </Suspense>
  );
}