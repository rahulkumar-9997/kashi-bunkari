"use client";
import { useMutation } from "@tanstack/react-query";
import { checkoutService } from "@/services/checkoutService";
import type { PlaceOrderPayload, VerifyPaymentPayload } from "@/types/checkout";

export function usePlaceOrder() {
  return useMutation({
    mutationFn: (payload: PlaceOrderPayload) => checkoutService.placeOrder(payload),
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: (payload: VerifyPaymentPayload) => checkoutService.verifyPayment(payload),
  });
}