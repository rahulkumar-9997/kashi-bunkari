"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Package,
  Minus,
  Plus,
  ImageOff,
  StickyNote,
  Tag,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/components/Cart/CartContext";
import type { CartItem } from "@/types/cart";

const FREE_DELIVERY_THRESHOLD = 2000;

function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

// mrp/offer_rate can arrive as either a string or a number from the API.
function toNumber(value: string | number | null | undefined): number | null {
  if (value == null) return null;
  const n = typeof value === "string" ? parseFloat(value) : value;
  return Number.isFinite(n) ? n : null;
}

function getUnitPrice(item: CartItem): number | null {
  const offerRate = toNumber(item.offer_rate);
  const mrp = toNumber(item.mrp);
  return offerRate ?? mrp;
}

function getLineTotal(item: CartItem): number | null {
  if (item.line_total != null) return item.line_total;
  const unitPrice = getUnitPrice(item);
  return unitPrice != null ? unitPrice * item.quantity : null;
}

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    cartTotal,
    isOpen,
    loading,
    closeCart,
    changeQty,
    removeItem,
  } = useCart();

  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - cartTotal,
  );
  const qualifiesForFreeDelivery = remainingForFreeDelivery === 0;

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay fixed inset-0 z-[400] bg-black/50 ${isOpen ? "open" : ""}`}
        onClick={closeCart}
      />

      {/* Panel */}
      <aside
        className={`cart-panel fixed top-0 right-0 bottom-0 z-[500] flex flex-col bg-white w-[min(400px,100vw)] shadow-xl ${isOpen ? "open" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <h2 className="font-serif text-[22px] font-bold text-maroon">
              Cart
            </h2>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-maroon text-white font-sans text-[12px] font-bold">
              {cartCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free delivery banner */}
        {cartCount > 0 && (
          <div className="px-6 pt-4 pb-4 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2.5 mb-3">
              <Package size={18} className="text-maroon shrink-0" />
              <p className="font-sans text-[13px] font-medium text-gray-700">
                {qualifiesForFreeDelivery ? (
                  "Your order is free delivery!"
                ) : (
                  <>
                    Add{" "}
                    <span className="font-bold text-maroon">
                      {formatPrice(remainingForFreeDelivery)}
                    </span>{" "}
                    more for free delivery
                  </>
                )}
              </p>
            </div>
            <div className="h-1 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                  background: "linear-gradient(90deg,#8b1a34,#e91e8c)",
                }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div
          className="flex-1 min-h-0 overflow-y-auto px-6 py-4"
          data-lenis-prevent
        >
          {loading && cart.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={22} className="text-maroon animate-spin" />
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-pink/8 border border-pink/15 flex items-center justify-center mb-4">
                <ShoppingBag size={22} className="text-pink" />
              </div>
              <h3 className="font-serif text-[17px] font-bold text-gray-800 mb-1.5">
                Your cart is empty
              </h3>
              <p className="font-sans text-[13px] text-gray-400 mb-5">
                Looks like you haven&apos;t added anything yet.
              </p>
              <Link
                href="/"
                onClick={closeCart}
                className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => {
                const unitPrice = getUnitPrice(item);
                const lineTotal = getLineTotal(item);
                const hasDiscount =
                  toNumber(item.offer_rate) != null &&
                  toNumber(item.mrp) != null &&
                  toNumber(item.mrp)! > toNumber(item.offer_rate)!;
                const atStockLimit =
                  item.available_stock != null &&
                  item.quantity >= item.available_stock;

                return (
                  <div key={item.product_id} className="flex gap-3.5">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff size={18} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        {item.category?.title && (
                          <span className="inline-block text-[10px] px-1.5 py-0.5 border border-maroon/30 bg-maroon/10 rounded-full text-maroon mb-1">
                            {item.category.title}
                          </span>
                        )}
                        <p className="font-sans text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-1">
                          {item.title}
                        </p>

                        {!item.in_stock ? (
                          <p className="font-sans text-[11.5px] font-semibold text-red-500">
                            Out of stock
                          </p>
                        ) : unitPrice != null ? (
                          <p className="font-sans text-[12.5px] text-gray-500 flex items-center gap-1.5 flex-wrap">
                            {formatPrice(unitPrice)} × {item.quantity}
                            {lineTotal != null && (
                              <span className="font-semibold text-gray-800">
                                = {formatPrice(lineTotal)}
                              </span>
                            )}
                            {hasDiscount && (
                              <span className="text-gray-400 line-through">
                                {formatPrice(toNumber(item.mrp)!)}
                              </span>
                            )}
                          </p>
                        ) : (
                          <p className="font-sans text-[12px] text-gray-400">
                            Price on request
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button
                            onClick={() => changeQty(item.product_id, -1)}
                            disabled={item.quantity <= 1 || loading}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-pink hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center font-sans text-[12.5px] font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => changeQty(item.product_id, 1)}
                            disabled={loading || !item.in_stock || atStockLimit}
                            title={
                              atStockLimit
                                ? "No more stock available"
                                : undefined
                            }
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-pink hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product_id)}
                          disabled={loading}
                          className="font-sans text-[11.5px] text-gray-400 hover:text-pink underline transition-colors cursor-pointer disabled:opacity-40"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer — only when there are items */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 px-6 pt-4 pb-6 shrink-0">
            <div className="flex items-center gap-5 pb-4 mb-4 border-b border-gray-100">
              <button className="flex items-center gap-1.5 font-sans text-[12.5px] text-gray-600 hover:text-maroon transition-colors cursor-pointer">
                <StickyNote size={14} />
                Order Note
              </button>
              <button className="flex items-center gap-1.5 font-sans text-[12.5px] text-gray-600 hover:text-maroon transition-colors cursor-pointer">
                <Tag size={14} />
                Coupon
              </button>
            </div>

            <div className="flex items-center justify-between mb-1">
              <span className="font-sans text-[15px] font-bold text-gray-800">
                Total:
              </span>
              <span className="font-sans text-[17px] font-bold text-gray-900">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <p className="font-sans text-[11.5px] text-gray-400 mb-5">
              Taxes and shipping calculated at checkout
            </p>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl text-white font-sans text-[13px] font-bold uppercase tracking-[0.14em] py-3.5 mb-3 transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
              style={{ background: "linear-gradient(135deg,#8b1a34,#4a0e1c)" }}
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              Check Out
            </button>

            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center font-sans text-[12.5px] font-semibold text-gray-600 hover:text-maroon underline underline-offset-2 transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
