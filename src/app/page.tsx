"use client";
import { useState } from "react";
import { CartProvider } from "@/components/CartContext";
import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import OccasionSection from "@/components/OccasionSection";
import Popular from "@/components/Popular";
import NewArrivals from "@/components/NewArrivals";
import BulkOrder from "@/components/BulkOrder";
import CustomerReviews from "@/components/CustomerReviews";
import BlogSection from "@/components/BlogSection";
import TrustBar from "@/components/TrustBar";
import AboutUs from "@/components/AboutUs";

function HomeContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <HeroSlider />
      <CategorySection />
      <AboutUs />
      <OccasionSection />
      <Popular />
      <BulkOrder />
      <NewArrivals />
      <CustomerReviews />
      <BlogSection />
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
