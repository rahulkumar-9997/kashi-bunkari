"use client";
import { useState, useCallback, useEffect } from "react";
import { orderService } from "@/services/orderService";
import type { OrderSummary, OrderListPagination } from "@/types/order";

export function useOrders() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [pagination, setPagination] = useState<OrderListPagination | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (page: number, append: boolean) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);
      const res = await orderService.list(page);
      setOrders((prev) =>
        append ? [...prev, ...res.data.orders] : res.data.orders,
      );
      setPagination(res.data.pagination);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    load(1, false);
  }, [load]);

  const loadMore = useCallback(() => {
    if (pagination && pagination.has_next_page && !loadingMore) {
      load(pagination.current_page + 1, true);
    }
  }, [pagination, loadingMore, load]);

  return { orders, pagination, loading, loadingMore, error, loadMore };
}
