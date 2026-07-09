import { API_ENDPOINTS } from "@/config/api";
import type { HomeBlog, HomeBlogApiResponse } from "@/types/blog";
import type {
  BlogDetail,
  RelatedBlog,
  BlogDetailApiResponse,
} from "@/types/blogDetail";
 

export async function fetchHomeBlogs(): Promise<HomeBlog[]> {
  const res = await fetch(API_ENDPOINTS.homeBlogs);
  if (!res.ok) {
    throw new Error(`Blog API responded with status ${res.status}`);
  }
  const json: HomeBlogApiResponse = await res.json();
  if (!json?.status || !Array.isArray(json.data)) {
    throw new Error("Blog API returned an unexpected response");
  }

  return json.data;
}


export async function fetchBlogList(): Promise<HomeBlog[]> {
  const res = await fetch(API_ENDPOINTS.blogList);
   if (!res.ok) {
    throw new Error(`Blog list API responded with status ${res.status}`);
  } 
  const json: HomeBlogApiResponse = await res.json(); 
  if (!json?.status || !Array.isArray(json.data)) {
    throw new Error("Blog list API returned an unexpected response");
  } 
  return json.data;
}

export async function fetchBlogDetail(
  slug: string,
): Promise<{ blog: BlogDetail; related: RelatedBlog[] }> {
  const res = await fetch(API_ENDPOINTS.blogDetail(slug)); 
  if (!res.ok) {
    throw new Error(`Blog detail API responded with status ${res.status}`);
  } 
  const json: BlogDetailApiResponse = await res.json(); 
  if (!json?.status || !json.data) {
    throw new Error("Blog detail API returned an unexpected response");
  } 
  return { blog: json.data, related: json.you_might_also_like ?? [] };
}
 
