"use client";
import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading/Heading";
import {
  ArrowRight,
  Phone,
  Mail,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  Award,
  Gem,
} from "lucide-react";
import { useState } from "react";

const BULK_IMAGES = [
  {
    id: 1,
    image: "/images/image2.webp",
    alt: "Kasibunkari Bulk Order - Silk Saree Collection",
  },
  {
    id: 2,
    image: "/images/image1.webp",
    alt: "Kasibunkari Bulk Order - Banarasi Saree",
  },
  {
    id: 3,
    image: "/images/image3.webp",
    alt: "Kasibunkari Bulk Order - Designer Saree",
  },
  {
    id: 4,
    image: "/images/image4.webp",
    alt: "Kasibunkari Bulk Order - Premium Saree",
  },
];

export default function BulkOrder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % BULK_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + BULK_IMAGES.length) % BULK_IMAGES.length,
    );
  };

  const currentImages = [
    BULK_IMAGES[currentIndex],
    BULK_IMAGES[(currentIndex + 1) % BULK_IMAGES.length],
  ];

return (
    <section className="w-full relative overflow-hidden bg-linear-to-br from-[#f7f3ec] via-[#fdf6f0] to-[#f7f3ec] lg:px-12 md:px-10 px-4">
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <div
            className="absolute inset-0"
            style={{
                backgroundImage: `
                linear-gradient(rgba(139,11,19,0.02) 1px, transparent 1px), 
                linear-gradient(90deg, rgba(139,11,19,0.02) 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
            }}
            />        
        </div>

        <div className="mx-auto max-w-7xl lg:py-10 md:py-10 sm:py-10 py-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
                <div className="flex-1 lg:pr-8">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-magenta/20 px-4 py-2 rounded-full mb-6 shadow-sm">
                        <Sparkles className="w-4 h-4 text-maroon"/>
                        <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b0b13]">
                            Special Orders Welcome
                        </span>
                    </div>
                    {/* <Heading
                        level={2}
                        text="Shop By <span style='background: linear-gradient(135deg, #ec4899, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Occasion</span>"
                        allowHTML
                        className="text-maroon"
                        decorator="underline-pink"
                        decoratorClassName="w-20"
                    /> */}
                    <h2 className="font-serif text-[clamp(36px,5vw,40px)] font-bold leading-[1.08] mb-4">
                        <span className="text-gray-900">Bulk</span>
                        <span className="bg-linear-to-r from-[#8b0b13] to-[#e91e8c] bg-clip-text text-transparent">
                            {" "}
                            Order
                        </span>
                    </h2>
                    <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-0.5 bg-linear-to-r from-[#e91e8c] to-[#8b0b13]" />
                    <div className="w-3 h-3 rounded-full bg-[#e91e8c]/20 border border-[#e91e8c]/40" />
                    <div className="w-16 h-0.5 bg-linear-to-l from-[#e91e8c] to-[#8b0b13]" />
                    </div>
                    <p className="font-sans text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-4 max-w-[500px]">
                    Looking to place a{" "}
                    <span className="text-[#8b0b13] font-semibold">bulk order</span>{" "}
                        for exquisite sarees? Whether it's for weddings, corporate
                        gifting, or retail, we've got you covered!
                    </p>
                    <p className="font-sans text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-8 max-w-115">
                    Choose from our wide selection of{" "}
                    <span className="font-medium text-gray-800">
                        handcrafted sarees
                    </span>{" "}
                    in vibrant colors, unique designs, and premium fabric.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-10 max-w-135">
                        <div className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-magenta/10 hover:border-magenta/30 hover:shadow-lg hover:shadow-magenta/5 transition-all duration-300 cursor-default">
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-magenta/10 to-maroon/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Gem className="w-4 h-4 text-[#8b0b13]" />
                        </div>
                        <div>
                            <span className="font-sans text-[14px] font-semibold text-[#282828] block">
                            Premium Quality
                            </span>
                            <span className="font-sans text-[13px] text-[#282828]/50">
                            Handpicked fabrics
                            </span>
                        </div>
                        </div>
                        <div className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#e91e8c]/10 hover:border-[#e91e8c]/30 hover:shadow-lg hover:shadow-[#e91e8c]/5 transition-all duration-300 cursor-default">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#e91e8c]/10 to-[#8b0b13]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <Shield className="w-4 h-4 text-[#8b0b13]" />
                            </div>
                            <div>
                                <span className="font-sans text-[14px] font-semibold text-[#282828] block">
                                Bulk Discounts
                                </span>
                                <span className="font-sans text-[13px] text-[#282828]/50">
                                Best wholesale rates
                                </span>
                            </div>
                        </div>
                        <div className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#e91e8c]/10 hover:border-[#e91e8c]/30 hover:shadow-lg hover:shadow-[#e91e8c]/5 transition-all duration-300 cursor-default">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#e91e8c]/10 to-[#8b0b13]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <Award className="w-4 h-4 text-[#8b0b13]" />
                            </div>
                            <div>
                                <span className="font-sans text-[14px] font-semibold text-[#282828] block">
                                Custom Designs
                                </span>
                                <span className="font-sans text-[13px] text-[#282828]/50">
                                Tailored to your needs
                                </span>
                            </div>
                        </div>
                        <div className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#e91e8c]/10 hover:border-[#e91e8c]/30 hover:shadow-lg hover:shadow-[#e91e8c]/5 transition-all duration-300 cursor-default">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#e91e8c]/10 to-[#8b0b13]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <Truck className="w-4 h-4 text-[#8b0b13]" />
                            </div>
                            <div>
                                <span className="font-sans text-[14px] font-semibold text-[#282828] block">
                                Quick Delivery
                                </span>
                                <span className="font-sans text-[13px] text-[#282828]/50">
                                Pan-India shipping
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-3 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-white bg-linear-to-r from-[#8b0b13] to-[#a01020] px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:shadow-[#8b0b13]/20"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                            Contact Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                            <span className="absolute inset-0 bg-linear-to-r from-[#e91e8c] to-[#8b0b13] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link
                                href="tel:+919876543210"
                                className="flex items-center gap-2 text-gray-500 hover:text-[#8b0b13] transition-colors cursor-pointer group"
                            >
                                <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#e91e8c] group-hover:bg-[#e91e8c]/5 transition-all duration-300">
                                <Phone className="w-4 h-4" />
                                </div>
                                <span className="font-sans text-[12px] font-medium">
                                +91 98765 43210
                                </span>
                            </Link>
                            
                            <Link
                                href="mailto:kasibunkari@gmail.com"
                                className="flex items-center gap-2 text-gray-500 hover:text-[#8b0b13] transition-colors cursor-pointer group"
                            >
                                <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#e91e8c] group-hover:bg-[#e91e8c]/5 transition-all duration-300">
                                <Mail className="w-4 h-4" />
                                </div>
                                <span className="font-sans text-[12px] font-medium">
                                kasibunkari@gmail.com
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center w-full">
                    <div className="relative w-full max-w-140">
                        <div className="absolute -inset-4 border-2 border-[#e91e8c]/10 rounded-2xl transform rotate-2" />
                        <div className="absolute -inset-8 border border-[#e9d27d]/20 rounded-2xl transform -rotate-1" />
                            <div
                                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="absolute right-0 top-0 w-[55%] h-full rounded-l-2xl overflow-hidden">
                                    <Image
                                        src={currentImages[0]?.image || "/images/image1.webp"}
                                        alt={currentImages[0]?.alt || "Bulk Order Saree"}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 hover:scale-110"
                                        sizes="(max-width:768px) 50vw, 30vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-[#f7f3ec]/30" />
                                </div>
                                <div className="absolute left-0 top-[6%] w-[58%] h-[88%] rounded-2xl overflow-hidden shadow-2xl z-10 transform hover:scale-[1.02] transition-transform duration-700">
                                    <Image
                                        src={currentImages[1]?.image || "/images/image2.webp"}
                                        alt={currentImages[1]?.alt || "Bulk Order Saree"}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 hover:scale-110"
                                        sizes="(max-width:768px) 55vw, 35vw"
                                        priority
                                    />
                                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
                                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
                                    </div>
                                    {isHovered && (
                                    <>
                                        <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 cursor-pointer"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-[#8b0b13]" />
                                        </button>
                                        <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 cursor-pointer"
                                        >
                                        <ChevronRight className="w-5 h-5 text-[#8b0b13]" />
                                        </button>
                                    </>
                                    )}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                                        {BULK_IMAGES.map((_, idx) => (
                                            <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentIndex(idx);
                                            }}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                idx === currentIndex
                                                ? "w-6 bg-[#8b0b13]"
                                                : "bg-white/60 hover:bg-white/80"
                                            }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-[#e91e8c]/20">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-1">
                                                {/* {[1, 2, 3].map((i) => (
                                                    <div
                                                    key={i}
                                                    className="w-6 h-6 rounded-full border-2 border-white bg-[#e91e8c]/20 flex items-center justify-center text-[8px] font-bold text-[#8b0b13]"
                                                    >
                                                    {String.fromCharCode(64 + i)}
                                                    </div>
                                                ))} */}
                                                <div className="w-6 h-6 rounded-full border-2 border-white bg-[#e91e8c]/20 flex items-center justify-center text-[7px] font-bold text-[#8b0b13]">
                                                    K
                                                </div>
                                                <div className="w-6 h-6 rounded-full border-2 border-white bg-[#e91e8c]/20 flex items-center justify-center text-[7px] font-bold text-[#8b0b13]">
                                                    B
                                                </div>                                            
                                            </div>
                                            <div>
                                            <p className="font-sans text-[10px] font-bold text-gray-800 leading-tight">
                                                Trusted by
                                            </p>
                                            <p className="font-sans text-[11px] font-bold text-[#8b0b13] leading-tight">
                                                500+ Brands
                                            </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border-2 border-[#e9d27d]/20 animate-spin-slow" />
                                    <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full border-2 border-[#e91e8c]/10 animate-spin-slow-reverse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-transparent via-magenta/10 to-transparent" />
        </section>
    );
}
