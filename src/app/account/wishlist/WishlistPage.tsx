"use client";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ShoppingCart,
  Star,
  Eye,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type WishlistItem = {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: string;
  addedDate: string;
};

const SAMPLE_WISHLIST: WishlistItem[] = [
  {
    id: "1",
    name: "Banarasi Katan Silk Saree - Red",
    image: "/images/products/1.webp",
    price: "$145.00",
    originalPrice: "$180.00",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    category: "Sarees",
    addedDate: "December 15, 2024",
  },
  {
    id: "2",
    name: "Tissue Silk Saree - Gold",
    image: "/images/products/2.webp",
    price: "$100.00",
    originalPrice: "$130.00",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    category: "Sarees",
    addedDate: "December 10, 2024",
  },
  {
    id: "3",
    name: "Ayodhya Temple Tour Package",
    image: "/images/products/3.webp",
    price: "$89.50",
    originalPrice: "$110.00",
    rating: 4.9,
    reviews: 56,
    inStock: true,
    category: "Tours",
    addedDate: "December 5, 2024",
  },
  {
    id: "4",
    name: "Prayagraj Kumbh Package",
    image: "/images/products/4.webp",
    price: "$120.00",
    originalPrice: "$150.00",
    rating: 4.7,
    reviews: 78,
    inStock: false,
    category: "Tours",
    addedDate: "November 28, 2024",
  },
  {
    id: "5",
    name: "Varanasi Special Package",
    image: "/images/products/5.webp",
    price: "$245.00",
    originalPrice: "$300.00",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    category: "Packages",
    addedDate: "November 20, 2024",
  },
  {
    id: "6",
    name: "Lucknow Heritage Walk",
    image: "/images/products/6.webp",
    price: "$62.00",
    originalPrice: "$75.00",
    rating: 4.5,
    reviews: 45,
    inStock: true,
    category: "Tours",
    addedDate: "November 15, 2024",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          );
        } else {
          return <Star key={i} size={12} className="text-gray-300" />;
        }
      })}
    </div>
  );
}

export default function WishlistPage() {
  const { customer, isLoading } = useAuth();
  const [wishlistItems, setWishlistItems] = useState(SAMPLE_WISHLIST);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FBF6ED] border border-[#E4D9C4] flex items-center justify-center mb-4">
          <Heart size={28} className="text-[#AD8A3B]" />
        </div>
        <h2 className="font-serif text-xl font-bold text-maroon mb-2">
          Please Login to View Wishlist
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-xs">
          You need to be logged in to access your wishlist.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-maroon text-white text-sm font-medium rounded-lg hover:bg-maroon/90 transition-colors"
        >
          Login Now
          <ChevronRight size={16} />
        </Link>
      </div>
    );
  }

  const totalItems = wishlistItems.length;
  const inStockItems = wishlistItems.filter((item) => item.inStock).length;
  const outOfStockItems = wishlistItems.filter((item) => !item.inStock).length;

  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id: string) => {
    console.log("Moving item to cart:", id);
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          
          <div>
            <Heading
              level={1}
              text="My Orders"
              className="text-maroon text-[24px]"
              decorator="underline-pink"
              allowHTML
            />
          </div>
        </div>
      </div>
      {wishlistItems.length === 0 ? (
        <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] px-6 py-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#E4D9C4] flex items-center justify-center mb-4">
            <Heart size={28} className="text-[#AD8A3B]" />
          </div>
          <p className="font-serif text-lg font-bold text-maroon mb-1.5">
            Your wishlist is empty
          </p>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Start adding your favorite items to your wishlist
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-maroon border-b-2 border-maroon pb-1 hover:gap-3 transition-all"
          >
            Start Shopping
            <ChevronRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-[#E4D9C4] overflow-hidden hover:border-[#AD8A3B]/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <Link href={`/products/${item.id}`} className="block relative">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/placeholder.webp";
                      }}
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2
                        size={16}
                        className="text-gray-600 group-hover:text-red-600"
                      />
                    </button>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${item.id}`} className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm hover:text-maroon transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {item.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <StarRating rating={item.rating} />
                    <span className="text-xs text-gray-400">
                      ({item.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-base font-bold text-maroon">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="mt-3 flex items-center gap-2">
                    {item.inStock ? (
                      <button
                        onClick={() => handleMoveToCart(item.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-maroon hover:bg-maroon/90 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-200 text-gray-500 text-xs font-medium rounded-lg cursor-not-allowed"
                      >
                        <AlertCircle size={14} />
                        Out of Stock
                      </button>
                    )}
                    <Link
                      href={`/products/${item.id}`}
                      className="p-2 rounded-lg border border-[#E4D9C4] hover:border-maroon/30 hover:bg-[#FBF6ED] transition-colors"
                    >
                      <Eye
                        size={16}
                        className="text-gray-400 hover:text-maroon"
                      />
                    </Link>
                  </div>

                  <div className="mt-2 text-xs text-gray-400">
                    Added: {item.addedDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400 pt-2">
            Total {wishlistItems.length} items in your wishlist
          </div>
        </>
      )}
    </div>
  );
}
