import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchTestimonials } from "@/services/testimonialService";
import CustomerReviews from "./CustomerReviews";

export default async function CustomerReviewsServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerReviews />
    </HydrationBoundary>
  );
}
