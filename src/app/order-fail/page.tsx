import type { Metadata } from "next";
import { Suspense } from "react";
import OrderFailPage from "./OrderFailPage";
export const metadata: Metadata = {
  title: "Payment Failed",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ order_number?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { order_number } = await searchParams;

  return (
    <Suspense fallback={null}>
      <OrderFailPage orderNumber={order_number ?? ""} />
    </Suspense>
  );
}