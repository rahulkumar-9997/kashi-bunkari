"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Heading from "@/components/Heading/Heading";
type FaqItem = {
  question: string;
  answer: React.ReactNode;
};
const FAQS: FaqItem[] = [
  {
    question: "What types of sarees do you offer?",
    answer: (
      <>
        At Kasibunkari, we offer a wide range of sarees, including traditional,
        designer, handloom, silk, cotton, organza and more. Each saree is
        crafted with unique designs and high-quality fabrics.
      </>
    ),
  },
  {
    question: "How do I know if my order is confirmed?",
    answer: (
      <>
        Once your order is placed, you will receive a confirmation email with
        your order details. If you don&apos;t receive a confirmation within a
        few minutes, please check your spam/junk folder or contact us at{" "}
        <a
          href="tel:+919696588343"
          className="text-maroon underline hover:text-[#8b1a34]"
        >
          +91 96965 88343
        </a>{" "}
        for assistance.
      </>
    ),
  },
  {
    question: "How long does delivery take?",
    answer: (
      <>
        You can expect your order to be delivered in 2–3 working days in
        metropolitan cities and 5–6 days for other locations, as per your pin
        code.
        <br />
        To know more in detail, refer to our{" "}
        <Link
          href="/policies/shipping-policy"
          className="text-maroon underline hover:text-[#8b1a34]"
        >
          Shipping Policy
        </Link>
        .
      </>
    ),
  },
  {
    question: "What is your return/exchange policy?",
    answer: (
      <>
        We accept returns and exchanges within 7 days of delivery, provided the
        saree is unused and in its original condition. Custom and bulk orders
        are not eligible for returns, but we will address any quality concerns.
        <br />
        If a product arrives damaged, please email us at{" "}
        <a
          href="mailto:kasibunkari@gmail.com"
          className="text-maroon underline hover:text-[#8b1a34]"
        >
          kasibunkari@gmail.com
        </a>{" "}
        with a photo/video and description of the issue, within 7 days of
        receiving your order.
        <br />
        To know more in detail, refer to our{" "}
        <Link
          href="/policies/refund-policy"
          className="text-maroon underline hover:text-[#8b1a34]"
        >
          Return &amp; Refund Policy
        </Link>
        .
      </>
    ),
  },
  {
    question: "How can I place a bulk order?",
    answer: (
      <>
        For bulk orders, please contact us directly via email or phone, or fill
        out the{" "}
        <Link
          href="/bulk-order"
          className="text-maroon underline hover:text-[#8b1a34]"
        >
          bulk order form
        </Link>{" "}
        on our website. Our team will get back to you soon.
      </>
    ),
  },
  {
    question: "Do you offer customization options?",
    answer: (
      <>
        Yes, we provide customization services for bulk orders. You can choose
        fabrics, colours, and design elements to suit your preference.
      </>
    ),
  },
  {
    question: "Do you ship internationally?",
    answer: (
      <>
        Currently, we only ship within India. We hope to offer international
        shipping in the near future, so stay tuned for updates!
      </>
    ),
  },
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="w-full min-h-screen">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
        <section className="relative overflow-hidden">
            {/* <div
            aria-hidden
            className="absolute inset-0 opacity-[0.4]"
            style={{
                background:
                "radial-gradient(ellipse 55% 50% at 10% 10%, rgba(233,30,140,0.06), transparent), radial-gradient(ellipse 50% 45% at 92% 90%, rgba(173,138,59,0.10), transparent)",
            }}
            /> */}
            <div className="w-full max-w-5xl relative mx-auto lg:pt-10 md:pt-11 sm:pt-12 pt-8 pb-0 md:px-0 px-4 text-center">
                <span className="font-sans text-[12px] font-bold uppercase tracking-[0.3em] text-maroon mb-3">
                    Need Help?
                </span>
                <Heading
                    level={1}
                    text=' Frequently Asked  <span class="bg-[linear-gradient(135deg,#8b1a34,#e91e8c)] bg-clip-text text-transparent italic font-light">Questions</span>'
                    allowHTML
                    className="font-serif text-3xl md:text-4xl font-bold leading-[1.1] text-maroon"
                    decorator="none"
                />
                <p className="mt-5 font-sans text-[14px] sm:text-[15px] text-gray-600 leading-relaxed max-w-md mx-auto">
                    Everything you need to know about our sarees, orders, shipping, and
                    returns — in one place.
                </p>
            </div>
        </section>
        <section className="relative overflow-hidden">
            <div className="w-full max-w-5xl relative mx-auto lg:py-10 md:py-11 sm:py-12 py-8 md:px-0 px-4">
                <div className="space-y-3 sm:space-y-3.5">
                {FAQS.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                    <div
                        key={faq.question}
                        className={`rounded-xl border overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? "border-maroon/40 shadow-lg shadow-maroon/5" : "border-magenta/40 hover:border-maroon/20"
                        }`}>
                        <button
                        type="button"
                        onClick={() => toggle(i)}
                        aria-expanded={isOpen}
                        className={`w-full flex items-center justify-between gap-4 px-4 sm:px-4 py-4 sm:py-4 text-left cursor-pointer transition-all duration-300 ${
                            isOpen ? "bg-gray-50" : "bg-white hover:bg-gray-50/60"
                        }`}>
                        <span className={`font-serif text-[20px] lg:text-[22px] font-bold leading-snug transition-colors duration-300 ${
                            isOpen ? "text-maroon" : "text-maroon"
                        }`}>
                            {faq.question}
                        </span>
                        <ChevronDown
                            size={18}
                            className={`shrink-0 text-[#AD8A3B] transition-all duration-500 ease-in-out ${
                            isOpen ? "rotate-180" : "rotate-0"
                            }`}
                        />
                        </button>
                        <div className={`grid transition-all duration-500 ease-in-out ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                         }`}>
                            <div className="overflow-hidden">
                                <div className="px-5 sm:px-5 pb-5 sm:pb-5 pt-0.5 bg-gray-50">
                                    <p className="font-sans text-[16px] text-gray-600 leading-[1.85]">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </section>
        {/* <section
            className="relative overflow-hidden py-16 sm:py-20 text-center px-4"
            style={{
            background: "linear-gradient(135deg,#6B1626,#8B1A34 55%,#E91E8C)",
            }}
        >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px), repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px)",
          }}
        />
        <div className="relative max-w-xl mx-auto">
          <h2 className="font-serif text-[22px] sm:text-[28px] font-bold text-white mb-3">
            Still Have a Question?
          </h2>
          <p className="font-sans text-[13.5px] sm:text-[14.5px] text-white/75 leading-relaxed mb-7">
            Our team is happy to help with anything not covered here.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-maroon bg-white px-7 py-3.5 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
          >
            Contact Us
            <ArrowRight size={15} />
          </Link>
        </div>
        </section> */}
    </div>
  );
}
