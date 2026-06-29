"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Star,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const REVIEWS = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "New Delhi",
    avatar: "PS",
    avatarBg: "linear-gradient(135deg,#8b1a34,#c9396a)",
    rating: 5,
    product: "Banarasi Katan Silk Saree",
    review:
      "Absolutely stunning saree! The quality is exceptional and the zari work is just breathtaking. I wore it at my sister's wedding and received so many compliments.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 2,
    name: "Anjali Mehta",
    location: "Mumbai",
    avatar: "AM",
    avatarBg: "linear-gradient(135deg,#1a4a2e,#3a9a64)",
    rating: 5,
    product: "Chinon Silk Party Wear",
    review:
      "The fabric is so soft and the embroidery is done with such precision. Packaging was also very premium. Kasibunkari has become my go-to for ethnic wear.",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 3,
    name: "Sunita Agarwal",
    location: "Varanasi",
    avatar: "SA",
    avatarBg: "linear-gradient(135deg,#3a1a5c,#8a4ab8)",
    rating: 5,
    product: "Bridal Velvet Lehenga",
    review:
      "I ordered the bridal lehenga for my wedding and it exceeded all my expectations. The deep rose color is exactly as shown, and the stitching quality is outstanding.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: 4,
    name: "Kavitha Nair",
    location: "Bangalore",
    avatar: "KN",
    avatarBg: "linear-gradient(135deg,#0d2a5c,#3a7fd6)",
    rating: 5,
    product: "Kanjivaram Silk Saree",
    review:
      "Pure Kanjivaram at this price is a steal. The weight and feel of the silk is authentic. I'm from South India so I know my Kanjivaram — genuinely excellent quality.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 5,
    name: "Ritu Khanna",
    location: "Jaipur",
    avatar: "RK",
    avatarBg: "linear-gradient(135deg,#5c1a00,#c04a7a)",
    rating: 5,
    product: "Georgette Festive Saree",
    review:
      "Ordered for Diwali and it arrived beautifully packed. The georgette is really good quality — not too heavy, drapes perfectly. Colour is vibrant and true to photos.",
    date: "5 days ago",
    verified: true,
  },
  {
    id: 6,
    name: "Deepa Verma",
    location: "Lucknow",
    avatar: "DV",
    avatarBg: "linear-gradient(135deg,#1a3a0a,#4a9a2a)",
    rating: 5,
    product: "Tissue Silk Saree",
    review:
      "Being from Lucknow, I'm very particular about fabric quality. Kasibunkari never disappoints. The tissue silk has that characteristic shimmer and flawless weaving.",
    date: "2 months ago",
    verified: true,
  },
];

export default function CustomerReviews() {
  const carouselRef = useRef(null);
  const plugin = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true,
    }),
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="w-full overflow-hidden bg-white">
      <div
        className="w-full py-14 md:py-15 px-4 md:px-8 lg:px-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2d0a14 0%, #5c1a2e 45%, #8b1a34 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.2]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-14"
          style={{
            background: "radial-gradient(circle, #e91e8c, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 rounded-full bg-pink-300/50" />
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.35em] text-pink-300">
                Customer Testimonials
              </span>
            </div>
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-bold text-white leading-[1.08] tracking-tight mb-4">
              Loved by{" "}
              <span className="italic font-light text-pink-200">Thousands</span>{" "}
              Customers
              <br />
              Across India
            </h2>
            <p className="font-sans text-[16px] text-white mt-3 tracking-wid">
              Real stories from women who found their dream outfit with us
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0 rounded-2xl px-7 py-6 border border-white/10 backdrop-blur-sm bg-white/15">
            <div className="text-center">
              <p className="font-serif text-[58px] font-bold text-white leading-none">
                4.9
              </p>
              <div className="flex gap-1 mt-2 justify-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="font-sans text-[9px] text-white mt-1.5 uppercase tracking-widest">
                out of 5
              </p>
            </div>
            <div className="w-px h-16 bg-white/15" />
            <div className="flex flex-col gap-2.5">
              {[
                { star: 5, pct: "88%" },
                { star: 4, pct: "9%" },
                { star: 3, pct: "3%" },
              ].map(({ star, pct }) => (
                <div key={star} className="flex items-center gap-2.5">
                  <span className="font-sans text-[10px] font-medium text-white w-3">
                    {star}
                  </span>
                  <div
                    className="w-24 h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: pct,
                        background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
                      }}
                    />
                  </div>
                  <span className="font-sans text-[9px] text-white">{pct}</span>
                </div>
              ))}
              <p className="font-sans text-[9px] text-white uppercase tracking-wider mt-1">
                Based on 500+ reviews
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#fdfcfb] py-12 md:py-16 px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative">
            <Carousel
              ref={carouselRef}
              setApi={setApi}
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
                dragFree: true,
                duration: 35,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3 md:-ml-5">
                {REVIEWS.map((review, idx) => (
                  <CarouselItem
                    key={review.id}
                    className="pl-3 md:pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className={
                        idx % 3 === 1 ? "mt-6" : idx % 3 === 2 ? "mt-3" : ""
                      }
                    >
                      <div className="group relative  bg-white rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(139,26,52,0.10)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        <div className="p-6 relative">
                          <div className="absolute top-4 right-4 opacity-[0.05] group-hover:opacity-[0.10] group-hover:-rotate-6 group-hover:scale-110 transition-all duration-400 pointer-events-none">
                            <Quote
                              size={56}
                              style={{ color: "#8b1a34", fill: "#8b1a34" }}
                            />
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={13}
                                  className="fill-amber-400 text-amber-400"
                                />
                              ))}
                            </div>
                            <span className="font-sans text-[12px] text-gray-400">
                              {review.date}
                            </span>
                          </div>
                          <p className="font-serif text-[16px] text-gray-700 leading-[1.8] mb-5 italic relative z-10">
                            "{review.review}"
                          </p>
                          <span
                            className="inline-flex items-center gap-1.5 font-sans text-[8.5px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full mb-5"
                            style={{
                              color: "#8b1a34",
                              background: "rgba(139,26,52,0.06)",
                              border: "1px solid rgba(139,26,52,0.14)",
                            }}
                          >
                            <span
                              className="w-1 h-1 rounded-full animate-pulse"
                              style={{ background: "#e91e8c" }}
                            />
                            {review.product}
                          </span>
                          <div className="relative flex items-center mb-5">
                            <div className="flex-1 h-px bg-gray-100" />
                            <div className="w-1.5 h-1.5 rotate-45 bg-gray-200 mx-3 shrink-0" />
                            <div className="flex-1 h-px bg-gray-100" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative shrink-0">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center font-sans text-[12px] font-bold text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                                  style={{ background: review.avatarBg }}
                                >
                                  {review.avatar}
                                </div>
                              </div>
                              <div>
                                <p className="font-sans text-[14px] font-semibold text-gray-800 leading-tight">
                                  {review.name}
                                </p>
                                <p className="font-sans text-[12px] text-gray-400 mt-0.5">
                                  {review.location}
                                </p>
                              </div>
                            </div>
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 font-sans text-[8px] font-bold uppercase tracking-wide text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                                <BadgeCheck size={9} />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 shadow-md flex items-center justify-center transition-all duration-200 hover:border-pink hover:text-pink hover:shadow-lg cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 shadow-md flex items-center justify-center transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={17} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className="rounded-full border-none transition-all duration-300"
                style={{
                  width: i === current ? 20 : 7,
                  height: 7,
                  background: i === current ? "#8b1a34" : "#e5e7eb",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
