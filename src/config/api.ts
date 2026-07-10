export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ENDPOINTS = {
  banners: `${API_BASE_URL}/api/home/banner`,
  homeBlogs: `${API_BASE_URL}/api/home/blog`,
  blogList: `${API_BASE_URL}/api/blog`,
  blogDetail: (slug: string) => `${API_BASE_URL}/api/blog/${slug}`,
  testimonials: `${API_BASE_URL}/api/testimonials`,
  faqs: `${API_BASE_URL}/api/faq`,
};