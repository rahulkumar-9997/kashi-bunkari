"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Eye, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Heading from "../Heading/Heading";
import type { ProductItem } from "@/types/product";
import { useQuickView } from "@/context/QuickViewContext";
type Props = { data: ProductItem[] };

function getPricing(product: ProductItem) {
  const hasDiscount =
    product.mrp != null && product.offer_rate != null && product.offer_rate > 0;
  const price = hasDiscount
    ? Math.round(product.mrp! - (product.mrp! * product.offer_rate!) / 100)
    : product.mrp;
  return {
    price,
    mrp: hasDiscount ? product.mrp : null,
    discount: hasDiscount ? product.offer_rate : null,
  };
}

export default function Popular({ data }: Props) {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );
  const { open } = useQuickView();
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full lg:px-12 md:px-10 px-4">
      <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
        <div className="flex items-end justify-between mb-7 md:mb-8">
          <div>
            <Heading
              level={2}
              text="Popular <span style='background: linear-gradient(135deg, #ec4899, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Products</span>"
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
            href="/shop/popular-products"
            className="group hidden md:inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 font-sans text-[11.5px] font-bold uppercase tracking-[0.18em] text-gray-600 transition-all duration-300 hover:border-pink/30 hover:text-pink hover:shadow-[0_4px_20px_rgba(233,30,140,0.12)]"
          >
            <span className="relative">
              View All
              <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#8b0b13,#e91e8c)] transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(139,11,19,0.08),rgba(233,30,140,0.1))] transition-all duration-300 group-hover:bg-pink">
              <ArrowRight
                size={12}
                className="text-pink transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </span>
          </Link>
        </div>

        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true, slidesToScroll: 1 }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {data.map((product) => {
                const { price, mrp, discount } = getPricing(product);
                return (
                  <CarouselItem
                    key={product.id}
                    className="pl-3 md:pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4"
                  >
                    <Link
                      href={`/product/${product.slug}/${product.attribute_value}`}
                      className="prod-card group block outline-none select-none w-full border border-gray-200 rounded-xl bg-white transition-all duration-300 ease-in-out hover:border-maroon/30 cursor-pointer hover:shadow-md overflow-hidden"
                    >
                      <div
                        className="prod-shell relative overflow-hidden rounded-t-xl bg-gray-100"
                        style={{ aspectRatio: "3/4" }}
                      >
                        <div className="prod-img absolute inset-0">
                          {product.image ? (
                            <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                            No Image
                            </div>
                        )}
                        </div>
                        {/*
                        {discount != null && (
                          <span className="absolute top-2.5 right-2.5 z-20 font-sans text-[10px] font-bold text-white bg-green-600 px-2 py-1 rounded-sm leading-none shadow-sm">
                            {discount}% OFF
                          </span>
                        )}    
                        */}

                        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              open(product.slug, product.attribute_value);
                            }}
                            className="inline-flex items-center gap-1.5 font-sans text-[9.5px] font-bold uppercase tracking-[0.18em] text-white bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full cursor-pointer hover:bg-black/75 transition-colors"
                          >
                            <Eye size={11} />
                            Quick View
                          </button>
                        </div>

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                      </div>

                      <div className="px-3 py-3">
                        <span className="text-[11px] px-1.5 py-0.5 border border-maroon/30 bg-maroon/20 rounded-full w-max text-primary-500 inline-block text-maroon mb-2">
                          {product.category.title}
                        </span>
                        <p className="font-sans text-[14px] md:text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-1 mb-2.5">
                          {product.title}
                        </p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          {price != null ? (
                            <span className="prod-price font-sans text-[14px] font-bold text-gray-900">
                              ₹{price.toLocaleString("en-IN")}
                            </span>
                          ) : (
                            <span className="font-sans text-[12.5px] font-medium text-gray-400">
                              Price on request
                            </span>
                          )}
                          {/*
                          {mrp != null && (
                            <span className="font-sans text-[11.5px] text-gray-400 line-through">
                              ₹{mrp.toLocaleString("en-IN")}
                            </span>
                          )}
                          {discount != null && (
                            <span className="font-sans text-[10.5px] font-bold text-pink">
                              {discount}% off
                            </span>
                          )}
                          */}
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious
              className="absolute -left-4 md:-left-5 top-[38%] -translate-y-1/2 z-20
                w-10 h-10 rounded-full
                bg-white border border-gray-200 text-gray-500 shadow-md
                hover:bg-gray-50 hover:border-maroon/30 hover:text-maroon
                transition-all duration-200 cursor-pointer"
            />
            <CarouselNext
              className="absolute -right-4 md:-right-5 top-[38%] -translate-y-1/2 z-20
                w-10 h-10 rounded-full
                bg-white border border-gray-200 text-gray-500 shadow-md
                hover:bg-gray-50 hover:border-maroon/30 hover:text-maroon
                transition-all duration-200 cursor-pointer"
            />
          </Carousel>
        </div>

        <div className="md:hidden mt-8 flex items-center justify-center gap-3">
          <span className="h-px flex-1 max-w-14 bg-gray-100 rounded-full" />
          <Link
            href="/shop/popular-products"
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
