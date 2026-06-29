"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Eye } from "lucide-react";
import Heading from "./Heading/Heading";
const PRODUCTS = [
  {
    id: 1,
    brand: "Kasibunkari",
    category: "Party Wear",
    name: "Chinon Silk Party Wear - Embroidered",
    image: "/images/products/1.webp",
    price: 1914,
    mrp: 2860,
    discount: 33,
    isNew: true,
    slug: "/products/chinon-silk-party-wear",
  },
  {
    id: 2,
    brand: "Weavers of India",
    category: "Banarasi Silk",
    name: "Banarasi Soft Silk Saree - White",
    image: "/images/products/2.webp",
    price: 1860,
    mrp: null,
    discount: null,
    isNew: false,
    slug: "/products/banarasi-soft-silk-white",
  },
  {
    id: 3,
    brand: "Kasibunkari",
    category: "Georgette",
    name: "Festive Collection Georgette - Red",
    image: "/images/products/3.webp",
    price: 1531,
    mrp: null,
    discount: null,
    isNew: true,
    slug: "/products/festive-georgette-red",
  },
  {
    id: 4,
    brand: "Designer Edit",
    category: "Tissue Silk",
    name: "Vishtha Silk - Full Border Work",
    image: "/images/products/4.webp",
    price: 4368,
    mrp: 5200,
    discount: 16,
    isNew: false,
    slug: "/products/vishtha-silk-border",
  },
  {
    id: 5,
    brand: "Kasibunkari",
    category: "Anarkali",
    name: "Pure Cotton Anarkali Suit",
    image: "/images/products/5.webp",
    price: 3100,
    mrp: null,
    discount: null,
    isNew: true,
    slug: "/products/pure-cotton-anarkali",
  },
  {
    id: 6,
    brand: "Heritage Silk",
    category: "Kanjivaram",
    name: "Kanjivaram Silk Saree",
    image: "/images/products/6.webp",
    price: 8500,
    mrp: null,
    discount: null,
    isNew: false,
    slug: "/products/kanjivaram-silk",
  },
  {
    id: 7,
    brand: "Kasibunkari",
    category: "Lehenga",
    name: "Bridal Velvet Lehenga - Deep Rose",
    image: "/images/products/7.webp",
    price: 12500,
    mrp: 15000,
    discount: 17,
    isNew: true,
    slug: "/products/bridal-velvet-lehenga",
  },
  {
    id: 8,
    brand: "Royal Weaves",
    category: "Banarasi Silk",
    name: "Katan Silk Zari Saree - Ivory",
    image: "/images/products/8.webp",
    price: 6200,
    mrp: null,
    discount: null,
    isNew: false,
    slug: "/products/katan-silk-zari-ivory",
  },
//   {
//     id: 9,
//     brand: "Kasibunkari",
//     category: "Sharara",
//     name: "Embroidered Sharara Set - Dusty Rose",
//     image: "/images/products/9.webp",
//     price: 4200,
//     mrp: 5500,
//     discount: 24,
//     isNew: true,
//     slug: "/products/embroidered-sharara-dusty-rose",
//   },
//   {
//     id: 10,
//     brand: "Silk Route",
//     category: "Tussar Silk",
//     name: "Pure Tussar Silk Saree - Natural",
//     image: "/images/products/10.webp",
//     price: 3800,
//     mrp: null,
//     discount: null,
//     isNew: false,
//     slug: "/products/pure-tussar-silk-natural",
//   },
];

export default function NewArrivals() {
  return (
    <section className="w-full lg:px-12 md:px-10 px-4">
        <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
            <div className="flex items-end justify-between mb-7 md:mb-8">
                <div>
                    <Heading
                    level={2}
                    text="New <span style='background: linear-gradient(135deg, #ec4899, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Arrivals</span>"
                    allowHTML
                    className="text-maroon"
                    decorator="underline-pink"
                    decoratorClassName="w-20"
                    />                    
                    <p className="font-sans text-[16px] text-gray-400 mt-3 tracking-wid">
                    Handcrafted styles, just landed — fresh from the loom
                    </p>
                </div>
                <Link
                    href="/categories"
                    className="hidden md:inline-flex items-center gap-2.5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-gray-500 hover:text-pink transition-colors duration-200 group shrink-0 pb-1"
                >
                    View All
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-maroon-200 group-hover:border-pink group-hover:bg-pink group-hover:text-magenta transition-all duration-200">
                    <ChevronRight size={13} />
                    </span>
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-2 md:gap-x-3 gap-y-5 md:gap-y-10">
            {PRODUCTS.map((product) => (
                <Link
                key={product.id}
                href={product.slug}
                className="prod-card block outline-none select-none w-full border border-gray-200 rounded-xl bg-white transition-all duration-300 ease-in-out hover:border-maroon/30 cursor-pointer hover:shadow-md overflow-hidden">
                    <div className="prod-shell relative overflow-hidden rounded-t-xl bg-gray-100"
                        style={{ aspectRatio: "3/4" }}>
                        <div className="prod-img absolute inset-0">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,20vw"
                            onError={(e) => {
                            e.currentTarget.style.display = "none";
                            }}
                        />
                        </div>
                        {product.discount && (
                        <span className="prod-disc absolute top-2.5 right-2.5 z-20 font-sans text-[10px] font-bold text-white bg-green-600 px-2 py-1 rounded-sm leading-none shadow-sm">
                            {product.discount}% OFF
                        </span>
                        )}
                        
                        <div className="prod-quick absolute bottom-4 left-0 right-0 z-20 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 font-sans text-[9.5px] font-bold uppercase tracking-[0.18em] text-white bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Eye size={11} />
                            Quick View
                        </span>
                        </div>
                    </div>
                    <div className="px-3 py-3">
                        <span className="text-[11px] px-1.5 py-0.5 border border-maroon/30 bg-maroon/20 rounded-full w-max text-primary-500 inline-block text-maroon mb-2">
                        {product.category}
                        </span>
                        <p className="font-sans text-[14px] md:text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-2.5">
                        {product.name}
                        </p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="prod-price font-sans text-[14px] font-bold text-gray-900">
                                ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {product.mrp && (
                                <span className="font-sans text-[11.5px] text-gray-400 line-through">
                                ₹{product.mrp.toLocaleString("en-IN")}
                                </span>
                            )}
                            {product.discount && (
                                <span className="font-sans text-[10.5px] font-bold text-pink">
                                {product.discount}% off
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
            </div>
            <div className="md:hidden mt-8 flex items-center justify-center gap-3">
                <span className="h-px flex-1 max-w-14 bg-gray-100 rounded-full" />
                <Link
                    href="/new-arrivals"
                    className="group inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500 hover:text-pink transition-colors duration-200"
                >
                    View All
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-gray-200 group-hover:border-pink group-hover:bg-pink group-hover:text-white transition-all duration-200">
                    <ChevronRight size={10} />
                    </span>
                </Link>
                <span className="h-px flex-1 max-w-14 bg-gray-100 rounded-full" />
            </div>
        </div>
    </section>
  );
}
