"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  ShieldCheck,
  ImageOff,
  MapPin,
  CreditCard,
  Truck,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/Cart/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAddresses } from "@/hooks/useAddresses";
import { usePlaceOrder, useVerifyPayment } from "@/hooks/useCheckout";
import { formatPrice, getUnitPrice, getLineTotal } from "@/lib/cartHelpers";
import { validateAddressForm, hasErrors, type AddressFormErrors } from "@/lib/addressValidation";
import type { AddressPayload } from "@/types/address";
import type { PlaceOrderRazorpayResponse } from "@/types/checkout";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const EMPTY_ADDRESS: AddressPayload = {
  name: "",
  phone_number: "",
  alternate_phone: "",
  zip_code: "",
  locality: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  country: "India",
};

type PaymentMethod = "cod" | "razorpay";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, cartCount, refreshCart } = useCart();
  const { customer, isAuthenticated } = useAuth();
  const { data: addresses = [] } = useAddresses(isAuthenticated);

  const placeOrderMutation = usePlaceOrder();
  const verifyPaymentMutation = useVerifyPayment();

  const [scriptReady, setScriptReady] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressPayload>(EMPTY_ADDRESS);
  const [addressErrors, setAddressErrors] = useState<AddressFormErrors>({});
  const [saveAddress, setSaveAddress] = useState(true);

  const [email, setEmail] = useState(customer?.email ?? "");
  const [emailError, setEmailError] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  useEffect(() => {
    if (isAuthenticated && addresses.length > 0) {
      const def = addresses.find((a) => a.is_default) ?? addresses[0];
      setSelectedAddressId(def.id);
      setShowNewAddressForm(false);
    } else {
      setShowNewAddressForm(true);
    }
  }, [isAuthenticated, addresses]);

  useEffect(() => {
    if (customer?.email) setEmail(customer.email);
  }, [customer]);

  const handleAddressField =
    (field: keyof AddressPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setAddressForm((prev) => ({ ...prev, [field]: e.target.value }));
      setAddressErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const validateBeforeSubmit = (): boolean => {
    let ok = true;

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      ok = false;
    } else {
      setEmailError(null);
    }

    if (showNewAddressForm || !selectedAddressId) {
      const errors = validateAddressForm(addressForm);
      if (hasErrors(errors)) {
        setAddressErrors(errors);
        ok = false;
      } else {
        setAddressErrors({});
      }
    }

    return ok;
  };

  const handlePlaceOrder = async () => {
    if (!scriptReady && paymentMethod === "razorpay") {
      toast.error("Payment is still loading — please try again in a moment.");
      return;
    }
    if (!validateBeforeSubmit()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setProcessing(true);
    try {
      const payload = {
        payment_method: paymentMethod,
        email: email.trim(),
        ...(showNewAddressForm || !selectedAddressId
          ? { address: addressForm, save_address: isAuthenticated ? saveAddress : false }
          : { address_id: selectedAddressId }),
      };

      const res = await placeOrderMutation.mutateAsync(payload);

      if (paymentMethod === "cod") {
        toast.success("Order placed successfully!");
        await refreshCart();
        router.push(`/order-success?order_id=${(res as any).data.order_id}`);
        setProcessing(false);
        return;
      }

      // Standard Razorpay Checkout — Magic Checkout NAHI
      const { order_id, amount, currency, key } = (res as PlaceOrderRazorpayResponse).data;
      const selectedAddr = addresses.find((a) => a.id === selectedAddressId);

      const options = {
        key,
        amount,
        currency,
        name: "Kasibunkari",
        description: "Order Payment",
        order_id,
        prefill: {
          name: showNewAddressForm ? addressForm.name : selectedAddr?.name || "",
          email: email.trim(),
          contact: showNewAddressForm ? addressForm.phone_number : selectedAddr?.phone_number || "",
        },
        theme: { color: "#8b1a34" },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyRes = await verifyPaymentMutation.mutateAsync(response);
            toast.success("Payment successful!");
            await refreshCart();
            router.push(`/order-success?order_id=${verifyRes.data.order_id}`);
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
        toast.error(response?.error?.description || "Payment failed. Please try again.");
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not place order.");
      setProcessing(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-2.5 rounded border bg-white text-sm focus:outline-none transition-colors ${
      hasError ? "border-red-400 focus:border-red-500" : "border-[#E4D9C4] focus:border-[#8B1E3F]"
    }`;

  const FieldError = ({ message }: { message?: string }) =>
    message ? (
      <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
        <AlertCircle size={11} />
        {message}
      </p>
    ) : null;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onLoad={() => setScriptReady(true)} />

      <div className="w-full min-h-screen bg-white">
        <section className="w-full lg:px-12 md:px-10 px-4 py-8 md:py-10">
          <div className="mx-auto w-full max-w-5xl">
            <h1 className="font-serif text-[26px] md:text-[30px] font-bold text-maroon mb-7">Checkout</h1>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="font-serif text-[18px] font-bold text-gray-800 mb-2">Your cart is empty</h3>
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
                <div className="space-y-8">
                  {/* Contact email */}
                  <div>
                    <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-3">
                      Contact Email
                    </h2>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(null);
                      }}
                      disabled={isAuthenticated}
                      className={`${inputClass(!!emailError)} disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                    <FieldError message={emailError ?? undefined} />
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      Order confirmation will be sent to this email.
                    </p>
                  </div>

                  {/* Address section */}
                  <div>
                    <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-3 flex items-center gap-2">
                      <MapPin size={14} />
                      Delivery Address
                    </h2>

                    {isAuthenticated && addresses.length > 0 && !showNewAddressForm && (
                      <div className="space-y-3">
                        {addresses.map((addr) => (
                          <label
                            key={addr.id}
                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                              selectedAddressId === addr.id
                                ? "border-2 border-maroon/40 bg-[#FBF6ED]"
                                : "border-gray-200 hover:border-maroon/20"
                            }`}
                          >
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddressId === addr.id}
                              onChange={() => setSelectedAddressId(addr.id)}
                              className="mt-1 accent-maroon"
                            />
                            <div className="flex-1 text-sm">
                              <p className="font-semibold text-gray-800">
                                {addr.name}{" "}
                                {addr.is_default && (
                                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full ml-1">
                                    Default
                                  </span>
                                )}
                              </p>
                              <p className="text-gray-600 mt-0.5">
                                {addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.zip_code}
                              </p>
                              <p className="text-gray-500 mt-0.5">{addr.phone_number}</p>
                            </div>
                          </label>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setShowNewAddressForm(true);
                            setSelectedAddressId(null);
                          }}
                          className="text-[12px] font-medium text-maroon border-b border-maroon/40 hover:border-maroon pb-0.5"
                        >
                          + Deliver to a new address
                        </button>
                      </div>
                    )}

                    {(showNewAddressForm || addresses.length === 0 || !isAuthenticated) && (
                      <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] p-5 space-y-4">
                        {isAuthenticated && addresses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setShowNewAddressForm(false);
                              const def = addresses.find((a) => a.is_default) ?? addresses[0];
                              setSelectedAddressId(def.id);
                            }}
                            className="text-[12px] font-medium text-gray-500 hover:text-maroon"
                          >
                            ← Use a saved address instead
                          </button>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressForm.name}
                              onChange={handleAddressField("name")}
                              className={inputClass(!!addressErrors.name)}
                            />
                            <FieldError message={addressErrors.name} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={addressForm.phone_number}
                              onChange={handleAddressField("phone_number")}
                              className={inputClass(!!addressErrors.phone_number)}
                            />
                            <FieldError message={addressErrors.phone_number} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressForm.zip_code}
                              onChange={handleAddressField("zip_code")}
                              className={inputClass(!!addressErrors.zip_code)}
                            />
                            <FieldError message={addressErrors.zip_code} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Locality <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressForm.locality}
                              onChange={handleAddressField("locality")}
                              className={inputClass(!!addressErrors.locality)}
                            />
                            <FieldError message={addressErrors.locality} />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Address Area <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={2}
                              value={addressForm.address}
                              onChange={handleAddressField("address")}
                              className={inputClass(!!addressErrors.address)}
                            />
                            <FieldError message={addressErrors.address} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressForm.city}
                              onChange={handleAddressField("city")}
                              className={inputClass(!!addressErrors.city)}
                            />
                            <FieldError message={addressErrors.city} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressForm.state}
                              onChange={handleAddressField("state")}
                              className={inputClass(!!addressErrors.state)}
                            />
                            <FieldError message={addressErrors.state} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Landmark (Optional)
                            </label>
                            <input
                              type="text"
                              value={addressForm.landmark}
                              onChange={handleAddressField("landmark")}
                              className={inputClass(false)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Alternate Phone (Optional)
                            </label>
                            <input
                              type="tel"
                              value={addressForm.alternate_phone}
                              onChange={handleAddressField("alternate_phone")}
                              className={inputClass(!!addressErrors.alternate_phone)}
                            />
                            <FieldError message={addressErrors.alternate_phone} />
                          </div>
                        </div>
                        {isAuthenticated && (
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input
                              type="checkbox"
                              checked={saveAddress}
                              onChange={(e) => setSaveAddress(e.target.checked)}
                              className="accent-maroon"
                            />
                            Save this address for future orders
                          </label>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Payment method */}
                  <div>
                    <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-3">
                      Payment Method
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === "cod"
                            ? "border-2 border-maroon/40 bg-[#FBF6ED]"
                            : "border-gray-200 hover:border-maroon/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="accent-maroon"
                        />
                        <Truck size={18} className="text-maroon" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Cash on Delivery</p>
                          <p className="text-[11px] text-gray-500">Pay when your order arrives</p>
                        </div>
                      </label>
                      <label
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === "razorpay"
                            ? "border-2 border-maroon/40 bg-[#FBF6ED]"
                            : "border-gray-200 hover:border-maroon/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          checked={paymentMethod === "razorpay"}
                          onChange={() => setPaymentMethod("razorpay")}
                          className="accent-maroon"
                        />
                        <CreditCard size={18} className="text-maroon" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Pay Online</p>
                          <p className="text-[11px] text-gray-500">UPI, Cards, Netbanking &amp; more</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Order items */}
                  <div>
                    <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-4">
                      Order Summary ({cartCount} {cartCount === 1 ? "item" : "items"})
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
                                {unitPrice != null ? formatPrice(unitPrice) : "—"} × {item.quantity}
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
                </div>

                {/* Payment summary + Place order button */}
                <aside className="lg:sticky lg:top-24 self-start">
                  <div
                    className="rounded-2xl border border-gray-100 p-6"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
                  >
                    <h2 className="font-serif text-[19px] font-bold text-maroon mb-5">Order Total</h2>

                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[13.5px] text-gray-500">Subtotal</span>
                        <span className="font-sans text-[13.5px] font-semibold text-gray-800">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[13.5px] text-gray-500">Shipping</span>
                        <span className="font-sans text-[13.5px] text-emerald-600">Free</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-6">
                      <span className="font-sans text-[15px] font-bold text-gray-800">Total</span>
                      <span className="font-sans text-[19px] font-bold text-gray-900">{formatPrice(cartTotal)}</span>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={processing}
                      className="w-full flex items-center justify-center gap-2 rounded-xl text-white font-sans text-[13px] font-bold uppercase tracking-[0.14em] py-3.5 transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
                      style={{ background: "linear-gradient(135deg,#8b1a34,#4a0e1c)" }}
                    >
                      {processing && <Loader2 size={15} className="animate-spin" />}
                      {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
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