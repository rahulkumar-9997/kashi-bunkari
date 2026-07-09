import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchHomeBlogs } from "@/services/blogService";
import BlogSection from "./BlogSection";

export default async function BlogSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["home-blogs"],
    queryFn: fetchHomeBlogs,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogSection />
    </HydrationBoundary>
  );
}
