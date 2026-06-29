"use client";
import { useState } from "react";

type Props = { isOpen: boolean; onClose: () => void };

export default function MobileCanvas({ isOpen, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay fixed inset-0 z-[400] bg-black/50 ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`canvas-panel fixed top-0 left-0 bottom-0 z-[500] flex flex-col bg-white w-[min(300px,88vw)] shadow-xl overflow-y-auto ${isOpen ? "open" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-pink-pale">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-pink rounded-full flex items-center justify-center text-white font-bold text-[11px]">
              KB
            </div>
            <span className="font-serif text-[16px] font-bold text-gray-900">Kasibunkari</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-pink w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-light/50"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100">
          <input
            type="search"
            placeholder="Search products…"
            className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 font-inter text-[13px] text-gray-700 outline-none focus:border-pink transition-colors"
          />
        </div>

        {/* Nav */}
        <nav className="flex-1 py-1">
          <a href="#" className="flex items-center px-5 py-3 font-inter text-[12.5px] font-semibold text-white bg-pink border-b border-pink-dark/20">
            New Arrivals
          </a>

          <AccRow
            id="macc1"
            label="Sarees"
            expanded={expanded === "macc1"}
            onToggle={() => toggle("macc1")}
          >
            {["Silk Sarees", "Katan Kadwa", "Tissue Silk", "Mushroo Silk"].map((item) => (
              <a key={item} href="#" className="block px-8 py-2.5 font-inter text-[12px] text-gray-600 hover:text-pink transition-colors">
                {item}
              </a>
            ))}
          </AccRow>

          <a href="#" className="flex items-center px-5 py-3 font-inter text-[12.5px] font-medium text-gray-700 border-b border-gray-100 hover:bg-pink-pale hover:text-pink transition-all">
            Lehengas
          </a>

          <AccRow
            id="macc2"
            label="Wedding Collection"
            expanded={expanded === "macc2"}
            onToggle={() => toggle("macc2")}
          >
            {["Bridal Lehenga", "Bridal Sarees", "Anarkali"].map((item) => (
              <a key={item} href="#" className="block px-8 py-2.5 font-inter text-[12px] text-gray-600 hover:text-pink transition-colors">
                {item}
              </a>
            ))}
          </AccRow>

          {["Suit Sets", "Gowns", "Ready To Ship"].map((item) => (
            <a key={item} href="#" className="flex items-center px-5 py-3 font-inter text-[12.5px] font-medium text-gray-700 border-b border-gray-100 hover:bg-pink-pale hover:text-pink transition-all">
              {item}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 bg-pink-pale/50 space-y-1.5">
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

function AccRow({
  id,
  label,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`acc-row border-b border-gray-100 ${expanded ? "expanded" : ""}`} id={id}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3 font-inter text-[12.5px] font-medium text-gray-700 hover:bg-pink-pale hover:text-pink transition-all"
      >
        {label}
        <svg
          className="acc-chev w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" />
        </svg>
      </button>
      <div className={`acc-body bg-gray-50/50 ${expanded ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}
