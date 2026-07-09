"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useBanners } from "@/hooks/useBanners";
import HeroSliderSkeleton from "./HeroSliderSkeleton";

export default function HeroSlider() {
  const { data: banners = [], isLoading, isError, error } = useBanners();
  const carouselRef = useRef(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  if (isLoading) return <HeroSliderSkeleton />;
  if (isError || banners.length === 0) {
    if (isError) console.error("HeroSlider:", error);
    return null;
  }
  console.log(banners);

  return (
    <section className="w-full relative">
      <Carousel
        ref={carouselRef}
        setApi={setApi}
        className="w-full"
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
        opts={{ align: "start", loop: banners.length > 1, slidesToScroll: 1 }}
      >
        <CarouselContent className="ml-0">
          {banners.map((banner, idx) => {
            const href = banner.buy_now_link || banner.collection_link;
            const slideImages = (
              <div className="relative w-full overflow-hidden">
                {banner.image_path_mobile && (
                  <div className="md:hidden w-full">
                    <Image
                      src={banner.image_path_mobile}
                      alt={banner.title}
                      width={750}
                      height={1100}
                      className="w-full h-auto object-contain"
                      priority={idx === 0}
                      sizes="100vw"
                    />
                  </div>
                )}
                {banner.image_path_desktop && (
                  <div className="hidden md:block w-full">
                    <Image
                      src={banner.image_path_desktop}
                      alt={banner.title}
                      width={1920}
                      height={800}
                      className="w-full h-auto object-contain"
                      priority={idx === 0}
                      sizes="100vw"
                    />
                  </div>
                )}
                <div className="absolute bottom-6 right-6 z-30 hidden md:flex items-baseline gap-1.5">
                  <span className="font-serif text-[32px] font-bold leading-none text-white/20">
                    0{idx + 1}
                  </span>
                  <span className="font-sans text-[10px] text-white/25 uppercase tracking-widest">
                    / 0{banners.length}
                  </span>
                </div>
              </div>
            );
            return (
              <CarouselItem key={banner.id} className="pl-0">
                {href ? (
                  <Link href={href} className="block">
                    {slideImages}
                  </Link>
                ) : (
                  slideImages
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {banners.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full border-none transition-all duration-300 cursor-pointer"
                style={{
                  background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
                  width: i === current ? 18 : 7,
                  height: 7,
                }}
              />
            ))}
          </div>
        )}

        {banners.length > 1 && (
          <>
            <CarouselPrevious
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white text-black border-none h-12 w-12 rounded-full shadow-lg z-10 hidden md:flex cursor-pointer"
              size="icon"
            >
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white text-black border-none h-12 w-12 rounded-full shadow-lg z-10 hidden md:flex cursor-pointer"
              size="icon"
            >
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </>
        )}
      </Carousel>
    </section>
  );
}
