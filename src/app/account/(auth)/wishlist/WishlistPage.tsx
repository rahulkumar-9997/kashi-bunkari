"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ImageOff, Loader2, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/Cart/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";
import Heading from "@/components/Heading/Heading";

function formatPrice(value: string | number | null) {
  if (value == null) return null;
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(n)) return null;
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function WishlistPage() {
  const { items, loading, removingId, removeItem } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = async (productId: number, title: string) => {
    try {
      await addToCart(productId, 1);
      toast.success(`${title} added to cart.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't add to cart.");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>          
          <Heading
            level={1}
            text="My Wishlist"
            className="text-maroon text-[24px]"
            decorator="underline-pink"
            allowHTML
          />
          <p className="font-sans text-[12.5px] text-gray-400 mt-0.5">
            {items.length > 0
              ? `${items.length} item${items.length === 1 ? "" : "s"} saved`
              : "Products you love, saved for later"}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="text-maroon animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-pink/8 border border-pink/15 flex items-center justify-center mb-4">
              <Heart size={22} className="text-pink" />
            </div>
            <h3 className="font-serif text-[17px] font-bold text-gray-800 mb-1.5">
              Your wishlist is empty
            </h3>
            <p className="font-sans text-[13px] text-gray-400 mb-5">
              Tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/"
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {items.map((item) => {
              const price = formatPrice(item.offer_rate) ?? formatPrice(item.mrp);
              const isRemoving = removingId === item.id;

              return (
                <div
                  key={item.id}
                  className="group relative border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-200 hover:border-maroon/30 hover:shadow-md"
                >
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={isRemoving}
                    aria-label="Remove from wishlist"
                    className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isRemoving ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>

                  <Link
                    href={`/product/${item.slug}/${item.attribute_value}`}
                    className="block relative bg-gray-100"
                    style={{ aspectRatio: "3/4" }}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff size={22} className="text-gray-300" />
                      </div>
                    )}
                    {!item.in_stock && (
                      <span className="absolute bottom-2.5 left-2.5 z-10 font-sans text-[9.5px] font-bold uppercase tracking-wide text-white bg-gray-900/80 px-2 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </Link>

                  <div className="px-3 py-3">
                    {item.category?.title && (
                      <span className="inline-block text-[10px] px-1.5 py-0.5 border border-maroon/30 bg-maroon/10 rounded-full text-maroon mb-1.5">
                        {item.category.title}
                      </span>
                    )}
                    <Link
                      href={`/products/${item.slug}`}
                      className="block font-sans text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-2 hover:text-maroon transition-colors"
                    >
                      {item.title}
                    </Link>
                    {price && (
                      <p className="font-sans text-[13.5px] font-bold text-gray-900 mb-3">{price}</p>
                    )}

                    <button
                      onClick={() => handleMoveToCart(item.id, item.title)}
                      disabled={!item.in_stock}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-white py-2.5 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      style={{ background: "linear-gradient(135deg,#8b1a34,#e91e8c)" }}
                    >
                      <ShoppingBag size={13} />
                      {item.in_stock ? "Move to Cart" : "Unavailable"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}