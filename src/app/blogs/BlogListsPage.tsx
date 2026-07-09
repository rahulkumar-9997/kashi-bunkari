"use client";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { ArrowRight, Clock, BookOpen, Eye } from "lucide-react";
import { useBlogList } from "@/hooks/useBlogList";
import BlogListsPageSkeleton from "./BlogListsPageSkeleton";
function cleanExcerpt(raw: string) {
  return raw.replace(/\r\n/g, " ").replace(/\s+/g, " ").trim();
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
export default function BlogListPage() {
  const { data: blogs = [], isLoading, isError } = useBlogList();
  if (isLoading) return <BlogListsPageSkeleton />;
  if (isError || blogs.length === 0) return null;
  const wideCard = blogs[0];
  const restCards = blogs.filter((b) => b.id !== wideCard.id);
  return (
    <div className="w-full min-h-screen">
      {/* ══ BREADCRUMB ══ */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
        ]}
      />
      {/* ══ HEADER ══ */}
      <section className="relative overflow-hidden ">
        <div
          aria-hidden
          className="absolute inset-0 z-0 opacity-100 bg-[radial-gradient(circle_at_15%_20%,rgba(236,72,153,0.18)_0%,transparent_35%),radial-gradient(circle_at_85%_15%,rgba(255,193,7,0.18)_0%,transparent_35%),radial-gradient(circle_at_50%_100%,rgba(139,26,52,0.12)_0%,transparent_45%)]"
        />
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
                Discover expert saree styling tips, the latest fashion trends,
                fabric guides, and draping ideas to help you choose the perfect
                saree for every occasion.
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
              <Link
                href={`/blogs/${wideCard.slug}`}
                className="group relative flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-[#E4D9C4] hover:border-[#AD8A3B]/50 hover:shadow-[0_12px_32px_-16px_rgba(107,22,52,0.35)] transition-all duration-300 hover:-translate-y-1 sm:col-span-2"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-0.75 bg-linear-to-b from-[#AD8A3B] to-[#e91e8c] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 z-10"
                />
                <div
                  className="relative w-full sm:w-2/4 shrink-0 overflow-hidden bg-gray-100"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={wideCard.main_image}
                    alt={wideCard.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width:640px) 100vw, 40vw"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* Tag chip */}
                  <span
                    className="absolute top-3 left-3 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-white px-3 py-1.5 rounded-full shadow-sm z-10"
                    style={{ background: `${colorForTag(wideCard.tag)}dd` }}
                  >
                    {wideCard.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center px-5 sm:px-4 py-4 sm:py-4">
                  <div className="mb-2.5 flex items-center gap-3">
                    <span className="font-sans text-[14px] text-gray-400 flex items-center gap-1">
                      <Clock size={11} />
                      {wideCard.reading_title}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="font-sans text-[14px] text-gray-400 flex items-center gap-1">
                      <Eye size={11} />
                      {formatViews(wideCard.view_count)} views
                    </span>
                  </div>
                  <Heading
                    level={2}
                    text={wideCard.title}
                    allowHTML
                    className="font-serif lg:text-[22px] text-[20px] font-bold leading-snug text-maroon mb-2.5 group-hover:text-[#8b1a34] transition-colors"
                    decorator="none"
                    decoratorClassName=""
                  />
                  <p className="font-sans text-[16px] text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {cleanExcerpt(wideCard.short_desc)}
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
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E4D9C4] hover:border-[#AD8A3B]/50 hover:shadow-[0_12px_32px_-16px_rgba(107,22,52,0.35)] transition-all duration-300 hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-linear-to-b from-[#AD8A3B] to-[#e91e8c] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 z-10"
                />
                <div
                  className="relative w-full overflow-hidden bg-gray-100"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={post.main_image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Tag chip */}
                  <span
                    className="absolute top-3 left-3 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-white px-3 py-1.5 rounded-full shadow-sm z-10"
                    style={{ background: `${colorForTag(post.tag)}dd` }}
                  >
                    {post.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 flex items-center gap-3 text-white/90">
                      <span className="font-sans text-[12.5px] bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <Clock size={10} />
                        {post.reading_title}
                      </span>

                      <span className="font-sans text-[12.5px] bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <Eye size={11} />
                        {formatViews(post.view_count)} views
                      </span>
                    </div>
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
                    {cleanExcerpt(post.short_desc)}
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
    </div>
  );
}
