"use client";
import { createContext, useContext, ReactNode } from "react";
import { useCartState } from "@/hooks/useCartState";

type CartContextType = ReturnType<typeof useCartState>;

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartState = useCartState();

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
