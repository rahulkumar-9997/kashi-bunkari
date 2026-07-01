"use client";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import {
  ChevronRight,
  ArrowRight,
  Clock,
  BookOpen,
} from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "How to Choose the Perfect Gold Ring",
    slug: "choose-perfect-gold-ring",
    excerpt:
      "Discover the essential tips for selecting a gold ring that matches your style and budget. From purity to design, we cover everything you need to know.",
    image: "/images/products/1.webp",
    category: "Jewelry Guide",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Diamond Buying Guide for Beginners",
    slug: "diamond-buying-guide",
    excerpt:
      "Everything you need to know about the 4Cs before buying a diamond. Learn how to make an informed decision and get the best value.",
    image: "/images/products/2.webp",
    category: "Diamond",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Latest Bridal Jewellery Trends",
    slug: "bridal-jewellery-trends",
    excerpt:
      "Explore the latest bridal jewellery trends that are dominating this wedding season. From statement necklaces to delicate pieces.",
    image: "/images/products/3.webp",
    category: "Bridal",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Caring for Your Silver Jewellery",
    slug: "caring-for-silver-jewellery",
    excerpt:
      "Essential tips to keep your silver jewellery shining for years. Learn proper storage, cleaning, and maintenance techniques.",
    image: "/images/products/4.webp",
    category: "Jewelry Guide",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "The Art of Kundan Meenakari",
    slug: "art-of-kundan-meenakari",
    excerpt:
      "Discover the rich heritage of Kundan Meenakari jewellery. Learn about its history, craftsmanship, and modern interpretations.",
    image: "/images/products/5.webp",
    category: "Craftsmanship",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "The Art of Kundan Meenakari",
    slug: "art-of-kundan-meenakari",
    excerpt:
      "Discover the rich heritage of Kundan Meenakari jewellery. Learn about its history, craftsmanship, and modern interpretations.",
    image: "/images/products/5.webp",
    category: "Craftsmanship",
    readTime: "8 min read",
  },
];

export default function BlogListPage() {
  const wideCard = blogs[0];
  const restCards = blogs.filter((b) => b.id !== wideCard.id);
  return (
    <div className="w-full min-h-screen">
        {/* ══ BREADCRUMB ══ */}
        <section className="breadcrumb">
            <div className="relative overflow-hidden bg-gray-50 py-2 md:py-3">
            <div
                className="absolute inset-0"
                style={{
                backgroundImage:
                    "repeating-linear-gradient(30deg, transparent, transparent 38px, rgba(244, 114, 182, 0.05) 38px, rgba(244, 114, 182, 0.05) 40px)",
                }}
            />
            <div className="relative mx-auto max-w-7xl px-2 md:px-8 lg:px-1">
                <div className="flex flex-wrap items-center gap-2 text-[12px]">
                <Link
                    className="text-gray-500 text-[14px] transition hover:text-maroon"
                    href="/"
                >
                    Home
                </Link>
                <ChevronRight size={14} className="text-gray-500" />
                <span className="font-medium text-maroon text-[14px]">Blog</span>
                </div>
            </div>
            </div>
        </section>
        {/* ══ HEADER ══ */}
        <section className="relative overflow-hidden ">
        <div aria-hidden className="absolute inset-0 z-0 opacity-100 bg-[radial-gradient(circle_at_15%_20%,rgba(236,72,153,0.18)_0%,transparent_35%),radial-gradient(circle_at_85%_15%,rgba(255,193,7,0.18)_0%,transparent_35%),radial-gradient(circle_at_50%_100%,rgba(139,26,52,0.12)_0%,transparent_45%)]"/>
        <div className="relative w-full max-w-7xl mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                    <Heading
                        level={1}
                        text="Saree Guides, Fashion Trends & Styling Inspiration"
                        allowHTML
                        className="font-serif text-[32px] lg:text-[42px] font-bold leading-[1.05] text-maroon max-w-3xl"
                        decorator="underline-pink"
                        decoratorClassName="w-20"
                    />
                    <p className="mt-4 font-sans text-[16px] text-gray-600 max-w-xl leading-relaxed">
                        Discover expert saree styling tips, the latest fashion trends, fabric guides, and draping ideas to help you choose the perfect saree for every occasion.
                    </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 bg-white/80 px-5 py-2.5 rounded-full border border-[#E4D9C4] backdrop-blur-sm shrink-0 shadow-sm">
                    <BookOpen size={16} className="text-[#AD8A3B]" />
                    <span className="font-semibold text-maroon">{blogs.length}</span>
                    <span>articles</span>
                </div>
            </div>
        </div>
        </section>
        {/* ══ ARTICLE GRID ══ */}
        <section className="w-full lg:px-12 md:px-10 px-4 relative overflow-hidden">
            <div className="w-full max-w-6xl relative mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {wideCard && (
                        <Link href={`/blogs/${wideCard.slug}`} className="group relative flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-[#E4D9C4] hover:border-[#AD8A3B]/50 hover:shadow-[0_12px_32px_-16px_rgba(107,22,38,0.35)] transition-all duration-300 hover:-translate-y-1 sm:col-span-2">
                            <span aria-hidden className="absolute left-0 top-0 bottom-0 w-0.75 bg-linear-to-b from-[#AD8A3B] to-[#e91e8c] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 z-10"/>
                            <div className="relative w-full sm:w-2/4 shrink-0 overflow-hidden bg-gray-100"
                                style={{ aspectRatio: "4/3" }}>
                                <Image
                                src={wideCard.image}
                                alt={wideCard.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                sizes="(max-width:640px) 100vw, 40vw"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}/>
                            </div>
                            <div className="flex flex-1 flex-col justify-center px-5 sm:px-4 py-4 sm:py-4">
                                <div className="mb-2.5 flex items-center gap-2">                        
                                    <span className="font-sans text-[14px] text-gray-400 flex items-center gap-1">
                                        <Clock size={11} />
                                        {wideCard.readTime}
                                    </span>
                                </div>
                                <Heading
                                    level={2}
                                    text= {wideCard.title}
                                    allowHTML
                                    className="font-serif lg:text-[22px] text-[20px] font-bold leading-snug text-maroon mb-2.5 group-hover:text-[#8b1a34] transition-colors"
                                    decorator="none"
                                    decoratorClassName=""
                                />
                                <p className="font-sans text-[16px] text-gray-600 leading-relaxed line-clamp-2 mb-4">
                                {wideCard.excerpt}
                                </p>
                                <span className="inline-flex items-center gap-1.5 font-sans text-[11.5px] font-bold uppercase tracking-[0.08em] text-maroon w-fit">
                                Read more
                                <ArrowRight
                                    size={13}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                                </span>
                            </div>
                        </Link>
                    )}
                    {restCards.map((post) => (
                        <Link key={post.id} href={`/blogs/${post.slug}`} className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E4D9C4] hover:border-[#AD8A3B]/50 hover:shadow-[0_12px_32px_-16px_rgba(107,22,38,0.35)] transition-all duration-300 hover:-translate-y-1">
                            <span aria-hidden className="absolute left-0 top-0 bottom-0 w-[3px] bg-linear-to-b from-[#AD8A3B] to-[#e91e8c] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 z-10"/>
                            <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: "4/3" }}>
                                <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="absolute bottom-3 right-3 font-sans text-[14px] font-medium text-white/90 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                                <Clock size={10} />
                                {post.readTime}
                                </span>
                                    
                            </div>
                            <div className="flex flex-1 flex-col px-4 sm:px-5 py-4 sm:py-5">
                                <Heading
                                    level={3}
                                    text={post.title}
                                    allowHTML
                                    className="font-serif lg:text-[22px] text-[20px] font-bold leading-snug text-maroon mb-2.5 group-hover:text-[#8b1a34] transition-colors"
                                    decorator="none"
                                    decoratorClassName=""
                                />
                                <p className="font-sans text-[16px] text-gray-600 leading-relaxed line-clamp-2 mb-4">
                                {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#E4D9C4]">
                                    <span className="font-sans text-[14px] text-gray-400">
                                        Read More
                                    </span>
                                    <div className="w-7 h-7 rounded-full bg-[#AD8A3B]/10 flex items-center justify-center group-hover:bg-[#AD8A3B] transition-colors duration-300">
                                        <ArrowRight
                                        size={13}
                                        className="text-[#AD8A3B] group-hover:text-white transition-colors duration-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
}
