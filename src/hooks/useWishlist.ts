"use client";
import { useState, useCallback, useEffect } from "react";
import { wishlistService } from "@/services/wishlistService";
import type { WishlistItem } from "@/types/wishlist";

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await wishlistService.list();
      setItems(res.data.items);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const removeItem = useCallback(async (productId: number) => {
    setRemovingId(productId);
    setItems((prev) => prev.filter((i) => i.id !== productId)); // optimistic
    try {
      await wishlistService.remove(productId);
    } catch (e: any) {
      setError(e.message);
      const res = await wishlistService.list().catch(() => null);
      if (res) setItems(res.data.items);
    } finally {
      setRemovingId(null);
    }
  }, []);

  return { items, loading, error, removingId, refresh, removeItem };
}
