export type ProductCategory = {
  title: string;
  slug: string;
};

export type ProductItem = {
  id: number;
  title: string;
  slug: string;
  mrp: number | null;
  offer_rate: number | null;
  sku: string | null;
  attribute_value: string;
  category: ProductCategory;
  image: string |null;
};

export type ProductListApiResponse = {
  status: boolean;
  message: string;
  data: ProductItem[];
};