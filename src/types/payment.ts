export type CreateOrderData = {
  order_id: string;
  amount: number;
  currency: string;
  key: string;
};

export type CreateOrderResponse = {
  success: boolean;
  message: string;
  data: CreateOrderData;
};

export type VerifyPaymentPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type VerifyPaymentResponse = {
  success: boolean;
  message: string;
  data: { order_id: number | null };
};