"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles, ArrowUpRight } from "lucide-react";
import Heading from "./Heading/Heading";
const occasion = [
  {
    id: 1,
    name: "Wedding",
    image: "/images/image2.webp",
    c1: "#2a0a12",
    c2: "#8b1a34",
    c3: "#e05c7a",
    count: "250+",
    tall: true,
  },
  {
    id: 2,
    name: "Festival",
    image: "/images/image1.webp",
    c1: "#1a1200",
    c2: "#9a6e00",
    c3: "#f0b429",
    count: "180+",
  },
  {
    id: 3,
    name: "Party",
    image: "/images/image3.webp",
    c1: "#050d1a",
    c2: "#0d2a5c",
    c3: "#3a7fd6",
    count: "95+",
  },
  {
    id: 4,
    name: "Office",
    image: "/images/image4.webp",
    c1: "#05140a",
    c2: "#1a4a2e",
    c3: "#3a9a64",
    count: "130+",
  },
  {
    id: 5,
    name: "Casual",
    image: "/images/image5.webp",
    c1: "#160812",
    c2: "#5c1a3a",
    c3: "#c04a7a",
    count: "210+",
  },
  {
    id: 6,
    name: "Designer Kurtis",
    image: "/images/image6.webp",
    c1: "#0e0818",
    c2: "#3a1a5c",
    c3: "#8a4ab8",
    count: "160+",
  },
];

export default function OccasionSection() {
  return (
    <section className="w-full lg:px-12 md:px-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gray-10 pointer-events-none" />
        <div className="absolute inset-0 -z-10 pointer-events-none"style={{
          backgroundImage:
            "linear-gradient(rgba(194,24,91,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(194,24,91,.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}/>
      <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-10 sm:py-10 py-8 flex flex-col lg:gap-14 md:gap-12 gap-10">        
        <div className="relative w-full max-w-7xl mx-auto px-2 lg:px-2 sm:px-2 md:px-1">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 md:mb-8">
            <div className="space-y-1.5 md:space-y-2">
              <Heading
                level={2}
                text="Shop By <span style='background: linear-gradient(135deg, #ec4899, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Occasion</span>"
                allowHTML
                className="text-maroon"
                decorator="underline-pink"
                decoratorClassName="w-20"
              />

              <p className="font-sans text-[16px] text-gray-400 mt-3 tracking-wid">
                Find the perfect outfit for every moment
              </p>
            </div>
          </div>
          {/* ══ MOBILE GRID — 2 cols, no row-span ══ */}
          <div className="grid grid-cols-2 gap-2.5 md:hidden">
            {occasion.map((item) => (
              <Link
                key={item.id}
                href="#"
                className="group relative overflow-hidden rounded-xl cursor-pointer block outline-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] hover:z-10"
              >
                {/* Fixed height on mobile */}
                <div
                  className="relative w-full overflow-hidden rounded-xl"
                  style={{ height: 160 }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="50vw"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />                  
                  <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #fff 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  />

                  {/* Bottom gradient */}
                  <div
                    className="absolute bottom-0 left-0 right-0 z-20"
                    style={{
                      height: "65%",
                      background: `linear-gradient(to top, ${item.c1}f5 0%, ${item.c1}aa 45%, transparent 100%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-3.5 px-2 text-center">
                    <p className="font-serif text-white text-[18px] lg:text-[16px] font-semibold leading-tight mb-1.5 drop-shadow-md">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-sans text-[12px] text-white">
                        Shop
                      </span>
                      <span className="h-px bg-white/40 w-3 transition-[width] duration-300 group-hover:w-5" />
                      <ChevronRight size={9} className="text-white/60" />
                    </div>
                  </div>
                 
                </div>
              </Link>
            ))}
          </div>
          {/* ══ DESKTOP GRID — 3 cols, tall card spans 2 rows ══ */}
          <div className="hidden md:grid grid-cols-3 gap-3 md:gap-4 grid-rows-[repeat(2,minmax(180px,220px))]">
            {occasion.map((item) => (
              <Link
                key={item.id}
                href="#"
                className={[
                  "group relative overflow-hidden rounded-2xl cursor-pointer block outline-none",
                  "transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:-translate-y-1 hover:scale-[1.012]  hover:z-10",
                  item.tall ? "row-span-2" : "",
                ].join(" ")}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    sizes="35vw"
                    priority={item.tall}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                
                <div className="absolute inset-0 rounded-2xl z-10 bg-black opacity-20 transition-opacity duration-400 group-hover:opacity-40" />
                <div className="absolute top-3.5 right-3.5 z-30 opacity-0 translate-x-1 -translate-y-1 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg">
                    <ArrowUpRight size={13} className="text-white" />
                  </div>
                </div>
                {/* Bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 rounded-b-2xl"
                  style={{
                    height: item.tall ? "45%" : "70%",
                    background: `linear-gradient(to top, ${item.c1}fa 0%, ${item.c1}cc 20%, transparent 100%)`,
                  }}
                />
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-5 px-3 text-center">
                  <div className="absolute top-4 left-4 z-30">
                    <div className="rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-2 py-1">
                      <span className="text-[11px] font-medium text-white">
                        {item.count} Collections
                      </span>
                    </div>
                  </div>

                  <p className="font-serif text-2xl text-white font-semibold leading-tight mb-2.5 drop-shadow-md">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-sans text-[12px] text-white">
                      Shop Now
                    </span>
                    <span className="h-px bg-white w-4 transition-[width] duration-300 group-hover:w-7" />
                    <ChevronRight size={11} className="text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
