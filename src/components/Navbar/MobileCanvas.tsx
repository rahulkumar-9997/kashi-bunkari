"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";

type Props = { isOpen: boolean; onClose: () => void };

type Submenu = { title: string; content: ReactNode };

const WEDDING_COLLECTION_ITEMS = ["Bridal Lehenga", "Bridal Sarees", "Anarkali"];
const STATIC_LINKS = ["Suit Sets", "Gowns", "Ready To Ship"];

export default function MobileCanvas({ isOpen, onClose }: Props) {
  const { data } = useMenu();
  const categories = data?.categories ?? [];
  const [submenu, setSubmenu] = useState<Submenu | null>(null);

  const openSubmenu = (title: string, content: ReactNode) => setSubmenu({ title, content });
  const closeSubmenu = () => setSubmenu(null);

  const handleClose = () => {
    onClose();
    setTimeout(closeSubmenu, 300);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay fixed inset-0 z-[400] bg-black/50 ${isOpen ? "open" : ""}`}
        onClick={handleClose}
      />

      {/* Panel */}
      <aside
        className={`canvas-panel fixed top-0 left-0 bottom-0 z-[500] flex flex-col bg-white w-[min(300px,88vw)] shadow-xl overflow-hidden ${isOpen ? "open" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-pink-pale shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-pink rounded-full flex items-center justify-center text-white font-bold text-[11px]">
              KB
            </div>
            <span className="font-serif text-[16px] font-bold text-gray-900">Kasibunkari</span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-pink w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-light/50"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100 shrink-0">
          <input
            type="search"
            placeholder="Search products…"
            className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 font-inter text-[13px] text-gray-700 outline-none focus:border-pink transition-colors"
          />
        </div>

        {/* ══ SLIDING TWO-PANEL NAV ══ */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div
            className="flex w-[200%] transition-transform duration-300 ease-out"
            style={{ transform: submenu ? "translateX(-50%)" : "translateX(0%)" }}
          >
            {/* ── PANEL 1: root menu ── */}
            <div className="w-1/2 shrink-0 py-1">
              <a
                href="#"
                className="flex items-center px-5 py-3 font-inter text-[12.5px] font-semibold text-white bg-pink border-b border-pink-dark/20"
              >
                New Arrivals
              </a>

              {/* Live categories from /api/menu (Sarees, Suits, ...) */}
              {categories.map((category) => (
                <button
                  key={category.category_slug}
                  onClick={() =>
                    category.attributes.length > 0
                      ? openSubmenu(
                          category.title,
                          <CategoryDetail category={category} onNavigate={handleClose} />,
                        )
                      : undefined
                  }
                  className="w-full flex items-center justify-between px-5 py-3 font-inter text-[12.5px] font-medium text-gray-700 border-b border-gray-100 hover:bg-pink-pale hover:text-pink transition-all text-left cursor-pointer"
                >
                  {category.title}
                  {category.attributes.length > 0 && (
                    <ChevronRight size={15} className="text-gray-300" />
                  )}
                </button>
              ))}

              <a
                href="#"
                className="flex items-center px-5 py-3 font-inter text-[12.5px] font-medium text-gray-700 border-b border-gray-100 hover:bg-pink-pale hover:text-pink transition-all"
              >
                Lehengas
              </a>

              <button
                onClick={() =>
                  openSubmenu(
                    "Wedding Collection",
                    <div className="py-2">
                      {WEDDING_COLLECTION_ITEMS.map((item) => (
                        <a
                          key={item}
                          href="#"
                          onClick={handleClose}
                          className="block px-5 py-3 font-inter text-[13px] text-gray-700 hover:bg-pink-pale hover:text-pink transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>,
                  )
                }
                className="w-full flex items-center justify-between px-5 py-3 font-inter text-[12.5px] font-medium text-gray-700 border-b border-gray-100 hover:bg-pink-pale hover:text-pink transition-all text-left cursor-pointer"
              >
                Wedding Collection
                <ChevronRight size={15} className="text-gray-300" />
              </button>

              {STATIC_LINKS.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex items-center px-5 py-3 font-inter text-[12.5px] font-medium text-gray-700 border-b border-gray-100 hover:bg-pink-pale hover:text-pink transition-all"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* ── PANEL 2: category / submenu detail ── */}
            <div className="w-1/2 shrink-0">
              <button
                onClick={closeSubmenu}
                className="w-full flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50 font-inter text-[12.5px] font-semibold text-gray-700 hover:text-pink transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                {submenu?.title || "Back"}
              </button>
              {submenu?.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 bg-pink-pale/50 space-y-1.5 shrink-0">
          <p className="font-inter text-[12px] text-gray-500">
            📞{" "}
            <a href="tel:+919270588878" className="text-pink font-medium">
              +91-9270588878
            </a>
          </p>
          <p className="font-inter text-[12px] text-gray-500">
            ✉{" "}
            <a href="mailto:kasibunkari@gmail.com" className="text-pink font-medium">
              kasibunkari@gmail.com
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}

function CategoryDetail({
  category,
  onNavigate,
}: {
  category: { title: string; category_slug: string; attributes: { title: string; slug: string; values: { name: string; slug: string }[] }[] };
  onNavigate: () => void;
}) {
  return (
    <div className="py-2">
      {/* FIX: was `/category/${category.title}` — wrong route prefix
          (should be /shop/) AND wrong field (title has spaces, not a
          slug). Now matches NavBarComponents' convention. */}
      <Link
        href={`/shop/${category.category_slug}`}
        onClick={onNavigate}
        className="block px-5 py-3 font-inter text-[13px] font-bold text-pink border-b border-gray-100"
      >
        Shop All {category.title} →
      </Link>
      {category.attributes.map((attr) => (
        <div key={attr.slug} className="px-5 py-3 border-b border-gray-100">
          <p className="font-inter text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            {attr.title}
          </p>
          <ul className="space-y-0.5">
            {attr.values.map((value) => (
              <li key={value.slug}>
                <Link
                  href={`/shop/${category.category_slug}/${attr.slug}/${value.slug}`}
                  onClick={onNavigate}
                  className="flex items-center gap-2 font-inter text-[12px] text-gray-600 py-1.5 hover:text-pink transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                  {value.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}