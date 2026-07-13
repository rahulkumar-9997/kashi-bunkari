"use client";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
const PAGE_LABELS: Record<string, string> = {
  "/account/orders": "My Orders",
  "/account/wishlist": "Wishlist",
  "/account/addresses": "Addresses",
  "/account/payment-methods": "Payment Methods",
  "/account/rewards": "Rewards",
};
export default function AccountBreadcrumb() {
  const pathname = usePathname();
  const pageLabel = PAGE_LABELS[pathname];
  const items =
    pageLabel && pathname !== "/account"
      ? [
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: pageLabel },
        ]
      : [{ label: "Home", href: "/" }, { label: "My Account" }];

  return <Breadcrumb items={items} />;
}