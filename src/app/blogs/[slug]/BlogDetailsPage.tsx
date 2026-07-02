"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Link2,
  Check,
} from "lucide-react";
import Heading from "@/components/Heading/Heading";
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
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title, href: `/blogs/${blog.slug}` },
        ]}
      />
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
          <div
            className="relative w-full rounded overflow-hidden bg-gray-20 mt-5"
            style={{ aspectRatio: "16/10" }}
          >
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
            <div
              className="body-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            {/* Share */}
            <div className="flex items-center gap-3 mt-6">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gray-400">
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
          </div>
        </div>
      </section>
      {/* ══ RELATED BLOGS SECTION ══ */}
      {relatedBlogs.length > 0 && (
        <section className="w-full relative overflow-hidden bg-linear-to-br from-[#FAFAF8] via-white to-[#F3F4F6] lg:px-12 md:px-10 px-4">
          <div aria-hidden="true" className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.12)_0%,transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,248,220,0.18)_0%,transparent_40%),radial-gradient(circle_at_50%_100%,rgba(193,154,107,0.10)_0%,transparent_45%)]">
          </div>
          <div className="mx-auto max-w-6xl lg:py-10 md:py-10 sm:py-10 py-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 md:mb-8">
                <div className="space-y-1.5 md:space-y-2">
                  <Heading
                    level={3}
                    text="You Might Also Like"
                    allowHTML
                    className="font-serif text-[24px] lg:text-[30px] font-bold leading-[1.05] text-maroon max-w-3xl"
                    decorator="underline-pink"
                    decoratorClassName="w-20"
                  />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10">
              {relatedBlogs.map((p) => (
                <Link key={p.id} href={`/blogs/${p.slug}`} className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E4D9C4] hover:border-[#AD8A3B]/50 hover:shadow-[0_12px_32px_-16px_rgba(107,22,38,0.35)] transition-all duration-300 hover:-translate-y-1">
                  {/* Left accent bar */}
                  <span aria-hidden className="absolute left-0 top-0 bottom-0 w-0.75 bg-linear-to-b from-[#AD8A3B] to-[#e91e8c] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 z-10"/>
                  <div className="relative w-full overflow-hidden bg-[#F6F1E8]" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 100vw, 33vw"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />                    
                  </div>
                  <div className="flex flex-1 flex-col px-4 sm:px-5 py-4 sm:py-5">
                    <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">
                      {p.date}
                      <span className="mx-1.5 text-[#AD8A3B]">·</span>
                      <span className="text-[#AD8A3B]">{p.category}</span>
                    </p>
                    <Heading
                        level={4}
                        text={p.title}
                        allowHTML
                        className="font-serif lg:text-[22px] text-[20px] font-bold leading-snug text-maroon mb-2.5 group-hover:text-[#8b1a34] transition-colors line-clamp-2"
                        decorator="none"
                        decoratorClassName=""
                      />
                    <p className="font-sans text-[16px] text-gray-600 leading-relaxed line-clamp-2 mb-4">
                      Discover the rich heritage and timeless elegance of our collection...
                    </p>
                    <div className="mt-auto pt-2">
                      <div className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#F6F1E8] px-4 py-3 font-sans text-[13px] font-semibold text-maroon transition-all duration-300 group-hover:bg-maroon group-hover:text-white">
                          <span className="relative z-10">Read More</span>
                          <ArrowRight
                          size={14}
                          className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                          />
                          <span className="absolute inset-0 bg-linear-to-r from-[#AD8A3B] to-[#e91e8c] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div> 
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
