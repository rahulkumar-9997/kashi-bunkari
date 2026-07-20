"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  User,
  ShoppingBag,
  Heart,
  LogOut,
  HelpCircle,
} from "lucide-react";
import SearchSuggestionsDropdown, {
  type SearchSuggestionsDropdownHandle,
} from "./SearchSuggestionsDropdown";

export default function LogoSearchBar({
  onMenuOpen,
}: {
  onMenuOpen: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { openLogin } = useAuthModal();
  const { isAuthenticated, customer, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileSearchValue, setMobileSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDesktopSuggestions, setShowDesktopSuggestions] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const desktopSearchWrapRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<SearchSuggestionsDropdownHandle>(null);
  const mobileDropdownRef = useRef<SearchSuggestionsDropdownHandle>(null);
  const mobileSearchWrapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAccountMenu(false);
        setShowDesktopSuggestions(false);
        setShowMobileSuggestions(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
      if (
        desktopSearchWrapRef.current &&
        !desktopSearchWrapRef.current.contains(event.target as Node)
      ) {
        setShowDesktopSuggestions(false);
      }
      if (
        mobileSearchWrapRef.current &&
        !mobileSearchWrapRef.current.contains(event.target as Node)
      ) {
        setShowMobileSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);
  useEffect(() => {
    if (!pathname.startsWith("/search")) {
      setSearchValue("");
      setMobileSearchValue("");
    }
  }, [pathname]);
  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
  };
  const handleMenuNavigation = () => {
    setShowAccountMenu(false);
  };
  const getDisplayName = () => {
    if (!isAuthenticated || !customer) return "Account";
    return customer.name?.split(" ")[0] || customer.name || "Account";
  };
  const getUserEmail = () => {
    if (!customer) return "";
    return customer.email || "";
  };

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      router.push("/account/wishlist");
    } else {
      openLogin();
    }
  };
  const goToSearchResults = (value: string) => {
    const q = value.trim();
    if (!q) return;
    setShowDesktopSuggestions(false);
    setShowMobileSuggestions(false);
    setSearchOpen(false);
    router.push(`/search?query=${encodeURIComponent(q)}`);
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    if (isAuthenticated) {
      setShowAccountMenu(true);
    }
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowAccountMenu(false);
      hoverTimeout.current = null;
    }, 200);
  };

  const handleMenuItemMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleMenuItemMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowAccountMenu(false);
      hoverTimeout.current = null;
    }, 200);
  };

  const showAnimatedPlaceholder = !isSearchFocused && !searchValue;

  return (
    <>
      <div
        className="w-full bg-white border-b border-gray-100 sticky top-0 z-[300] transition-shadow"
        style={{
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between h-16 md:h-18 px-3 md:px-0">
          {/* ══ MOBILE HEADER LAYOUT: Logo → Menu → Search ══ */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Logo */}
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

            {/* Menu + Search */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex items-center justify-center w-10 h-10 text-maroon hover:text-pink transition-colors"
                aria-label="Search"
              >
                <svg
                  width="21"
                  height="21"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </button>
              <button
                onClick={onMenuOpen}
                aria-label="Open menu"
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.25 text-maroon hover:text-pink transition-colors shrink-0"
              >
                <span className="w-6 h-[1.5px] bg-current" />
                <span className="w-6 h-[1.5px] bg-current" />
                <span className="w-6 h-[1.5px] bg-current" />
              </button>
            </div>
          </div>
          {/* ══ DESKTOP HEADER LAYOUT ══ */}
          {/* Left: Hamburger + Logo */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onMenuOpen}
              aria-label="Open menu"
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.25 text-gray-700 hover:text-pink transition-colors shrink-0"
            >
              <span className="w-5 h-[1.5px] bg-current" />
              <span className="w-5 h-[1.5px] bg-current" />
              <span className="w-4 h-[1.5px] bg-current" />
            </button>
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/kasibunkari_logo.webp"
                alt="Kasibunkari Logo"
                width={160}
                height={50}
                className="object-contain w-auto h-12"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Search */}
          <div
            className="flex-1 max-w-130 mx-auto relative hidden md:block px-4"
            ref={desktopSearchWrapRef}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="search"
                autoComplete="off"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setShowDesktopSuggestions(true);
                }}
                onFocus={() => {
                  setIsSearchFocused(true);
                  if (searchValue) setShowDesktopSuggestions(true);
                }}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={(e) => {
                  desktopDropdownRef.current?.handleKeyDown(e);
                  if (e.key === "Enter" && !e.defaultPrevented) {
                    goToSearchResults(searchValue);
                  }
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-11 pr-5 py-2.5 font-sans text-[13px] text-gray-700 outline-none focus:border-pink focus:bg-white transition-all"
                style={{ color: searchValue ? "#374151" : "transparent" }}
              />
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
              <button
                type="button"
                onClick={() => goToSearchResults(searchValue)}
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

            {showDesktopSuggestions && (
              <SearchSuggestionsDropdown
                ref={desktopDropdownRef}
                query={searchValue}
                onNavigate={() => {
                  setShowDesktopSuggestions(false);
                }}
                onSelectText={(text) => setSearchValue(text)}
              />
            )}
          </div>

          {/* ── Desktop Right: Icons ── */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            {/* Desktop — Wishlist (auth-gated: /account/wishlist or login modal) */}
            <button
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-maroon hover:text-pink transition-colors cursor-pointer"
              onClick={handleWishlistClick}
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
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-sans text-[10px] font-medium">
                Wishlist
              </span>
            </button>

            {/* Desktop — Account with Dropdown */}
            <div
              className="relative"
              ref={menuRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={
                  isAuthenticated
                    ? () => setShowAccountMenu((v) => !v)
                    : openLogin
                }
                className="hidden md:flex flex-col items-center gap-0.5 px-3 py-1.5 text-maroon hover:text-pink transition-colors cursor-pointer group"
                aria-expanded={showAccountMenu}
                aria-haspopup="true"
              >
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
                <span className="font-sans text-[10px] font-medium flex items-center gap-1">
                  {isAuthenticated ? getDisplayName() : "Account"}
                  {isAuthenticated && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${showAccountMenu ? "rotate-180" : ""}`}
                    />
                  )}
                </span>
              </button>

              {/* Dropdown Menu - Only show when authenticated */}
              {isAuthenticated && showAccountMenu && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                  onMouseEnter={handleMenuItemMouseEnter}
                  onMouseLeave={handleMenuItemMouseLeave}
                  style={{
                    animation:
                      "slideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                    transformOrigin: "top center",
                  }}
                >
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center">
                        <User size={18} className="text-maroon" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-semibold text-gray-800">
                          {customer?.name || "User"}
                        </p>
                        <p className="font-sans text-xs text-gray-500 truncate max-w-45">
                          {getUserEmail() || "user@email.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/account"
                      className="flex items-center gap-3 px-4 py-2.5 font-sans text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      onClick={handleMenuNavigation}
                    >
                      <User
                        size={16}
                        className="text-gray-400 group-hover:text-maroon transition-colors"
                      />
                      <span>My Account</span>
                    </Link>

                    <Link
                      href="/account/orders"
                      className="flex items-center gap-3 px-4 py-2.5 font-sans text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      onClick={handleMenuNavigation}
                    >
                      <ShoppingBag
                        size={16}
                        className="text-gray-400 group-hover:text-maroon transition-colors"
                      />
                      <span>My Orders</span>
                    </Link>

                    <Link
                      href="/account/wishlist"
                      className="flex items-center gap-3 px-4 py-2.5 font-sans text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      onClick={handleMenuNavigation}
                    >
                      <Heart
                        size={16}
                        className="text-gray-400 group-hover:text-maroon transition-colors"
                      />
                      <span>Wishlist</span>
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-1"></div>

                  {/* Bottom Section */}
                  <div className="py-1">
                    <Link
                      href="/contact-us"
                      className="flex items-center gap-3 px-4 py-2.5 font-sans text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      onClick={handleMenuNavigation}
                    >
                      <HelpCircle
                        size={16}
                        className="text-gray-400 group-hover:text-maroon transition-colors"
                      />
                      <span>Help & Support</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 font-sans text-sm text-red-600 hover:bg-red-50 transition-colors group cursor-pointer"
                    >
                      <LogOut
                        size={16}
                        className="text-red-400 group-hover:text-red-600 transition-colors"
                      />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop — Cart */}
            <button
              onClick={openCart}
              className="hidden md:flex relative flex-col items-center gap-0.5 px-3 py-1.5 text-maroon hover:text-pink transition-colors cursor-pointer"
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
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4.5 h-4.5 bg-pink text-maroon font-sans text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-maroon">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search drawer */}
      {searchOpen && (
        <div className="md:hidden w-full bg-white px-4 py-3 border-b border-gray-100 sticky top-16 z-[290]">
          <div className="relative" ref={mobileSearchWrapRef}>
            <input
              type="search"
              autoComplete="off"
              value={mobileSearchValue}
              onChange={(e) => {
                setMobileSearchValue(e.target.value);
                setShowMobileSuggestions(true);
              }}
              onFocus={() => {
                if (mobileSearchValue) setShowMobileSuggestions(true);
              }}
              onKeyDown={(e) => {
                mobileDropdownRef.current?.handleKeyDown(e);
                if (e.key === "Enter" && !e.defaultPrevented) {
                  goToSearchResults(mobileSearchValue);
                }
              }}
              placeholder="Search for products, brands and more"
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-11 py-2.5 font-sans text-[13px] text-gray-700 outline-none focus:border-pink focus:bg-white transition-all placeholder:text-gray-400"
              autoFocus
            />
            <button
              type="button"
              onClick={() => goToSearchResults(mobileSearchValue)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink transition-colors"
            >
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

            {showMobileSuggestions && (
              <SearchSuggestionsDropdown
                ref={mobileDropdownRef}
                query={mobileSearchValue}
                onNavigate={() => {
                  setShowMobileSuggestions(false);
                  setSearchOpen(false);
                }}
                onSelectText={(text) => setMobileSearchValue(text)}
              />
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          MOBILE BOTTOM STICKY NAV
          Home · Wishlist · Account · Cart
      ══════════════════════════════════════ */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-300 bg-white border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-stretch divide-x divide-gray-100 max-w-7xl mx-auto">
          <a
            href="/"
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-2.5 text-maroon hover:text-pink transition-colors"
          >
            <svg
              width="21"
              height="21"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.7"
              className="shrink-0"
            >
              <path
                d="M3 11l9-8 9 8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-sans text-[12px] font-medium leading-none whitespace-nowrap">
              Home
            </span>
          </a>

          {/* Wishlist — auth-gated: /account/wishlist or login modal */}
          <button
            onClick={handleWishlistClick}
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-2.5 text-maroon hover:text-pink transition-colors cursor-pointer"
          >
            <svg
              width="21"
              height="21"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.7"
              className="shrink-0"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-sans text-[12px] font-medium leading-none whitespace-nowrap">
              Wishlist
            </span>
          </button>

          {/* Account — opens login modal if signed out, otherwise toggles the menu */}
          <button
            onClick={
              isAuthenticated ? () => setShowAccountMenu((v) => !v) : openLogin
            }
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-2.5 text-maroon hover:text-pink transition-colors cursor-pointer"
          >
            <svg
              width="21"
              height="21"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.7"
              className="shrink-0"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
            </svg>
            <span className="font-sans text-[12px] font-medium leading-none whitespace-nowrap">
              {isAuthenticated ? getDisplayName() : "Account"}
            </span>
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="flex-1 min-w-0 relative flex flex-col items-center justify-center gap-0.5 py-2.5 text-maroon hover:text-pink transition-colors cursor-pointer"
          >
            <span className="relative shrink-0">
              <svg
                width="21"
                height="21"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
              >
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-4 h-4 bg-pink text-white font-sans text-[8.5px] font-bold rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </span>
            <span className="font-sans text-[12px] font-medium leading-none whitespace-nowrap">
              Cart
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
