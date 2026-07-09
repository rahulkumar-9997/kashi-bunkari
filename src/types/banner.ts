export type Banner = {
  id: number;
  title: string;
  content: string | null;
  image_path_desktop: string;
  image_path_mobile: string;
  collection_link: string | null;
  buy_now_link: string | null;
};

export type BannerApiResponse = {
  status: boolean;
  message: string;
  data: Banner[];
};