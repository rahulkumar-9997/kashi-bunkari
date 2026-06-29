import CategoryPage from "./CategoryPage";
import { Metadata } from "next";
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const label =
    slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Collection";
  const description = `Explore our collection of ${slug?.replace(/-/g, " ") || "ethnic wear"} at Kasibunkari.`;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    title: `${label} | Kasibunkari`,
    description: description,
    alternates: {
      canonical: `${baseUrl}/category/${slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPage slug={slug} />;
}
