import type { Metadata } from "next";
import OrdersPage from "./OrdersPage";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and track all your orders.",
};

export default function Page() {
  return <OrdersPage />;
}