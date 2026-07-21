export type WishlistItemCategory = {
  title: string | null;
  slug: string | null;
};

export type WishlistItem = {
  product_id: number;
  title: string;
  slug: string;
  category: WishlistItemCategory;
  image: string | null;
  mrp: string | number | null;
  offer_rate: string | number | null;
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
