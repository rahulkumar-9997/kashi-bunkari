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

/**Product details type */
export type ProductDetailCategory = { id: number; title: string; slug: string };
 
export type ProductDetailAttributeValue = {
  id: number;
  name: string;
  slug: string;
  attributes_id: number;
};
 
export type ProductDetailAttributeValueEntry = {
  id: number;
  product_id: number;
  product_attribute_id: number;
  attributes_value_id: number;
  attribute_value: ProductDetailAttributeValue;
};
 
export type ProductDetailAttribute = {
  id: number;
  attributes_id: number;
  attribute: { id: number; title: string; slug: string };
  values: ProductDetailAttributeValueEntry[];
};
 
export type ProductDetailImageThumb = { id: number; image_thumb: string };
export type ProductDetailImageLarge = { id: number; image_large: string };
 
export type ProductDetails = {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  product_short_description: string | null;
  product_description: string | null;
  product_specification: string | null;
  meta_title: string | null;
  meta_description: string | null;
  video_id: string | null;
  mrp: number | null;
  offer_rate: number | null;
  purchase_rate: number | null;
  sku: string | null;
  stock_quantity: number | null;
  image_thumbs: ProductDetailImageThumb[];
  image_larges: ProductDetailImageLarge[];
  category: ProductDetailCategory;
  attributes: ProductDetailAttribute[];
  additional_features: unknown[];
};
 
export type RelatedProduct = {
  id: number;
  category: ProductCategory;
  title: string;
  slug: string;
  attribute_value_slug: string;
  category_title: string;
  image: string;
  mrp: number | null;
  offer_rate: number | null;
  purchase_rate: number | null;
  sku: string | null;
  stock_quantity: number | null;
};
 
export type ProductDetailMeta = { title: string; description: string; keywords: string };
 
export type ProductDetailData = {
  meta: ProductDetailMeta;
  product_details: ProductDetails;
  attribute: { id: number; title: string; slug: string } | null;
  attributes_value_name: { id: number; title: string; slug: string } | null;
  related_products: RelatedProduct[];
  other_related_products: Record<string, unknown>;
};
 
export type ProductDetailApiResponse = {
  success: boolean;
  message: string;
  data: ProductDetailData;
};
 