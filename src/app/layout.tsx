import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchMenu } from "@/services/menuService";
import LenisProvider from "@/components/LenisProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import QueryProvider from "@/providers/QueryProvider";
import NextTopLoader from "nextjs-toploader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kasibunkari — Your Ethnic Destination",
    template: "%s | Kasibunkari",
  },
  description:
    "Premium ethnic wear — Sarees, Lehengas, Suits. Heritage craftsmanship meets modern silhouettes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kasibunkari — Your Ethnic Destination",
    description:
      "Premium ethnic wear — Sarees, Lehengas, Suits. Heritage craftsmanship meets modern silhouettes.",
    url: SITE_URL,
    siteName: "Kasibunkari",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/kasibunkari_logo.webp",
        width: 1200,
        height: 630,
        alt: "Kasibunkari",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kasibunkari — Your Ethnic Destination",
    description:
      "Premium ethnic wear — Sarees, Lehengas, Suits. Heritage craftsmanship meets modern silhouettes.",
    images: ["/images/kasibunkari_logo.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  return (
    <html
      lang="en"
      className={cn(cormorant.variable, "font-sans", geist.variable)}
    >
      <head>
        <link rel="icon" href="/images/fav.webp" />
        <link rel="apple-touch-icon" href="/images/fav.webp" />
        <link rel="shortcut icon" href="/images/fav.webp" />
        <meta name="theme-color" content="#8b0b13"></meta>
      </head>
      <body>
        <NextTopLoader
          color="#6B1626"
          height={3}
          showSpinner={false}
          crawl={true}
          easing="ease"
          speed={200}
        />
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <LenisProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </LenisProvider>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
