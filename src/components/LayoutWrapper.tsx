"use client";
import { useState } from "react";
import { CartProvider } from "@/components/CartContext";
import { TopBar } from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import MobileCanvas from "@/components/MobileCanvas";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { AuthModalProvider } from "@/components/Auth/AuthModalContext";
import LoginModal from "@/components/Auth/LoginModal";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AuthModalProvider>
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
      <LoginModal />
    </AuthModalProvider>
  );
}
