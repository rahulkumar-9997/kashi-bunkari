"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, RefreshCcw } from "lucide-react";

export default function OrderFailPage({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-5">
        <XCircle size={28} className="text-red-500" />
      </div>

      <h1 className="font-serif text-[24px] md:text-[28px] font-bold text-gray-800 mb-2">
        Payment Failed
      </h1>

      <p className="font-sans text-[13.5px] text-gray-500 max-w-md mb-1">
        {reason
          ? `Your payment couldn't be completed: ${decodeURIComponent(reason)}`
          : "Your payment couldn't be completed."}
      </p>

      <p className="font-sans text-[12.5px] text-gray-400 mb-8">
        Don&apos;t worry — your order is saved, no money was deducted for this
        attempt.
      </p>

      <div className="border border-gray-100 rounded-xl px-5 py-3 mb-8">
        <p className="font-sans text-[10.5px] uppercase tracking-wide text-gray-400 mb-0.5">
          Order Number
        </p>
        <p className="font-sans text-[14px] font-bold text-gray-800">
          {orderNumber}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Link
          href={`/order-success/${orderNumber}`}
          className="flex-1 flex items-center justify-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-white py-3.5 rounded-xl hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg,#8b1a34,#4a0e1c)" }}
        >
          <RefreshCcw size={14} />
          Retry Payment
        </Link>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-gray-700 border-2 border-gray-200 py-3.5 rounded-xl hover:border-maroon hover:text-maroon transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
