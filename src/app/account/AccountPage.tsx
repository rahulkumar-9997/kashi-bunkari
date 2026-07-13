"use client";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import {
  ArrowRight,
  ChevronRight,
  Package,
  ShoppingBag,
  Heart,
  Star,
  Truck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
type Order = {
  id: string;
  orderNumber: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: string;
  itemsSummary: string;
};
const RECENT_ORDERS: Order[] = [];

const STATUS_STYLES: Record<
  Order["status"],
  { bg: string; text: string; border: string }
> = {
  Processing: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  Shipped: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  Delivered: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  Cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};

export default function AccountPage() {
  const { customer } = useAuth();
  if (!customer) return null;
  const stats = [
    { label: "Total Orders", value: "12", icon: ShoppingBag },
    { label: "Wishlist Items", value: "8", icon: Heart },
    { label: "Reviews Written", value: "5", icon: Star },
  ];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
        const Icon = stat.icon;
        return (
            <div 
            key={stat.label} 
            className="bg-white rounded-xl border border-[#E4D9C4] px-4 sm:px-5 py-4 sm:py-4.5 hover:border-[#AD8A3B]/40 hover:shadow-[0_16px_36px_-24px_rgba(107,22,38,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
            <div className="flex items-center gap-3.5">
                <div className="p-2.5 w-10 h-10 rounded-lg bg-[#FBF6ED] border border-[#E4D9C4] shrink-0 flex items-center justify-center">
                <Icon size={18} className="text-maroon" strokeWidth={1.7} />
                </div>
                <div className="min-w-0">
                <p className="font-sans text-[14px] font-bold text-gray-500">{stat.label}</p>
                <p className="font-serif text-[24px] font-bold text-maroon leading-tight">
                    {stat.value}
                </p>
                </div>
            </div>
            </div>
        );
        })}
      </div>
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <Heading
              level={3}
              text="Recent Orders"
              className="text-maroon"
              decorator="none"
              allowHTML
            />
          </div>
          {RECENT_ORDERS.length > 0 && (
            <Link
              href="/account/orders"
              className="group inline-flex items-center gap-1.5 font-sans text-[12.5px] font-bold uppercase tracking-[0.06em] text-maroon hover:gap-2.5 transition-all duration-300"
            >
              View All
              <ChevronRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          )}
        </div>

        {RECENT_ORDERS.length === 0 ? (
          <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] px-6 sm:px-8 py-10 sm:py-12 text-center">
            <span className="inline-flex items-center justify-center w-13 h-13 rounded-full border-[1.5px] border-[#AD8A3B]/40 mb-4">
              <Package size={22} className="text-[#AD8A3B]" strokeWidth={1.7} />
            </span>
            <p className="font-serif text-[18px] font-bold text-maroon mb-1.5">
              No orders yet
            </p>
            <p className="font-sans text-[13.5px] text-gray-500 mb-6 max-w-xs mx-auto leading-relaxed">
              When you place an order with us, it will appear here for you to
              track.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 font-sans text-[11.5px] font-bold uppercase tracking-[0.1em] text-maroon border-b-2 border-maroon pb-1 hover:gap-3 transition-all duration-300"
            >
              Start Shopping
              <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-[#E4D9C4] overflow-hidden divide-y divide-[#E4D9C4]">
            {RECENT_ORDERS.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="group flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-5 hover:bg-[#FBF6ED]/60 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#FBF6ED] border border-[#E4D9C4] flex items-center justify-center shrink-0">
                    <Truck
                      size={18}
                      className="text-gray-400 group-hover:text-maroon transition-colors"
                      strokeWidth={1.7}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-sans text-[13.5px] font-bold text-gray-800 group-hover:text-maroon transition-colors">
                        {order.orderNumber}
                      </p>
                      <span
                        className={`font-sans text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[order.status].bg} ${STATUS_STYLES[order.status].text} ${STATUS_STYLES[order.status].border}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="font-sans text-[12px] text-gray-400 mt-0.5">
                      {order.itemsSummary} · {order.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-sans text-[14px] font-bold text-maroon">
                    {order.total}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-gray-300 group-hover:text-maroon group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
