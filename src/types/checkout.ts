import type { AddressPayload } from "@/types/address";

export type PlaceOrderPayload = {
  payment_method: "cod" | "razorpay";
  email: string;
  address_id?: number;
  address?: AddressPayload;
  save_address?: boolean;
};

export type PlaceOrderCodResponse = {
  success: boolean;
  message: string;
  data: { order_id: number; order_number: string };
};

export type PlaceOrderRazorpayResponse = {
  success: boolean;
  message: string;
  data: { order_id: string; amount: number; currency: string; key: string };
};

export type VerifyPaymentPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type VerifyPaymentResponse = {
  success: boolean;
  message: string;
  data: { order_id: number | null; order_number?: string };
};
