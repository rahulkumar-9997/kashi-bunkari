export type HomeBlog = {
  id: number;
  title: string;
  slug: string;
  view_count: string;
  short_desc: string;
  reading_title: string;
  tags: string[];
  tag: string;
  main_image: string;
  published_at: string;
};

export type HomeBlogApiResponse = {
  status: boolean;
  message: string;
  data: HomeBlog[];
};