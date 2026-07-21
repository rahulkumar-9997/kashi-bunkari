"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ImageOff,
  Loader2,
  ShoppingBag,
  Package,
  ArrowLeft,
} from "lucide-react";
import Heading from "@/components/Heading/Heading";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useCart } from "@/components/Cart/CartContext";
import {
  formatPrice,
  getUnitPrice,
  getLineTotal,
  hasDiscount,
  toNumber,
} from "@/lib/cartHelpers";
export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    cartTotal,
    loading,
    changeQty,
    removeItem,
    clearCart,
  } = useCart();
  const handleCheckout = () => router.push("/checkout");

  return (
    <div className="w-full min-h-screen bg-white">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]}
      />
      <section className="w-full lg:px-12 md:px-10 px-4 py-8 md:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
            <Heading
              level={1}
              text="Shopping Cart"
              className="font-serif text-[26px] md:text-[30px] font-bold text-maroon"
              decorator="none"
            />
            {cartCount > 0 && (
              <p className="font-sans text-[14px] text-gray-500">
                <span className="font-bold text-gray-800">{cartCount}</span>{" "}
                {cartCount === 1 ? "item" : "items"} in your cart
              </p>
            )}
          </div>

          {loading && cart.length === 0 ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={26} className="text-maroon animate-spin" />
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-pink/8 border border-pink/15 flex items-center justify-center mb-5">
                <ShoppingBag size={26} className="text-pink" />
              </div>
              <h3 className="font-serif text-[20px] font-bold text-gray-800 mb-2">
                Your cart is empty
              </h3>
              <p className="font-sans text-[13.5px] text-gray-400 mb-6">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-sans text-[11.5px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-7 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              {/* ── Items list ── */}
              <div>
                <div className="hidden md:flex items-center justify-between px-1 pb-3 mb-1 border-b border-gray-100">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                    Product
                  </span>
                  <div className="flex items-center gap-16 pr-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 w-24 text-center">
                      Quantity
                    </span>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 w-24 text-right">
                      Total
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cart.map((item) => {
                    const unitPrice = getUnitPrice(item);
                    const lineTotal = getLineTotal(item);
                    const discounted = hasDiscount(item);
                    const atStockLimit =
                      item.available_stock != null &&
                      item.quantity >= item.available_stock;

                    return (
                      <div
                        key={item.product_id}
                        className="py-5 flex flex-col md:flex-row md:items-center gap-4"
                      >
                        {/* Product */}
                        <div className="flex gap-4 flex-1 min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            className="relative w-24 h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0"
                          >
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="96px"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageOff size={20} className="text-gray-300" />
                              </div>
                            )}
                          </Link>

                          <div className="min-w-0 flex-1">
                            {item.category?.title && (
                              <span className="inline-block text-[10px] px-1.5 py-0.5 border border-maroon/30 bg-maroon/10 rounded-full text-maroon mb-1.5">
                                {item.category.title}
                              </span>
                            )}
                            <Link
                              href={`/product/${item.slug}`}
                              className="block font-sans text-[14px] font-semibold text-gray-800 leading-snug hover:text-maroon transition-colors mb-1"
                            >
                              {item.title}
                            </Link>

                            {!item.in_stock ? (
                              <p className="font-sans text-[12px] font-semibold text-red-500">
                                Out of stock
                              </p>
                            ) : unitPrice != null ? (
                              <p className="font-sans text-[12.5px] text-gray-500 flex items-center gap-1.5 flex-wrap">
                                {formatPrice(unitPrice)}
                                {discounted && (
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

                            {/* Mobile: qty + remove + total inline */}
                            <div className="flex md:hidden items-center justify-between mt-3">
                              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                                <button
                                  onClick={() => changeQty(item.product_id, -1)}
                                  disabled={item.quantity <= 1 || loading}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink transition-colors disabled:opacity-40 cursor-pointer"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-9 text-center font-sans text-[13px] font-semibold text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => changeQty(item.product_id, 1)}
                                  disabled={
                                    loading || !item.in_stock || atStockLimit
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink transition-colors disabled:opacity-40 cursor-pointer"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.product_id)}
                                disabled={loading}
                                aria-label="Remove item"
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40 cursor-pointer"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Desktop: qty stepper + total + remove */}
                        <div className="hidden md:flex items-center gap-8 shrink-0">
                          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden w-24 justify-center">
                            <button
                              onClick={() => changeQty(item.product_id, -1)}
                              disabled={item.quantity <= 1 || loading}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink transition-colors disabled:opacity-40 cursor-pointer"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-8 text-center font-sans text-[13px] font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => changeQty(item.product_id, 1)}
                              disabled={
                                loading || !item.in_stock || atStockLimit
                              }
                              title={
                                atStockLimit
                                  ? "No more stock available"
                                  : undefined
                              }
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink transition-colors disabled:opacity-40 cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <span className="w-24 text-right font-sans text-[14px] font-bold text-gray-900">
                            {lineTotal != null ? formatPrice(lineTotal) : "—"}
                          </span>

                          <button
                            onClick={() => removeItem(item.product_id)}
                            disabled={loading}
                            aria-label="Remove item"
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-40 cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-5 mt-2 border-t border-gray-100">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-semibold text-gray-600 hover:text-maroon transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => clearCart()}
                    disabled={loading}
                    className="font-sans text-[12.5px] text-gray-400 hover:text-red-500 underline transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* ── Order summary ── */}
              <aside className="lg:sticky lg:top-24 self-start">
                <div
                  className="rounded-2xl border border-gray-100 p-6"
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
                >
                  <h2 className="font-serif text-[19px] font-bold text-maroon mb-5">
                    Order Summary
                  </h2>
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
                        Calculated at checkout
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
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl text-white font-sans text-[13px] font-bold uppercase tracking-[0.14em] py-3.5 transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg,#8b1a34,#4a0e1c)",
                    }}
                  >
                    {loading && <Loader2 size={15} className="animate-spin" />}
                    Proceed to Checkout
                  </button>

                  <p className="font-sans text-[11px] text-gray-400 text-center mt-4">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
