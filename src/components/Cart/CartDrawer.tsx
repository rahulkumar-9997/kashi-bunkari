"use client";
import Image from "next/image";
import { useCart } from "./CartContext";
import { ImageOff } from "lucide-react";

function formatPrice(value: number | string | null) {
  if (value == null) return null;
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    removeItem,
    changeQty,
    cartCount,
    cartTotal,
    loading,
  } = useCart();

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
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-[20px] font-bold text-gray-900">Shopping Cart</h2>
            <span className="bg-pink text-white font-inter text-[9px] font-bold px-2.5 py-0.5 rounded-full">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="flex items-center gap-1.5 text-gray-400 hover:text-pink font-inter text-[10px] uppercase tracking-wide transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
            Close
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-4">
              <svg className="w-14 h-14 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" />
              </svg>
              <h3 className="font-serif text-gray-800 text-[20px]">Your cart is empty</h3>
              <button
                onClick={closeCart}
                className="bg-pink text-white font-inter text-[11px] font-bold uppercase px-8 py-2.5 hover:bg-pink-dark transition-colors border-none rounded-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => {
                const price = item.offer_rate ?? item.mrp;
                return (
                  <div
                    key={item.product_id}
                    className="relative flex gap-3.5 px-5 py-4 border-b border-gray-100"
                  >
                    <div className="w-[66px] h-[84px] flex-shrink-0 rounded overflow-hidden bg-gray-50 relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="66px"
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
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-[14px] font-semibold text-gray-900 leading-tight mb-0.5 line-clamp-2">
                        {item.title}
                      </h4>
                      {item.category.title && (
                        <p className="font-inter text-[10px] text-pink uppercase tracking-wide mb-2">
                          {item.category.title}
                        </p>
                      )}
                      {!item.in_stock && (
                        <p className="font-inter text-[10px] text-red-500 font-semibold mb-2">
                          Out of stock
                        </p>
                      )}
                      <div className="flex items-center">
                        <button
                          onClick={() => changeQty(item.product_id, -1)}
                          disabled={loading || item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-500 text-[14px] hover:bg-pink hover:text-white transition-colors rounded-sm disabled:opacity-40"
                        >
                          −
                        </button>
                        <div className="w-8 h-7 flex items-center justify-center border-t border-b border-gray-200 font-inter text-[12.5px] font-semibold text-gray-800">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => changeQty(item.product_id, 1)}
                          disabled={
                            loading ||
                            (item.available_stock != null &&
                              item.quantity >= item.available_stock)
                          }
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-500 text-[14px] hover:bg-pink hover:text-white transition-colors rounded-sm disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-inter text-[14px] font-bold text-gray-900 mt-1">
                        {item.line_total != null
                          ? formatPrice(item.line_total)
                          : formatPrice(price)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      disabled={loading}
                      className="absolute top-4 right-5 text-gray-200 hover:text-red-400 text-xl leading-none transition-colors disabled:opacity-40"
                    >
                      ×
                    </button>
                  </div>
                );
              })}

              {/* Promo */}
              <div className="px-5 py-3 border-b border-gray-100">
                <div className="flex gap-2">
                  <input
                    placeholder="Promo code"
                    className="flex-1 bg-gray-50 border border-gray-200 px-3.5 py-2 font-inter text-[12px] text-gray-700 outline-none focus:border-pink transition-colors rounded-sm placeholder-gray-300"
                  />
                  <button className="bg-gray-800 hover:bg-pink text-white font-inter text-[10px] uppercase font-bold px-4 transition-colors border-none rounded-sm">
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between mb-1">
              <span className="font-inter text-[12px] uppercase font-semibold text-gray-400 tracking-wide">
                Subtotal
              </span>
              <span className="font-serif text-[22px] font-bold text-gray-900">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <p className="font-inter text-[11px] text-green-600 font-medium mb-4">
              ✓ Free shipping applied
            </p>
            <button
              disabled={loading}
              className="w-full bg-pink hover:bg-pink-dark text-white font-inter text-[12.5px] font-bold tracking-wide uppercase py-3.5 transition-colors border-none rounded-sm mb-2 disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="w-full bg-transparent text-gray-500 font-inter text-[11px] uppercase tracking-wide hover:text-pink transition-colors border-none"
            >
              ← Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}