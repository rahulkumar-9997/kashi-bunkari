import { fetchPopularProducts } from "@/services/productServices";
import Popular from "./Popular";
import type { ProductItem } from "@/types/product";

export default async function PopularServer() {
  let data: ProductItem[] = [];

  try {
    data = await fetchPopularProducts();
  } catch {
    return null;
  }

  return <Popular data={data} />;
}
