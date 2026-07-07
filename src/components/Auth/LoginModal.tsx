"use client";
import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useAuthModal } from "./AuthModalContext";
import OtpLoginForm from "./OtpLoginForm";
export default function LoginModal() {
  const { isLoginOpen, closeLogin } = useAuthModal();
  useEffect(() => {
    document.body.style.overflow = isLoginOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoginOpen]);
  if (!isLoginOpen) return null;
  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Login">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={closeLogin}/>
        <div className="relative">
          <button
            onClick={closeLogin}
            aria-label="Close login"
            className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200"
          >
            <X size={16} />
          </button>
        <div className="w-full max-w-100 bg-white rounded-xl shadow-xl px-6 sm:px-7 py-7 sm:py-8">
          <div className="flex flex-col items-center text-center mb-6">
            <Image
              src="/images/kasibunkari_logo.webp"
              alt="Kasibunkari"
              width={140}
              height={44}
              className="object-contain h-8 w-auto mb-4"
            />
            <h2 className="font-serif text-[21px] font-bold text-maroon">
              Welcome Back
            </h2>
            <p className="font-sans text-[12.5px] text-gray-500 mt-1">
              Login with OTP to continue
            </p>
          </div>
          <OtpLoginForm compact onSuccess={closeLogin} />
        </div>
      </div>
    </div>
  );
}
