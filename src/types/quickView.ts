export type QuickViewAttribute = { title: string; values: string[] };
export type QuickViewCategory = { title: string | null; slug: string | null };

export type QuickViewProduct = {
  id: number;
  title: string;
  slug: string;
  category: QuickViewCategory;
  images: string[];
  short_description: string | null;
  mrp: number | null;
  offer_rate: number | null;
  sku: string | null;
  stock_quantity: number | null;
  in_stock: boolean;
  attributes: QuickViewAttribute[];
};

export type QuickViewResponse = {
  success: boolean;
  message: string;
  data: QuickViewProduct;
};
