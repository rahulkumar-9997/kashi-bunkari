"use client";
import { useState } from "react";
import { CartProvider } from "@/components/CartContext";
import { TopBar } from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import MobileCanvas from "@/components/MobileCanvas";
import CartDrawer from "@/components/CartDrawer";
import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import OccasionSection from "@/components/OccasionSection";
import Popular from "@/components/Popular";
import NewArrivals from "@/components/NewArrivals";
import BulkOrder from "@/components/BulkOrder";
import CustomerReviews from "@/components/CustomerReviews";
import BlogSection from "@/components/BlogSection";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";

function HomeContent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TopBar/>
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MobileCanvas isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer />
      <main className="w-full">
        <HeroSlider />
        <CategorySection />
        <OccasionSection />
        <Popular/>
        <BulkOrder/>
        <NewArrivals/>        
        <CustomerReviews/>
        <BlogSection/>
        <TrustBar />
      </main>
      <Footer />
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
