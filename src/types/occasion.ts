export type OccasionItem = {
  id: number;
  title: string;
  slug: string;
  image: string;
  product_count: string;
};

export type OccasionApiResponse = {
  status: boolean;
  message: string;
  data: OccasionItem[];
};