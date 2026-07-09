import { Suspense  } from "react";
import { CartProvider } from "@/components/CartContext";
import HeroSliderServer from "@/components/HeroSlider/HeroSliderServer";
import HeroSliderSkeleton from "@/components/HeroSlider/HeroSliderSkeleton";
import CategorySection from "@/components/CategorySection";
import OccasionSection from "@/components/OccasionSection";
import Popular from "@/components/Popular";
import NewArrivals from "@/components/NewArrivals";
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
      <OccasionSection />
      <Popular />
      <BulkOrder />
      <NewArrivals />
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
