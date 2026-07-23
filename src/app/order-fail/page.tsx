import type { Metadata } from "next";
import { Suspense } from "react";
import OrderFailPage from "./OrderFailPage";

export const metadata: Metadata = {
  title: "Payment Failed",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ orderNumber: string }>;
};

export default async function Page({ params }: PageProps) {
  const { orderNumber } = await params;
  return (
    <Suspense fallback={null}>
      <OrderFailPage orderNumber={orderNumber} />
    </Suspense>
  );
}