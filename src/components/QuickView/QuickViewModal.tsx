"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  X,
  Loader2,
  ImageOff,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { useQuickView } from "@/context/QuickViewContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { quickViewService } from "@/services/quickViewService";
import { useCart } from "@/components/Cart/CartContext";
import { useWishlistToggle } from "@/hooks/useWishlistToggle";
import type { QuickViewProduct } from "@/types/quickView";

function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function QuickViewModal() {
  const { isOpen, slug, attributeValueSlug, close } = useQuickView();
  const { openLogin } = useAuthModal();
  const { addToCart, loading: cartLoading } = useCart();

  const [product, setProduct] = useState<QuickViewProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!isOpen || !slug) return;

    setLoading(true);
    setError(null);
    setProduct(null);
    setActiveImage(0);
    setQty(1);

    quickViewService
      .get(slug, attributeValueSlug ?? undefined)
      .then((res) => setProduct(res.data))
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Could not load product.",
        ),
      )
      .finally(() => setLoading(false));
  }, [isOpen, slug, attributeValueSlug]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const {
    wishlisted,
    loading: wishlistLoading,
    toggle: toggleWishlist,
  } = useWishlistToggle(product?.id ?? -1);

  if (!isOpen) return null;

  const price = product ? (product.offer_rate ?? product.mrp) : null;
  const hasDiscount =
    product &&
    product.offer_rate != null &&
    product.mrp != null &&
    product.mrp > product.offer_rate;
  const discountPct = hasDiscount
    ? Math.round((1 - product!.offer_rate! / product!.mrp!) * 100)
    : null;

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, qty);
      toast.success(`${product.title} added to cart.`);
      close();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't add to cart.");
    }
  };

  const handleWishlistToggle = async () => {
    try {
      const nowWishlisted = await toggleWishlist();
      toast.success(
        nowWishlisted ? "Added to wishlist." : "Removed from wishlist.",
      );
    } catch (err) {
      if (err instanceof Error && err.message.includes("log in")) {
        openLogin();
        return;
      }
      toast.error(
        err instanceof Error ? err.message : "Couldn't update your wishlist.",
      );
    }
  };

  const productHref = product
    ? attributeValueSlug
      ? `/product/${product.slug}/${attributeValueSlug}`
      : `/product/${product.slug}`
    : "#";

  return (
    <div
      className="fixed inset-0 z-[390] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <button
          onClick={close}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="text-maroon animate-spin" />
          </div>
        ) : error || !product ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <ImageOff size={26} className="text-gray-300 mb-3" />
            <p className="font-sans text-[13.5px] text-gray-500">
              {error || "Product not found."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-5 md:p-6">
              <div
                className="relative w-full rounded-xl overflow-hidden bg-gray-100 mb-3"
                style={{ aspectRatio: "4/5" }}
              >
                {product.images[activeImage] ? (
                  <Image
                    src={product.images[activeImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 400px"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff size={26} className="text-gray-300" />
                  </div>
                )}
                {discountPct !== null && (
                  <span className="absolute top-3 left-3 font-sans text-[10px] font-bold uppercase tracking-wide text-white bg-maroon px-2.5 py-1 rounded-full">
                    {discountPct}% OFF
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto" data-lenis-prevent>
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative shrink-0 w-14 h-16 rounded-lg overflow-hidden border-2 bg-gray-50 cursor-pointer ${
                        activeImage === i ? "border-maroon" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 md:p-6 md:pl-0 flex flex-col">
              {product.category.title && (
                <Link
                  href={`/shop/${product.category.slug}`}
                  onClick={close}
                  className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-pink mb-1.5"
                >
                  {product.category.title}
                </Link>
              )}

              <h2 className="font-serif text-[19px] md:text-[21px] font-bold text-maroon leading-snug mb-3">
                {product.title}
              </h2>

              <div className="flex items-baseline gap-2 mb-4">
                {price != null ? (
                  <>
                    <span className="font-sans text-[22px] font-bold text-gray-900">
                      {formatPrice(price)}
                    </span>
                    {hasDiscount && (
                      <span className="font-sans text-[14px] text-gray-400 line-through">
                        {formatPrice(product.mrp!)}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="font-sans text-[15px] text-gray-500">
                    Price on request
                  </span>
                )}
              </div>

              {product.attributes.length > 0 && (
                <div className="space-y-2 mb-5">
                  {product.attributes.map((attr) => (
                    <p key={attr.title} className="font-sans text-[13px]">
                      <span className="font-semibold text-gray-700">
                        {attr.title}:{" "}
                      </span>
                      <span className="text-gray-500">
                        {attr.values.join(", ")}
                      </span>
                    </p>
                  ))}
                </div>
              )}

              {!product.in_stock ? (
                <p className="font-sans text-[13px] font-semibold text-red-500 mb-4">
                  Out of stock
                </p>
              ) : (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shrink-0">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-9 h-10 flex items-center justify-center text-gray-500 hover:text-pink hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-10 text-center font-sans text-[13.5px] font-bold text-gray-800">
                      {qty}
                    </span>
                    <button
                      onClick={() =>
                        setQty((q) =>
                          product.stock_quantity != null
                            ? Math.min(q + 1, product.stock_quantity)
                            : q + 1,
                        )
                      }
                      disabled={
                        product.stock_quantity != null &&
                        qty >= product.stock_quantity
                      }
                      className="w-9 h-10 flex items-center justify-center text-gray-500 hover:text-pink hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl text-white font-sans text-[12px] font-bold uppercase tracking-[0.12em] py-2.5 transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg,#8b1a34,#e91e8c)",
                    }}
                  >
                    {cartLoading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <ShoppingBag size={14} />
                    )}
                    Add to Cart
                  </button>

                  <button
                    onClick={handleWishlistToggle}
                    disabled={wishlistLoading}
                    className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer disabled:opacity-60 ${
                      wishlisted
                        ? "bg-pink border-pink text-white"
                        : "border-gray-200 text-gray-400 hover:border-pink hover:text-pink"
                    }`}
                  >
                    {wishlistLoading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Heart
                        size={15}
                        fill={wishlisted ? "currentColor" : "none"}
                      />
                    )}
                  </button>
                </div>
              )}

              <Link
                href={productHref}
                onClick={close}
                className="mt-auto text-center font-sans text-[12px] font-semibold text-gray-600 hover:text-maroon underline underline-offset-2 transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
