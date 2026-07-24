"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type QuickViewContextType = {
  isOpen: boolean;
  slug: string | null;
  attributeValueSlug: string | null;
  open: (slug: string, attributeValueSlug?: string) => void;
  close: () => void;
};

const QuickViewContext = createContext<QuickViewContextType | null>(null);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const [attributeValueSlug, setAttributeValueSlug] = useState<string | null>(
    null,
  );

  const open = useCallback((s: string, avs?: string) => {
    setSlug(s);
    setAttributeValueSlug(avs ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <QuickViewContext.Provider
      value={{ isOpen, slug, attributeValueSlug, open, close }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx)
    throw new Error("useQuickView must be used within QuickViewProvider");
  return ctx;
}
