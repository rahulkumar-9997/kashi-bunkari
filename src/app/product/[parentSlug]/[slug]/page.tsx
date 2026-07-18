import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductDetail } from "@/services/productServices";
import ProductDetailsPage from "./ProductDetailsPage";
type PageProps = {
  params: Promise<{ parentSlug: string; slug: string }>;
};
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { parentSlug, slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const canonical = `${baseUrl}/product/${parentSlug}/${slug}`;
  try {
    const data = await fetchProductDetail(parentSlug, slug);
    const image = data.product_details.image_larges[0]?.image_large;
    return {
      title: data.meta.title,
      description: data.meta.description,
      keywords: data.meta.keywords,
      alternates: { canonical },
      openGraph: {
        title: data.meta.title,
        description: data.meta.description,
        url: canonical,
        images: image ? [{ url: image }] : undefined,
      },
    };
  } catch {
    const label =
      slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Product";
    return {
      title: `${label} | Kasibunkari`,
      description: `Buy ${label} online at Kasibunkari.`,
      alternates: { canonical },
    };
  }
}
export default async function Page({ params }: PageProps) {
  const { parentSlug, slug } = await params;
  let data;
  try {
    data = await fetchProductDetail(parentSlug, slug);
  } catch {
    notFound();
  }
  return <ProductDetailsPage product={data} />;
}