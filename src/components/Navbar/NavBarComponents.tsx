"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { MenuCategory } from "@/types/menu";

const companyLinks = [
  { label: "Our Story", href: "/about-us" },
  { label: "Bulk Orders", href: "/bulk-order", badge: "B2B", badgeColor: "#0EA5E9" },
  { label: "Contact Us", href: "/contact-us" },
];

// Cycled per-category accent for the mega-panel image card.
const CARD_GRADIENTS = [
  "linear-gradient(145deg, #7c3aed, #a855f7 60%, #6d28d9)",
  "linear-gradient(145deg, #78350f, #b45309 55%, #92400e)",
  "linear-gradient(145deg, #0f766e, #14b8a6 55%, #0d9488)",
  "linear-gradient(145deg, #9d174d, #db2777 55%, #be185d)",
];

export default function NavBarComponents({ menu }: { menu: MenuCategory[] }) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav
      className="hidden lg:block w-full bg-white border-b border-gray-100 relative z-[200]"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
    >
      <div className="mx-auto max-w-7xl">
        <ul className="flex items-stretch list-none m-0 p-0">
          {/* Static */}
          <li className="group">            
              <a href="#"
              className="relative flex items-center gap-2 px-4 h-11 font-sans text-[15px] font-medium text-gray-600 hover:text-pink transition-colors duration-200 whitespace-nowrap">
              New Arrivals
              <span className="badge" style={{ background: "#10b981" }}>Fresh</span>
              <span className="nav-underline" />
            </a>
          </li>

          {/* Dynamic — one mega dropdown per API category */}
          {menu.map((category, i) => (
            <li
              key={category.category_slug}
              className="nav-dd relative group"
              onMouseEnter={() => setActiveDropdown(category.category_slug)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-600 relative flex items-center gap-1.5 px-4 h-11 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer">
                {category.title}
                <svg
                  className={`w-2.5 h-2.5 opacity-50 shrink-0 transition-transform duration-300 ${
                    activeDropdown === category.category_slug ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
                <span
                  className={`nav-underline ${
                    activeDropdown === category.category_slug ? "active" : ""
                  }`}
                />
              </button>

              <div
                className={`mega-panel ${
                  activeDropdown === category.category_slug ? "open" : "closed"
                } absolute top-full left-0 z-[9999] bg-white border border-gray-100 rounded-2xl min-w-[780px] p-6`}
                style={{ boxShadow: "0 16px 48px rgba(0,0,0,.12)" }}
              >
                <div className="flex gap-5">
                  {/* Category image card, using the real API image */}
                  <div
                    className="relative overflow-hidden rounded-xl shrink-0 w-[180px] h-[270px] flex flex-col justify-end p-5 text-center"
                    style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}
                  >
                    {category.category_image && (
                      <Image
                        src={category.category_image}
                        alt={category.title}
                        fill
                        className="object-cover opacity-70"
                        sizes="180px"
                      />
                    )}
                    <div className="relative z-10">
                      <p className="text-[21px] font-bold text-white leading-tight drop-shadow">
                        {category.title}
                      </p>
                    </div>
                    <Link
                      href={`/category/${category.category_slug}`}
                      className="relative z-10 self-center mt-3 flex items-center gap-1.5 border border-white/30 hover:border-white text-white text-[11px] font-medium px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900"
                    >
                      View All
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  {/* Attribute columns, straight from the API */}
                  <div className="flex gap-6 flex-1">
                    {category.attributes.map((attribute) => (
                      <div className="flex-1" key={attribute.slug}>
                        <p className="col-head">{attribute.title}</p>
                        {attribute.values.map((value) => (
                          <Link
                            key={value.slug}
                            href={`/category/${category.category_slug}?${attribute.slug}=${value.slug}`}
                            className="mega-link"
                          >
                            <span className="mega-dot" />
                            {value.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}

          {/* Static: About dropdown */}
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
              <span className={`nav-underline ${activeDropdown === "about" ? "active" : ""}`} />
            </button>
            <div
              className="absolute top-[calc(100%+1px)] right-0 z-[9999] bg-white border border-gray-100 min-w-50 py-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out translate-y-1 group-hover:translate-y-0"
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
  );
}