
export interface BlogParagraph {
  title: string | null;
  content: string;
  image: string | null;
}
export interface BlogImage {
  image: string | null;
  alt_text: string | null;
}

export interface BlogDetail {
  id: number;
  meta_title: string
  meta_description: string | null;
  title: string;
  slug: string;
  reading_title: string;
  tags: string | null;
  view_count: string;
  short_desc: string | null;
  content: string;
  main_image: string | null;
  page_image: string | null;
  published_at: string | null;
  paragraphs: BlogParagraph[];
  images: BlogImage[];
}

export interface RelatedBlog {
  id: number;
  title: string;
  slug: string;
  short_desc: string | null;
  reading_title: string | null;
  view_count: string | null;
  tag: string | null;
  main_image: string | null;
  published_at: string | null;
}

export interface BlogDetailApiResponse {
  status: boolean;
  message: string;
  data: BlogDetail;
  you_might_also_like: RelatedBlog[];
}