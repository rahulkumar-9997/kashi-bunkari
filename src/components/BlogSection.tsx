"use client";
import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading/Heading";
import {
  ChevronRight,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  BookOpen,
  Heart,
  Eye,
} from "lucide-react";

const BLOGS = [
  {
    id: 1,
    category: "Style Guide",
    categoryColor: "#8b1a34",
    title: "How to Drape a Banarasi Saree Perfectly for Weddings",
    excerpt:
      "Master the art of draping a Banarasi silk saree with our step-by-step guide. From pleating to pinning — look effortlessly regal on any occasion.",
    image: "/images/products/1.webp",
    author: "Meera Sharma",
    date: "June 20, 2025",
    readTime: "5 min read",
    slug: "/blog/drape-banarasi-saree-weddings",
    featured: true,
  },
  {
    id: 2,
    category: "Fabric Guide",
    categoryColor: "#1a4a2e",
    title: "Katan vs Georgette vs Tissue Silk — Which Saree is Right for You?",
    excerpt:
      "Confused between silk varieties? We break down the differences in texture, weight, and occasion-fit so you can shop with confidence.",
    image: "/images/products/2.webp",
    author: "Sunita Agarwal",
    date: "June 14, 2025",
    readTime: "7 min read",
    slug: "/blog/katan-vs-georgette-vs-tissue",
    featured: false,
  },
  {
    id: 3,
    category: "Festive Edit",
    categoryColor: "#7a5200",
    title: "Top 10 Lehengas for the 2025 Wedding Season",
    excerpt:
      "From bridal reds to pastel duets — our curated edit of the most sought-after lehenga styles this wedding season.",
    image: "/images/products/1.webp",
    author: "Anjali Mehta",
    date: "June 8, 2025",
    readTime: "4 min read",
    slug: "/blog/top-10-lehengas-wedding-season-2025",
    featured: false,
  },
  {
    id: 4,
    category: "Care Tips",
    categoryColor: "#0d2a5c",
    title: "How to Store and Care for Your Silk Sarees at Home",
    excerpt:
      "Silk sarees are investments. Learn the right way to fold, store, and clean your precious Banarasi and Kanjivaram sarees.",
    image: "/images/products/2.webp",
    author: "Meera Sharma",
    date: "May 30, 2025",
    readTime: "6 min read",
    slug: "/blog/care-silk-sarees-home",
    featured: false,
  },
];

export default function BlogSection() {
  const featured = BLOGS.find((b) => b.featured)!;
  const rest = BLOGS.filter((b) => !b.featured);

  return (
    <section className="w-full bg-linear-to-b from-[#faf9f7] via-white to-[#faf9f7] lg:px-12 md:px-10 px-4 overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #fff8f6 0%, #ffffff 40%, #fdf2f8 70%, #fff8f6 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "linear-gradient(rgba(236,72,153,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(30deg, transparent, transparent 38px, rgba(244,114,182,0.05) 38px, rgba(244,114,182,0.05) 40px)",
          }}
        />
        <div
          className="absolute -top-24 -right-20 w-95 h-95 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(251,207,232,0.55) 0%, rgba(253,164,202,0.28) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-28 -left-20 w-85 h-85 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(190,18,60,0.12) 0%, rgba(244,63,94,0.06) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-130 h-75 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(251,207,232,0.18) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute -top-12 -left-12 w-60 h-60 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(236,72,153,0.25) 1.2px, transparent 1.2px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="w-full max-w-7xl mx-auto lg:py-10 md:py-10 sm:py-10 py-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 md:mb-8">
          <div className="relative max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-pink/15 bg-linear-to-r from-pink-50 via-white to-rose-50 px-4 py-2 shadow-sm">
                <BookOpen className="h-4 w-4 text-pink" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-pink">
                  Our Blog
                </span>
              </div>
              <div className="h-px flex-1 bg-linear-to-r from-pink/20 to-transparent" />
            </div>

            {/* Heading */}
            <Heading
              level={2}
              text={`
                Discover
                <span style="
                  background: linear-gradient(135deg, #8b0b13 0%, #e91e8c 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                ">
                  Saree Guides
                </span>
                <br />
                Fashion Tips & Handloom Stories
              `}
              allowHTML
              decorator="underline-pink"
              decoratorClassName="w-24 mt-3"
            />

            {/* Description */}
            <p className="mt-5 max-w-xl font-sans text-[16px] leading-7 text-gray-600">
              Explore expert Banarasi saree styling tips, handloom craftsmanship,
              buying guides, festive fashion inspiration, and traditional weaving
              stories curated by our artisans and textile experts.
            </p>
          </div>

          <Link
            href="/blog"
            className="group hidden md:inline-flex items-center gap-3 font-sans text-[11.5px] font-bold uppercase tracking-[0.18em] text-gray-600 hover:text-pink transition-all duration-300 bg-white px-6 py-3 rounded-full border border-gray-200 hover:border-pink/30 hover:shadow-[0_4px_20px_rgba(233,30,140,0.12)]"
          >
            <span className="relative">
              View All Posts
              <span
                className="absolute -bottom-0.5 left-0 w-full h-[1.5px] rounded-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: "linear-gradient(90deg,#8b0b13,#e91e8c)" }}
              />
            </span>
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 group-hover:bg-pink"
              style={{ background: "linear-gradient(135deg, rgba(139,11,19,0.08), rgba(233,30,140,0.1))" }}
            >
              <ArrowRight
                size={12}
                className="text-pink group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200"
              />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 md:gap-8">
          {/* ── LEFT: Featured Hero Card ── */}
          <Link href={featured.slug} className="group block outline-none">
            <div className="relative overflow-hidden rounded-2xl bg-gray-200 h-105 md:h-130 shadow-lg hover:shadow-2xl transition-all duration-500">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                sizes="(max-width:1024px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(40,40,40,0.90)_0%,rgba(40,40,40,0.40)_40%,rgba(0,0,0,0.10)_100%)]" />
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span
                  className="font-sans text-[8px] font-bold uppercase tracking-[0.22em] text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
                  style={{ background: `${featured.categoryColor}dd` }}
                >
                  {featured.category}
                </span>                
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1.5 font-sans text-[12px] text-white/60 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Clock size={10} />
                    {featured.readTime}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="flex items-center gap-1.5 font-sans text-[12px] text-white/60 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Eye size={10} />
                    2.4K views
                  </span>
                </div>
                <Heading
                    level={3}
                    text={featured.title}
                    className="font-serif text-white leading-[1.2] mb-3 group-hover:text-rose-200 transition-colors duration-300"
                    decorator="none"
                  />
                <p className="font-sans text-[16px] text-white/70 leading-relaxed mb-5 line-clamp-2">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-end">
                  <span className="inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm px-4 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 group-hover:bg-white/30">
                    Read Story
                    <ArrowRight
                      size={11}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.75 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700"
                style={{
                  background:
                    "linear-gradient(90deg, #e9d27d, #e91e8c, #8b0b13)",
                }}
              />
            </div>
          </Link>

          {/* ── RIGHT: Premium List Cards ── */}
          <div className="flex flex-col gap-4">
            {rest.map((blog, idx) => (
              <Link
                key={blog.id}
                href={blog.slug}
                className="group flex gap-4 bg-white rounded-xl border border-gray-100/80 p-2 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-pink/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none"
              >
                {/* Thumbnail with hover effect */}
                <div className="relative overflow-hidden rounded-lg shrink-0 w-27.7 h-27.5 md:w-30 md:h-30 bg-gray-100">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    sizes="120px"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category chip */}
                  <span
                    className="absolute bottom-2 left-2 font-sans text-[8px] font-bold uppercase tracking-[0.22em] text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm z-10"
                    style={{ background: `${blog.categoryColor}cc` }}
                  >
                    {blog.category}
                  </span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <Heading
                    level={4}
                    text={blog.title}
                    className="font-sans  text-gray-900 group-hover:text-[#8b0b13] transition-colors duration-200 leading-snug line-clamp-2 mb-1.5"
                    decorator="none"
                    />
                    <p className="font-sans text-[16px] text-gray-500 leading-relaxed line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      
                      <span className="flex items-center gap-1 font-sans text-[12px]">
                        <Clock size={9} />
                        {blog.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">                      
                      <ChevronRight
                        size={16}
                        className="text-gray-300 group-hover:text-pink group-hover:translate-x-0.5 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <Link
              href="/blog"
              className="group flex items-center justify-center gap-3 bg-white rounded-xl border border-gray-200 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 hover:text-[#8b0b13] hover:border-magenta/40 hover:bg-linear-to-r hover:from-pink-50/50 hover:to-rose-50/50 transition-all duration-300"
            >
              <span>Explore All Articles</span>
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
              
            </Link>
          </div>
        </div>

        <div className="md:hidden mt-10 flex items-center justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-gray-500 hover:text-pink transition-all duration-300 bg-white border border-gray-200 px-6 py-3 rounded-full hover:border-pink/30 hover:shadow-md hover:bg-pink/5"
          >
            View All Posts
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink/10 group-hover:bg-pink transition-all duration-300">
              <ChevronRight
                size={10}
                className="text-pink group-hover:text-white transition-colors"
              />
            </span>
          </Link>
        </div>        
      </div>
    </section>
  );
}
