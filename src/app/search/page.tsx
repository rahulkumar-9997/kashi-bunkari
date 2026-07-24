import { Suspense } from "react";
import type { Metadata } from "next";
import SearchPage from "./SearchPage";
import { fetchSearchResults } from "@/services/searchResultsService";

type PageProps = {
  searchParams: Promise<{ query?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { query = "" } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const canonical = `${baseUrl}/search${query ? `?query=${encodeURIComponent(query)}` : ""}`;

  if (!query.trim()) {
    return {
      title: "Search",
      description: "Search Kasibunkari for sarees, suits, and ethnic wear.",
      alternates: { canonical },
    };
  }

  try {
    const data = await fetchSearchResults(query, {});
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
    return {
      title: `"${query}" — Search Results | Kasibunkari`,
      description: `Search results for ${query} at Kasibunkari.`,
      alternates: { canonical },
    };
  }
}

export default async function Page({ searchParams }: PageProps) {
  const { query = "" } = await searchParams;
  return (
    <Suspense fallback={null}>
      <SearchPage query={query} />
    </Suspense>
  );
}