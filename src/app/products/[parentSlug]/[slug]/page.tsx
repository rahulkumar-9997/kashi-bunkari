import ProductDetailsPage from "./ProductDetailsPage";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ parentSlug: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { parentSlug, slug } = await params;

  const label =
    slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Product";

  const parentLabel =
    parentSlug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Products";

  const description = `Buy ${label} online at Kasibunkari. ${parentLabel} — premium quality, handcrafted, pan-India delivery.`;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return {
    title: `${label} | Kasibunkari`,
    description: description,
    alternates: {
      canonical: `${baseUrl}/products/${parentSlug}/${slug}`,
    },
    openGraph: {
      title: `${label} | Kasibunkari`,
      description: description,
      url: `${baseUrl}/products/${parentSlug}/${slug}`,
      siteName: "Kasibunkari",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { parentSlug, slug } = await params;
  return <ProductDetailsPage parentSlug={parentSlug} slug={slug} />;
}
