"use client";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  AlertCircle,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

export default function BulkOrderForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (form.phone.trim() && !PHONE_REGEX.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSubmitted(true);
    } catch (error) {
      setErrors({ message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-14 px-6">
        <div className="w-16 h-16 rounded-full bg-[#AD8A3B]/10 flex items-center justify-center mb-5 animate-pulse">
          <Check size={28} className="text-[#AD8A3B]" />
        </div>
        <h3 className="font-serif text-[22px] font-bold text-maroon mb-2">
          Request Received! 
        </h3>
        <p className="font-sans text-[14px] text-gray-500 leading-relaxed max-w-xs">
          Thank you for reaching out. Our team will get back to you within 24
          hours with a custom quote.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", message: "" });
          }}
          className="mt-6 text-[#AD8A3B] font-sans text-[12px] font-semibold uppercase tracking-widest hover:text-maroon transition-colors"
        >
          Submit Another Request →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Error Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="flex items-start gap-2.5 mb-6 rounded-lg bg-[#FBEAEA] border border-[#E7B8B8] px-4 py-3">
          <AlertCircle size={16} className="text-[#B3261E] shrink-0 mt-0.5" />
          <div>
            <p className="font-sans text-[12px] font-semibold text-[#B3261E]">
              Please fix the following errors:
            </p>
            <ul className="list-disc list-inside font-sans text-[12px] text-[#B3261E] mt-1">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
        {/* Name Field */}
        <div>
          <label className="font-sans text-[11px] font-semibold text-gray-600 uppercase tracking-widest block mb-1.5">
            Full Name <span className="text-[#B3261E]">*</span>
          </label>
          <div className="relative">            
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={update("name")}
              className={`w-full rounded-lg border bg-white px-3 py-3 font-sans text-[14px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-[#B3261E]/10"
                  : "border-[#E4D9C4] focus:border-maroon focus:ring-maroon/10"
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 font-sans text-[11.5px] text-[#B3261E]">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="font-sans text-[11px] font-semibold text-gray-600 uppercase tracking-widest block mb-1.5">
            Email Address <span className="text-[#B3261E]">*</span>
          </label>
          <div className="relative">            
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={update("email")}
              className={`w-full rounded-lg border bg-white px-3 py-3 font-sans text-[14px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-[#B3261E]/10"
                  : "border-[#E4D9C4] focus:border-maroon focus:ring-maroon/10"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 font-sans text-[11.5px] text-[#B3261E]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone Field */}
      <div className="mb-4 sm:mb-5">
        <label className="font-sans text-[11px] font-semibold text-gray-600 uppercase tracking-widest block mb-1.5">
          Phone Number
        </label>
        <div className="relative">          
          <input
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={form.phone}
            onChange={update("phone")}
            className={`w-full rounded-lg border bg-white px-3 py-3 font-sans text-[14px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${
              errors.phone
                ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-[#B3261E]/10"
                : "border-[#E4D9C4] focus:border-maroon focus:ring-maroon/10"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="mt-1.5 font-sans text-[11.5px] text-[#B3261E]">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="mb-6 sm:mb-7">
        <label className="font-sans text-[11px] font-semibold text-gray-600 uppercase tracking-widest block mb-1.5">
          Your Requirements <span className="text-[#B3261E]">*</span>
        </label>
        <div className="relative">          
          <textarea
            placeholder="Tell us about your requirement — quantity, occasion, timeline…"
            value={form.message}
            onChange={update("message")}
            rows={4}
            className={`w-full resize-y rounded-lg border bg-white px-3 py-3 font-sans text-[14px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${
              errors.message
                ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-[#B3261E]/10"
                : "border-[#E4D9C4] focus:border-maroon focus:ring-maroon/10"
            }`}
          />
        </div>
        {errors.message && (
          <p className="mt-1.5 font-sans text-[11.5px] text-[#B3261E]">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="cursor-pointer group inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-lg bg-linear-to-r from-maroon to-[#8B1A34] text-white font-sans text-[12px] font-bold uppercase tracking-[0.12em] px-8 py-3.5 hover:from-magenta/15 hover:to-magenta transition-all duration-300 hover:shadow-xl hover:shadow-[#AD8A3B]/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
      >
        {submitting ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit 
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </>
        )}
      </button>
    </form>
  );
}
