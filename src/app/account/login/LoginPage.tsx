"use client";
import Link from "next/link";
import OtpLoginForm from "@/components/Auth/OtpLoginForm";

export default function LoginPage() {
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
            <OtpLoginForm />
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
