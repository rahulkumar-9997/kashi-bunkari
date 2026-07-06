// src/app/login/LoginPage.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import OtpLoginForm from "@/components/Auth/OtpLoginForm";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-[#FEFCF9] flex items-center justify-center px-4 py-14 sm:py-20">
      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/">
            <Image
              src="/images/kasibunkari_logo.webp"
              alt="Kasibunkari"
              width={170}
              height={54}
              className="object-contain h-10 w-auto mb-6"
            />
          </Link>
          <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#AD8A3B] mb-3">
            Welcome Back
          </p>
          <h1 className="font-serif text-[26px] sm:text-[30px] font-bold text-maroon">
            Login to Your Account
          </h1>
          <p className="mt-2 font-sans text-[13px] sm:text-[13.5px] text-gray-500">
            Login with OTP — no password needed.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4D9C4] bg-white shadow-[0_24px_60px_-32px_rgba(107,22,38,0.2)] px-6 sm:px-8 py-8 sm:py-9">
          <OtpLoginForm />
        </div>

        <p className="mt-7 text-center font-sans text-[13px] text-gray-500">
          Need help?{" "}
          <Link href="/contact" className="text-maroon font-semibold hover:underline">
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
}
