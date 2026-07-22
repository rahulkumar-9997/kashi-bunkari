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
  User,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/Cart/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { paymentService } from "@/services/paymentService";
import { addressService } from "@/services/addressService";
import { formatPrice, getUnitPrice, getLineTotal } from "@/lib/cartHelpers";
import {
  validateAddressForm,
  hasErrors,
  type AddressFormErrors,
} from "@/lib/addressValidation";
import type { Address, AddressPayload } from "@/types/address";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PaymentMethod = "cod" | "online";

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
  const { openLogin } = useAuthModal();
  const [processing, setProcessing] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressPayload>(EMPTY_ADDRESS);
  const [addressFormErrors, setAddressFormErrors] = useState<AddressFormErrors>(
    {},
  );

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");

  // Guest user form - only email and phone now
  const [guestForm, setGuestForm] = useState({
    email: "",
    phone_number: "",
  });
  const [guestFormErrors, setGuestFormErrors] = useState<{
    email?: string;
    phone_number?: string;
  }>({});

  // Fetch addresses
  useEffect(() => {
    if (isAuthenticated && customer) {
      fetchAddresses();
    }
  }, [isAuthenticated, customer]);

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const response = await addressService.list();
      if (response.success) {
        setAddresses(response.data);
        const defaultAddr = response.data.find((a: Address) => a.is_default);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
        } else if (response.data.length > 0) {
          setSelectedAddressId(response.data[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleAddressField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof AddressPayload,
  ) => {
    setAddressForm((prev) => ({ ...prev, [field]: e.target.value }));
    setAddressFormErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateGuestForm = () => {
    const errors: typeof guestFormErrors = {};
    if (!guestForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(guestForm.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!guestForm.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(guestForm.phone_number.trim())) {
      errors.phone_number = "Please enter a valid 10-digit phone number";
    }
    setGuestFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAddressFormFields = () => {
    const errors = validateAddressForm(addressForm);
    if (hasErrors(errors)) {
      setAddressFormErrors(errors);
      toast.error("Please fix the highlighted fields.");
      return false;
    }
    return true;
  };

  const handleSaveAddress = async () => {
    if (!validateAddressFormFields()) return;

    try {
      const response = await addressService.create(addressForm);
      if (response.success) {
        toast.success("Address saved successfully");
        setAddressForm(EMPTY_ADDRESS);
        setShowAddressForm(false);
        await fetchAddresses();
        setSelectedAddressId(response.data.id);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save address",
      );
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await addressService.remove(id);
      toast.success("Address deleted");
      await fetchAddresses();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete address",
      );
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await addressService.setDefault(id);
      toast.success("Default address updated");
      await fetchAddresses();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to set default address",
      );
    }
  };

  const placeOrder = async (params: {
    paymentMethod: PaymentMethod;
    address: Address | AddressPayload;
    paymentDetails?: any;
  }) => {
    setProcessing(true);
    try {
      // Get name from address
      const fullName = isAuthenticated
        ? customer?.name
        : (params.address as AddressPayload).name;

      const orderData = {
        email: isAuthenticated ? customer?.email : guestForm.email,
        full_name: fullName,
        phone_number: isAuthenticated
          ? customer?.phone_number
          : guestForm.phone_number,
        payment_method: params.paymentMethod,
        address: params.address,
        payment_details: params.paymentDetails || null,
      };

      const response = await fetch("/api/payment/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          params.paymentMethod === "cod"
            ? "Order placed successfully! We'll confirm your order shortly."
            : "Order placed successfully!",
        );
        await refreshCart();
        router.push(`/order-success?order_id=${data.data.order_number}`);
      } else {
        throw new Error(data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again.",
      );
    } finally {
      setProcessing(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // For guest checkout, validate guest form (email and phone only)
    if (!isAuthenticated) {
      if (!validateGuestForm()) return;
    }

    // Validate address
    let addressToUse: Address | AddressPayload | null = null;

    if (isAuthenticated) {
      if (addresses.length === 0 && !showAddressForm) {
        setShowAddressForm(true);
        toast.info("Please add a shipping address");
        return;
      }

      if (showAddressForm) {
        if (!validateAddressFormFields()) return;
        toast.info("Please click 'Save Address' first");
        return;
      }

      addressToUse = addresses.find((a) => a.id === selectedAddressId) || null;
      if (!addressToUse) {
        toast.error("Please select a shipping address");
        return;
      }
    } else {
      // Guest - validate address form (includes name)
      if (!validateAddressFormFields()) return;
      addressToUse = addressForm;
    }

    // If COD, place order directly
    if (paymentMethod === "cod") {
      await placeOrder({
        paymentMethod: "cod",
        address: addressToUse,
      });
      return;
    }

    // Online payment flow
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
          name: isAuthenticated ? customer?.name : addressForm.name,
          email: isAuthenticated ? customer?.email : guestForm.email,
          contact: isAuthenticated
            ? customer?.phone_number
            : guestForm.phone_number,
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

            // Place order after payment verification
            await placeOrder({
              paymentMethod: "online",
              address: addressToUse!,
              paymentDetails: response,
            });
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
          value={addressForm.phone_number}
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
      <Script
        src="https://checkout.razorpay.com/v1/magic-checkout.js"
        onLoad={() => setScriptReady(true)}
      />

      <div className="w-full min-h-screen bg-white">
        <section className="w-full lg:px-12 md:px-10 px-4 py-8 md:py-10">
          <div className="mx-auto w-full max-w-6xl">
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
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Contact Information - Only Email and Phone */}
                  {!isAuthenticated && (
                    <div className="bg-white rounded-xl border border-[#E4D9C4] p-6">
                      <h3 className="font-serif text-lg font-bold text-maroon mb-4 flex items-center gap-2">
                        <Mail size={20} />
                        Contact
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail
                              size={18}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                              type="email"
                              placeholder="Enter your email"
                              value={guestForm.email}
                              onChange={(e) => {
                                setGuestForm({
                                  ...guestForm,
                                  email: e.target.value,
                                });
                                setGuestFormErrors({
                                  ...guestFormErrors,
                                  email: undefined,
                                });
                              }}
                              className={`${inputClass(!!guestFormErrors.email)} pl-10`}
                            />
                          </div>
                          <FieldError message={guestFormErrors.email} />
                        </div>                        
                      </div>
                    </div>
                  )}

                  {/* Shipping Address */}
                  <div className="bg-white rounded-xl border border-[#E4D9C4] p-6">
                    <h3 className="font-serif text-lg font-bold text-maroon mb-4 flex items-center gap-2">
                      <Home size={20} />
                      Delivery
                    </h3>

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
                          className="flex items-center gap-2 text-sm font-medium text-maroon hover:text-maroon/80 transition-colors"
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
                            className="px-6 py-2.5 bg-maroon hover:bg-maroon/90 text-white font-semibold rounded-lg text-sm transition-colors"
                          >
                            Save Address
                          </button>
                          <button
                            onClick={() => {
                              setShowAddressForm(false);
                              setAddressForm(EMPTY_ADDRESS);
                              setAddressFormErrors({});
                            }}
                            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
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
                              className="text-sm font-medium text-maroon hover:underline"
                            >
                              Add your first address
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {(isAuthenticated ? addresses : []).map(
                              (address) => (
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
                                    className="mt-1 shrink-0"
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
                                    <p className="text-sm text-gray-500">
                                      Phone: {address.phone_number}
                                    </p>
                                  </div>
                                  <div className="flex gap-2 shrink-0">
                                    {!address.is_default && (
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleSetDefault(address.id);
                                        }}
                                        className="text-[10px] font-medium text-blue-600 hover:underline"
                                      >
                                        Set Default
                                      </button>
                                    )}
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteAddress(address.id);
                                      }}
                                      className="text-[10px] font-medium text-red-500 hover:underline"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </label>
                              ),
                            )}

                            {/* Guest checkout address form */}
                            {!isAuthenticated && (
                              <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-3">
                                  Please enter your shipping details
                                </p>
                                {renderAddressFormFields()}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-xl border border-[#E4D9C4] p-6">
                    <h3 className="font-serif text-lg font-bold text-maroon mb-4 flex items-center gap-2">
                      <CreditCard size={20} />
                      Payment
                    </h3>
                    <div className="space-y-3">
                      <label
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "online"
                            ? "border-maroon bg-[#FBF6ED]"
                            : "border-[#E4D9C4] hover:border-maroon/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          className="shrink-0"
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
                          src="/razorpay-icon.svg"
                          alt="Razorpay"
                          className="h-6"
                        />
                      </label>

                      <label
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
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
                          className="shrink-0"
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
                  <div
                    className="rounded-2xl border border-gray-100 p-6"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
                  >
                    <h2 className="font-serif text-[19px] font-bold text-maroon mb-5">
                      Order Summary
                    </h2>

                    <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
                      {cart.map((item) => {
                        const unitPrice = getUnitPrice(item);
                        const lineTotal = getLineTotal(item);
                        return (
                          <div key={item.product_id} className="flex gap-3">
                            <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
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
                          {paymentMethod === "online"
                            ? "Calculated by Razorpay"
                            : "Free"}
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
                        (paymentMethod === "online" && !scriptReady)
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
                      {paymentMethod === "online"
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
