export type OrderPreviewItem = {
  title: string;
  quantity: number;
  price: number;
  image: string | null;
};

export type OrderSummary = {
  id: number;
  order_number: string;
  order_date: string;
  status: string | null;
  status_color: string | null;
  payment_mode: "cod" | "online" | string;
  payment_received: boolean;
  grand_total: number;
  item_count: number;
  preview_items: OrderPreviewItem[];
};

export type OrderListPagination = {
  current_page: number;
  total_pages: number;
  per_page: number;
  total_orders: number;
  has_next_page: boolean;
};

export type OrderListResponse = {
  success: boolean;
  message: string;
  data: {
    orders: OrderSummary[];
    pagination: OrderListPagination;
  };
};

export type OrderItem = {
  product_id: number;
  title: string;
  sku: string | null;
  quantity: number;
  price: number;
  total_price: number;
  image: string | null;
  slug: string | null;
};

export type OrderAddressSummary = {
  full_name: string;
  phone_number: string;
  address: string;
  locality: string | null;
  city: string;
  state: string;
  pin_code: string;
  landmark: string | null;
};

export type OrderDetail = {
  id: number;
  order_number: string;
  order_date: string;
  status: string | null;
  status_color: string | null;
  payment_mode: "cod" | "online" | string;
  payment_received: boolean;
  payment_fail_reason: string | null;
  subtotal: number;
  shipping_amount: number;
  tax_amount: number;
  grand_total: number;
  address: OrderAddressSummary | null;
  items: OrderItem[];
};

export type OrderDetailResponse = {
  success: boolean;
  message: string;
  data: OrderDetail;
};
