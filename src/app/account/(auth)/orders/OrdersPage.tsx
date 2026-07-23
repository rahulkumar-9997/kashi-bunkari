"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  Package,
  ImageOff,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useOrders } from "@/hooks/useOrders";

function formatPrice(value: number) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function OrdersPage() {
  const { orders, pagination, loading, loadingMore, error, loadMore } =
    useOrders();

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-[22px] sm:text-[24px] font-bold text-maroon">
            My Orders
          </h1>
          <p className="font-sans text-[12.5px] text-gray-400 mt-0.5">
            {pagination
              ? `${pagination.total_orders} order${pagination.total_orders === 1 ? "" : "s"}`
              : "Track and manage your orders"}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="text-maroon animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="font-sans text-[13.5px] text-gray-500">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-pink/8 border border-pink/15 flex items-center justify-center mb-4">
              <ShoppingBag size={22} className="text-pink" />
            </div>
            <h3 className="font-serif text-[17px] font-bold text-gray-800 mb-1.5">
              No orders yet
            </h3>
            <p className="font-sans text-[13px] text-gray-400 mb-5">
              When you place an order, it will show up here.
            </p>
            <Link
              href="/"
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3.5">
              {orders.map((order) => {
                const isUnpaid =
                  order.payment_mode === "online" && !order.payment_received;

                return (
                  <Link
                    key={order.id}
                    href={`/order-success/${order.order_number}`}
                    className="block border border-gray-200 rounded-xl p-4 hover:border-maroon/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-sans text-[13.5px] font-bold text-gray-800">
                          {order.order_number}
                        </p>
                        <p className="font-sans text-[14px] text-gray-400 mt-0.5">
                          {formatDate(order.order_date)} · {order.item_count}{" "}
                          {order.item_count === 1 ? "item" : "items"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="font-sans text-[11px] font-bold px-2.5 py-1 rounded-full"
                          style={{
                            color: order.status_color || "#8b1a34",
                            backgroundColor: `${order.status_color || "#8b1a34"}15`,
                          }}
                        >
                          {order.status || "Processing"}
                        </span>
                        <ChevronRight size={16} className="text-maroon  " />
                      </div>
                    </div>
                    {order.preview_items[0] && (
                      <p className="font-sans text-[13px] text-gray-600 mb-3 line-clamp-1">
                        <span className="font-medium text-gray-800">
                          {order.preview_items[0].title}
                        </span>
                        <span className="text-gray-400">
                          {" "}
                          · Qty {order.preview_items[0].quantity} ·{" "}
                          {formatPrice(order.preview_items[0].price)}
                        </span>
                        {order.item_count > 1 && (
                          <span className="text-gray-400">
                            {" "}
                            · +{order.item_count - 1} more
                          </span>
                        )}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center -space-x-2">
                        {order.preview_items.map((item, i) => (
                          <div
                            key={i}
                            className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 border-2 border-white shrink-0"
                          >
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-contain"
                                sizes="40px"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageOff size={12} className="text-gray-300" />
                              </div>
                            )}
                          </div>
                        ))}
                        {order.item_count > order.preview_items.length && (
                          <div className="relative w-10 h-12 rounded-md bg-gray-100 border-2 border-white shrink-0 flex items-center justify-center">
                            <span className="font-sans text-[10px] font-bold text-gray-500">
                              +{order.item_count - order.preview_items.length}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="font-sans text-[14px] font-bold text-gray-900">
                          {formatPrice(order.grand_total)}
                        </p>
                        <p className="font-sans text-[11px] text-gray-400">
                          {order.payment_mode === "cod"
                            ? "COD"
                            : isUnpaid
                              ? "Payment Pending"
                              : "Paid Online"}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {pagination?.has_next_page && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-maroon border-2 border-gray-200 hover:border-maroon px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {loadingMore && (
                    <Loader2 size={14} className="animate-spin" />
                  )}
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
