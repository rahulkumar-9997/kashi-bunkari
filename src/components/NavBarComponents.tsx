"use client";
import { useState } from "react";
import Link from "next/link";
import { useMenu } from "@/hooks/useMenu";

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

export default function NavBarComponents() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: categories = [] } = useMenu();

  return (
    <>
      <nav
        className="hidden lg:block w-full bg-white border-b border-gray-100 relative z-[200]"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
      >
        <div className="mx-auto max-w-7xl">
          <ul className="flex items-stretch list-none m-0 p-0">
            {/* ── New Arrivals ── */}
            <li className="group">
              <a
                href="#"
                className="relative flex items-center gap-2 px-4 h-11 font-sans text-[15px] font-medium text-gray-600 hover:text-pink transition-colors duration-200 whitespace-nowrap"
              >
                New Arrivals
                <span className="badge" style={{ background: "#10b981" }}>
                  Fresh
                </span>
                <span className="nav-underline" />
              </a>
            </li>

            {/* ── Collections MEGA (static, not from API) ── */}
            <li
              className="nav-dd relative group"
              onMouseEnter={() => setActiveDropdown("collections")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-600 relative flex items-center gap-1.5 px-4 h-11 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer">
                Collections
                <svg
                  className={`w-2.5 h-2.5 opacity-50 shrink-0 transition-transform duration-300 ${activeDropdown === "collections" ? "rotate-180" : ""}`}
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
                <span
                  className={`nav-underline ${activeDropdown === "collections" ? "active" : ""}`}
                />
              </button>

              <div
                className={`mega-panel ${activeDropdown === "collections" ? "open" : "closed"} absolute top-full left-0 z-[9999] bg-white border border-gray-100 rounded-2xl min-w-[780px] p-6`}
                style={{ boxShadow: "0 16px 48px rgba(0,0,0,.12)" }}
              >
                <div className="flex gap-5">
                  <div
                    className="relative overflow-hidden rounded-xl shrink-0 w-[180px] h-[270px] flex flex-col justify-between p-5 text-center"
                    style={{
                      background:
                        "linear-gradient(145deg, #7c3aed, #a855f7 60%, #6d28d9)",
                    }}
                  >
                    <p
                      className="relative z-10 text-[9px] tracking-[0.22em] uppercase font-semibold"
                      style={{ color: "#e9d5ff" }}
                    >
                      Curated Styles
                    </p>
                    <div className="relative z-10">
                      <p className="text-[21px] font-bold text-white leading-tight">
                        Ready-to-wear
                        <br />
                        <span className="text-purple-200">Collections</span>
                      </p>
                    </div>
                    <a
                      href="#"
                      className="relative z-10 self-center flex items-center gap-1.5 border border-white/30 hover:border-white text-white text-[11px] font-medium px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-white hover:text-purple-900"
                    >
                      Browse All
                    </a>
                  </div>
                  <div className="flex gap-6 flex-1">
                    <div className="flex-1">
                      <p className="col-head">By Silhouette</p>
                      <a href="#" className="mega-link">
                        <span className="mega-dot" />
                        Salwar Kameez
                      </a>
                      <a href="#" className="mega-link">
                        <span className="mega-dot" />
                        Anarkali Suits
                      </a>
                      <a href="#" className="mega-link">
                        <span className="mega-dot" />
                        Palazzo Sets
                      </a>
                      <a href="#" className="mega-link">
                        <span className="mega-dot" />
                        Patiala Sets
                      </a>
                    </div>
                    <div className="flex-1">
                      <p className="col-head">By Occasion</p>
                      <a href="#" className="mega-link">
                        <span className="mega-dot" />
                        Bridal Wear
                      </a>
                      <a href="#" className="mega-link">
                        <span className="mega-dot" />
                        Wedding Guest
                      </a>
                      <a href="#" className="mega-link">
                        <span className="mega-dot" />
                        Festive Season
                      </a>
                      <a href="#" className="mega-link">
                        <span className="mega-dot" />
                        Party Wear
                      </a>
                    </div>
                    <div
                      className="rounded-xl p-4 flex-1 flex flex-col justify-between min-w-[140px]"
                      style={{
                        background: "linear-gradient(135deg, #fff1f2, #fce7f3)",
                      }}
                    >
                      <span
                        className="inline-block text-[9px] font-bold uppercase tracking-widest text-pink px-2 py-0.5 rounded-full w-fit"
                        style={{ background: "rgba(236,72,153,0.1)" }}
                      >
                        Limited Time
                      </span>
                      <div>
                        <p className="text-[15px] font-bold text-gray-800 mt-3 leading-snug">
                          Flat 30% Off Festive Edit
                        </p>
                        <p className="text-[12px] text-gray-500 mt-1">
                          Handpicked styles for every celebration
                        </p>
                      </div>
                      <a
                        href="#"
                        className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-pink hover:gap-2 transition-all duration-200"
                      >
                        Explore
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* ── Live categories from /api/menu (Sarees, Suits, ...) ── */}
            {categories.map((category) => (
              <li
                key={category.category_slug}
                className="nav-dd relative group"
                onMouseEnter={() => setActiveDropdown(category.category_slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/category/${category.category_slug}`}
                  className="text-gray-600 relative flex items-center gap-1.5 px-4 h-11 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer"
                >
                  {category.title}
                  {category.attributes.length > 0 && (
                    <svg
                      className={`w-2.5 h-2.5 opacity-50 shrink-0 transition-transform duration-300 ${activeDropdown === category.category_slug ? "rotate-180" : ""}`}
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
                    className={`nav-underline ${activeDropdown === category.category_slug ? "active" : ""}`}
                  />
                </Link>

                {category.attributes.length > 0 && (
                  <div
                    className={`mega-panel ${activeDropdown === category.category_slug ? "open" : "closed"} absolute top-full left-0 z-[9999] bg-white border border-gray-100 rounded-2xl min-w-[820px] p-6`}
                    style={{ boxShadow: "0 16px 48px rgba(0,0,0,.12)" }}
                  >
                    <div className="flex gap-5">
                      {/* Category image (real photo from the API) */}
                      <Link
                        href={`/category/${category.category_slug}`}
                        className="relative overflow-hidden rounded-xl shrink-0 w-[190px] h-[280px] flex flex-col justify-between p-5 text-center group/img"
                        style={{
                          backgroundImage: `linear-gradient(to top, rgba(20,8,10,0.85), rgba(20,8,10,0.15)), url(${category.category_image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <p
                          className="relative z-10 text-[9px] tracking-[0.22em] uppercase font-semibold"
                          style={{ color: "#fcd34d" }}
                        >
                          Heritage Weaves
                        </p>
                        <div className="relative z-10">
                          <p className="text-[21px] font-bold text-white leading-tight">
                            {category.title}
                          </p>
                        </div>
                        <span className="relative z-10 self-center flex items-center gap-1.5 border border-white/30 group-hover/img:border-white text-white text-[11px] font-medium px-4 py-1.5 rounded-full transition-all duration-300 group-hover/img:bg-white group-hover/img:text-amber-900">
                          View All
                        </span>
                      </Link>

                      {/* Attribute columns — one per API attribute (Fabric, Weaving Technique, Work, ...) */}
                      <div className="flex gap-6 flex-1">
                        {category.attributes.map((attr) => {
                          const shown = attr.values.slice(0, VALUES_PER_COLUMN);
                          const extra = attr.values.length - shown.length;
                          return (
                            <div key={attr.slug} className="flex-1">
                              <p className="col-head">{attr.title}</p>
                              {shown.map((value) => (
                                <Link
                                  key={value.slug}
                                  href={`/category/${category.category_slug}?${attr.slug}=${value.slug}`}
                                  className="mega-link"
                                >
                                  <span className="mega-dot" />
                                  {value.name}
                                </Link>
                              ))}
                              {extra > 0 && (
                                <Link
                                  href={`/category/${category.category_slug}`}
                                  className="mega-link highlight"
                                >
                                  <span className="mega-dot" />+{extra} more →
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick links strip */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest shrink-0">
                        Quick links:
                      </span>
                      {[
                        "Bestsellers",
                        "New This Week",
                        "Under ₹999",
                        "Gift Sets",
                      ].map((t) => (
                        <a
                          key={t}
                          href="#"
                          className="text-[12px] text-gray-500 hover:text-pink border border-gray-200 hover:border-pink/40 px-3 py-1 rounded-full transition-all duration-200 hover:bg-pink/5"
                        >
                          {t}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}

            {/* ── Bestsellers ── */}
            <li className="group">
              <a
                href="#"
                className="relative flex items-center px-4 h-11 font-sans text-[15px] font-medium text-gray-600 hover:text-pink transition-colors duration-200 whitespace-nowrap"
              >
                Bestsellers
                <span className="nav-underline" />
              </a>
            </li>

            {/* ── Under ₹2,500 ── */}
            <li className="group">
              <a
                href="#"
                className="relative flex items-center gap-1.5 px-4 h-11 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-200 text-gray-600"
              >
                Under ₹2,500
                <span
                  className="badge"
                  style={{ background: "#fef3c7", color: "#b45309" }}
                >
                  Value
                </span>
                <span
                  className="nav-underline"
                  style={{ background: "#d97706" }}
                />
              </a>
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
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,.10)" }}
              >
                {companyLinks.map(({ label, href, badge, badgeColor }) => (
                  <Link
                    key={label}
                    href={href}
                    className="group/item flex items-center justify-between px-5 py-2.5 text-[13.5px] text-gray-600 transition-all duration-200 hover:bg-[#AD8A3B]/5 hover:text-[#AD8A3B]"
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
