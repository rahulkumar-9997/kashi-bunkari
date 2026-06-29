"use client";

import { useState } from "react";
import { CartProvider } from "@/components/CartContext";
import { TopBar } from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import MobileCanvas from "@/components/MobileCanvas";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CartProvider>
      <TopBar />
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MobileCanvas
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}