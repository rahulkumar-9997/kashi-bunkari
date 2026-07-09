"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { ArrowRight, ArrowLeft, Link2, Check, Clock, Eye} from "lucide-react";
import Heading from "@/components/Heading/Heading";
import { useBlogDetail } from "@/hooks/useBlogDetail";
import BlogDetailsPageSkeleton from "./BlogDetailsPageSkeleton";
function cleanExcerpt(raw?: string | null) {
  if (!raw) return "";
  return raw
    .replace(/\r\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const TAG_COLORS = ["#8b1a34", "#1a4a2e", "#7a5200", "#0d2a5c", "#5c1a7a"];
function colorForTag(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++)
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}
function formatViews(count: string) {
  const n = Number(count) || 0;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}
type Props = { slug: string };
export default function BlogDetailsPage({ slug }: Props) {
  const { data, isLoading, isError } = useBlogDetail(slug);
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

  if (isLoading) return <BlogDetailsPageSkeleton />;
  if (isError || !data) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 text-center py-24">
        <h1 className="font-serif text-[24px] font-bold text-maroon mb-2">
          Article not found
        </h1>
        <p className="font-sans text-[13.5px] text-gray-500 mb-6">
          This story may have moved or no longer exists.
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-widest text-maroon border-b-2 border-maroon pb-1"
        >
          <ArrowLeft size={14} />
          Back to Journal
        </Link>
      </div>
    );
  }
  const { blog, related } = data;
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
            <Heading
              level={1}
              text={blog.title}
              className="mt-4 font-serif text-[26px] sm:text-[28px] md:text-[30px] font-bold leading-[1.12] text-maroon"
            />
            <p className="mt-5 font-sans text-[14.5px] sm:text-[15.5px] text-gray-500 leading-relaxed max-w-xl mx-auto">
              {cleanExcerpt(blog.short_desc)}
            </p>
          </div>
          {blog.main_image && (
            <div
              className="relative w-full rounded overflow-hidden bg-gray-20 mt-5"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src={blog.main_image}
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
          )}
          {/* Body */}
          <div className="pt-10 sm:pt-8 body-content-container">
            <div
              className="body-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            {/* paragraphs, */}
            {blog.paragraphs.length > 0 && (
              <div className="body-content mt-8 space-y-8">
                {blog.paragraphs.map((para, i) => (
                  <div key={i}>
                    {para.title && <h2>{para.title}</h2>}
                    {para.image && (
                      <div
                        className="relative w-full rounded overflow-hidden bg-gray-100 my-4"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <Image
                          src={para.image}
                          alt={para.title ?? blog.title}
                          fill
                          className="object-cover"
                          sizes="(max-width:1024px) 100vw, 900px"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: para.content }} />
                  </div>
                ))}
              </div>
            )}

            {/* Additional gallery images, if any */}
            {blog.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                {blog.images.map(
                  (img, i) =>
                    img.image && (
                      <div
                        key={i}
                        className="relative w-full rounded overflow-hidden bg-gray-100"
                        style={{ aspectRatio: "4/3" }}
                      >
                        <Image
                          src={img.image}
                          alt={img.alt_text ?? blog.title}
                          fill
                          className="object-cover"
                          sizes="(max-width:768px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ),
                )}
              </div>
            )}

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
      {related.length > 0 && (
        <section className="w-full relative overflow-hidden bg-linear-to-br from-[#FAFAF8] via-white to-[#F3F4F6] lg:px-12 md:px-10 px-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.12)_0%,transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,248,220,0.18)_0%,transparent_40%),radial-gradient(circle_at_50%_100%,rgba(193,154,107,0.10)_0%,transparent_45%)]"
          ></div>
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
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blogs/${p.slug}`}
                  className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E4D9C4] hover:border-[#AD8A3B]/50 hover:shadow-[0_12px_32px_-16px_rgba(107,22,38,0.35)] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Left accent bar */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-0.75 bg-linear-to-b from-[#AD8A3B] to-[#e91e8c] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 z-10"
                  />
                  <div
                    className="relative w-full overflow-hidden bg-[#F6F1E8]"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {p.main_image && (
                    <Image
                      src={p.main_image}
                      alt={p.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 100vw, 33vw"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Tag chip */}
                    {p.tag && (
                      <span
                        className="font-sans text-[12.5px] bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1"
                        style={{ background: `${colorForTag(p.tag)}dd` }}
                      >
                        {p.tag}
                      </span>
                    )}
                    <div className="absolute bottom-3 right-3 flex items-center gap-3 text-white/90">
                      
                      {p.reading_title && (
                      <span className="font-sans text-[12.5px] bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <Clock size={10} />
                        {p.reading_title}
                      </span>
                      )}
                      {p.view_count && (
                      <span className="font-sans text-[12.5px] bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <Eye size={11} />
                        {formatViews(p.view_count)} views
                      </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-4 sm:px-5 py-4 sm:py-5">                    
                    <Heading
                      level={4}
                      text={p.title}
                      allowHTML
                      className="font-serif lg:text-[22px] text-[20px] font-bold leading-snug text-maroon mb-2.5 group-hover:text-[#8b1a34] transition-colors line-clamp-2"
                      decorator="none"
                      decoratorClassName=""
                    />
                    <p className="font-sans text-[16px] text-gray-600 leading-relaxed line-clamp-2 mb-4">
                      {cleanExcerpt(p.short_desc)}
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
