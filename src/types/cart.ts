
export type CartItemCategory = {
  title: string | null;
  slug: string | null;
};

export type CartItem = {
  product_id: number;
  title: string;
  slug: string;
  category: CartItemCategory;
  image: string | null;
  mrp: string | number | null;
  offer_rate: string | number | null;
  sku: string | null;
  in_stock: boolean;
  available_stock: number | null;
  quantity: number;
  line_total: number | null;
};

export type CartData = {
  items: CartItem[];
  item_count: number;
  total_quantity: number;
  subtotal: number;
  is_guest_cart: boolean;
};

export type CartApiResponse = {
  success: boolean;
  message: string;
  data: CartData;
};

export type CartErrorResponse = {
  success: false;
  error_code: string;
  message: string;
};
