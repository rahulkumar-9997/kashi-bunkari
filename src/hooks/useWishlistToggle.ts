"use client";
import { useState, useEffect, useCallback } from "react";
import { wishlistService } from "@/services/wishlistService";
import { useAuth } from "@/context/AuthContext";

export function useWishlistToggle(productId: number) {
  const { isAuthenticated } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      setWishlisted(false);
      setChecking(false);
      return;
    }

    let cancelled = false;
    setChecking(true);

    wishlistService
      .list()
      .then((res) => {
        if (!cancelled) {
          setWishlisted(
            res.data.items.some((item) => item.product_id === productId),
          );
        }
      })
      .catch(() => {
        
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, productId]);

  const toggle = useCallback(async (): Promise<boolean> => {
    if (!isAuthenticated) {
      throw new Error("Please log in to use your wishlist.");
    }
    setLoading(true);
    try {
      const res = await wishlistService.toggle(productId);
      setWishlisted(res.data.wishlisted);
      return res.data.wishlisted;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, productId]);

  return { wishlisted, checking, loading, toggle };
}
