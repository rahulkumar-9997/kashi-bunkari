import { fetchCollections } from "@/services/collectionService";
import Collections from "./Collections";
import type { CollectionItem } from "@/types/collection";

export default async function CollectionsServer() {
  let data: CollectionItem[] = [];
  try {
    data = await fetchCollections();
  } catch {
    return null;
  }
  return <Collections data={data} />;
}
