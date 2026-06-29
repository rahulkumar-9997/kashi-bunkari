import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LenisProvider from "@/components/LenisProvider";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Kasibunkari — Your Ethnic Destination",
  description: "Premium ethnic wear — Sarees, Lehengas, Suits. Heritage craftsmanship meets modern silhouettes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(cormorant.variable, "font-sans", geist.variable)}>
      <head>
        <link rel="icon" href="/images/fav.webp" />
        <link rel="apple-touch-icon" href="/images/fav.webp" />
        <link rel="shortcut icon" href="/images/fav.webp" />
      </head>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
