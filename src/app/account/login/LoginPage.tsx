"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import OtpLoginForm from "@/components/Auth/OtpLoginForm";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E4D9C4] border-t-maroon rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full relative overflow-hidden bg-linear-to-br from-[#FFFDF8] via-[#FCFAF5] to-[#F5EFE4]">
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="form">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="font-serif text-[26px] sm:text-[30px] font-bold text-maroon">
              Login to Your Account
            </h1>
            <p className="mt-2 font-sans text-[13px] sm:text-[13.5px] text-gray-500">
              Login with OTP — no password needed.
            </p>
          </div>

          <div className="rounded-xl border border-[#E4D9C4] bg-white shadow-[0_24px_60px_-32px_rgba(107,22,38,0.2)] px-6 sm:px-8 py-8 sm:py-9">
            <OtpLoginForm onSuccess={() => router.replace(redirectTo)} />
          </div>

          <p className="mt-7 text-center font-sans text-[13px] text-gray-500">
            Need help?{" "}
            <Link
              href="/contact-us"
              className="text-maroon font-semibold hover:underline"
            >
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
