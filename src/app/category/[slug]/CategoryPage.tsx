"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import {
  ChevronRight,
  SlidersHorizontal,
  X,
  ChevronDown,
  Eye,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  mrp: number | null;
  discount: number | null;
  isNew: boolean;
  slug: string;
};
type Props = { slug: string };

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  "banarasi-sarees": {
    label: "Banarasi Sarees",
    description: "Handwoven in Varanasi — exquisite zari, silk & katan weaves.",
  },
  "designer-lehengas": {
    label: "Designer Lehengas",
    description:
      "From bridal reds to pastel duets — crafted for every celebration.",
  },
  "party-wear": {
    label: "Party Wear",
    description:
      "Statement styles for every festive occasion and special evening.",
  },
  "festive-collection": {
    label: "Festive Collection",
    description: "Celebrate every moment in handcrafted ethnic elegance.",
  },
  "anarkali-suits": {
    label: "Anarkali Suits",
    description:
      "Elegant cotton, silk & georgette Anarkalis from Varanasi weavers.",
  },
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Katan Silk Zari Saree",
    brand: "Kasibunkari",
    category: "Banarasi",
    image: "/images/products/1.webp",
    price: 4500,
    mrp: 6000,
    discount: 25,
    isNew: true,
    slug: "/products/katan-silk-zari",
  },
  {
    id: 2,
    name: "Georgette Festive Saree - Red",
    brand: "Heritage Silk",
    category: "Georgette",
    image: "/images/products/2.webp",
    price: 1531,
    mrp: null,
    discount: null,
    isNew: false,
    slug: "/products/georgette-festive-red",
  },
  {
    id: 3,
    name: "Pure Tussar Silk - Natural",
    brand: "Silk Route",
    category: "Tussar",
    image: "/images/products/3.webp",
    price: 3800,
    mrp: null,
    discount: null,
    isNew: true,
    slug: "/products/tussar-natural",
  },
  {
    id: 4,
    name: "Banarasi Soft Silk Saree",
    brand: "Kasibunkari",
    category: "Banarasi",
    image: "/images/products/4.webp",
    price: 1860,
    mrp: 2500,
    discount: 26,
    isNew: false,
    slug: "/products/banarasi-soft-silk",
  },
  {
    id: 5,
    name: "Chinon Silk Party Wear",
    brand: "Designer Edit",
    category: "Party",
    image: "/images/products/5.webp",
    price: 1914,
    mrp: 2860,
    discount: 33,
    isNew: true,
    slug: "/products/chinon-silk-party",
  },
  {
    id: 6,
    name: "Bridal Velvet Lehenga",
    brand: "Kasibunkari",
    category: "Lehenga",
    image: "/images/products/6.webp",
    price: 12500,
    mrp: 15000,
    discount: 17,
    isNew: false,
    slug: "/products/bridal-velvet-lehenga",
  },
  {
    id: 7,
    name: "Vishtha Silk Full Border",
    brand: "Heritage Silk",
    category: "Tissue",
    image: "/images/products/7.webp",
    price: 4368,
    mrp: 5200,
    discount: 16,
    isNew: false,
    slug: "/products/vishtha-silk-border",
  },
  {
    id: 8,
    name: "Pure Cotton Anarkali Suit",
    brand: "Kasibunkari",
    category: "Suit",
    image: "/images/products/8.webp",
    price: 3100,
    mrp: null,
    discount: null,
    isNew: true,
    slug: "/products/cotton-anarkali",
  },
  {
    id: 9,
    name: "Kanjivaram Silk Saree",
    brand: "Royal Weaves",
    category: "Silk",
    image: "/images/products/9.webp",
    price: 8500,
    mrp: null,
    discount: null,
    isNew: false,
    slug: "/products/kanjivaram-silk",
  },
  {
    id: 10,
    name: "Embroidered Sharara Set",
    brand: "Kasibunkari",
    category: "Sharara",
    image: "/images/products/4.webp",
    price: 4200,
    mrp: 5500,
    discount: 24,
    isNew: true,
    slug: "/images/products/5.webp",
  },
  {
    id: 11,
    name: "Mushroo Silk Saree - Ivory",
    brand: "Silk Route",
    category: "Mushroo",
    image: "/images/products/6.webp",
    price: 2900,
    mrp: 3500,
    discount: 17,
    isNew: false,
    slug: "/products/mushroo-silk-ivory",
  },
  {
    id: 12,
    name: "Tissue Silk Festive Saree",
    brand: "Heritage Silk",
    category: "Tissue",
    image: "/images/products/5.webp",
    price: 5600,
    mrp: 7000,
    discount: 20,
    isNew: true,
    slug: "/products/tissue-silk-festive",
  },
];

const PRICE_RANGES = [
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 – ₹5,000", min: 2000, max: 5000 },
  { label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Biggest Discount", value: "discount" },
];

const ALL_CATEGORIES = [...new Set(MOCK_PRODUCTS.map((p) => p.category))];

function CB({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <label
      className="flex items-center gap-2.5 cursor-pointer group"
      onClick={onClick}
    >
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150
        ${checked ? "border-pink bg-pink" : "border-gray-300 group-hover:border-pink"}`}
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
        className={`font-sans text-[12.5px] select-none transition-colors
        ${checked ? "text-pink font-semibold" : "text-gray-500 group-hover:text-gray-800"}`}
      >
        {label}
      </span>
    </label>
  );
}
function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <span className="font-sans text-[14px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
          {title}
        </span>
        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && children}
    </div>
  );
}

export default function CategoryPage({ slug }: Props) {
  const meta = CATEGORY_META[slug] ?? {
    label: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: "",
  };
  const [selPrices, setSelPrices] = useState<number[]>([]);
  const [selCategories, setSelCategories] = useState<string[]>([]);
  const [selAvail, setSelAvail] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleArr = (
    val: string | number,
    arr: any[],
    setArr: (v: any[]) => void,
  ) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };
  const clearAll = () => {
    setSelPrices([]);
    setSelCategories([]);
    setSelAvail([]);
  };
  let products = [...MOCK_PRODUCTS];
  if (selPrices.length > 0) {
    products = products.filter((p) =>
      selPrices.some(
        (i) => p.price >= PRICE_RANGES[i].min && p.price <= PRICE_RANGES[i].max,
      ),
    );
  }
  if (selCategories.length > 0)
    products = products.filter((p) => selCategories.includes(p.category));
  if (selAvail.includes("new")) products = products.filter((p) => p.isNew);
  if (selAvail.includes("sale"))
    products = products.filter((p) => p.discount !== null);
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (sort === "discount")
    products.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
  const activeCount = selPrices.length + selCategories.length + selAvail.length;
  const FilterPanel = () => (
    <div className="space-y-5">
      <FilterGroup title="Price Range">
        <div className="space-y-2.5">
          {PRICE_RANGES.map((r, i) => (
            <CB
              key={r.label}
              checked={selPrices.includes(i)}
              onClick={() => toggleArr(i, selPrices, setSelPrices)}
              label={r.label}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Category — checkboxes */}
      <FilterGroup title="Category">
        <div className="space-y-2.5">
          {ALL_CATEGORIES.map((cat) => (
            <CB
              key={cat}
              checked={selCategories.includes(cat)}
              onClick={() => toggleArr(cat, selCategories, setSelCategories)}
              label={cat}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Availability — checkboxes */}
      <FilterGroup title="Availability">
        <div className="space-y-2.5">
          {[
            { label: "New Arrivals", val: "new" },
            { label: "On Sale", val: "sale" },
          ].map(({ label, val }) => (
            <CB
              key={val}
              checked={selAvail.includes(val)}
              onClick={() => toggleArr(val, selAvail, setSelAvail)}
              label={label}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Clear */}
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-pink hover:text-maroon transition-colors text-left"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen">
        <div className="relative overflow-hidden bg-gray-50 py-2 md:py-3">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(30deg, transparent, transparent 38px, rgba(244,114,182,0.05) 38px, rgba(244,114,182,0.05) 40px)",
              }}
            />            
            <div className="relative mx-auto max-w-7xl px-2 md:px-8 lg:px-1">
              <div className="flex flex-wrap items-center gap-2 text-[12px]">
                <Link href="/" className="text-gray-00 text-[14px] transition ">
                    Home
                </Link>
                <ChevronRight size={14} className="text-gray-500" />
                <Link href="/collections" className="text-gray-500 transition text-[14px]">
                  Collections
                </Link>
                <ChevronRight size={14} className="text-gray-500" />
                <span className="font-medium text-gray-500 text-[14px]">{meta.label}</span>
              </div>
              {/* <Heading
                  level={1}
                  text={meta.label}
                  className="font-serif mt-6 font-serif text-[18px] font-semibold leading-none tracking-tight text-maroon"
                  decorator="none"
              />
              {meta.description && (
                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/65">
                  {meta.description}
                </p>
              )} */}
            </div>
        </div>
        <section className="w-full lg:px-12 md:px-10 px-4">
          <div className="mx-auto w-full max-w-7xl relative lg:py-10 md:py-10 sm:py-10 py-8">
            <div className="flex gap-5">
              {/* ── DESKTOP SIDEBAR ── */}
              <aside className="hidden lg:block w-70 shrink-0">
                <div className="sticky top-24 bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={15} className="text-maroon" />
                      <p className="font-sans text-[16px] font-bold uppercase tracking-[0.22em] text-maroon">
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
                        className="font-sans text-[9.5px] font-bold uppercase tracking-wide text-pink hover:text-maroon transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <FilterPanel />
                </div>
              </aside>
              {/* ── PRODUCTS AREA ── */}
              <div className="flex-1 min-w-0">
                <div className="sticky top-18 z-40 hidden lg:block bg-white/90 backdrop-blur-md">
                  <div className="flex items-center justify-end gap-3 py-2.5">
                    <div className="relative">
                      <button onClick={() => setSortOpen((v) => !v)}
                        className="flex items-center gap-2 rounded border border-gray-200 bg-white px-3.5 py-2.5 font-sans text-[13px] font-semibold text-gray-600 transition-all duration-200 hover:border-pink hover:text-pink">
                        {SORT_OPTIONS.find((s) => s.value === sort)?.label}
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${
                            sortOpen ? "rotate-180" : ""
                          }`}
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
                              {sort === opt.value && <span className="float-right">✓</span>}
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
                      text={meta.label}
                      className="font-serif text-[25px] font-semibold leading-none tracking-tight text-maroon"
                      decorator="none"
                    />                    
                  </div>
                  <div>
                    <p className="font-sans text-[16px] text-gray-500">
                      <span className="font-bold text-gray-800">
                        {products.length}
                      </span>{" "}
                      products
                    </p>
                  </div>                  
                </div>
                {/* Active chips */}
                {activeCount > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {selPrices.map((i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-pink bg-pink/8 border border-pink/20 px-3 py-1 rounded-full"
                      >
                        {PRICE_RANGES[i].label}
                        <button
                          onClick={() =>
                            setSelPrices((p) => p.filter((x) => x !== i))
                          }
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                    {selCategories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-pink bg-pink/8 border border-pink/20 px-3 py-1 rounded-full"
                      >
                        {cat}
                        <button
                          onClick={() =>
                            setSelCategories((c) => c.filter((x) => x !== cat))
                          }
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                    {selAvail.map((v) => (
                      <span
                        key={v}
                        className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-pink bg-pink/8 border border-pink/20 px-3 py-1 rounded-full"
                      >
                        {v === "new" ? "New Arrivals" : "On Sale"}
                        <button
                          onClick={() =>
                            setSelAvail((a) => a.filter((x) => x !== v))
                          }
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={clearAll}
                      className="font-sans text-[11px] text-gray-400 hover:text-pink transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                )}
                {/* ── Product Grid ── */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-2 md:gap-x-3 gap-y-5 md:gap-y-8">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={product.slug}
                        className="prod-card group block outline-none select-none w-full border border-gray-200 rounded-xl bg-white transition-all duration-300 ease-in-out hover:border-maroon/30 cursor-pointer hover:shadow-md overflow-hidden"
                      >
                        <div
                          className="relative overflow-hidden rounded-t-xl bg-gray-100"
                          style={{ aspectRatio: "3/4" }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          {product.isNew && (
                            <span className="absolute top-2.5 left-2.5 z-20 font-sans text-[8px] font-bold uppercase tracking-wider bg-maroon text-white px-2 py-0.5 rounded-sm leading-none">
                              New
                            </span>
                          )}
                          {product.discount && (
                            <span className="absolute top-2.5 right-2.5 z-20 font-sans text-[10px] font-bold text-white bg-green-600 px-2 py-1 rounded-sm leading-none shadow-sm">
                              {product.discount}% OFF
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
                          <span className="text-[11px] px-1.5 py-0.5 border border-maroon/30 bg-maroon/10 rounded-full w-max text-maroon inline-block mb-2 font-sans font-medium">
                            {product.category}
                          </span>
                          <p className="font-sans text-[13px] md:text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-2">
                            {product.name}
                          </p>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="font-sans text-[14px] font-bold text-gray-900">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {product.mrp && (
                              <span className="font-sans text-[11.5px] text-gray-400 line-through">
                                ₹{product.mrp.toLocaleString("en-IN")}
                              </span>
                            )}
                            {product.discount && (
                              <span className="font-sans text-[10.5px] font-bold text-pink">
                                {product.discount}% off
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-pink/8 border border-pink/15 flex items-center justify-center mb-4">
                      <SlidersHorizontal size={22} className="text-pink" />
                    </div>
                    <h3 className="font-serif text-[18px] font-bold text-gray-800 mb-2">
                      No products found
                    </h3>
                    <p className="font-sans text-[13px] text-gray-400 mb-5">
                      Try adjusting or clearing your filters
                    </p>
                    <button
                      onClick={clearAll}
                      className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-pink px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      {/* ══ MOBILE BOTTOM STICKY BAR ══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex divide-x divide-gray-100">
          {/* Filter */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-4 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-gray-700 hover:text-pink transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-pink text-white text-[9px] flex items-center justify-center font-bold leading-none">
                {activeCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="flex-1 relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="w-full flex items-center justify-center gap-2 py-4 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-gray-700 hover:text-pink transition-colors"
            >
              Sort
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sortOpen && (
              <div className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl overflow-hidden">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-3.5 font-sans text-[13px] border-b border-gray-50 last:border-0 transition-colors
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
      </div>

      {/* ══ MOBILE FILTER DRAWER ══ */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl flex flex-col max-h-[88vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal size={15} className="text-pink" />
                <p className="font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-gray-800">
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

            {/* Same FilterPanel — live updates */}
            <div className="overflow-y-auto flex-1 px-5 py-5">
              <FilterPanel />
            </div>

            {/* Footer */}
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
      <div className="lg:hidden h-16" />
    </div>
  );
}
