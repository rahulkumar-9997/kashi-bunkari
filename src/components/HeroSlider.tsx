"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
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

const SLIDES = [
  {
    id: 1,
    tag: "New Season · 2025",
    line1: "Woven in",
    line2: "Tradition",
    para: "Discover our exclusive Banarasi silk sarees — each thread telling a story of centuries-old craftsmanship from the heart of Varanasi.",
    cta: "Shop Sarees",
    ctaHref: "/sarees",
    secondaryCta: "View Lookbook",
    secondaryHref: "/lookbook",
    badge: "GI Certified",
    bg: "from-[#1a0a00] via-[#3d1a00] to-[#5c2800]",
    accent: "#e8a020",
    accentLight: "#fcd34d",
    caption: "Katan Kadwa · Pure Silk · Handwoven",
    imgDesktop: "/images/slides/slide1.webp", // 16:9 landscape
    imgMobile: "/images/slides/slide1.webp", // 9:16 portrait
  },
  {
    id: 2,
    tag: "Bridal Edit · 2025",
    line1: "Dream",
    line2: "Bridal Lehengas",
    para: "Crafted for the most important day of your life — our bridal lehengas blend royal Mughal embroidery with contemporary silhouettes.",
    cta: "Shop Lehengas",
    ctaHref: "/lehengas",
    secondaryCta: "Book Consultation",
    secondaryHref: "/contact",
    badge: "Bestseller",
    bg: "from-[#0d0018] via-[#2d0050] to-[#4a007a]",
    accent: "#c084fc",
    accentLight: "#e9d5ff",
    caption: "Velvet Lehenga · Zardosi Work · Custom Fit",
    imgDesktop: "/images/slides/slide2.webp",
    imgMobile: "/images/slides/slide2.webp",
  },
];

function SlideBg({ gradient, accent }: { gradient: string; accent: string }) {
  return (
    <div className={`absolute inset-0 bg-linear-to-br ${gradient}`}>
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`weave-${accent.replace("#", "")}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill={accent} rx="0.5" />
            <rect x="10" y="10" width="4" height="4" fill={accent} rx="0.5" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#weave-${accent.replace("#", "")})`}
        />
      </svg>
    </div>
  );
}

export default function HeroSlider() {
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

  return (
    <section className="w-full relative">
      <Carousel
        ref={carouselRef}
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="ml-0">
          {SLIDES.map((s, idx) => (
            <CarouselItem key={s.id} className="pl-0">
              <div className="relative w-full overflow-hidden min-h-[520px] h-[90vh] max-h-[750px]">
                <SlideBg gradient={s.bg} accent={s.accent} />
                {s.imgMobile && (
                  <div className="absolute inset-0 md:hidden">
                    <Image
                      src={s.imgMobile}
                      alt={`${s.line1} ${s.line2}`}
                      fill
                      className="w-full"
                      priority={idx === 0}
                      sizes="100vw"
                    />
                  </div>
                )}
                {s.imgDesktop && (
                  <div className="absolute inset-0 hidden md:block">
                    <Image
                      src={s.imgDesktop}
                      alt={`${s.line1} ${s.line2}`}
                      fill
                      className="w-full"
                      priority={idx === 0}
                      sizes="100vw"
                    />
                  </div>
                )}
                {/* ── MOBILE overlay — strong bottom-up gradient ── */}
                <div
                  className="absolute inset-0 z-10 md:hidden"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.05) 100%)",
                  }}
                />
                {/* ── DESKTOP overlay — left-to-right gradient ── */}
                {/* <div
                    className="absolute inset-0 z-10 hidden md:block"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.60) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.05) 100%)",
                    }}
                  /> */}
                {/* <div className="absolute inset-0 z-20 flex items-end md:items-center">
                    <div className="w-full mx-auto max-w-7xl px-1 pb-14 sm:pb-16 md:pr-10 md:pl-3 md:pb-0 lg:pr-10 lg:pl-4 flex justify-center md:justify-end">
                      <div className="w-full md:w-auto md:max-w-150 text-center  bg-maroon/80 rounded-2xl p-3">                        
                        <h1
                          className="font-serif text-white leading-[1.06] mb-2.5 md:mb-4"
                          style={{ fontSize: "clamp(28px, 6vw, 72px)" }}
                        >
                          {s.line1}
                          <br />
                          <span className="italic font-light" style={{ color: s.accentLight }}>
                            {s.line2}
                          </span>
                        </h1>
                        <p className="hidden sm:block font-sans text-white text-[18px] md:text-[13.5px] leading-[1.8] mb-5 md:mb-7 max-w-95 mx-auto md:ml-auto md:mr-0">
                          {s.para}
                        </p>
                        <div className="flex items-center justify-center md:justify-end gap-2 flex-wrap">
                          <Link
                            href={s.ctaHref}
                            className="inline-flex items-center gap-1.5 font-sans text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase px-5 py-2.5 md:px-7 md:py-3.5 rounded-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                            style={{ background: s.accent, color: "#fff" }}
                          >
                            {s.cta}
                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                          <Link
                            href={s.secondaryHref}
                            className="inline-flex items-center gap-1.5 font-sans text-[11px] md:text-[12px] font-medium tracking-[0.08em] uppercase px-4 py-2.5 md:px-6 md:py-3.5 rounded-sm border transition-all duration-200 hover:bg-white/10"
                            style={{
                              borderColor: "rgba(255,255,255,0.30)",
                              color: "rgba(255,255,255,0.80)",
                            }}
                          >
                            {s.secondaryCta}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div> */}
                {/* Slide counter — desktop only */}
                <div className="absolute bottom-6 right-6 z-30 hidden md:flex items-baseline gap-1.5">
                  <span
                    className="font-serif text-[32px] font-bold leading-none"
                    style={{ color: `${s.accentLight}35` }}
                  >
                    0{s.id}
                  </span>
                  <span className="font-sans text-[10px] text-white/25 uppercase tracking-widest">
                    / 0{SLIDES.length}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ── Dots ── */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full border-none transition-all duration-300"
              style={{
                background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
                width: i === current ? 18 : 7,
                height: 7,
              }}
            />
          ))}
        </div>

        <CarouselPrevious
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white text-black border-none h-12 w-12 rounded-full shadow-lg z-10 hidden md:flex"
          size="icon"
        >
          <ChevronLeft className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white text-black border-none h-12 w-12 rounded-full shadow-lg z-10 hidden md:flex"
          size="icon"
        >
          <ChevronRight className="h-6 w-6" />
        </CarouselNext>
      </Carousel>
    </section>
  );
}
