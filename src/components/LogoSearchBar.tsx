    "use client";
    import { useState, useEffect, useRef } from "react";
    import { useCart } from "./CartContext";
    import Image from "next/image";
    export default function LogoSearchBar({
    onMenuOpen,
    }: {
    onMenuOpen: () => void;
    }) {
    const { cartCount, openCart } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const searchSuggestions = [
        "Search for products, brands and more",
        "Bridal Lehengas",
        "Banarasi Sarees",
        "Wedding Collection",
        "Anarkali Suits",
        "Party Wear Gowns",
        "Designer Kurtis",
        "Festive Collection",
    ];
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
        setAnimating(true);
        setTimeout(() => {
            setCurrentSuggestionIndex(
            (prev) => (prev + 1) % searchSuggestions.length,
            );
            setAnimating(false);
        }, 300);
        }, 2500);
        return () => clearInterval(interval);
    }, [searchSuggestions.length]);
    const showAnimatedPlaceholder = !isSearchFocused && !searchValue;
    return (
    <>
        {/* Keyframe styles injected once */}
        <style>{`
            @keyframes slideUpIn {
            from { transform: translateY(60%); opacity: 0; }
            to   { transform: translateY(0);   opacity: 1; }
            }
            @keyframes slideUpOut {
            from { transform: translateY(0);   opacity: 1; }
            to   { transform: translateY(-60%); opacity: 0; }
            }
            .placeholder-enter {
            animation: slideUpIn 0.3s ease forwards;
            }
            .placeholder-exit {
            animation: slideUpOut 0.3s ease forwards;
            }
        `}</style>

        <div
            className="w-full bg-white border-b border-gray-100 sticky top-0 z-[300] transition-shadow duration-300"
            style={{
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
            }}>
            <div className="mx-auto max-w-7xl flex items-center justify-between h-18">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
                <button
                onClick={onMenuOpen}
                aria-label="Open menu"
                className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.25 text-gray-700 hover:text-pink transition-colors shrink-0"
                >
                <span className="w-5 h-[1.5px] bg-current" />
                <span className="w-5 h-[1.5px] bg-current" />
                <span className="w-4 h-[1.5px] bg-current" />
                </button>
                <a href="/" className="flex items-center shrink-0">
                <Image
                    src="/images/kasibunkari_logo.webp"
                    alt="Kasibunkari Logo"
                    width={160}
                    height={50}
                    className="object-contain w-auto h-8 sm:h-10 md:h-12"
                    priority
                />
                </a>
            </div>

            {/* Center: Desktop Search */}
            <div className="flex-1 max-w-130 mx-auto relative hidden md:block px-4">
                <div className="relative">
                {/* Real input — transparent text when empty so placeholder overlay shows */}
                <input
                    ref={inputRef}
                    type="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-full pl-11 pr-5 py-2.5 font-sans text-[13px] text-gray-700 outline-none focus:border-pink focus:bg-white transition-all"
                    style={{ color: searchValue ? "#374151" : "transparent" }}
                />

                {/* Animated sliding placeholder — hidden when focused or has value */}
                {showAnimatedPlaceholder && (
                    <span
                    key={currentSuggestionIndex}
                    className={`pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 whitespace-nowrap overflow-hidden max-w-[calc(100%-3.5rem)] ${
                        animating ? "placeholder-exit" : "placeholder-enter"
                    }`}
                    >
                    {searchSuggestions[currentSuggestionIndex]}
                    </span>
                )}

                {/* Search icon */}
                <button
                    type="submit"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink transition-colors"
                    aria-label="Search"
                >
                    <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    </svg>
                </button>
                </div>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-1 shrink-0">
                {/* Mobile search toggle */}
                <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden flex flex-col items-center gap-0.5 px-3 py-1.5 text-gray-500 hover:text-pink transition-colors"
                >
                <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <span className="font-sans text-[10px] font-medium">Search</span>
                </button>

                {/* Wishlist */}
                <button className="hidden sm:flex flex-col items-center gap-0.5 px-3 py-1.5 text-maroon hover:text-pink transition-colors cursor-pointer" onClick={() => console.log("Wishlist")}>
                <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                >
                    <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    strokeLinecap="round"
                    />
                </svg>
                <span className="font-sans text-[10px] font-medium">
                    Wishlist
                </span>
                </button>

                {/* Account */}
                <button className="hidden sm:flex flex-col items-center gap-0.5 px-3 py-1.5 text-maroon hover:text-pink transition-colors cursor-pointer">
                <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
                </svg>
                <span className="font-sans text-[10px] font-medium">Account</span>
                </button>

                {/* Cart */}
                <button
                onClick={openCart}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-maroon hover:text-pink transition-colors cursor-pointer"
                >
                <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                >
                    <path
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" />
                </svg>
                <span className="font-sans text-[10px] font-medium">Cart</span>
                {/* {cartCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-4.5 h-4.5 bg-pink text-maroon font-sans text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-maroon">
                    {cartCount}
                    </span>
                )} */}
                </button>
            </div>
            </div>
        </div>

        {/* Mobile search drawer */}
        {searchOpen && (
            <div className="md:hidden w-full bg-white px-4 py-3 border-b border-gray-100">
            <div className="relative">
                <input
                type="search"
                placeholder="Search for products, brands and more"
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-11 py-2.5 font-sans text-[13px] text-gray-700 outline-none focus:border-pink focus:bg-white transition-all placeholder:text-gray-400"
                autoFocus
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink transition-colors">
                <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                </button>
            </div>
            </div>
        )}
    </>
  );
}
