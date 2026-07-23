"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Loader2,
  ImageOff,
  MapPin,
  Package,
  AlertTriangle,
} from "lucide-react";
import { orderService } from "@/services/orderService";
import type { OrderDetail } from "@/types/order";

function formatPrice(value: number) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function OrderSuccessPage({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    orderService
      .getByNumber(orderNumber)
      .then((res) => setOrder(res.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Could not load order."),
      )
      .finally(() => setLoading(false));
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 size={28} className="text-maroon animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-pink/8 border border-pink/15 flex items-center justify-center mb-5">
          <Package size={26} className="text-pink" />
        </div>
        <h3 className="font-serif text-[20px] font-bold text-gray-800 mb-2">
          Order not found
        </h3>
        <p className="font-sans text-[13.5px] text-gray-400 mb-6">
          {error || "We couldn't find this order."}
        </p>
        <Link
          href="/"
          className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const isOnlineUnpaid =
    order.payment_mode === "online" && !order.payment_received;

  return (
    <div className="w-full min-h-screen bg-white">
      <section className="w-full lg:px-12 md:px-10 px-4 py-10 md:py-14">
        <div className="mx-auto w-full max-w-3xl">
          {/* ── Status header ── */}
          <div className="flex flex-col items-center text-center mb-8">
            {isOnlineUnpaid ? (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
                  <AlertTriangle size={28} className="text-amber-500" />
                </div>
                <h1 className="font-serif text-[24px] md:text-[28px] font-bold text-gray-800 mb-1.5">
                  Payment Pending
                </h1>
                <p className="font-sans text-[13.5px] text-gray-500 max-w-md">
                  {order.payment_fail_reason
                    ? `Your last payment attempt didn't go through (${order.payment_fail_reason}). Your order is saved — you can retry payment anytime.`
                    : "Your order is saved, but we haven't received payment yet."}
                </p>
                <Link
                  href={`/account/orders?pending=${order.order_number}`}
                  className="mt-5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-amber-500 px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Retry Payment
                </Link>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                  <CheckCircle2 size={28} className="text-emerald-600" />
                </div>
                <h1 className="font-serif text-[24px] md:text-[28px] font-bold text-gray-800 mb-1.5">
                  Your Order Placed!
                </h1>
                <p className="font-sans text-[13.5px] text-gray-500 max-w-md">
                  {order.payment_mode === "cod"
                    ? "Thank you for your order. Please keep the amount ready — you'll pay on delivery."
                    : "Thank you for your order! We've received your payment and will start processing shortly."}
                </p>
              </>
            )}
          </div>

          {/* ── Order meta ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 border border-gray-100 rounded-xl px-5 py-4 mb-6">
            <div>
              <p className="font-sans text-[10.5px] uppercase tracking-wide text-gray-400 mb-0.5">
                Order Number
              </p>
              <p className="font-sans text-[14px] font-bold text-gray-800">
                {order.order_number}
              </p>
            </div>
            <div>
              <p className="font-sans text-[10.5px] uppercase tracking-wide text-gray-400 mb-0.5">
                Order Date
              </p>
              <p className="font-sans text-[14px] font-semibold text-gray-700">
                {formatDate(order.order_date)}
              </p>
            </div>
            <div>
              <p className="font-sans text-[10.5px] uppercase tracking-wide text-gray-400 mb-0.5">
                Order Status
              </p>
              <span
                className="inline-flex items-center gap-1.5 font-sans text-[12px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  color: order.status_color || "#8b1a34",
                  backgroundColor: `${order.status_color || "#8b1a34"}15`,
                }}
              >
                <Clock size={11} />
                {order.status || "Processing"}
              </span>
            </div>
          </div>

          {/* ── Items ── */}
          <div className="mb-6">
            <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-3">
              Items ({order.items.length})
            </h2>
            <div className="divide-y divide-gray-100 border-y border-gray-100">
              {order.items.map((item, i) => (
                <div
                  key={`${item.product_id}-${i}`}
                  className="py-4 flex gap-4"
                >
                  <Link
                    href={item.slug ? `/products/${item.slug}` : "#"}
                    className="relative w-16 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff size={16} className="text-gray-300" />
                      </div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-2">
                      {item.title}
                    </p>
                    <p className="font-sans text-[12px] text-gray-500 mt-1">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="shrink-0 font-sans text-[13.5px] font-bold text-gray-900">
                    {formatPrice(item.total_price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* ── Address ── */}
            {order.address && (
              <div>
                <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-3">
                  Delivery Address
                </h2>
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-maroon shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-[13.5px] font-semibold text-gray-800">
                        {order.address.full_name}
                      </p>
                      <p className="font-sans text-[12.5px] text-gray-500 mt-1">
                        {order.address.address}
                        {order.address.locality
                          ? `, ${order.address.locality}`
                          : ""}
                        , {order.address.city}, {order.address.state} -{" "}
                        {order.address.pin_code}
                      </p>
                      <p className="font-sans text-[12px] text-gray-400 mt-1">
                        {order.address.phone_number}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Price breakdown ── */}
            <div>
              <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-3">
                Payment Summary
              </h2>
              <div className="border border-gray-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[13px] text-gray-500">
                    Subtotal
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-gray-800">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[13px] text-gray-500">
                    Shipping
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-gray-800">
                    {order.shipping_amount > 0
                      ? formatPrice(order.shipping_amount)
                      : "Free"}
                  </span>
                </div>
                {order.tax_amount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[13px] text-gray-500">
                      Tax
                    </span>
                    <span className="font-sans text-[13px] font-semibold text-gray-800">
                      {formatPrice(order.tax_amount)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-100">
                  <span className="font-sans text-[14px] font-bold text-gray-800">
                    Total
                  </span>
                  <span className="font-sans text-[16px] font-bold text-gray-900">
                    {formatPrice(order.grand_total)}
                  </span>
                </div>
                <p className="font-sans text-[11.5px] text-gray-400 pt-1">
                  {order.payment_mode === "cod"
                    ? "Cash on Delivery"
                    : "Paid Online"}
                  {order.payment_received && " · Payment Received"}
                </p>
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/"
              className="flex-1 text-center font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-gray-700 border-2 border-gray-200 py-3.5 rounded-xl hover:border-maroon hover:text-maroon transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account/orders"
              className="flex-1 text-center font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-white py-3.5 rounded-xl hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg,#8b1a34,#4a0e1c)" }}
            >
              View My Orders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
