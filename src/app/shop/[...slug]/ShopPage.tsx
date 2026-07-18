"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Eye,
  Loader2,
  ImageOff,
  SearchX,
} from "lucide-react";
import { useShop } from "@/hooks/useShop";
import type { ShopFilter } from "@/types/shop";
type Props = { slug: string[] };
const SORT_OPTIONS = [
  { label: "Newest First", value: "new-arrivals" },
  { label: "Price: Low to High", value: "price-low-to-high" },
  { label: "Price: High to Low", value: "price-high-to-low" },
  { label: "A to Z", value: "a-to-z-order" },
];
const RESERVED_PARAMS = new Set(["filter", "sort", "page"]);

function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
function buildQueryString(params: Record<string, string>): string {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value).replace(/%2C/g, ",")}`,
    )
    .join("&");
}

function FilterSection({
  filter,
  selectedValues,
  onToggle,
  defaultOpen = false,
}: {
  filter: ShopFilter;
  selectedValues: string[];
  onToggle: (value: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b first:border-t border-gray-200 pt-4 pb-4 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between group cursor-pointer"
      >
        <span className="font-sans text-[16px] text-maroon font-semibold group-hover:text-gray-900 transition-colors flex items-center gap-2">
          {filter.title}
          {selectedValues.length > 0 && (
            <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-pink text-white text-[9px] font-bold">
              {selectedValues.length}
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`space-y-2.5 mt-3 ${filter.values.length > 10 ? "max-h-52 overflow-y-auto pr-2" : ""}`}
          data-lenis-prevent
        >
          {filter.values.map((opt) => {
            const checked = selectedValues.includes(opt.slug);
            return (
              <label
                key={opt.slug}
                className="flex items-center gap-2.5 cursor-pointer group"
                onClick={() => onToggle(opt.slug)}
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${checked ? "border-pink bg-pink" : "border-gray-300 group-hover:border-pink"}`}
                >
                  {checked && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path
                        d="M1 3L3 5L7 1"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`font-sans text-[14px] select-none transition-colors ${checked ? "text-pink font-semibold" : "text-gray-500 group-hover:text-gray-800"}`}
                >
                  {opt.name}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ShopPage({ slug }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      if (RESERVED_PARAMS.has(key)) return;
      initial[key] = value.split(",").filter(Boolean);
    });
    return initial;
  });
  const [sort, setSort] = useState(searchParams.get("sort") || "new-arrivals");
  const [sortOpen, setSortOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filterParams = useMemo(() => {
    const params: Record<string, string> = {};
    const hasActiveFilters = Object.values(selected).some((v) => v.length > 0);
    if (hasActiveFilters) {
      params.filter = "1";
      for (const [key, values] of Object.entries(selected)) {
        if (values.length > 0) params[key] = values.join(",");
      }
    }
    if (sort && sort !== "new-arrivals") params.sort = sort;
    return params;
  }, [selected, sort]);
  useEffect(() => {
    const qs = buildQueryString(filterParams);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filterParams]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useShop(slug, filterParams);

  const pages = data?.pages ?? [];
  const firstPage = pages[0];
  const products = useMemo(() => pages.flatMap((p) => p.products), [pages]);
  const totalProducts = firstPage?.pagination.total_products ?? 0;
  const filters = firstPage?.product_filters ?? [];

 const heading = firstPage?.attribute_value && firstPage?.category
      ? `${firstPage.attribute_value.name} ${firstPage.category.title}`
      : firstPage?.category?.title || firstPage?.tag?.title || firstPage?.label?.title || "Collection";
  

  const isConfirmedEmpty = !isLoading && !isError && products.length === 0;

  const toggleOption = (filterId: string, value: string) => {
    setSelected((prev) => {
      const current = prev[filterId] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterId]: next };
    });
  };

  const clearAll = () => setSelected({});

  const activeCount = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  // Full-page "nothing here" only makes sense when there's genuinely
  // nothing to filter (no active filters). If the user applied filters
  // and got zero results, the sidebar must stay visible so they can
  // adjust/clear them — only the product grid area shows "No products".
  const isEmptyWithNoFilters = isConfirmedEmpty && activeCount === 0;
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "500px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const FilterPanel = () => (
    <div>
      {filters.map((group, i) => (
        <FilterSection
          key={group.slug}
          filter={group}
          selectedValues={selected[group.slug] ?? []}
          onToggle={(value) => toggleOption(group.slug, value)}
          defaultOpen={i === 0}
        />
      ))}
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-pink hover:text-maroon transition-colors text-left mt-2"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: heading }]} />

      <section className="w-full lg:px-12 md:px-10 px-4">
        <div className="mx-auto w-full max-w-7xl relative lg:py-10 md:py-10 sm:py-10 py-8">
          {isEmptyWithNoFilters ? (
            /* ── EMPTY, NO FILTERS ACTIVE: clean full-width message, no
                sidebar, no sort dropdown — genuinely nothing to filter
                or sort (category/tag has zero products). ── */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-pink/8 border border-pink/15 flex items-center justify-center mb-5">
                <SearchX size={26} className="text-pink" />
              </div>
              <Heading
                level={1}
                text={heading}
                className="font-serif text-[22px] font-semibold text-maroon mb-2"
                decorator="none"
              />
              <h3 className="font-sans text-[15px] text-gray-500 mb-1">
                No products found
              </h3>
              <p className="font-sans text-[13px] text-gray-400 mb-6 max-w-sm">
                {activeCount > 0
                  ? "Try adjusting or clearing your filters."
                  : "There are no products in this collection yet — please check back soon."}
              </p>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              )}
              <Link
                href="/"
                className="mt-4 font-sans text-[12.5px] text-gray-400 hover:text-maroon transition-colors underline"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="flex gap-5">
              {/* ── DESKTOP SIDEBAR ── */}
              <aside className="hidden lg:block w-70 shrink-0">
                <div className="sticky top-24 bg-white rounded-xl border-slate-100 p-3 shadow-[0_8px_10px_rgb(0,0,0,0.08)] flex flex-col max-h-[calc(100vh-7rem)]">
                  <div className="flex items-center justify-between mb-5 shrink-0">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={15} className="text-maroon" />
                      <p className="font-sans text-[16px] font-bold uppercase text-maroon">
                        Filters
                      </p>
                      {activeCount > 0 && (
                        <span className="w-4.5 h-4.5 rounded-full bg-pink text-white text-[9px] flex items-center justify-center font-bold leading-none px-1">
                          {activeCount}
                        </span>
                      )}
                    </div>
                    {activeCount > 0 && (
                      <button
                        onClick={clearAll}
                        className="font-sans text-[10px] font-bold uppercase tracking-wide text-pink hover:text-maroon transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div
                    className="flex-1 min-h-0 overflow-y-auto pr-1"
                    data-lenis-prevent
                  >
                    <FilterPanel />
                  </div>
                </div>
              </aside>

              {/* ── PRODUCTS AREA ── */}
              <div className="flex-1 min-w-0">
                <div className="sticky top-18 z-40 hidden lg:block bg-white/90 backdrop-blur-md">
                  <div className="flex items-center justify-end gap-3 py-2.5">
                    <div className="relative">
                      <button
                        onClick={() => setSortOpen((v) => !v)}
                        className="flex items-center gap-2 rounded border border-gray-200 bg-white px-3.5 py-2.5 font-sans text-[13px] font-semibold text-gray-600 transition-all duration-200 hover:border-pink hover:text-pink"
                      >
                        {SORT_OPTIONS.find((s) => s.value === sort)?.label}
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {sortOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                          {SORT_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => {
                                setSort(opt.value);
                                setSortOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left font-sans text-[12.5px] transition-colors ${
                                sort === opt.value
                                  ? "bg-pink/5 font-semibold text-pink"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              {opt.label}
                              {sort === opt.value && (
                                <span className="float-right">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                  <div>
                    <Heading
                      level={1}
                      text={heading}
                      className="font-serif text-[25px] font-semibold leading-none tracking-tight text-maroon"
                      decorator="none"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-[16px] text-gray-500">
                      <span className="font-bold text-gray-800">
                        {totalProducts}
                      </span>{" "}
                      products
                    </p>
                  </div>
                </div>

                {/* Active chips */}
                {activeCount > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {filters.map((group) =>
                      (selected[group.slug] ?? []).map((val) => {
                        const opt = group.values.find((o) => o.slug === val);
                        return (
                          <span
                            key={`${group.slug}-${val}`}
                            className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-pink bg-pink/8 border border-gray-300 px-3 py-1 rounded-full cursor-pointer"
                          >
                            {opt?.name}
                            <button
                              onClick={() => toggleOption(group.slug, val)}
                            >
                              <X size={10} />
                            </button>
                          </span>
                        );
                      }),
                    )}
                    <button
                      onClick={clearAll}
                      className="font-sans text-[16px] text-gray-400 hover:text-pink transition-colors cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                )}

                {/* ── Loading / Error / Grid ── */}
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-2 md:gap-x-3 gap-y-5 md:gap-y-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-200 overflow-hidden"
                      >
                        <div
                          className="bg-gray-100 animate-pulse"
                          style={{ aspectRatio: "3/4" }}
                        />
                        <div className="p-3 space-y-2">
                          <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                          <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isError ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="font-serif text-[18px] font-bold text-gray-800 mb-2">
                      Couldn&apos;t load products
                    </p>
                    <p className="font-sans text-[13px] text-gray-400">
                      Please try again in a moment.
                    </p>
                  </div>
                ) : isConfirmedEmpty ? (
                  /* Filters are active but yielded zero results — sidebar
                     stays visible (handled above), only this area shows
                     the message so the user can adjust their filters. */
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-pink/8 border border-pink/15 flex items-center justify-center mb-4">
                      <SearchX size={22} className="text-pink" />
                    </div>
                    <h3 className="font-serif text-[18px] font-bold text-gray-800 mb-2">
                      No products found
                    </h3>
                    <p className="font-sans text-[13px] text-gray-400 mb-5">
                      Try adjusting or clearing your filters.
                    </p>
                    <button
                      onClick={clearAll}
                      className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-2 md:gap-x-3 gap-y-5 md:gap-y-8">
                      {products.map((product) => {
                        const price = product.offer_price ?? product.mrp;
                        const hasDiscount =
                          product.offer_price != null &&
                          product.mrp != null &&
                          product.mrp > product.offer_price;
                        const discountPct = hasDiscount
                          ? Math.round(
                              (1 - product.offer_price! / product.mrp!) * 100,
                            )
                          : null;
                        const productHref = product.attributes_value_slug
                          ? `/product/${product.slug}/${product.attributes_value_slug}`
                          : `/product/${product.slug}`;

                        return (
                          <Link
                            key={product.id}
                            href={productHref}
                            className="prod-card group block outline-none select-none w-full border border-gray-200 rounded-xl bg-white transition-all duration-300 ease-in-out hover:border-maroon/30 cursor-pointer hover:shadow-md overflow-hidden"
                          >
                            <div
                              className="relative overflow-hidden rounded-t-xl bg-gray-100"
                              style={{ aspectRatio: "3/4" }}
                            >
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  fill
                                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                                  sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageOff
                                    size={22}
                                    className="text-gray-300"
                                  />
                                </div>
                              )}
                              {discountPct !== null && (
                                <span className="absolute top-2.5 right-2.5 z-20 font-sans text-[10px] font-bold text-white bg-green-600 px-2 py-1 rounded-sm leading-none shadow-sm">
                                  {discountPct}% OFF
                                </span>
                              )}
                              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <span className="inline-flex items-center gap-1.5 font-sans text-[9.5px] font-bold uppercase tracking-[0.18em] text-white bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                                  <Eye size={11} />
                                  Quick View
                                </span>
                              </div>
                            </div>
                            <div className="px-3 py-3">
                              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                                {product.category && (
                                  <span className="text-[11px] px-1.5 py-0.5 border border-maroon/30 bg-maroon/20 rounded-full w-max text-primary-500 inline-block text-maroon mb-2">
                                    {product.category}
                                  </span>
                                )}
                              </div>
                              <p className="font-sans text-[13px] md:text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-2">
                                {product.title}
                              </p>
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                {price != null ? (
                                  <>
                                    <span className="font-sans text-[14px] font-bold text-gray-900">
                                      {formatPrice(price)}
                                    </span>
                                    {hasDiscount && (
                                      <span className="font-sans text-[11.5px] text-gray-400 line-through">
                                        {formatPrice(product.mrp!)}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="font-sans text-[12px] text-gray-400">
                                    Price on request
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Infinite-scroll sentinel */}
                    <div
                      ref={loadMoreRef}
                      className="flex items-center justify-center py-10"
                    >
                      {isFetchingNextPage && (
                        <Loader2
                          size={22}
                          className="text-maroon animate-spin"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ MOBILE FLOATING FILTER + SORT PILLS — hidden entirely when
          there's genuinely nothing to filter/sort. ══ */}
      {!isEmptyWithNoFilters && (
        <div className="lg:hidden fixed left-0 right-0 z-290 flex items-center justify-center gap-2.5 px-4 pointer-events-none bottom-[calc(3.5rem+12px+env(safe-area-inset-bottom))]">
          <button
            onClick={() => setDrawerOpen(true)}
            className="pointer-events-auto flex items-center gap-1.5 bg-gray-900/92 backdrop-blur-md text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg font-sans text-[11.5px] font-bold uppercase tracking-widest active:scale-95 transition-transform cursor-pointer"
          >
            <SlidersHorizontal size={13} className="shrink-0" />
            Filters
            {activeCount > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-pink text-white text-[9px] flex items-center justify-center font-bold leading-none shrink-0">
                {activeCount}
              </span>
            )}
          </button>
          <div className="pointer-events-auto relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-1.5 bg-gray-900/92 backdrop-blur-md text-white pl-3.5 pr-3 py-2.5 rounded-full shadow-lg font-sans text-[11.5px] font-bold uppercase tracking-widest active:scale-95 transition-transform cursor-pointer"
            >
              Sort
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 shrink-0 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sortOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 font-sans text-[12.5px] border-b border-gray-50 last:border-0 transition-colors
                      ${sort === opt.value ? "text-pink font-semibold bg-pink/5" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {opt.label}
                    {sort === opt.value && (
                      <span className="text-pink text-base">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ MOBILE FILTER DRAWER ══ */}
      {drawerOpen && !isEmptyWithNoFilters && (
        <div className="fixed inset-0 z-310 lg:hidden">
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl flex flex-col max-h-[88vh]">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal size={16} className="text-maroon" />
                <p className="font-sans text-[16px] font-bold uppercase text-maroon">
                  Filters
                </p>
                {activeCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-pink text-white text-[9px] flex items-center justify-center font-bold">
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-5"
              data-lenis-prevent
            >
              <FilterPanel />
            </div>
            <div className="px-5 pb-6 pt-4 border-t border-gray-100 flex gap-3 shrink-0">
              <button
                onClick={() => {
                  clearAll();
                  setDrawerOpen(false);
                }}
                className="flex-1 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-gray-600 border-2 border-gray-200 py-3.5 rounded-xl hover:border-pink hover:text-pink transition-all duration-200"
              >
                Clear All
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex-1 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-white py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg,#8b1a34,#e91e8c)",
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile spacer */}
      {!isEmptyWithNoFilters && <div className="lg:hidden h-16" />}
    </div>
  );
}
