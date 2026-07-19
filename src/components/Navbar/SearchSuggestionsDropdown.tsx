"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Search, ImageOff } from "lucide-react";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import type {
  SearchSuggestionItem,
  SearchSuggestionTextItem,
  SearchSuggestionProductItem,
} from "@/types/search";

function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export type SearchSuggestionsDropdownHandle = {
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

type Props = {
  query: string;
  onNavigate: () => void;
  onSelectText: (text: string) => void;
};

const SearchSuggestionsDropdown = forwardRef<
  SearchSuggestionsDropdownHandle,
  Props
>(function SearchSuggestionsDropdown({ query, onNavigate, onSelectText }, ref) {
  const router = useRouter();
  const { data, isSearching, isError, hasQuery, isTooShort } =
    useSearchSuggestions(query);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const items: SearchSuggestionItem[] = data ?? [];
  const hasResults = items.length > 0;

  useEffect(() => {
    setHighlightedIndex(-1);
    itemRefs.current = [];
  }, [items]);

  useEffect(() => {
    itemRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  // FIX: was `/product/${slug}/${attr}` (singular, 404s) — the real
  // route folder is app/products/[parentSlug]/[slug] (plural).
  const selectItem = (item: SearchSuggestionItem) => {
    if (item.type === "suggestion") {
      onSelectText(item.title);
    } else {
      router.push(`/products/${item.slug}/${item.attributes_value_slug}`);
      onNavigate();
    }
  };

  useImperativeHandle(ref, () => ({
    handleKeyDown: (e) => {
      if (!hasResults) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev <= 0 ? items.length - 1 : prev - 1,
        );
      } else if (e.key === "Enter") {
        if (highlightedIndex >= 0 && highlightedIndex < items.length) {
          e.preventDefault();
          selectItem(items[highlightedIndex]);
        }
      }
    },
  }));

  if (!hasQuery) return null;

  const textHints = items
    .map((item, i) => ({ item, i }))
    .filter(
      (entry): entry is { item: SearchSuggestionTextItem; i: number } =>
        entry.item.type === "suggestion",
    );
  const products = items
    .map((item, i) => ({ item, i }))
    .filter(
      (entry): entry is { item: SearchSuggestionProductItem; i: number } =>
        entry.item.type === "product",
    );

  return (
    <div
      className="absolute left-0 right-0 top-[calc(100%+8px)] z-[310] bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden max-h-[70vh] overflow-y-auto"
      data-lenis-prevent
    >
      {isTooShort ? (
        <p className="px-4 py-4 font-sans text-[12.5px] text-gray-400 text-center">
          Keep typing — at least 2 characters to search
        </p>
      ) : isSearching && !hasResults ? (
        <div className="flex items-center justify-center gap-2 px-4 py-6">
          <Loader2 size={16} className="text-maroon animate-spin" />
          <span className="font-sans text-[12.5px] text-gray-400">
            Searching…
          </span>
        </div>
      ) : isError ? (
        <p className="px-4 py-4 font-sans text-[12.5px] text-gray-400 text-center">
          Couldn&apos;t load suggestions right now.
        </p>
      ) : hasResults ? (
        <div className="py-2">
          {textHints.length > 0 && (
            <div className="px-2 pb-1">
              <p className="px-2.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                Suggestions
              </p>
              {textHints.map(({ item, i }) => (
                <button
                  key={`${item.title}-${i}`}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  onClick={() => selectItem(item)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors text-left cursor-pointer ${
                    highlightedIndex === i
                      ? "bg-[#FBF6ED]"
                      : "hover:bg-[#FBF6ED]"
                  }`}
                >
                  <Search size={13} className="text-gray-400 shrink-0" />
                  <span className="font-sans text-[13px] text-gray-700 line-clamp-1">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          )}

          {products.length > 0 && (
            <div
              className={`px-2 pt-1 ${textHints.length > 0 ? "border-t border-gray-50" : ""}`}
            >
              <p className="px-2.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                Products
              </p>
              {products.map(({ item, i }) => (
                <Link
                  key={`${item.slug}-${i}`}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={`/product/${item.slug}/${item.attributes_value_slug}`}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors ${
                    highlightedIndex === i
                      ? "bg-[#FBF6ED]"
                      : "hover:bg-[#FBF6ED]"
                  }`}
                >
                  <span className="relative w-10 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center">
                        <ImageOff size={14} className="text-gray-300" />
                      </span>
                    )}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-sans text-[13px] text-gray-700 line-clamp-1">
                      {item.title}
                    </span>
                    <span className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#AD8A3B]/10 text-[#AD8A3B] font-sans font-medium">
                        {item.category}
                      </span>
                      {item.offer_rate != null && (
                        <span className="font-sans text-[11.5px] font-bold text-gray-800">
                          {formatPrice(item.offer_rate)}
                        </span>
                      )}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
          <Search size={20} className="text-gray-300" />
          <p className="font-sans text-[12.5px] text-gray-400">
            No results for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
});

export default SearchSuggestionsDropdown;