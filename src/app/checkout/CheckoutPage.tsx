"use client";
import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ShieldCheck, ImageOff } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/Cart/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { paymentService } from "@/services/paymentService";
import { formatPrice, getUnitPrice, getLineTotal } from "@/lib/cartHelpers";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, cartCount, refreshCart } = useCart();
  const { customer, isAuthenticated } = useAuth();
  const { openLogin } = useAuthModal();
  const [processing, setProcessing] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const handlePay = async () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    if (!scriptReady) {
      toast.error("Payment is still loading — please try again in a moment.");
      return;
    }

    setProcessing(true);
    try {
      const orderRes = await paymentService.createOrder();
      const { order_id, amount, currency, key } = orderRes.data;

      const options = {
        key,
        amount,
        currency,
        name: "Kasibunkari",
        description: "Order Payment",
        order_id,
        prefill: {
          name: customer?.name || "",
          email: customer?.email || "",
          contact: customer?.phone_number || "",
        },
        theme: { color: "#8b1a34" },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            await paymentService.verifyPayment(response);
            toast.success("Payment successful!");
            await refreshCart();
            router.push(
              `/order-success?order_id=${response.razorpay_order_id}`,
            );
          } catch (err) {
            toast.error(
              err instanceof Error
                ? err.message
                : "Payment was received but verification failed. Please contact support.",
            );
          } finally {
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast.error(
          response?.error?.description || "Payment failed. Please try again.",
        );
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not start checkout.",
      );
      setProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/magic-checkout.js" onLoad={() => setScriptReady(true)} />

      <div className="w-full min-h-screen bg-white">
        <section className="w-full lg:px-12 md:px-10 px-4 py-8 md:py-10">
          <div className="mx-auto w-full max-w-5xl">
            <h1 className="font-serif text-[26px] md:text-[30px] font-bold text-maroon mb-7">
              Checkout
            </h1>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="font-serif text-[18px] font-bold text-gray-800 mb-2">
                  Your cart is empty
                </h3>
                <p className="font-sans text-[13px] text-gray-400 mb-5">
                  Add something to your cart before checking out.
                </p>
                <Link
                  href="/"
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                {/* Order items */}
                <div>
                  <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-4">
                    Order Summary ({cartCount}{" "}
                    {cartCount === 1 ? "item" : "items"})
                  </h2>
                  <div className="divide-y divide-gray-100 border-y border-gray-100">
                    {cart.map((item) => {
                      const unitPrice = getUnitPrice(item);
                      const lineTotal = getLineTotal(item);
                      return (
                        <div key={item.product_id} className="py-4 flex gap-4">
                          <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
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
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-2">
                              {item.title}
                            </p>
                            <p className="font-sans text-[12px] text-gray-500 mt-1">
                              {unitPrice != null ? formatPrice(unitPrice) : "—"}{" "}
                              × {item.quantity}
                            </p>
                          </div>
                          <div className="shrink-0 font-sans text-[13.5px] font-bold text-gray-900">
                            {lineTotal != null ? formatPrice(lineTotal) : "—"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment summary + Pay button */}
                <aside className="lg:sticky lg:top-24 self-start">
                  <div
                    className="rounded-2xl border border-gray-100 p-6"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
                  >
                    <h2 className="font-serif text-[19px] font-bold text-maroon mb-5">
                      Payment Summary
                    </h2>

                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[13.5px] text-gray-500">
                          Subtotal
                        </span>
                        <span className="font-sans text-[13.5px] font-semibold text-gray-800">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[13.5px] text-gray-500">
                          Shipping
                        </span>
                        <span className="font-sans text-[13.5px] text-gray-400">
                          Calculated by Razorpay
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-6">
                      <span className="font-sans text-[15px] font-bold text-gray-800">
                        Total
                      </span>
                      <span className="font-sans text-[19px] font-bold text-gray-900">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>

                    <button
                      onClick={handlePay}
                      disabled={processing || !scriptReady}
                      className="w-full flex items-center justify-center gap-2 rounded-xl text-white font-sans text-[13px] font-bold uppercase tracking-[0.14em] py-3.5 transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg,#8b1a34,#4a0e1c)",
                      }}
                    >
                      {processing && (
                        <Loader2 size={15} className="animate-spin" />
                      )}
                      {isAuthenticated ? "Pay Now" : "Log in to Pay"}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 font-sans text-[11px] text-gray-400 mt-4">
                      <ShieldCheck size={13} className="text-emerald-600" />
                      Secured by Razorpay
                    </p>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
