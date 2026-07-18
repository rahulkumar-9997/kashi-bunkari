import { API_ENDPOINTS } from "@/config/api";
import type {
  ProductListApiResponse,
  ProductItem,
  ProductDetailApiResponse,
  ProductDetailData,
} from "@/types/product";

async function fetchProductList(url: string): Promise<ProductItem[]> {
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Product API responded with status ${res.status}`);
  }

  const json: ProductListApiResponse = await res.json();

  if (!json?.status || !Array.isArray(json.data)) {
    throw new Error("Product API returned an unexpected response");
  }

  return json.data;
}

export async function fetchPopularProducts(): Promise<ProductItem[]> {
  return fetchProductList(API_ENDPOINTS.popularProducts);
}

export async function fetchNewArrivals(): Promise<ProductItem[]> {
  return fetchProductList(API_ENDPOINTS.newArrivals);
}

export async function fetchProductDetail(
  parentSlug: string,
  attributeValueSlug: string,
): Promise<ProductDetailData> {
  const url = API_ENDPOINTS.productDetail(parentSlug, attributeValueSlug);
  const res = await fetch(url, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Product detail API responded with status ${res.status}`);
  }
  const json: ProductDetailApiResponse = await res.json();
  if (!json?.success || !json.data?.product_details) {
    throw new Error("Product detail API returned an unexpected response");
  }
  return json.data;
}
