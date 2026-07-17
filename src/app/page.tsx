import { Suspense  } from "react";
import { CartProvider } from "@/components/CartContext";
import HeroSliderServer from "@/components/HeroSlider/HeroSliderServer";
import HeroSliderSkeleton from "@/components/HeroSlider/HeroSliderSkeleton";
import CategorySection from "@/components/CategorySection";
import OccasionSectionServer from "@/components/OccasionSection/OccasionSectionServer";
import OccasionSkeleton from "@/components/OccasionSection/OccasionSkeleton";
import PopularServer from "@/components/PopularSection/PopularServer";
import PopularSkeleton from "@/components/PopularSection/PopularSkeleton";
import NewArrivalsServer from "@/components/NewArrivals/NewArrivalsServer";
import NewArrivalsSkeleton from "@/components/NewArrivals/NewArrivalsSkeleton";

import BulkOrder from "@/components/BulkOrder";
import CustomerReviewsServer from "@/components/CustomerReviews/CustomerReviewsServer";
import CustomerReviewsSkeleton from "@/components/CustomerReviews/CustomerReviewsSkeleton";
import BlogSectionServer from "@/components/BlogSection/BlogSectionServer";
import BlogSectionSkeleton from "@/components/BlogSection/BlogSectionSkeleton";
import TrustBar from "@/components/TrustBar";
import AboutUs from "@/components/AboutUs";

function HomeContent() {
  return (
    <>
      <Suspense fallback={<HeroSliderSkeleton />}>
        <HeroSliderServer />
      </Suspense>
      <CategorySection />
      <AboutUs />
      <Suspense fallback={<OccasionSkeleton />}>
        <OccasionSectionServer />
      </Suspense>
      <Suspense fallback={<PopularSkeleton />}>
        <PopularServer />
      </Suspense>
      <BulkOrder />
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivalsServer />
      </Suspense>
      <Suspense fallback={<CustomerReviewsSkeleton />}>
        <CustomerReviewsServer />
      </Suspense>
      <Suspense fallback={<BlogSectionSkeleton />}>
        <BlogSectionServer />
      </Suspense>
      <TrustBar />
    </>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}
