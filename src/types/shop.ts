export type ShopProduct = {
  id: number;
  title: string;
  slug: string;
  mrp: number | null;
  offer_price: number | null;
  sku: string | null;
  stock_quantity: number | null;
  image: string | null;
  attributes_value_slug: string | null;
  category: string | null;
};

export type ShopFilterValue = { id: number; name: string; slug: string };
export type ShopFilter = { id: number; title: string; slug: string; values: ShopFilterValue[] };

export type ShopPagination = {
  current_page: number;
  total_pages: number;
  per_page: number;
  total_products: number;
  next_page_url: string | null;
  previous_page_url: string | null;
  has_next_page: boolean;
  has_previous_page: boolean;
};

export type ShopMeta = { title: string; description: string; keywords: string };
export type ShopCategory = { id: number; title: string; slug: string };
export type ShopAttribute = { id: number; title: string; slug: string };
export type ShopAttributeValue = { id: number; name: string; slug: string };
export type ShopTag = { id: number; title: string; slug: string; content: string | null };
export type ShopPrimaryCategory = {
  title: string | null;
  short_content: string | null;
  long_content: string | null;
};

export type ShopResponseData = {
  type: "category" | "category_attribute_value" | "tag";
  meta: ShopMeta;
  primary_category?: ShopPrimaryCategory;
  category?: ShopCategory;
  attribute?: ShopAttribute;
  attribute_value?: ShopAttributeValue;
  tag?: ShopTag;
  products: ShopProduct[];
  pagination: ShopPagination;
  product_filters: ShopFilter[];
};

export type ShopApiResponse = {
  success: boolean;
  message: string;
  data: ShopResponseData;
};