"use client";
import { useState, useCallback, useEffect } from "react";
import { cartService } from "@/services/cartService";
import type { CartItem, CartData } from "@/types/cart";
export function useCartState() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyCartData = useCallback((data: CartData) => {
    setCart(data.items);
    setCartCount(data.total_quantity);
    setCartTotal(data.subtotal);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await cartService.getCart();
      applyCartData(res.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [applyCartData]);

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      try {
        setLoading(true);
        setError(null);
        const res = await cartService.addToCart(productId, quantity);
        applyCartData(res.data);
        setIsOpen(true);
      } catch (e: any) {
        setError(e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [applyCartData],
  );

  const changeQty = useCallback(
    async (productId: number, delta: number) => {
      const current = cart.find((i) => i.product_id === productId);
      if (!current) return;

      const newQty = current.quantity + delta;
      if (newQty < 1) return;
      setCart((prev) =>
        prev.map((i) =>
          i.product_id === productId ? { ...i, quantity: newQty } : i,
        ),
      );

      try {
        const res = await cartService.updateQuantity(productId, newQty);
        applyCartData(res.data);
      } catch (e: any) {
        setError(e.message);
        refreshCart();
      }
    },
    [cart, applyCartData, refreshCart],
  );

  const removeItem = useCallback(
    async (productId: number) => {
      setCart((prev) => prev.filter((i) => i.product_id !== productId));

      try {
        const res = await cartService.removeFromCart(productId);
        applyCartData(res.data);
      } catch (e: any) {
        setError(e.message);
        refreshCart();
      }
    },
    [applyCartData, refreshCart],
  );

  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await cartService.clearCart();
      applyCartData(res.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [applyCartData]);

  return {
    cart,
    cartCount,
    cartTotal,
    isOpen,
    loading,
    error,
    openCart,
    closeCart,
    addToCart,
    changeQty,
    removeItem,
    clearCart,
    refreshCart,
  };
}
