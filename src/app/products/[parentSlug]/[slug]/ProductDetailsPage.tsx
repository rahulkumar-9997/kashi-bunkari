"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import {
  ChevronRight,
  ChevronUp,
  Heart,
  Share2,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Check,
  ZoomIn,
} from "lucide-react";

type Props = { parentSlug: string; slug: string };
const PRODUCT = {
  title: "Baffle Bag — Top Spout / Discharge Spout, 105×105×120, Laminated PP",
  brand: "Kasibunkari Packaging",
  category: "Industrial Bags",
  rating: 4.7,
  reviewCount: 128,
  price: 1850,
  mrp: 2400,
  discount: 23,
  sku: "BFL-105105120-LPP",
  inStock: true,
  description:
    "Heavy-duty laminated PP baffle bag engineered for bulk storage and transport. Reinforced corner baffles maintain a square shape for efficient palletizing, while the top spout / discharge spout design allows controlled filling and emptying with minimal product loss.",
  images: [
    "/images/products/1.webp",
    "/images/products/2.webp",
    "/images/products/3.webp",
    "/images/products/4.webp",
    "/images/products/5.webp",
    "/images/products/6.webp",
    "/images/products/7.webp",
    "/images/products/7.webp",
    "/images/products/7.webp",
    "/images/products/7.webp",
    "/images/products/7.webp",
  ],
  colors: [
    { name: "Natural White", hex: "#f5f3ee" },
    { name: "UV Black", hex: "#1f1f1f" },
    { name: "Industrial Grey", hex: "#9a9a9a" },
  ],
  sizes: ["90×90×110", "105×105×120", "110×110×130", "Custom Size"],
  highlights: [
    "Laminated PP fabric — moisture & tear resistant",
    "Reinforced baffle corners for stable stacking",
    "Top fill spout + bottom discharge spout",
    "SWL up to 1500 kg, 5:1 safety factor",
    "UV stabilized for 6–12 months outdoor use",
  ],
  specs: [
    { label: "Dimensions", value: "105 × 105 × 120 cm" },
    { label: "Fabric", value: "Laminated Woven Polypropylene" },
    { label: "Safe Working Load", value: "1000–1500 kg" },
    { label: "Safety Factor", value: "5:1" },
    { label: "Spout Type", value: "Top Spout / Discharge Spout" },
    { label: "Loop Type", value: "4 Corner Loops" },
    { label: "Liner", value: "Optional PE Liner Available" },
    { label: "MOQ", value: "500 units" },
  ],
};

const RELATED = [
  {
    id: 1,
    name: "U-Panel Bulk Bag — 90×90×110",
    image: "/images/products/1.webp",
    price: 1620,
  },
  {
    id: 2,
    name: "4-Panel FIBC Bag — Conductive",
    image: "/images/products/2.webp",
    price: 2100,
  },
  {
    id: 3,
    name: "Circular Woven Jumbo Bag",
    image: "/images/products/3.webp",
    price: 1450,
  },
  {
    id: 4,
    name: "Duffle Top / Flat Bottom Bag",
    image: "/images/products/4.webp",
    price: 1780,
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Rakesh Industries",
    rating: 5,
    date: "2 weeks ago",
    text: "Excellent build quality, baffles hold shape perfectly even when fully loaded. Will reorder.",
  },
  {
    id: 2,
    name: "Verma Exports",
    rating: 4,
    date: "1 month ago",
    text: "Good product for the price. Spout stitching could be slightly tighter but overall satisfied.",
  },
  {
    id: 3,
    name: "Singh Agro Traders",
    rating: 5,
    date: "1 month ago",
    text: "Used for grain storage across 3 seasons now, zero tearing issues. Highly recommend.",
  },
];

export default function ProductDetailsPage({ parentSlug, slug }: Props) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    "description",
  );

  const galleryRef = useRef<HTMLDivElement>(null);
  const thumbRailRef = useRef<HTMLDivElement>(null);
  const mobileThumbRailRef = useRef<HTMLDivElement>(null);
  const fancyboxRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const { Fancybox } = await import("@fancyapps/ui");
      fancyboxRef.current = Fancybox;
    })();
    return () => {
      fancyboxRef.current?.close();
    };
  }, []);

  const openZoom = (startIndex: number) => {
    if (!fancyboxRef.current) return;
    const items = PRODUCT.images.map((src) => ({
      src,
      caption: PRODUCT.title,
    }));
    fancyboxRef.current.show(items, {
      startIndex,
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: [
            "zoomIn",
            "zoomOut",
            "toggle1to1",
            "rotateCCW",
            "rotateCW",
            "flipX",
            "flipY",
          ],
          right: ["slideshow", "download", "thumbs", "close"],
        },
      },
      Images: {
        zoom: true,
        zoomOpacity: "auto",
        click: "close",
        wheel: "slide",
      },
    });
  };

  const displayedMain =
    PRODUCT.images.length >= 2
      ? [
          PRODUCT.images[activeThumb],
          PRODUCT.images[(activeThumb + 1) % PRODUCT.images.length],
        ]
      : PRODUCT.images;

  const selectThumb = (index: number) => {
    setActiveThumb(index);
    const desktopThumb = thumbRailRef.current?.children[index] as
      | HTMLElement
      | undefined;
    desktopThumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });

    const mobileThumb = mobileThumbRailRef.current?.children[index] as
      | HTMLElement
      | undefined;
    mobileThumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  const goToPrevThumb = () => {
    selectThumb(
      (activeThumb - 1 + PRODUCT.images.length) % PRODUCT.images.length,
    );
  };
  const goToNextThumb = () => {
    selectThumb((activeThumb + 1) % PRODUCT.images.length);
  };

  const parentLabel =
    parentSlug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Products";
  const breadcrumbLabel = PRODUCT.title.split(",")[0];

  return (
    <div className="w-full min-h-screen bg-white">
        {/* ══ BREADCRUMB ══ */}
        <section className="breadcrumb">
            <div className="relative overflow-hidden bg-gray-50 py-2 md:py-3">
            <div
                className="absolute inset-0"
                style={{
                backgroundImage:
                    "repeating-linear-gradient(30deg, transparent, transparent 38px, rgba(244,114,182,0.05) 38px, rgba(244,114,182,0.05) 40px)",
                }}
            />
            <div className="relative mx-auto max-w-7xl px-2 md:px-8 lg:px-1">
                <div className="flex flex-wrap items-center gap-2 text-[12px]">
                <Link href="/" className="text-gray-00 text-[14px] transition ">
                    Home
                </Link>
                <ChevronRight size={14} className="text-gray-500" />
                <Link
                    href="/collections"
                    className="text-gray-500 transition text-[14px]"
                >
                    Category Collection
                </Link>
                <ChevronRight size={14} className="text-gray-500" />
                <span className="font-medium text-gray-500 text-[14px]">
                    Product name
                </span>
                </div>
                {/* <Heading
                    level={1}
                    text={meta.label}
                    className="font-serif mt-6 font-serif text-[18px] font-semibold leading-none tracking-tight text-maroon"
                    decorator="none"
                />
                {meta.description && (
                    <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/65">
                    {meta.description}
                    </p>
                )} */}
            </div>
            </div>
        </section>
        {/* ══ MAIN PRODUCT SECTION ══ */}
        <section className="w-full py-10 md:py-14">
            <div className="mx-auto max-w-7xl px-4 md:px-2 lg:px-1">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_450px] gap-6 sm:gap-8 lg:gap-10">
                {/* ── LEFT: Gallery — sticky on desktop, in-flow on mobile ── */}
                <div className="lg:sticky lg:top-20 self-start" ref={galleryRef}>
                    <div className="flex gap-2 sm:gap-3">
                        <div className="hidden md:flex flex-col items-center gap-1.5 shrink-0 w-15 sm:w-17.5 lg:w-19.5]">
                            <button
                                type="button"
                                onClick={goToPrevThumb}
                                aria-label="Previous thumbnail"
                                className="w-full h-6 rounded-md border border-gray-200 bg-white text-gray-500 hover:text-pink hover:border-pink flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer">
                                <ChevronUp size={14} />
                            </button>
                            <div ref={thumbRailRef} className="thumb-rail flex flex-col gap-2 sm:gap-2.5 w-full max-h-120 sm:max-h-140 lg:max-h-90 overflow-y-auto overscroll-contain" style={{ scrollbarWidth: "none" }} data-lenis-prevent>
                                {PRODUCT.images.map((img, i) => (
                                <button
                                key={i}
                                type="button"
                                onClick={() => selectThumb(i)}
                                className={`relative w-full rounded-md cursor-pointer overflow-hidden border-2 transition-all duration-200 shrink-0 bg-gray-50 ${activeThumb === i ? "border-maroon" : "border-gray-200 hover:border-gray-300"}`}
                                style={{ aspectRatio: "4/5" }}
                                >                                
                                <Image
                                    src={img}
                                    alt={`${PRODUCT.title} thumbnail ${i + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="78px"
                                    onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    }}
                                />
                                </button>
                                ))}
                            </div>
                            <button type="button" onClick={goToNextThumb}
                            aria-label="Next thumbnail" className="w-full h-6 rounded-md border border-gray-200 bg-white text-gray-500 hover:text-pink hover:border-pink flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer">
                                <ChevronDown size={14} />
                            </button>
                        </div>  
                        {/* Large image section */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1 min-w-0">
                            {displayedMain.map((img, i) => {
                            const realIndex = (activeThumb + i) % PRODUCT.images.length;
                            return (
                            <button key={`${activeThumb}-${i}`} type="button" onClick={() => openZoom(realIndex)} className="group relative block w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-100 cursor-zoom-in"
                            style={{ aspectRatio: "4/5" }}>
                                <Image
                                    src={img}
                                    alt={`${PRODUCT.title} view ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                    sizes="(max-width:640px) 50vw, (max-width:1024px) 35vw, 30vw"
                                    priority={i === 0}
                                    onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    }}
                                />
                                {i === 0 && PRODUCT.discount > 0 && (
                                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 font-sans text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wide bg-maroon text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                                    {PRODUCT.discount}% OFF
                                    </span>
                                )}
                                {/* Zoom icon */}
                                <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-600 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                                    <ZoomIn size={13} className="sm:hidden" />
                                    <ZoomIn size={15} className="hidden sm:block" />
                                </span>
                            </button>
                            );
                            })}
                        </div>                        
                    </div>
                    {/* Mobile/tablet thumbnail strip — horizontal scroll, below images.
                    Same 4:5 portrait aspect + object-contain as the main images,
                    so nothing gets cropped and proportions match across the page.
                    Left/right arrows here move `activeThumb` the same way as the
                    desktop up/down arrows do, so the main images update too. */}
                    <div className="flex md:hidden items-center gap-1.5 mt-2.5 sm:mt-3">
                        <button
                            type="button"
                            onClick={goToPrevThumb}
                            aria-label="Previous thumbnail"
                            className="shrink-0 w-7 h-7 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-pink hover:border-pink flex items-center justify-center transition-colors duration-200"
                        >
                        <ChevronUp size={14} className="-rotate-90" />
                        </button>
                        <div ref={mobileThumbRailRef} className="thumb-strip flex gap-2 overflow-x-auto -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
                            {PRODUCT.images.map((img, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => selectThumb(i)}
                                className={`relative shrink-0 w-14 sm:w-16 rounded-md overflow-hidden border-2 bg-gray-50 ${activeThumb === i ? "border-maroon" : "border-gray-200"}`}
                                style={{ aspectRatio: "4/5" }}
                            >
                                <Image
                                src={img}
                                alt=""
                                fill
                                className="object-contain p-1"
                                sizes="64px"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                                />
                            </button>
                            ))}
                        </div>

                        <button type="button" onClick={goToNextThumb} aria-label="Next thumbnail"
                            className="shrink-0 w-7 h-7 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-pink hover:border-pink flex items-center justify-center transition-colors duration-200">
                            <ChevronUp size={14} className="rotate-90" />
                        </button>
                    </div>
                    {/* Mobile/tablet wishlist/share row */}
                    <div className="flex lg:hidden items-center gap-2 mt-2.5 sm:mt-3">
                        <button onClick={() => setWished((v) => !v)} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm border transition-all duration-200 ${wished ? "bg-pink border-pink text-white" : "bg-white border-gray-200 text-gray-400"}`}>
                        <Heart
                        size={14}
                        className="sm:hidden"
                        fill={wished ? "currentColor" : "none"}
                        />
                        <Heart
                        size={15}
                        className="hidden sm:block"
                        fill={wished ? "currentColor" : "none"}
                        />
                        </button>
                        <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm">
                            <Share2 size={13} className="sm:hidden" />
                            <Share2 size={14} className="hidden sm:block" />
                        </button>
                    </div>
                </div>
                {/* ── RIGHT: Product info ── */}
                <div>
                    {/* Brand + category */}
                    <p className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-pink mb-1.5 sm:mb-2">
                    {PRODUCT.brand} · {PRODUCT.category}
                    </p>

                    {/* Title */}
                    <h1 className="font-serif text-[18px] sm:text-[20px] md:text-[24px] font-bold text-gray-900 leading-snug mb-2.5 sm:mb-3">
                    {PRODUCT.title}
                    </h1>

                    {/* Rating row */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 flex-wrap">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                            key={s}
                            size={13}
                            className={`sm:hidden ${s <= Math.round(PRODUCT.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                        />
                        ))}
                        {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                            key={`d-${s}`}
                            size={15}
                            className={`hidden sm:block ${s <= Math.round(PRODUCT.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                        />
                        ))}
                    </div>
                    <span className="font-sans text-[12px] sm:text-[13px] font-semibold text-gray-700">
                        {PRODUCT.rating}
                    </span>
                    <span className="font-sans text-[12px] sm:text-[13px] text-gray-400">
                        ({PRODUCT.reviewCount} reviews)
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span
                        className={`font-sans text-[11.5px] sm:text-[12.5px] font-semibold ${PRODUCT.inStock ? "text-emerald-600" : "text-red-500"}`}
                    >
                        {PRODUCT.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 sm:gap-3 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-gray-100 flex-wrap">
                    <span className="font-serif text-[24px] sm:text-[28px] font-bold text-gray-900">
                        ₹{PRODUCT.price.toLocaleString("en-IN")}
                    </span>
                    {PRODUCT.mrp && (
                        <span className="font-sans text-[13px] sm:text-[15px] text-gray-400 line-through">
                        ₹{PRODUCT.mrp.toLocaleString("en-IN")}
                        </span>
                    )}
                    {PRODUCT.discount > 0 && (
                        <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold text-pink bg-pink/8 px-2 sm:px-2.5 py-1 rounded-full">
                        Save {PRODUCT.discount}%
                        </span>
                    )}
                    </div>

                    {/* Color selector */}
                    <div className="mb-5 sm:mb-6">
                    <p className="font-sans text-[12px] sm:text-[12.5px] font-semibold text-gray-700 mb-2.5 sm:mb-3">
                        Color:{" "}
                        <span className="font-normal text-gray-500">
                        {PRODUCT.colors[selectedColor].name}
                        </span>
                    </p>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        {PRODUCT.colors.map((c, i) => (
                        <button
                            key={c.name}
                            onClick={() => setSelectedColor(i)}
                            aria-label={c.name}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200
                            ${selectedColor === i ? "border-pink scale-110" : "border-gray-200 hover:border-gray-300"}`}
                        >
                            <span
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/10"
                            style={{ background: c.hex }}
                            />
                        </button>
                        ))}
                    </div>
                    </div>

                    {/* Size selector */}
                    <div className="mb-6 sm:mb-7">
                    <p className="font-sans text-[12px] sm:text-[12.5px] font-semibold text-gray-700 mb-2.5 sm:mb-3">
                        Size (cm):{" "}
                        <span className="font-normal text-gray-500">
                        {PRODUCT.sizes[selectedSize]}
                        </span>
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                        {PRODUCT.sizes.map((s, i) => (
                        <button
                            key={s}
                            onClick={() => setSelectedSize(i)}
                            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border-2 font-sans text-[11.5px] sm:text-[12.5px] font-semibold transition-all duration-200
                            ${selectedSize === i ? "border-pink bg-pink/8 text-pink" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                        >
                            {s}
                        </button>
                        ))}
                    </div>
                    </div>

                    {/* Quantity + Add to cart — stacks on very small screens */}
                    <div className="flex flex-col xs:flex-row sm:flex-row items-stretch gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shrink-0 w-fit sm:w-auto">
                        <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-10 h-11 sm:w-11 sm:h-12 flex items-center justify-center text-gray-500 hover:text-pink hover:bg-gray-50 transition-colors"
                        >
                        <Minus size={14} />
                        </button>
                        <span className="w-10 sm:w-12 text-center font-sans text-[14px] sm:text-[15px] font-bold text-gray-800">
                        {qty}
                        </span>
                        <button
                        onClick={() => setQty((q) => q + 1)}
                        className="w-10 h-11 sm:w-11 sm:h-12 flex items-center justify-center text-gray-500 hover:text-pink hover:bg-gray-50 transition-colors"
                        >
                        <Plus size={14} />
                        </button>
                    </div>

                    <button
                        className="flex-1 flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-white py-3 sm:py-0 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                        style={{
                        background: "linear-gradient(135deg,#8b1a34,#e91e8c)",
                        }}
                    >
                        <ShoppingBag size={15} className="sm:hidden" />
                        <ShoppingBag size={17} className="hidden sm:block" />
                        Add to Cart
                    </button>
                    </div>

                    {/* Buy now */}
                    <button className="w-full rounded-xl border-2 border-gray-900 text-gray-900 font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] py-3 sm:py-3.5 mb-6 sm:mb-7 hover:bg-gray-900 hover:text-white transition-all duration-200">
                    Buy Now
                    </button>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-7">
                    {[
                        { Icon: Truck, label: "Free Shipping", sub: "On bulk orders" },
                        { Icon: RotateCcw, label: "Easy Returns", sub: "7-day window" },
                        {
                        Icon: ShieldCheck,
                        label: "Quality Assured",
                        sub: "ISO certified",
                        },
                    ].map(({ Icon, label, sub }) => (
                        <div
                        key={label}
                        className="flex flex-col items-center text-center gap-1 sm:gap-1.5 p-2 sm:p-3 rounded-xl bg-gray-50 border border-gray-100"
                        >
                        <Icon size={16} className="sm:hidden text-pink" />
                        <Icon size={18} className="hidden sm:block text-pink" />
                        <p className="font-sans text-[9px] sm:text-[10.5px] font-bold text-gray-700 leading-tight">
                            {label}
                        </p>
                        <p className="font-sans text-[8px] sm:text-[9.5px] text-gray-400 leading-tight">
                            {sub}
                        </p>
                        </div>
                    ))}
                    </div>

                    {/* SKU + slug */}
                    <p className="font-sans text-[10.5px] sm:text-[11.5px] text-gray-400 flex flex-wrap gap-x-3 gap-y-1">
                    <span>
                        SKU:{" "}
                        <span className="text-gray-600 font-medium">{PRODUCT.sku}</span>
                    </span>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span>
                        Slug:{" "}
                        <span className="text-gray-600 font-medium break-all">
                        {slug}
                        </span>
                    </span>
                    </p>
                </div>
                </div>
            </div>
        </section>

      {/* ══ TABS — Description / Specs / Reviews (desktop) ══ */}
      <section className="mx-auto max-w-7xl px-3 sm:px-4 md:px-8 lg:px-12 pb-8 sm:pb-10 md:pb-16">
        {/* Desktop tabs */}
        <div className="hidden md:block">
          <div className="flex gap-6 lg:gap-8 border-b border-gray-200 mb-6 lg:mb-7 overflow-x-auto">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 font-sans text-[12.5px] lg:text-[13.5px] font-bold uppercase tracking-[0.08em] lg:tracking-[0.1em] transition-colors duration-200 whitespace-nowrap
                  ${activeTab === tab ? "text-maroon" : "text-gray-400 hover:text-gray-600"}`}
              >
                {tab === "description"
                  ? "Description"
                  : tab === "specs"
                    ? "Specifications"
                    : `Reviews (${PRODUCT.reviewCount})`}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink rounded-full" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-3xl">
              <p className="font-sans text-[13.5px] lg:text-[14.5px] text-gray-600 leading-[1.85] lg:leading-[1.9] mb-5 lg:mb-6">
                {PRODUCT.description}
              </p>
              <ul className="space-y-2.5 lg:space-y-3">
                {PRODUCT.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 lg:gap-3 font-sans text-[12.5px] lg:text-[13.5px] text-gray-600"
                  >
                    <Check size={15} className="text-pink shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl rounded-xl border border-gray-100 overflow-hidden">
              {PRODUCT.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between px-4 lg:px-5 py-3 lg:py-3.5 ${i % 2 === 0 ? "bg-gray-50/60" : "bg-white"}`}
                >
                  <span className="font-sans text-[12.5px] lg:text-[13px] text-gray-500">
                    {s.label}
                  </span>
                  <span className="font-sans text-[12.5px] lg:text-[13px] font-semibold text-gray-800">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl space-y-4 lg:space-y-5">
              {REVIEWS.map((r) => (
                <div
                  key={r.id}
                  className="border border-gray-100 rounded-xl p-4 lg:p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-sans text-[12.5px] lg:text-[13.5px] font-bold text-gray-800">
                      {r.name}
                    </p>
                    <span className="font-sans text-[10.5px] lg:text-[11.5px] text-gray-400">
                      {r.date}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mb-2 lg:mb-2.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className={
                          s <= r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="font-sans text-[12.5px] lg:text-[13.5px] text-gray-600 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile/tablet accordions */}
        <div className="md:hidden space-y-2.5 sm:space-y-3">
          {[
            { id: "description", label: "Description" },
            { id: "specs", label: "Specifications" },
            { id: "reviews", label: `Reviews (${PRODUCT.reviewCount})` },
          ].map(({ id, label }) => (
            <div
              key={id}
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedAccordion((v) => (v === id ? null : id))
                }
                className="w-full flex items-center justify-between px-3.5 sm:px-4 py-3.5 sm:py-4 bg-gray-50/60"
              >
                <span className="font-sans text-[12.5px] sm:text-[13px] font-bold text-gray-800">
                  {label}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-gray-400 transition-transform duration-200 ${expandedAccordion === id ? "rotate-180" : ""}`}
                />
              </button>

              {expandedAccordion === id && (
                <div className="px-3.5 sm:px-4 py-3.5 sm:py-4">
                  {id === "description" && (
                    <>
                      <p className="font-sans text-[12.5px] sm:text-[13.5px] text-gray-600 leading-relaxed mb-3.5 sm:mb-4">
                        {PRODUCT.description}
                      </p>
                      <ul className="space-y-2 sm:space-y-2.5">
                        {PRODUCT.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 sm:gap-2.5 font-sans text-[11.5px] sm:text-[12.5px] text-gray-600"
                          >
                            <Check
                              size={13}
                              className="text-pink shrink-0 mt-0.5"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {id === "specs" && (
                    <div className="space-y-0.5">
                      {PRODUCT.specs.map((s, i) => (
                        <div
                          key={s.label}
                          className={`flex items-center justify-between gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg ${i % 2 === 0 ? "bg-gray-50" : ""}`}
                        >
                          <span className="font-sans text-[11px] sm:text-[12px] text-gray-500">
                            {s.label}
                          </span>
                          <span className="font-sans text-[11px] sm:text-[12px] font-semibold text-gray-800 text-right">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {id === "reviews" && (
                    <div className="space-y-3.5 sm:space-y-4">
                      {REVIEWS.map((r) => (
                        <div
                          key={r.id}
                          className="border-b border-gray-100 last:border-0 pb-3.5 sm:pb-4 last:pb-0"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="font-sans text-[11.5px] sm:text-[12.5px] font-bold text-gray-800">
                              {r.name}
                            </p>
                            <span className="font-sans text-[10px] sm:text-[10.5px] text-gray-400">
                              {r.date}
                            </span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={11}
                                className={
                                  s <= r.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-200"
                                }
                              />
                            ))}
                          </div>
                          <p className="font-sans text-[11.5px] sm:text-[12.5px] text-gray-600 leading-relaxed">
                            {r.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ RELATED PRODUCTS ══ */}
      <section className="bg-gray-50/60 py-8 sm:py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-8 lg:px-12">
          <h2 className="font-serif text-[18px] sm:text-[20px] md:text-[24px] font-bold text-gray-900 mb-5 sm:mb-6 md:mb-8">
            You May Also{" "}
            <span className="italic font-light text-pink">Like</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {RELATED.map((item) => (
              <Link
                key={item.id}
                href="#"
                className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-pink/30 hover:shadow-md transition-all duration-300"
              >
                <div
                  className="relative bg-gray-100"
                  style={{ aspectRatio: "1/1" }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 50vw, 25vw"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="px-2.5 sm:px-3 py-2.5 sm:py-3">
                  <p className="font-sans text-[11.5px] sm:text-[12.5px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-1 sm:mb-1.5 group-hover:text-pink transition-colors">
                    {item.name}
                  </p>
                  <p className="font-sans text-[12.5px] sm:text-[13.5px] font-bold text-gray-900">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
