"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Heading from "@/components/Heading/Heading";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import {
  ChevronUp,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ChevronDown,
  Check,
  ZoomIn,
  X,
  Copy,
  Eye,
  ImageOff,
} from "lucide-react";
import type { ProductDetailData } from "@/types/product";

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
);
const PinterestIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2.01.04-2.88.19-.79 1.23-5.02 1.23-5.02s-.31-.63-.31-1.55c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.57 2.25-.87 3.5-.25 1.05.52 1.9 1.55 1.9 1.86 0 3.29-1.96 3.29-4.79 0-2.5-1.8-4.26-4.36-4.26-2.97 0-4.71 2.23-4.71 4.53 0 .9.34 1.86.78 2.38.09.1.1.19.07.3-.08.31-.25 1-.28 1.14-.04.19-.15.23-.34.14-1.27-.59-2.06-2.44-2.06-3.93 0-3.2 2.32-6.14 6.7-6.14 3.52 0 6.25 2.51 6.25 5.86 0 3.5-2.2 6.31-5.27 6.31-1.03 0-2-.54-2.33-1.17l-.63 2.42c-.23.88-.85 1.98-1.26 2.65.95.29 1.96.45 3.01.45 5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
  </svg>
);
const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-7.6 8.68L23.3 22h-7.02l-5.5-7.19L4.4 22H1.3l8.13-9.29L1 2h7.2l4.97 6.57L18.9 2Zm-1.23 18.06h1.73L6.42 3.85H4.56l13.11 16.21Z" />
  </svg>
);
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.29 4.83L2.05 22l5.4-1.42a9.87 9.87 0 0 0 4.59 1.17h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.15-.2-1.18-1.56-1.18-2.98 0-1.41.74-2.11 1-2.4.27-.29.58-.36.77-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.91-1.13.19-.29.39-.24.65-.15.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.13.07.72-.17 1.41Z" />
  </svg>
);

const SHIPPING_INFO = [
  "We ship worldwide.",
  "We deliver within 4-6 working days if the product is in stock.",
  "In case of on-order pieces, delivery timeline will vary as per designers.",
  "No Return & Refund, Only Exchange. (Conditions apply)",
];

const CARE_GUIDE = [
  "Dry clean recommended.",
  "Do not use any kind of bleach or stain removing chemicals.",
  "Do not over expose damp fabric to strong sunlight.",
  "Iron at moderate temperature.",
];

type Props = { product: ProductDetailData };
function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
export default function ProductDetailsPage({ product: data }: Props) {
  const product = data.product_details;
  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("description");
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [showShipping, setShowShipping] = useState(false);
  const [showCare, setShowCare] = useState(false);

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

  useEffect(() => {
    if (typeof window !== "undefined") setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    document.body.style.overflow = shareOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [shareOpen]);
  useEffect(() => {
    setActiveThumb(0);
  }, [product?.id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareTargets = product
    ? [
        { name: "Facebook", icon: FacebookIcon, bg: "#1877F2", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
        { name: "Pinterest", icon: PinterestIcon, bg: "#E60023", href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&description=${encodeURIComponent(product.title)}` },
        { name: "Twitter", icon: TwitterIcon, bg: "#000000", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(product.title)}` },
        { name: "WhatsApp", icon: WhatsAppIcon, bg: "#25D366", href: `https://wa.me/?text=${encodeURIComponent(product.title + " " + pageUrl)}` },
      ]
    : [];

  const images = product.image_larges.length > 0 ? product.image_larges.map((i) => i.image_large) : [];
  const thumbs = product.image_thumbs.length > 0 ? product.image_thumbs.map((i) => i.image_thumb) : images;

  const displayedMain =
    images.length >= 2
      ? [images[activeThumb], images[(activeThumb + 1) % images.length]]
      : images;

  const selectThumb = (index: number) => {
    setActiveThumb(index);
    (thumbRailRef.current?.children[index] as HTMLElement | undefined)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
    (mobileThumbRailRef.current?.children[index] as HTMLElement | undefined)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  const goToPrevThumb = () => images.length && selectThumb((activeThumb - 1 + images.length) % images.length);
  const goToNextThumb = () => images.length && selectThumb((activeThumb + 1) % images.length);

  const openZoom = (startIndex: number) => {
    if (!fancyboxRef.current || images.length === 0) return;
    const items = images.map((src) => ({ src, caption: product.title }));
    fancyboxRef.current.show(items, {
      startIndex,
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
          right: ["slideshow", "download", "thumbs", "close"],
        },
      },
      Images: { zoom: true, zoomOpacity: "auto", click: "close", wheel: "slide" },
    });
  };

  const price = product.offer_rate ?? product.mrp;
  const hasDiscount = product.offer_rate != null && product.mrp != null && product.mrp > product.offer_rate;
  const discountPct = hasDiscount ? Math.round((1 - product.offer_rate! / product.mrp!) * 100) : null;
  const inStock = product.stock_quantity == null || product.stock_quantity > 0;
  const specRows = product.attributes
    .filter((attr) => attr.values.length > 0)
    .map((attr) => ({
      label: attr.attribute.title,
      value: attr.values.map((v) => v.attribute_value.name).join(", "),
    }));

  return (
    <div className="w-full min-h-screen bg-white">
      <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        {
          label: product.category.title,
          href: `/shop/${product.category.slug}`,
        },
        ...(data.attribute && data.attributes_value_name
        ? [
            {
              label: data.attributes_value_name.title,
              href: `/shop/${data.product_details.category.slug}/${data.attribute.slug}/${data.attributes_value_name.slug}`,
            },
          ]
        : []),
        { label: product.title },
      ]}
    />

      <section className="w-full py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-2 lg:px-1">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_450px] gap-6 sm:gap-8 lg:gap-5 xl:gap-5">
            <div className="lg:sticky lg:top-20 self-start">
              <div className="flex gap-2 sm:gap-3">
                {thumbs.length > 1 && (
                  <div className="hidden md:flex flex-col items-center gap-1.5 shrink-0 w-15 sm:w-17.5 lg:w-19.5">
                    <button
                      type="button"
                      onClick={goToPrevThumb}
                      aria-label="Previous thumbnail"
                      className="w-full h-6 rounded-md border border-gray-200 bg-white text-gray-500 hover:text-pink hover:border-pink flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <div
                      ref={thumbRailRef}
                      className="thumb-rail flex flex-col gap-2 sm:gap-2.5 w-full max-h-120 sm:max-h-140 lg:max-h-90 overflow-y-auto overscroll-contain"
                      style={{ scrollbarWidth: "none" }}
                      data-lenis-prevent
                    >
                      {thumbs.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => selectThumb(i)}
                          className={`relative w-full rounded-md cursor-pointer overflow-hidden border-2 transition-all duration-200 shrink-0 bg-gray-50 ${activeThumb === i ? "border-maroon" : "border-gray-200 hover:border-gray-300"}`}
                          style={{ aspectRatio: "4/5" }}
                        >
                          <Image
                            src={img}
                            alt={`${product.title} thumbnail ${i + 1}`}
                            fill
                            className="object-contain"
                            sizes="100px"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={goToNextThumb}
                      aria-label="Next thumbnail"
                      className="w-full h-6 rounded-md border border-gray-200 bg-white text-gray-500 hover:text-pink hover:border-pink flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1 min-w-0">
                  {displayedMain.length > 0 ? (
                    displayedMain.map((img, i) => {
                      const realIndex = (activeThumb + i) % images.length;
                      return (
                        <button
                          key={`${activeThumb}-${i}`}
                          type="button"
                          onClick={() => openZoom(realIndex)}
                          className="group relative block w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-100 cursor-zoom-in"
                          style={{ aspectRatio: "4/5" }}>
                          <Image
                            src={img}
                            alt={`${product.title} view ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                            priority={i === 0}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          {i === 0 && discountPct !== null && (
                            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 font-sans text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wide bg-maroon text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                              {discountPct}% OFF
                            </span>
                          )}
                          <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-600 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                            <ZoomIn size={13} className="sm:hidden" />
                            <ZoomIn size={15} className="hidden sm:block" />
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-2 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100" style={{ aspectRatio: "4/5" }}>
                      <ImageOff size={32} className="text-gray-300" />
                    </div>
                  )}
                </div>
              </div>
              {/* For mobile code   */}
              {thumbs.length > 1 && (
                <div className="flex md:hidden items-center gap-1.5 mt-2.5 sm:mt-3">
                  <button
                    type="button"
                    onClick={goToPrevThumb}
                    aria-label="Previous thumbnail"
                    className="shrink-0 w-7 h-7 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-pink hover:border-pink flex items-center justify-center transition-colors duration-200"
                  >
                    <ChevronUp size={14} className="-rotate-90" />
                  </button>
                  <div
                    ref={mobileThumbRailRef}
                    className="thumb-strip flex gap-2 overflow-x-auto -mx-1 px-1"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {thumbs.map((img, i) => (
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
                          // sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={goToNextThumb}
                    aria-label="Next thumbnail"
                    className="shrink-0 w-7 h-7 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-pink hover:border-pink flex items-center justify-center transition-colors duration-200"
                  >
                    <ChevronUp size={14} className="rotate-90" />
                  </button>
                </div>
              )}
              {/* For mobile code   */}
              {/* For mobile code   */}
              <div className="flex lg:hidden items-center gap-2 mt-2.5 sm:mt-3">
                <button
                  onClick={() => setWished((v) => !v)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm border transition-all duration-200 ${wished ? "bg-pink border-pink text-white" : "bg-white border-gray-200 text-gray-400"}`}
                >
                  <Heart size={14} className="sm:hidden" fill={wished ? "currentColor" : "none"} />
                  <Heart size={15} className="hidden sm:block" fill={wished ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => setShareOpen(true)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm cursor-pointer hover:text-pink hover:border-pink transition-colors duration-200"
                >
                  <Share2 size={13} className="sm:hidden" />
                  <Share2 size={14} className="hidden sm:block" />
                </button>
              </div>
              {/* For mobile code   */}
            </div>

            {/* ── RIGHT: Product info ── */}
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <Link
                  href={`/shop/${product.category.slug}`}
                  className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.13em] text-pink"
                >
                  {product.category.title}
                </Link>
                <button
                  onClick={() => setShareOpen(true)}
                  aria-label="Share this product"
                  className="hidden lg:flex w-8 h-8 rounded-full items-center justify-center text-gray-400 hover:text-pink hover:bg-pink/8 transition-colors duration-200 cursor-pointer"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <Heading
                level={1}
                text={product.title}
                className="font-serif text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-snug mb-2.5 sm:mb-3 text-maroon"
                decorator="none"
              />

              {/* Price */}
              <div className="flex items-baseline gap-2 sm:gap-3 mb-3 sm:mb-3 pb-3 sm:pb-4 border-b border-gray-100 flex-wrap">
                {price != null ? (
                  <>
                    <span className="text-[24px] sm:text-[28px] font-bold text-gray-900">
                      {formatPrice(price)}
                    </span>
                    {hasDiscount && (
                      <span className="font-sans text-[13px] sm:text-[15px] text-gray-400 line-through">
                        {formatPrice(product.mrp!)}
                      </span>
                    )}
                    {discountPct !== null && (
                      <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold text-pink bg-pink/8 px-2 sm:px-2.5 py-1 rounded-full">
                        Save {discountPct}%
                      </span>
                    )}
                  </>
                ) : (
                  <span className="font-sans text-[16px] text-gray-500">Price on request</span>
                )}
              </div>

              {/* Attributes / spec rows */}
              {specRows.length > 0 && (
                <div className="mb-6 sm:mb-7 space-y-3 sm:space-y-3.5">
                  {specRows.map((row) => (
                    <div key={row.label} className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-sans text-[16px] font-semibold text-gray-700">
                        {row.label}:
                      </span>
                      <span className="font-sans text-[14px] text-gray-500">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col xs:flex-row sm:flex-row items-stretch gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
                <div className="relative group flex items-center">
                  <button
                    onClick={() => setWished((v) => !v)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center cursor-pointer justify-center shadow-sm border transition-all duration-200 ${wished ? "bg-pink border-pink text-white" : "bg-white border-gray-200 text-gray-400"}`}
                  >
                    <Heart size={14} className="sm:hidden" fill={wished ? "currentColor" : "none"} />
                    <Heart size={15} className="hidden sm:block" fill={wished ? "currentColor" : "none"} />
                  </button>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-[10px] font-medium px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Wishlist
                  </span>
                </div>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shrink-0 w-fit sm:w-auto">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-11 sm:w-11 sm:h-12 flex items-center cursor-pointer justify-center text-gray-500 hover:text-pink hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 sm:w-12 text-center font-sans text-[14px] sm:text-[15px] font-bold text-gray-800">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-11 cursor-pointer sm:w-11 sm:h-12 flex items-center justify-center text-gray-500 hover:text-pink hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  disabled={!inStock}
                  className="flex-1 flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-widest sm:tracking-[0.12em] text-white py-3 sm:py-0 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: "linear-gradient(135deg,#8b1a34,#e91e8c)" }}
                >
                  <ShoppingBag size={15} className="sm:hidden" />
                  <ShoppingBag size={17} className="hidden sm:block" />
                  Add to Cart
                </button>
              </div>

              <button
                disabled={!inStock}
                className="w-full rounded-xl border-2 border-gray-900 text-gray-900 font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-widest sm:tracking-[0.12em] py-3 sm:py-3.5 mb-6 sm:mb-7 hover:bg-gray-900 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>

              {product.sku && (
                <p className="font-sans text-[10.5px] sm:text-[11.5px] text-gray-400 flex flex-wrap gap-x-3 gap-y-1 mb-6 sm:mb-7">
                  <span>
                    SKU: <span className="text-gray-600 font-medium">{product.sku}</span>
                  </span>
                </p>
              )}

              <div className="space-y-2.5 sm:space-y-3">
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowShipping((v) => !v)}
                    className="w-full flex items-center justify-between gap-2 px-2.5 sm:px-2 py-2.5 sm:py-4 bg-gray-50/60 cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 font-sans text-[12.5px] sm:text-[13px] font-bold text-gray-800">
                      <Truck size={16} className="text-pink" />
                      Shipping Information
                    </span>
                    <ChevronDown
                      size={15}
                      className={`text-gray-400 transition-transform duration-200 ${showShipping ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showShipping && (
                    <ul className="px-3.5 sm:px-4 py-3.5 sm:py-2 space-y-2 sm:space-y-2.5">
                      {SHIPPING_INFO.map((line, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-2.5 font-sans text-[14px] text-gray-600 leading-relaxed">
                          <Check size={13} className="text-pink shrink-0 mt-0.5" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowCare((v) => !v)}
                    className="w-full flex items-center justify-between gap-2 px-2.5 sm:px-2 py-2.5 sm:py-4 bg-gray-50/60 cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 font-sans text-[12.5px] sm:text-[13px] font-bold text-gray-800">
                      <RotateCcw size={16} className="text-pink" />
                      Care Guide
                    </span>
                    <ChevronDown
                      size={15}
                      className={`text-gray-400 transition-transform duration-200 ${showCare ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showCare && (
                    <ul className="px-3.5 sm:px-4 py-3.5 sm:py-2 space-y-2 sm:space-y-2.5">
                      {CARE_GUIDE.map((line, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-2.5 font-sans text-[14px] text-gray-600 leading-relaxed">
                          <Check size={13} className="text-pink shrink-0 mt-0.5" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description / Specification */}
      {(product.product_description || product.product_short_description || product.product_specification) && (
        <section className="w-full pt-0 pb-10 md:pb-7">
          <div className="mx-auto max-w-7xl px-4 md:px-2 lg:px-1">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedAccordion((v) => (v === "description" ? null : "description"))}
                  className="w-full flex items-center justify-between px-3.5 sm:px-3 py-3.5 sm:py-3 bg-gray-50/60 cursor-pointer"
                >
                  <span className="font-serif text-[24px] font-bold text-maroon leading-6.5">Description</span>
                  <ChevronDown
                    size={15}
                    className={`text-gray-400 transition-transform duration-200 ${expandedAccordion === "description" ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedAccordion === "description" && (
                  <div className="px-3.5 sm:px-4 pt-2 pb-6 space-y-4">
                    {(product.product_description || product.product_short_description) && (
                      <div
                        className="font-sans text-[14px] text-gray-600 leading-relaxed body-content"
                        dangerouslySetInnerHTML={{
                          __html: product.product_description || product.product_short_description || "",
                        }}
                      />
                    )}
                    {product.product_specification && (
                      <div
                        className="font-sans text-[14px] text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: product.product_specification }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ RELATED PRODUCTS ══ */}
      {data && data.related_products.length > 0 && (
        <section className="bg-linear-to-br from-[#FCFAF7] via-[#F8F4EE] to-[#F3EDE5] shadow-sm w-full pt-10 lg:pb-15 md:pb-7 overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-4 md:px-2 lg:px-1">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 md:mb-8">
              <div className="space-y-1.5 md:space-y-2">
                <Heading
                  level={4}
                  text="You May Also <span class='bg-linear-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent italic font-light'>Like</span>"
                  allowHTML
                  className="text-maroon text-[28px]"
                  decorator="underline-pink"
                  decoratorClassName="w-20"
                />
              </div>
            </div>
 
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {data.related_products.map((item) => {
                const itemPrice = item.offer_rate ?? item.mrp;
                const itemHasDiscount =
                  item.offer_rate != null && item.mrp != null && item.mrp > item.offer_rate;
                const itemDiscountPct = itemHasDiscount
                  ? Math.round((1 - item.offer_rate! / item.mrp!) * 100)
                  : null;
 
                return (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}/${item.attribute_value_slug}`}
                    className="prod-card block outline-none select-none w-full border border-gray-200 rounded-xl bg-white transition-all duration-300 ease-in-out hover:border-maroon/30 cursor-pointer hover:shadow-md overflow-hidden"
                  >
                    <div className="prod-shell relative overflow-hidden rounded-t-xl bg-gray-100" style={{ aspectRatio: "3/4" }}>
                      {item.image ? (
                        <div className="prod-img absolute inset-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            quality={100}
                            className="object-cover object-top"
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff size={20} className="text-gray-300" />
                        </div>
                      )}
                      {itemDiscountPct !== null && (
                        <span className="absolute top-2.5 right-2.5 z-20 font-sans text-[10px] font-bold text-white bg-green-600 px-2 py-1 rounded-sm leading-none shadow-sm">
                          {itemDiscountPct}% OFF
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
                      <span className="text-[11px] px-1.5 py-0.5 border border-maroon/30 bg-maroon/10 rounded-full w-max inline-block text-maroon mb-2">
                        {item.category_title}
                      </span>
                      <p className="font-sans text-[14px] md:text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-2">
                        {item.title}
                      </p>
                      {itemPrice != null ? (
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="font-sans text-[14px] font-bold text-gray-900">
                            {formatPrice(itemPrice)}
                          </span>
                          {itemHasDiscount && (
                            <span className="font-sans text-[11.5px] text-gray-400 line-through">
                              {formatPrice(item.mrp!)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="font-sans text-[11.5px] text-gray-400">Price on request</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
 

      {/* ══ Share Modal ══ */}
      {shareOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Share this product">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShareOpen(false)} />
          <div className="relative w-full max-w-105 bg-white rounded-2xl shadow-2xl p-5 sm:p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-maroon">Share</h3>
              <button
                onClick={() => setShareOpen(false)}
                aria-label="Close share dialog"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <p className="font-sans text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Copy Link</p>
            <div className="flex items-center gap-2 mb-6 sm:mb-7">
              <input
                readOnly
                value={pageUrl}
                className="flex-1 min-w-0 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 font-sans text-[12px] sm:text-[12.5px] text-gray-600 truncate"
              />
              <button
                onClick={handleCopyLink}
                className="shrink-0 flex items-center gap-1.5 rounded-lg border-2 border-pink text-pink font-sans text-[11px] sm:text-[12px] font-bold uppercase tracking-wide px-3 sm:px-4 py-2.5 hover:bg-pink hover:text-maroon transition-colors duration-200 cursor-pointer"
              >
                <Copy size={13} />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="font-sans text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">Share Now</p>
            <div className="flex items-center gap-3 sm:gap-3.5">
              {shareTargets.map((target) => (
                <a
                  key={target.name}
                  href={target.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${target.name}`}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-sm hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
                  style={{ backgroundColor: target.bg }}
                >
                  <target.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}