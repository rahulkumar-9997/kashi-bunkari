import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchBanners } from "@/services/bannerService";
import HeroSlider from "./HeroSlider";

export default async function HeroSliderServer() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeroSlider />
    </HydrationBoundary>
  );
}