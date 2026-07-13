export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type OrderItem = {
  name: string;
  image: string;
  quantity: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: string;
  items: OrderItem[];
};