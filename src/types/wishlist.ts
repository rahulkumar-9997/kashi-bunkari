export type WishlistItemCategory = {
  title: string | null;
  slug: string | null;
};

export type WishlistItem = {
  id: number;
  title: string;
  slug: string;
  mrp: string | number | null;
  offer_rate: string | number | null;
  sku: string | null;
  attribute_value: string | null;
  category: WishlistItemCategory;
  image: string | null;
  in_stock: boolean;
};

export type WishlistData = {
  items: WishlistItem[];
  item_count: number;
};

export type WishlistApiResponse = {
  success: boolean;
  message: string;
  data: WishlistData;
};

export type WishlistToggleData = WishlistData & { wishlisted: boolean };

export type WishlistToggleApiResponse = {
  success: boolean;
  message: string;
  data: WishlistToggleData;
};

export type WishlistErrorResponse = {
  success: false;
  error_code: string;
  message: string;
};
