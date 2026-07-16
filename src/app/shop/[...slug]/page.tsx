import ShopPage from "./ShopPage";
import { Metadata } from "next";
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug.join("-") : slug ?? "";

  const label =
    slugStr.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Collection";

  const description = `Explore our collection of ${slugStr.replace(/-/g, " ") || "ethnic wear"} at Kasibunkari.`;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    title: `${label}`,
    description: description,
    alternates: {
      canonical: `${baseUrl}/category/${slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ShopPage slug={slug} />;
}
