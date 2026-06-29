"use client";
import Link from "next/link";
import Image from "next/image";
import { Star, Shield, Truck, ArrowRight } from "lucide-react";
import Heading from "./Heading/Heading";
const STATS = [
  { number: "50K+", label: "Customers" },
  { number: "200+", label: "Artisans" },
  { number: "10K+", label: "Products" },
];

const FEATURES = [
  {
    Icon: Star,
    title: "Premium Quality",
    desc: "Handpicked fabrics, unmatched craftsmanship.",
    iconCls: "text-amber-500",
    bgCls: "bg-amber-50  border-amber-100",
  },
  {
    Icon: Shield,
    title: "Authentic Banarasi",
    desc: "Genuine handloom direct from Varanasi weavers.",
    iconCls: "text-emerald-500",
    bgCls: "bg-emerald-50 border-emerald-100",
  },
  {
    Icon: Truck,
    title: "Pan-India Delivery",
    desc: "Real-time tracking, secure packaging nationwide.",
    iconCls: "text-indigo-500",
    bgCls: "bg-indigo-50 border-indigo-100",
  },
];

export default function AboutUs() {
  return (
    <section className="w-full bg-[#faf9f7] lg:px-12 md:px-10 px-4 relative overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative hidden lg:block h-100">
            <div className="absolute left-6 top-0 bottom-0 right-24 overflow-hidden rounded-2xl shadow-[0_20px_56px_rgba(45,10,20,0.18)]">
              <Image
                src="/images/image3.webp"
                alt="Kasibunkari artisan"
                fill
                className="object-cover object-top"
                sizes="32vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#2d0a14]/60 via-transparent to-transparent" />
              {/* <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="font-sans text-[8px] font-bold uppercase tracking-[0.28em] text-white/45 mb-0.5">
                  Varanasi, India
                </p>
                <p className="font-serif text-white text-[13px] font-semibold leading-snug">
                  Woven by hand,
                  <br />
                  carried through centuries
                </p>
              </div> */}
            </div>

            {/* Small floating image — top right */}
            <div className="absolute top-4 right-0 w-30 h-37.5 overflow-hidden rounded-xl z-20 border-[3px] border-white shadow-[0_8px_28px_rgba(0,0,0,0.13)]">
              <Image
                src="/images/image2.webp"
                alt="Banarasi silk detail"
                fill
                className="object-cover object-center"
                sizes="120px"
              />
            </div>
            <div className="absolute bottom-4 right-0 bg-white rounded-xl p-3.5 z-20 min-w-35 shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2 bg-linear-to-br from-maroon to-pink">
                <Star size={12} fill="#fff" className="text-white" />
              </div>
              <p className="font-serif text-[20px] font-bold text-gray-900 leading-none">
                4.9
              </p>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={9}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="font-sans text-[11px] text-gray-400 mt-1 leading-tight">
                2,000+ reviews
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="h-0.5 w-6 rounded-full shrink-0 bg-linear-to-r from-maroon to-pink" />
              <span className="font-sans text-[12px] font-bold uppercase tracking-[0.3em] text-maroon">
                Our Story
              </span>
            </div>
            <Heading
                level={2}
                text="Where Tradition Meets <span style='background: linear-gradient(135deg, #8b1a34, #e91e8c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-style: italic; font-weight: 300;'>Elegance</span>"
                allowHTML
                className="text-maroon leading-[1.1] tracking-tight mb-3.5"
                decorator="none"
            />
            <p className="font-sans text-[16px] text-gray-400 mt-3 tracking-wid leading-[1.8] mb-5">
              Master artisans of Varanasi craft each piece with centuries-old
              handloom techniques — tradition and contemporary design, straight
              from loom to you.
            </p>
            <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-200">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-5">
                  <div className="text-center">
                    <p className="font-serif text-[20px] font-bold leading-none text-maroon">
                      {stat.number}
                    </p>
                    <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-gray-400 mt-1">
                      {stat.label}
                    </p>
                  </div>
                  {i < 2 && <span className="w-px h-7 bg-gray-200 shrink-0" />}
                </div>
              ))}
            </div>
            <div className="space-y-3.5 mb-7">
              {FEATURES.map(({ Icon, title, desc, iconCls, bgCls }) => (
                <div key={title} className="flex items-center gap-3 group">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${bgCls}`}
                  >
                    <Icon size={14} className={iconCls} />
                  </div>
                  <div>
                    <div className="font-serif text-[17px] font-semibold text-gray-800 leading-none mb-1">
                      {title}
                    </div>
                    <p className="font-sans text-[14px] text-gray-400 leading-snug">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
           <Link
                href="/about"
                className="group hidden md:inline-flex items-center gap-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white px-6 py-3 rounded-xl bg-linear-to-r from-maroon to-pink hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(233,30,140,0.28)] transition-all duration-200"
                >
                Discover Our Story
                <ArrowRight
                    size={12}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
}
