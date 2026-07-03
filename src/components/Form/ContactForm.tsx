// src/components/ContactForm.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = { name: string; email: string; phone: string; message: string };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (error) setError(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email.trim())) {
      setError("Email is invalid");
      return;
    }
    setSubmitting(true);
    // TODO: wire to a real submission endpoint (API route / email service)
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-14 px-6">
        <span className="w-14 h-14 rounded-full bg-[#AD8A3B]/10 flex items-center justify-center mb-5">
          <Check size={24} className="text-[#AD8A3B]" />
        </span>
        <h3 className="font-serif text-[20px] font-bold text-maroon mb-2">
          Message Sent
        </h3>
        <p className="font-sans text-[13.5px] text-gray-500 leading-relaxed max-w-xs">
          Thank you for reaching out. Our team will get back to you within
          24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="flex items-start gap-2.5 mb-6 rounded-lg bg-[#FBEAEA] border border-[#E7B8B8] px-4 py-3">
          <AlertCircle size={16} className="text-[#B3261E] shrink-0 mt-0.5" />
          <p className="font-sans text-[12.5px] font-medium text-[#B3261E]">
            {error}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={update("name")}
          className="w-full rounded-lg border border-[#E4D9C4] bg-white px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-all"
        />
        <input
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={update("email")}
          className={`w-full rounded-lg border bg-white px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${
            error
              ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-[#B3261E]/10"
              : "border-[#E4D9C4] focus:border-maroon focus:ring-maroon/10"
          }`}
        />
      </div>

      <div className="mb-4 sm:mb-5">
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={update("phone")}
          className="w-full rounded-lg border border-[#E4D9C4] bg-white px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-all"
        />
      </div>

      <div className="mb-6 sm:mb-7">
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={update("message")}
          rows={5}
          className="w-full resize-y rounded-lg border border-[#E4D9C4] bg-white px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-lg bg-maroon text-white font-sans text-[12px] font-bold uppercase tracking-[0.12em] px-7 py-3.5 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {submitting ? "Sending…" : "Send"}
        <ArrowRight size={15} />
      </button>

      <p className="mt-6 font-sans text-[11.5px] text-gray-400 leading-relaxed">
        This site is protected by reCAPTCHA and the Google{" "}
        <Link href="/privacy-policy" className="underline hover:text-maroon">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline hover:text-maroon">
          Terms of Service
        </Link>{" "}
        apply.
      </p>
    </form>
  );
}
