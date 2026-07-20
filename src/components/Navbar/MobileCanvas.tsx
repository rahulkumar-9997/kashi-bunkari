"use client";
import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Phone, Mail } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
type Props = { isOpen: boolean; onClose: () => void };
type Submenu = { title: string; content: ReactNode };
export default function MobileCanvas({ isOpen, onClose }: Props) {
  const pathname = usePathname();
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

  const [submenu, setSubmenu] = useState<Submenu | null>(null);

  const openSubmenu = (title: string, content: ReactNode) =>
    setSubmenu({ title, content });
  const closeSubmenu = () => setSubmenu(null);

  const handleClose = () => {
    onClose();
    setTimeout(closeSubmenu, 300);
  };
  useEffect(() => {
    if (isOpen) handleClose();
  }, [pathname]);

  return (
    <>
      <div
        className={`drawer-overlay fixed inset-0 z-[400] bg-black/50 ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`canvas-panel fixed top-0 left-0 bottom-0 z-[500] flex flex-col bg-white w-[min(300px,88vw)] shadow-xl overflow-y-auto ${isOpen ? "open" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-pink-pale shrink-0">
          <div className="flex items-center gap-2.5">
              <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/kasibunkari_logo.webp"
                alt="Kasibunkari Logo"
                width={160}
                height={50}
                className="object-contain w-auto h-8 sm:h-9"
                priority
              />
            </Link>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-pink w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-light/50"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>        

        {/* ══ SLIDING TWO-PANEL NAV ══ */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden"  data-lenis-prevent>
          <div
            className="flex w-[200%] transition-transform duration-300 ease-out"
            style={{
              transform: submenu ? "translateX(-50%)" : "translateX(0%)",
            }}
          >
            {/* ── PANEL 1: root menu ── */}
            <div className="w-1/2 shrink-0 py-1 pt-3 pb-5">
              <Link
                href="/shop/new-arrival"
                onClick={handleClose}
                className="relative flex items-center gap-2 px-5 py-2.5 font-sans text-[16px] font-medium text-gray-600 hover:text-maroon transition-colors duration-200 whitespace-nowrap"
              >
                New Arrivals
              </Link>
              {categories.map((category) => (
                <button
                  key={category.category_slug}
                  onClick={() =>
                    category.attributes.length > 0
                      ? openSubmenu(
                          category.title,
                          <CategoryDetail
                            category={category}
                            onNavigate={handleClose}
                          />,
                        )
                      : undefined
                  }
                  className="w-full flex items-center justify-between px-5 py-2.5 font-inter font-sans text-[16px] font-medium text-gray-600 hover:text-maroon transition-colors border-b border-gray-100 text-left cursor-pointer"
                >
                  {category.title}
                  {category.attributes.length > 0 && (
                    <ChevronRight size={15} className="text-gray-300" />
                  )}
                </button>
              ))}

              {/* Shop By Occasion — same data source as NavBarComponents */}
              {occasionItems.length > 0 && (
                <button
                  onClick={() =>
                    openSubmenu(
                      "Shop By Occasion",
                      <div className="px-5 py-3">
                        {occasionItems.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/shop/${item.slug}`}
                            onClick={handleClose}
                            className="flex items-center gap-2 font-inter text-[16px] text-gray-600 py-1.5 hover:text-pink transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                              {item.title}
                          </Link>                          
                        ))}
                      </div>,
                    )
                  }
                  className="w-full flex items-center justify-between px-5 py-2.5 font-inter font-sans text-[16px] font-medium text-gray-600 hover:text-maroon transition-colors border-b border-gray-100 text-left cursor-pointer"

                >
                  Shop By Occasion
                  <ChevronRight size={15} className="text-gray-300" />
                </button>
              )}

              {/* Shop By Collection — same data source as NavBarComponents */}
              {collectionItems.length > 0 && (
                <button
                  onClick={() =>
                    openSubmenu(
                      "Shop By Collection",
                      <div className="px-5 py-3">
                        {collectionItems.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/shop/${item.slug}`}
                            onClick={handleClose}
                            className="flex items-center gap-2 font-inter text-[16px] text-gray-600 py-1.5 hover:text-pink transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                              {item.title}
                          </Link>                           
                        ))}
                      </div>,
                    )
                  }
                  className="w-full flex items-center justify-between px-5 py-2.5 font-inter font-sans text-[16px] font-medium text-gray-600 hover:text-maroon transition-colors border-b border-gray-100 text-left cursor-pointer"

                >
                  Shop By Collection
                  <ChevronRight size={15} className="text-gray-300" />
                </button>
              )}

              <a
                href="#"
                className="flex items-center px-5 py-2.5 font-inter font-sans text-[16px] font-medium text-gray-600 hover:text-maroon transition-colors border-b border-gray-100 text-left cursor-pointer"
              >
                Bestsellers
              </a>                          
            </div>

            {/* ── PANEL 2: category / submenu detail ── */}
            <div className="w-1/2 shrink-0">
              <button
                onClick={closeSubmenu}
                className="w-full flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50 font-inter text-[15px] font-semibold text-gray-700 hover:text-pink transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                {submenu?.title || "Back"}
              </button>
              {submenu?.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-5 border-t border-[#EFE0D0] shrink-0 bg-[linear-gradient(180deg,_#FBF6ED,_#FDF3F6)]">
          <div className="space-y-2">
            <a
              href="tel:+919270588878"
              className="group flex items-center gap-3 rounded-xl bg-white border border-[#EFE0D0] px-3.5 py-2 shadow-sm transition-all duration-200 hover:border-pink/40 hover:shadow-md active:scale-[0.98]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink/10 transition-colors duration-200 group-hover:bg-pink">
                <Phone size={15} className="text-pink transition-colors duration-200 group-hover:text-white" />
              </span>
              <span className="min-w-0">               
                <span className="block font-inter text-[13px] font-semibold text-gray-800">
                  +91 92705 88878
                </span>
              </span>
            </a>
 
            <a
              href="mailto:kasibunkari@gmail.com"
              className="group flex items-center gap-3 rounded-xl bg-white border border-[#EFE0D0] px-3.5 py-2 shadow-sm transition-all duration-200 hover:border-pink/40 hover:shadow-md active:scale-[0.98]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink/10 transition-colors duration-200 group-hover:bg-pink">
                <Mail size={15} className="text-pink transition-colors duration-200 group-hover:text-white" />
              </span>
              <span className="min-w-0">                
                <span className="block font-inter text-[13px] font-semibold text-gray-800 truncate">
                  kasibunkari@gmail.com
                </span>
              </span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

function CategoryDetail({
  category,
  onNavigate,
}: {
  category: {
    title: string;
    category_slug: string;
    attributes: {
      title: string;
      slug: string;
      values: { name: string; slug: string }[];
    }[];
  };
  onNavigate: () => void;
}) {
  return (
    <div className="py-2" data-lenis-prevent>
      <Link
        href={`/shop/${category.category_slug}`}
        onClick={onNavigate}
        className="block px-5 py-3 font-inter text-[13px] font-bold text-pink border-b border-gray-100"
      >
        Shop All {category.title} →
      </Link>
      {category.attributes.map((attr) => (
        <div key={attr.slug} className="px-5 py-3 border-b border-gray-100">
          <p className="font-inter text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            {attr.title}
          </p>
          <ul className="space-y-0.5">
            {attr.values.map((value) => (
              <li key={value.slug}>
                <Link
                  href={`/shop/${category.category_slug}/${attr.slug}/${value.slug}`}
                  onClick={onNavigate}
                  className="flex items-center gap-2 font-inter text-[16px] text-gray-600 py-1.5 hover:text-pink transition-colors"
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
