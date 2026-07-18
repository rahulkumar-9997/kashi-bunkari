export type CollectionProduct = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
};

export type CollectionItem = {
  id: number;
  title: string;
  slug: string;
  product: CollectionProduct | null;
};

export type CollectionsApiResponse = {
  status: boolean;
  message: string;
  data: CollectionItem[];
};
