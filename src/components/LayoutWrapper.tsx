"use client";
import { useState } from "react";
import { CartProvider } from "@/components/CartContext";
import { TopBar } from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import MobileCanvas from "@/components/MobileCanvas";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { AuthModalProvider } from "@/context/AuthModalContext";
import LoginModal from "@/components/Auth/LoginModal";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
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
          <TopBar />
          <Navbar onMenuOpen={() => setMenuOpen(true)} />
          <MobileCanvas
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
          <CartDrawer />
          <main>{children}</main>
          <Toaster position="top-right" richColors/>
          <Footer />
        </CartProvider>
        <LoginModal />
      </AuthModalProvider>
    </AuthProvider>
  );
}
