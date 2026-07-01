// src/app/blog-details/BlogDetailsPage.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Link2,
  Check,
} from "lucide-react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  tags: string[];
  content: string;
};

const blog: Blog = {
  id: 1,
  title: "How to Choose the Perfect Gold Ring",
  slug: "choose-perfect-gold-ring",
  excerpt:
    "Discover the essential tips for selecting a gold ring that matches your style and budget. From purity to design, we cover everything you need to know.",
  image: "/images/products/1.webp",
  category: "Jewelry Guide",
  date: "July 1, 2026",
  tags: ["Gold", "Rings", "Buying Guide"],
  content: `
    <h2>Start with Purity, Not Price</h2>

    <p>
      A gold ring is one of the few pieces of jewellery you'll wear almost every
      day for years, which makes it worth slowing down before you buy.
    </p>

    <p>
      Purity, design, and fit each play an important role in choosing the
      perfect ring.
    </p>

    <blockquote>
      Buy the karat for how you'll wear the ring, not for how it looks on the receipt.
    </blockquote>

    <h3>Why 18K is Better for Daily Wear</h3>

    <ul>
      <li>More durable than 22K gold.</li>
      <li>Ideal for stone settings.</li>
      <li>Less prone to scratches.</li>
    </ul>

    <h3>Things to Check Before Buying</h3>

    <ol>
      <li>Verify the BIS Hallmark.</li>
      <li>Choose the correct ring size.</li>
      <li>Compare making charges.</li>
      <li>Understand the return policy.</li>
    </ol>

    <h4>Ring Size Tips</h4>

    <p>
      Ring size can change slightly throughout the day. Measure your finger in
      the evening for the most accurate fit.
    </p>

    <h5>Maintenance</h5>

    <p>
      Clean your gold ring regularly using mild soap and warm water to maintain
      its shine.
    </p>

    <h6>Final Thoughts</h6>

    <p>
      Choosing the right gold ring is about balancing purity, comfort, style,
      and long-term durability.
    </p>
  `,
};

const relatedBlogs = [
  {
    id: 2,
    title: "Diamond Buying Guide for Beginners",
    slug: "diamond-buying-guide",
    image: "/images/products/2.webp",
    category: "Diamond",
    date: "June 28, 2026",
  },
  {
    id: 3,
    title: "Latest Bridal Jewellery Trends",
    slug: "bridal-jewellery-trends",
    image: "/images/products/3.webp",
    category: "Bridal",
    date: "June 20, 2026",
  },
  {
    id: 4,
    title: "Caring for Your Silver Jewellery",
    slug: "caring-for-silver-jewellery",
    image: "/images/products/4.webp",
    category: "Jewelry Guide",
    date: "June 12, 2026",
  },
];

export default function BlogDetailsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
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
                <Link
                    className="text-gray-500 text-[14px] transition hover:text-maroon"
                    href="/"
                >
                    Blog
                </Link>
                <ChevronRight size={14} className="text-gray-500" />
                <span className="font-medium text-gray-500 text-[14px]">
                    Blog Details
                </span>
                </div>
            </div>
            </div>
        </section>
        {/* ══ BLOG SECTION */}
        <section className="w-full lg:px-12 md:px-10 px-4 relative overflow-hidden">
            <div className="w-full max-w-4xl relative mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
                <div className="text-center">
                    <h1 className="mt-4 font-serif text-[28px] sm:text-[38px] md:text-[44px] font-bold leading-[1.12] text-maroon">
                    {blog.title}
                    </h1>
                    <p className="mt-5 font-sans text-[14.5px] sm:text-[15.5px] text-gray-500 leading-relaxed max-w-xl mx-auto">
                    {blog.excerpt}
                    </p>
                </div>
                <div className="relative w-full rounded overflow-hidden bg-gray-20 mt-5" style={{ aspectRatio: "16/10" }}>
                    <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    priority
                    className="object-contain rounded"
                    sizes="(max-width:1024px) 100vw, 900px"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                    />
                </div>
                {/* Body */}
                <div className="pt-10 sm:pt-12 body-content-container">
                    <div className="body-content"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-9 pt-6 border-t border-[#E4D9C4]">
                    {blog.tags.map((tag) => (
                        <span
                        key={tag}
                        className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.06em] text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full"
                        >
                        {tag}
                        </span>
                    ))}
                    </div>

                    {/* Share */}
                    <div className="flex items-center gap-3 mt-6">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                        Share
                    </span>
                    <button
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1.5 font-sans text-[11.5px] font-semibold text-maroon hover:text-[#8b1a34] transition-colors cursor-pointer"
                    >
                        {copied ? <Check size={13} /> : <Link2 size={13} />}
                        {copied ? "Copied" : "Copy link"}
                    </button>
                    </div>

                    {/* Back link */}
                    <div className="mt-10 sm:mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-maroon border-b-2 border-maroon pb-1 hover:gap-3 transition-all duration-200"
                    >
                        <ArrowLeft size={14} />
                        Back to Journal
                    </Link>
                    </div>
                </div>
            </div>
        </section>
        {/* ══ RELATED BLOGS SECTION ══ */}
        {relatedBlogs.length > 0 && (
            <section className="mx-auto max-w-6xl px-4 md:px-8 mt-16 sm:mt-20 pb-16 sm:pb-24">
            <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#AD8A3B] mb-6 sm:mb-8 text-center">
                You Might Also Like
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10">
                {relatedBlogs.map((p) => (
                <article key={p.id} className="group">
                    <Link href={`/blog/${p.slug}`} className="block">
                    <div
                        className="relative w-full overflow-hidden rounded-md bg-[#F6F1E8]"
                        style={{ aspectRatio: "4/3" }}
                    >
                        <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width:640px) 100vw, 33vw"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                        />
                    </div>
                    </Link>
                    <div className="pt-4">
                    <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                        {p.date}
                        <span className="mx-1.5 text-[#AD8A3B]">·</span>
                        <span className="text-[#AD8A3B]">{p.category}</span>
                    </p>
                    <Link href={`/blog/${p.slug}`}>
                        <h3 className="mt-2 font-serif text-[16px] font-bold leading-snug text-maroon group-hover:text-[#8b1a34] transition-colors line-clamp-2">
                        {p.title}
                        </h3>
                    </Link>
                    <Link
                        href={`/blog/${p.slug}`}
                        className="mt-3 inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-maroon border-b border-maroon/0 group-hover:border-maroon/60 transition-colors duration-200 pb-0.5"
                    >
                        Read More
                        <ArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                    </div>
                </article>
                ))}
            </div>
            </section>
        )}
    </div>
  );
}
