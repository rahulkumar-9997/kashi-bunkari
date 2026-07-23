"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  ShieldCheck,
  ImageOff,
  Home,
  Plus,
  CheckCircle,
  CreditCard,
  Truck,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/Cart/CartContext";
import { useAuth } from "@/context/AuthContext";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import {
  useAddresses,
  useAddAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/hooks/useAddresses";
import { usePlaceOrder, useVerifyPayment } from "@/hooks/useCheckout";
import { formatPrice, getUnitPrice, getLineTotal } from "@/lib/cartHelpers";
import {
  validateAddressForm,
  hasErrors,
  type AddressFormErrors,
} from "@/lib/addressValidation";
import type { AddressPayload } from "@/types/address";
import type { PlaceOrderRazorpayResponse } from "@/types/checkout";
import Heading from "@/components/Heading/Heading";
declare global {
  interface Window {
    Razorpay: any;
  }
}
type PaymentMethod = "cod" | "razorpay";
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
export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, cartCount, refreshCart } = useCart();
  const { customer, isAuthenticated } = useAuth();

  const { data: addresses = [], isLoading: loadingAddresses } =
    useAddresses(isAuthenticated);
  const addAddressMutation = useAddAddress();
  const deleteAddressMutation = useDeleteAddress();
  const setDefaultMutation = useSetDefaultAddress();
  const placeOrderMutation = usePlaceOrder();
  const verifyPaymentMutation = useVerifyPayment();

  const [processing, setProcessing] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressPayload>(EMPTY_ADDRESS);
  const [addressFormErrors, setAddressFormErrors] = useState<AddressFormErrors>(
    {},
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");

  const [guestEmail, setGuestEmail] = useState("");
  const [guestEmailError, setGuestEmailError] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (isAuthenticated && addresses.length > 0) {
      const def = addresses.find((a) => a.is_default) ?? addresses[0];
      setSelectedAddressId((prev) => prev ?? def.id);
    }
  }, [isAuthenticated, addresses]);

  const handleAddressField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof AddressPayload,
  ) => {
    setAddressForm((prev) => ({ ...prev, [field]: e.target.value }));
    setAddressFormErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateGuestEmail = () => {
    if (!guestEmail.trim()) {
      setGuestEmailError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.trim())) {
      setGuestEmailError("Please enter a valid email");
      return false;
    }
    setGuestEmailError(undefined);
    return true;
  };

  const validateAddressFormFields = () => {
    const errors = validateAddressForm(addressForm);
    if (hasErrors(errors)) {
      setAddressFormErrors(errors);
      toast.error("Please fix the highlighted fields.");
      return false;
    }
    setAddressFormErrors({});
    return true;
  };

  const handleSaveAddress = async () => {
    if (!validateAddressFormFields()) return;
    try {
      const res = await addAddressMutation.mutateAsync(addressForm);
      toast.success("Address saved successfully");
      setAddressForm(EMPTY_ADDRESS);
      setShowAddressForm(false);
      setSelectedAddressId(res.data.id);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save address",
      );
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await deleteAddressMutation.mutateAsync(id);
      toast.success("Address deleted");
      if (selectedAddressId === id) setSelectedAddressId(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete address",
      );
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultMutation.mutateAsync(id);
      toast.success("Default address updated");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to set default address",
      );
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!isAuthenticated && !validateGuestEmail()) return;
    let addressPayload:
      | { address_id: number }
      | { address: AddressPayload; save_address: boolean }
      | null = null;

    if (isAuthenticated) {
      if (showAddressForm) {
        toast.info("Please click 'Save Address' first, then select it.");
        return;
      }
      if (!selectedAddressId) {
        toast.error("Please select a shipping address");
        return;
      }
      addressPayload = { address_id: selectedAddressId };
    } else {
      if (!validateAddressFormFields()) return;
      addressPayload = { address: addressForm, save_address: false };
    }

    if (paymentMethod === "razorpay" && !scriptReady) {
      toast.error("Payment is still loading — please try again in a moment.");
      return;
    }

    setProcessing(true);
    try {
      const payload = {
        payment_method: paymentMethod,
        email: isAuthenticated ? (customer?.email ?? "") : guestEmail.trim(),
        ...addressPayload,
      };

      const res = await placeOrderMutation.mutateAsync(payload);

      if (paymentMethod === "cod") {
        toast.success(
          "Order placed successfully! We'll confirm your order shortly.",
        );
        await refreshCart();
        router.push(`/order-success?order_id=${(res as any).data.order_id}`);
        setProcessing(false);
        return;
      }
      const { order_id, amount, currency, key } = (
        res as PlaceOrderRazorpayResponse
      ).data;
      const selectedAddr = isAuthenticated
        ? addresses.find((a) => a.id === selectedAddressId)
        : null;

      const options = {
        key,
        amount,
        currency,
        name: "Kasibunkari",
        description: "Order Payment",
        order_id,
        prefill: {
          name: isAuthenticated ? customer?.name : addressForm.name,
          email: isAuthenticated ? customer?.email : guestEmail,
          contact: isAuthenticated
            ? selectedAddr?.phone_number
            : addressForm.phone_number,
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
        toast.error(
          response?.error?.description || "Payment failed. Please try again.",
        );
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not place order.",
      );
      setProcessing(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded border bg-white text-sm focus:outline-none transition-colors ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-[#E4D9C4] focus:border-[#8B1E3F]"
    }`;

  const FieldError = ({ message }: { message?: string }) =>
    message ? (
      <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
        <AlertCircle size={11} />
        {message}
      </p>
    ) : null;

  const renderAddressFormFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={addressForm.name}
          onChange={(e) => handleAddressField(e, "name")}
          className={inputClass(!!addressFormErrors.name)}
        />
        <FieldError message={addressFormErrors.name} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={addressForm.phone_number} maxLength={10}
          onChange={(e) => handleAddressField(e, "phone_number")}
          className={inputClass(!!addressFormErrors.phone_number)}
        />
        <FieldError message={addressFormErrors.phone_number} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pincode <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter pincode"
          value={addressForm.zip_code}
          onChange={(e) => handleAddressField(e, "zip_code")}
          className={inputClass(!!addressFormErrors.zip_code)}
        />
        <FieldError message={addressFormErrors.zip_code} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Locality <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter locality"
          value={addressForm.locality}
          onChange={(e) => handleAddressField(e, "locality")}
          className={inputClass(!!addressFormErrors.locality)}
        />
        <FieldError message={addressFormErrors.locality} />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Area <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={2}
          placeholder="House number, building name"
          value={addressForm.address}
          onChange={(e) => handleAddressField(e, "address")}
          className={inputClass(!!addressFormErrors.address)}
        />
        <FieldError message={addressFormErrors.address} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City/District/Town <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter city"
          value={addressForm.city}
          onChange={(e) => handleAddressField(e, "city")}
          className={inputClass(!!addressFormErrors.city)}
        />
        <FieldError message={addressFormErrors.city} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter state"
          value={addressForm.state}
          onChange={(e) => handleAddressField(e, "state")}
          className={inputClass(!!addressFormErrors.state)}
        />
        <FieldError message={addressFormErrors.state} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Landmark (Optional)
        </label>
        <input
          type="text"
          placeholder="Nearby landmark"
          value={addressForm.landmark}
          onChange={(e) => handleAddressField(e, "landmark")}
          className={inputClass(false)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alternate Phone (Optional)
        </label>
        <input
          type="tel"
          placeholder="Enter alternate phone"
          value={addressForm.alternate_phone}
          onChange={(e) => handleAddressField(e, "alternate_phone")}
          className={inputClass(!!addressFormErrors.alternate_phone)}
        />
        <FieldError message={addressFormErrors.alternate_phone} />
      </div>
    </div>
  );

  return (
    <>
      {/* Standard Razorpay Checkout — NOT Magic Checkout */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setScriptReady(true)}
      />

      <div className="w-full min-h-screen bg-white">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
        />
        <section className="w-full relative overflow-hidden">
          <div className="mx-auto max-w-7xl lg:py-15 md:py-10 sm:py-10 py-8 px-4 relative z-10">
              <Heading
                level={1}
                text='Checkout'
                className="font-serif text-[26px] md:text-[30px] font-bold text-maroon mb-7"
                decorator="none"
                allowHTML
              />

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
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Contact — guest only */}
                  {!isAuthenticated && (
                    <div className="bg-white rounded-xl border border-[#E4D9C4] p-4">
                      <Heading
                        level={2}
                        text='Contact'
                        className="font-serif text-[22px] text-maroon mb-2 flex items-center gap-2"
                        decorator="none"
                        allowHTML
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">                          
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={guestEmail}
                            onChange={(e) => {
                              setGuestEmail(e.target.value);
                              setGuestEmailError(undefined);
                            }}
                            className={`${inputClass(!!guestEmailError)} pl-4`}
                          />
                        </div>
                        <FieldError message={guestEmailError} />
                      </div>
                    </div>
                  )}

                  {/* Delivery */}
                  <div className="bg-white rounded-xl border border-[#E4D9C4] p-4">                    
                    <Heading
                      level={2}
                      text='Delivery Address'
                      className="font-serif text-[22px] text-maroon mb-2 flex items-center gap-2"
                      decorator="none"
                      allowHTML
                    />

                    {isAuthenticated && (
                      <div className="mb-4">
                        <button
                          onClick={() => {
                            setShowAddressForm(!showAddressForm);
                            if (showAddressForm) {
                              setAddressForm(EMPTY_ADDRESS);
                              setAddressFormErrors({});
                            }
                          }}
                          className="flex items-center gap-2 text-sm font-medium text-maroon hover:text-maroon/80 transition-colors cursor-pointer"
                        >
                          <Plus size={16} />
                          {showAddressForm ? "Cancel" : "Add New Address"}
                        </button>
                      </div>
                    )}

                    {showAddressForm && (
                      <div className="space-y-4">
                        {renderAddressFormFields()}
                        <div className="flex gap-3">
                          <button
                            onClick={handleSaveAddress}
                            disabled={addAddressMutation.isPending}
                            className="flex items-center gap-2 px-6 py-2.5 bg-maroon hover:bg-maroon/90 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60 cursor-pointer"
                          >
                            {addAddressMutation.isPending && (
                              <Loader2 size={14} className="animate-spin" />
                            )}
                            Save Address
                          </button>
                          <button
                            onClick={() => {
                              setShowAddressForm(false);
                              setAddressForm(EMPTY_ADDRESS);
                              setAddressFormErrors({});
                            }}
                            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {!showAddressForm && (
                      <>
                        {isAuthenticated && loadingAddresses ? (
                          <div className="text-center py-4 text-gray-400">
                            Loading addresses...
                          </div>
                        ) : isAuthenticated && addresses.length === 0 ? (
                          <div className="text-center py-6">
                            <p className="text-sm text-gray-500 mb-3">
                              No saved addresses found
                            </p>
                            <button
                              onClick={() => setShowAddressForm(true)}
                              className="text-sm font-medium text-maroon hover:underline cursor-pointer"
                            >
                              Add your first address
                            </button>
                          </div>
                        ) : isAuthenticated ? (
                          <div className="space-y-3">
                            {addresses.map((address) => (
                              <label
                                key={address.id}
                                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                  selectedAddressId === address.id
                                    ? "border-maroon bg-[#FBF6ED]"
                                    : "border-[#E4D9C4] hover:border-maroon/40"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="address"
                                  value={address.id}
                                  checked={selectedAddressId === address.id}
                                  onChange={() =>
                                    setSelectedAddressId(address.id)
                                  }
                                  className="mt-1 shrink-0 accent-maroon"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-medium text-gray-800">
                                      {address.name}
                                    </span>
                                    {address.is_default && (
                                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                        <CheckCircle size={12} />
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {address.address}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {address.locality}, {address.city},{" "}
                                    {address.state} - {address.zip_code}
                                  </p>
                                  <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <Phone size={12} />
                                    {address.phone_number}
                                  </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                  {!address.is_default && (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSetDefault(address.id);
                                      }}
                                      className="text-[10px] font-medium text-blue-600 hover:underline cursor-pointer"
                                    >
                                      Set Default
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDeleteAddress(address.id);
                                    }}
                                    className="text-[10px] font-medium text-red-500 hover:underline cursor-pointer"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div>                            
                            {renderAddressFormFields()}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-xl border border-[#E4D9C4] p-4">                    
                    <Heading
                      level={2}
                      text='Payment Option'
                      className="font-serif text-[22px] text-maroon mb-2 flex items-center gap-2"
                      decorator="none"
                      allowHTML
                    />
                    <div className="space-y-3">
                      <label
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "razorpay"
                            ? "border-maroon bg-[#FBF6ED]"
                            : "border-[#E4D9C4] hover:border-maroon/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="razorpay"
                          checked={paymentMethod === "razorpay"}
                          onChange={() => setPaymentMethod("razorpay")}
                          className="shrink-0 accent-maroon"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-800">
                            Pay Online
                          </span>
                          <p className="text-xs text-gray-500">
                            Credit/Debit Card, UPI, Net Banking
                          </p>
                        </div>
                        <img
                          src="https://cdn.razorpay.com/static/assets/logo/rzp_payment_icon.svg"
                          alt="Razorpay"
                          className="h-10"
                        />
                      </label>

                      <label
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "cod"
                            ? "border-maroon bg-[#FBF6ED]"
                            : "border-[#E4D9C4] hover:border-maroon/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="shrink-0 accent-maroon"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-800">
                            Cash on Delivery
                          </span>
                          <p className="text-xs text-gray-500">
                            Pay when you receive your order
                          </p>
                        </div>
                        <Truck size={20} className="text-gray-400" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column - Order Summary */}
                <aside className="lg:sticky lg:top-24 self-start">
                  <div className="rounded-2xl border border-gray-100 p-4 shadow">
                    <Heading
                      level={3}
                      text='Order Summary'
                      className="font-serif text-[22px] font-bold text-maroon mb-5"
                      decorator="none"
                      allowHTML
                    />

                    <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
                      {cart.map((item) => {
                        const unitPrice = getUnitPrice(item);
                        const lineTotal = getLineTotal(item);
                        return (
                          <div key={item.product_id} className="flex gap-3">
                            <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-contain"
                                  sizes="48px"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageOff
                                    size={14}
                                    className="text-gray-300"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-sans text-[12px] font-semibold text-gray-800 leading-snug line-clamp-2">
                                {item.title}
                              </p>
                              <p className="font-sans text-[11px] text-gray-500">
                                × {item.quantity}
                              </p>
                            </div>
                            <div className="shrink-0 font-sans text-[12px] font-bold text-gray-900">
                              {lineTotal != null ? formatPrice(lineTotal) : "—"}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[13.5px] text-gray-500">
                          Subtotal ({cartCount}{" "}
                          {cartCount === 1 ? "item" : "items"})
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
                          Free
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
                      onClick={handlePlaceOrder}
                      disabled={
                        processing ||
                        (paymentMethod === "razorpay" && !scriptReady)
                      }
                      className="w-full flex items-center justify-center gap-2 rounded-xl text-white font-sans text-[13px] font-bold uppercase tracking-[0.14em] py-3.5 transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg,#8b1a34,#4a0e1c)",
                      }}
                    >
                      {processing && (
                        <Loader2 size={15} className="animate-spin" />
                      )}
                      {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 font-sans text-[11px] text-gray-400 mt-4">
                      <ShieldCheck size={13} className="text-emerald-600" />
                      {paymentMethod === "razorpay"
                        ? "Secured by Razorpay"
                        : "100% Secure Order"}
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
