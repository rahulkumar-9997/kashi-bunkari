"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Heading from "../Heading/Heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { CollectionItem } from "@/types/collection";

type Props = { data: CollectionItem[] };

export default function Collections({ data }: Props) {
  const carouselRef = useRef(null);
  const plugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true }),
  );

  if (!data || data.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-2 lg:px-1">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
          <div>
            <Heading
              level={2}
              text="Shop by <span style='background: linear-gradient(135deg, #ec4899, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Collections</span>"
              allowHTML
              className="text-maroon"
              decorator="underline-pink"
              decoratorClassName="w-20"
            />
            <p className="font-sans text-[16px] text-gray-400 mt-3 tracking-wide">
              Shop by Collection find exactly what you need
            </p>
          </div>

          {/* <Link
            href="/shop/collections"
            className="hidden md:inline-flex items-center gap-2.5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-gray-500 hover:text-pink transition-colors duration-200 group shrink-0 pb-1"
          >
            View All
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-maroon-200 group-hover:border-pink group-hover:bg-pink group-hover:text-magenta transition-all duration-200">
              <ChevronRight size={13} />
            </span>
          </Link> */}
        </div>

        <div className="relative">
          <Carousel
            ref={carouselRef}
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true, slidesToScroll: 1 }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-5">
              {data.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-3 md:pl-5 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <Link href={`/shop/${item.slug}`} className="cat-card block group outline-none">
                    <div className="cat-shell relative rounded-2xl overflow-hidden bg-[#f4f1ee] border border-slate-100">
                      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
                        <div className="cat-img-wrap absolute inset-0">
                          <Image
                            src={item.product?.image ?? "/images/placeholder.webp"}
                            alt={item.title}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,20vw"
                          />
                        </div>
                        <div className="cat-overlay-dark absolute inset-0 pointer-events-none" />
                        <span className="cat-corner absolute top-3.5 right-3.5 inline-flex items-center gap-1 font-sans text-[12px] font-semibold tracking-wider text-white bg-amber-950 px-2.5 py-1 rounded-full shadow-md">
                          Shop Now
                        </span>
                        <div className="cat-bottom-content absolute bottom-0 left-0 right-0 px-4 pb-5">
                          <p className="font-serif text-[18px] md:text-[18px] font-semibold text-white leading-tight drop-shadow mb-2.5">
                            {item.title}
                          </p>
                          <div className="w-8 h-px bg-white/40 mb-3" />
                          <div className="flex items-center justify-between">
                            <span className="font-sans text-[15px] text-white/70">
                              Explore
                            </span>
                            <span className="cat-arrow inline-flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-lg shrink-0">
                              <ChevronRight size={13} className="text-pink" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="cat-footer bg-white px-4 py-3 flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-[16px] font-semibold text-gray-800 group-hover:text-pink transition-colors duration-200 truncate">
                            {item.title}
                          </p>
                          <div className="mt-1.5 h-0.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="cat-bar h-full rounded-full"
                              style={{ background: "linear-gradient(90deg,#ec4899,#f9a8d4)" }}
                            />
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-gray-800 group-hover:text-pink transition-colors duration-200 shrink-0"
                        />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="absolute -left-4 md:-left-6 top-[42%] -translate-y-1/2 z-20
              w-10 h-10 rounded-full text-white shadow-lg
              hover:scale-105 transition-all duration-200 cursor-pointer"
              style={{
                background: "linear-gradient(135deg,#ec4899,#f472b6)",
                border: "none",
              }}
            />
            <CarouselNext
              className="absolute -right-4 md:-right-6 top-[42%] -translate-y-1/2 z-20
              w-10 h-10 rounded-full text-white shadow-lg
              hover:scale-105 transition-all duration-200 cursor-pointer"
              style={{
                background: "linear-gradient(135deg,#ec4899,#f472b6)",
                border: "none",
              }}
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}