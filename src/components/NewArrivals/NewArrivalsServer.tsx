import { fetchNewArrivals } from "@/services/productServices";
import NewArrivals from "./NewArrivals";
import type { ProductItem } from "@/types/product";

export default async function NewArrivalsServer() {
  let data: ProductItem[] = [];
  try {
    data = await fetchNewArrivals();
  } catch {
    return null;
  }

  return <NewArrivals data={data} />;
}
