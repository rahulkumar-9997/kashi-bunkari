import type { Metadata } from "next";
import OrderSuccessPage from "./OrderSuccessPage";

export const metadata: Metadata = {
  title: "Order Confirmation | Kasibunkari",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ orderNumber: string }>;
};

export default async function Page({ params }: PageProps) {
  const { orderNumber } = await params;
  return <OrderSuccessPage orderNumber={orderNumber} />;
}
