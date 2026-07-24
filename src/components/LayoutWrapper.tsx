"use client";
import { useState } from "react";
import { CartProvider } from "@/components/Cart/CartContext";
import { TopBar } from "@/components/Navbar/TopBar";
import Navbar from "@/components/Navbar/Navbar";
import MobileCanvas from "@/components/Navbar/MobileCanvas";
import CartDrawer from "@/components/Cart/CartDrawer";
import Footer from "@/components/Footer";
import { AuthModalProvider } from "@/context/AuthModalContext";
import LoginModal from "@/components/Auth/LoginModal";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { QuickViewProvider } from "@/context/QuickViewContext";
import QuickViewModal from "@/components/QuickView/QuickViewModal";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <AuthModalProvider>
        <CartProvider>
          <QuickViewProvider> 
            <TopBar />
            <Navbar onMenuOpen={() => setMenuOpen(true)} />
            <MobileCanvas isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            <CartDrawer />
            <QuickViewModal />     
            <main>{children}</main>
            <Toaster position="top-right" richColors />
            <Footer />
           </QuickViewProvider>
        </CartProvider>
        <LoginModal />
      </AuthModalProvider>
    </AuthProvider>
  );
}
