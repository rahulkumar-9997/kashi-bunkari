"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export type CartItem = {
  id: number;
  name: string;
  type: string;
  price: number;
  qty: number;
  c1: string;
  c2: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "qty">) => void;
  removeItem: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

let nextId = 100;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Black Blended Silk Saree", type: "Blended Silk", price: 4949, qty: 1, c1: "#1a1a1a", c2: "#555" },
    { id: 2, name: "Fuchsia Pink Blended Silk", type: "Blended Silk", price: 4949, qty: 1, c1: "#7c1a4a", c2: "#e05090" },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = useCallback((item: Omit<CartItem, "id" | "qty">) => {
    setCart((prev) => [...prev, { ...item, id: nextId++, qty: 1 }]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x))
    );
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, changeQty, cartCount, cartTotal, isOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
