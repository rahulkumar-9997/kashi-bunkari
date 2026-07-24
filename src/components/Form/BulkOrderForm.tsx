"use client";
import { useState } from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import {
  bulkOrderEnquiryService,
  ValidationError,
} from "@/services/enquiryService";
type FormErrors = Partial<
  Record<"name" | "email" | "phone" | "message", string>
>;

export default function BulkOrderForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});
    setSubmitting(true);
    try {
      await bulkOrderEnquiryService.submit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim() || undefined,
        website,
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      if (err instanceof ValidationError) {
        const fieldErrors: FormErrors = {};
        for (const [field, messages] of Object.entries(err.errors)) {
          if (messages?.[0]) {
            fieldErrors[field as keyof FormErrors] = messages[0];
          }
        }
        setErrors(fieldErrors);
        setSubmitError(err.message);
      } else {
        setSubmitError(
          err instanceof Error ? err.message : "Could not send your enquiry.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const fieldBorder = (hasError: boolean) =>
    hasError
      ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-[#B3261E]/10"
      : "border-[#E4D9C4] focus:border-maroon focus:ring-maroon/10";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-14 px-6">
        <span className="w-14 h-14 rounded-full bg-[#AD8A3B]/10 flex items-center justify-center mb-5">
          <Check size={24} className="text-[#AD8A3B]" />
        </span>
        <h3 className="font-serif text-[20px] font-bold text-maroon mb-2">
          Enquiry Sent
        </h3>
        <p className="font-sans text-[13.5px] text-gray-500 leading-relaxed max-w-xs mb-6">
          Thank you for your interest in bulk ordering. Our team will get back
          to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="font-sans text-[11.5px] font-bold uppercase tracking-[0.14em] text-maroon hover:underline cursor-pointer"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {submitError && (
        <div className="flex items-start gap-2.5 mb-6 rounded-lg bg-[#FBEAEA] border border-[#E7B8B8] px-4 py-3">
          <AlertCircle size={16} className="text-[#B3261E] shrink-0 mt-0.5" />
          <p className="font-sans text-[12.5px] font-medium text-[#B3261E]">
            {submitError}
          </p>
        </div>
      )}

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-1">
        <div>
          <input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${fieldBorder(!!errors.name)}`}
          />
          {errors.name && (
            <p className="font-sans text-[11.5px] text-[#B3261E] mt-1.5">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${fieldBorder(!!errors.email)}`}
          />
          {errors.email && (
            <p className="font-sans text-[11.5px] text-[#B3261E] mt-1.5">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mb-1 mt-4 sm:mt-5">
        <input
          type="tel"
          placeholder="Phone Number *"
          inputMode="numeric"
          maxLength={10}
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          className={`w-full rounded-lg border bg-white px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${fieldBorder(!!errors.phone)}`}
        />
        {errors.phone && (
          <p className="font-sans text-[11.5px] text-[#B3261E] mt-1.5">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="mb-2 mt-4 sm:mt-5">
        <textarea
          placeholder="Tell us about your bulk order requirement (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={`w-full resize-y rounded-lg border bg-white px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${fieldBorder(!!errors.message)}`}
        />
        {errors.message && (
          <p className="font-sans text-[11.5px] text-[#B3261E] mt-1.5">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-lg bg-maroon text-white font-sans text-[12px] font-bold uppercase tracking-[0.12em] px-7 py-3.5 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {submitting ? "Sending…" : "Send Enquiry"}
        <ArrowRight size={15} />
      </button>
    </form>
  );
}
