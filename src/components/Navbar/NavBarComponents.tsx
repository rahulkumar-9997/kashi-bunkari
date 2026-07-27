"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useMenu } from "@/hooks/useMenu";
import type { MenuAttributeValue } from "@/types/menu";

const companyLinks = [
  { label: "Our Story", href: "/about-us" },
  {
    label: "Bulk Orders",
    href: "/bulk-order",
    badge: "B2B",
    badgeColor: "#0EA5E9",
  },
  { label: "Contact Us", href: "/contact-us" },
];

const VALUES_PER_COLUMN = 10;
function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

export default function NavBarComponents() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data } = useMenu();
  const categories = data?.categories ?? [];
  const occasionSection = data?.sections?.find(
    (s) => s.slug === "shop-by-occasion",
  );
  const occasionItems = occasionSection?.items ?? [];
  const collectionSection = data?.sections?.find(
    (s) => s.slug === "shop-by-collection",
  );
  const collectionItems = collectionSection?.items ?? [];
  function openMegaPanel(slug: string) {
    setActiveDropdown(slug);
    if (containerRef.current) {
      setPanelWidth(containerRef.current.getBoundingClientRect().width);
    }
  }

  return (
    <>
      <nav
        className="hidden lg:block w-full bg-white border-b border-gray-100 relative z-200"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
      >
        <div ref={containerRef} className="mx-auto max-w-7xl relative">
          <ul className="flex items-stretch list-none m-0 p-0">
            {/* ── New Arrivals ── */}
            <li className="group">
              <Link
                href="/shop/new-arrival"
                className="relative flex items-center gap-2 px-4 h-11 font-sans text-[15px] font-medium text-gray-600 hover:text-maroon transition-colors duration-200 whitespace-nowrap"
              >
                New Arrivals
                <span className="badge" style={{ background: "#10b981" }}>
                  Fresh
                </span>
                <span className="nav-underline" />
              </Link>
            </li>
            {categories.map((category) => {
              const isOpen = activeDropdown === category.category_slug;

              return (
                <li
                  key={category.category_slug}
                  className="nav-dd group"
                  onMouseEnter={() => openMegaPanel(category.category_slug)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={`/shop/${category.category_slug}`}
                    className="text-gray-600 relative flex items-center gap-1.5 px-4 h-11 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer hover:text-maroon"
                  >
                    {category.title}
                    {category.attributes.length > 0 && (
                      <svg
                        className={`w-2.5 h-2.5 opacity-50 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 10 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M1 1l4 4 4-4" />
                      </svg>
                    )}
                    <span
                      className={`nav-underline ${isOpen ? "active" : ""}`}
                    />
                  </Link>

                  {category.attributes.length > 0 && (
                    <div
                      className={`mega-panel ${isOpen ? "open" : "closed"} absolute top-full z-9999 bg-white border border-gray-100 rounded-2xl p-7 overflow-x-auto`}
                      style={{
                        boxShadow: "0 24px 64px rgba(107,22,38,0.18)",
                        left: 0,
                        width: panelWidth ? `${panelWidth}px` : "100%",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <p className="font-serif text-[18px] font-bold text-maroon whitespace-nowrap">
                          Explore {category.title}
                        </p>
                        <span
                          className="h-px flex-1"
                          style={{
                            background:
                              "linear-gradient(90deg, rgb(147 39 20), transparent)",
                          }}
                        />
                        <Link
                          href={`/shop/${category.category_slug}`}
                          className="font-serif text-[16px] font-bold uppercase tracking-[0.08em] whitespace-nowrap text-magenta"
                        >
                          Shop All →
                        </Link>
                      </div>
                      <div className="flex gap-8 flex-wrap">
                        {category.attributes.map((attr, i) => {
                          const columns = chunk(attr.values, VALUES_PER_COLUMN);
                          return (
                            <div
                              key={attr.slug}
                              className={
                                i > 0 ? "pl-8 border-l border-[#EEE6D6]" : ""
                              }
                            >
                              <div className="mb-3">
                                <p className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-maroon">
                                  {attr.title}
                                </p>
                                <span
                                  className="block h-0.5 w-6 mt-1.5 rounded-full"
                                  style={{
                                    background:
                                      "linear-gradient(90deg,#AD8A3B,#E91E8C)",
                                  }}
                                />
                              </div>

                              <div className="flex gap-6">
                                {columns.map((columnValues, ci) => (
                                  <ColumnList
                                    key={ci}
                                    values={columnValues}
                                    categorySlug={category.category_slug}
                                    attrSlug={attr.slug}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}

            {occasionItems.length > 0 && (
              <li
                className="nav-dd relative group"
                onMouseEnter={() => setActiveDropdown("occasion")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-gray-600 hover:text-maroon relative flex items-center gap-1.5 px-4 h-11 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer">
                  Shop By Occasion
                  <svg
                    className={`w-2.5 h-2.5 opacity-50 shrink-0 transition-transform duration-300 ${activeDropdown === "occasion" ? "rotate-180" : ""}`}
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                  <span
                    className={`nav-underline ${activeDropdown === "occasion" ? "active" : ""}`}
                  />
                </button>

                <div
                  className="absolute top-[calc(100%+1px)] left-0 z-9999 bg-white border border-gray-100 min-w-50 py-2 p-5 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out translate-y-1 group-hover:translate-y-0"
                  style={{ boxShadow: "0 8px 32px rgba(107,22,38,0.12)" }}
                >
                  {occasionItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/shop/${item.slug}`}
                      className="group/val flex items-center gap-2 py-2 font-sans text-[14px] leading-snug text-gray-600 hover:text-maroon transition-colors duration-150"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-300 group-hover/val:bg-[#AD8A3B] transition-colors shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </li>
            )}

            {collectionItems.length > 0 && (
              <li
                className="nav-dd relative group"
                onMouseEnter={() => setActiveDropdown("collection")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-gray-600 hover:text-maroon relative flex items-center gap-1.5 px-4 h-11 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer">
                  Shop By Collection
                  <svg
                    className={`w-2.5 h-2.5 opacity-50 shrink-0 transition-transform duration-300 ${activeDropdown === "collection" ? "rotate-180" : ""}`}
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                  <span
                    className={`nav-underline ${activeDropdown === "collection" ? "active" : ""}`}
                  />
                </button>

                <div
                  className="absolute top-[calc(100%+1px)] left-0 z-9999 bg-white border border-gray-100 min-w-50 py-2 p-5 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out translate-y-1 group-hover:translate-y-0"
                  style={{ boxShadow: "0 8px 32px rgba(107,22,38,0.12)" }}
                >
                  {collectionItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/shop/${item.slug}`}
                      className="group/val flex items-center gap-2 py-2 font-sans text-[14px] leading-snug text-gray-600 hover:text-maroon transition-colors duration-150"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-300 group-hover/val:bg-[#AD8A3B] transition-colors shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </li>
            )}

            {/* ── Bestsellers ── */}
            <li className="group">
              <Link
                href="#"
                className="relative flex items-center px-4 h-11 font-sans text-[15px] font-medium text-gray-600 hover:text-maroon transition-colors duration-200 whitespace-nowrap"
              >
                Bestsellers
                <span className="nav-underline" />
              </Link>
            </li>

            {/* ── About ── */}
            <li
              className="nav-dd relative group ml-auto"
              onMouseEnter={() => setActiveDropdown("about")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-600 relative flex items-center gap-1.5 px-4 h-11 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer">
                About
                <svg
                  className={`w-2.5 h-2.5 opacity-50 shrink-0 transition-transform duration-300 ${activeDropdown === "about" ? "rotate-180" : ""}`}
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
                <span
                  className={`nav-underline ${activeDropdown === "about" ? "active" : ""}`}
                />
              </button>
              <div
                className="absolute top-[calc(100%+1px)] right-0 z-9999 bg-white border border-gray-100 min-w-50 py-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out translate-y-1 group-hover:translate-y-0"
                style={{ boxShadow: "0 8px 32px rgba(107,22,38,0.12)" }}
              >
                {companyLinks.map(({ label, href, badge, badgeColor }) => (
                  <Link
                    key={label}
                    href={href}
                    className="group/item flex items-center justify-between px-5 py-2.5 text-[14px] text-gray-600 transition-all duration-200 hover:text-maroon"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="h-1 w-1 rounded-full bg-gray-300 transition-colors group-hover/item:bg-[#AD8A3B]" />
                      {label}
                    </span>
                    {badge && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                        style={{ backgroundColor: badgeColor }}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

function ColumnList({
  values,
  categorySlug,
  attrSlug,
}: {
  values: MenuAttributeValue[];
  categorySlug: string;
  attrSlug: string;
}) {
  return (
    <div className="min-w-38">
      {values.map((value) => (
        <Link
          key={value.slug}
          href={`/shop/${categorySlug}/${attrSlug}/${value.slug}`}
          className="group/val flex items-center gap-2 py-2 font-sans text-[14px] leading-snug text-gray-600 hover:text-maroon transition-colors duration-150"
        >
          <span className="w-1 h-1 rounded-full bg-gray-300 group-hover/val:bg-[#AD8A3B] transition-colors shrink-0" />
          <span>{value.name}</span>
        </Link>
      ))}
    </div>
  );
}
