"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Heading from "@/components/Heading/Heading";
import { useFaqs } from "@/hooks/useFaqs";
import FaqsPageSkeleton from "./FaqsPageSkeleton";

export default function FaqsPage() {
  const { data: faqs = [], isLoading, isError } = useFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  if (isLoading) return <FaqsPageSkeleton />;
  if (isError || faqs.length === 0) return null;

  return (
    <div className="w-full min-h-screen">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <section className="relative overflow-hidden">
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
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "border-maroon/40 shadow-lg shadow-maroon/5"
                      : "border-magenta/40 hover:border-maroon/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between gap-4 px-4 sm:px-4 py-4 sm:py-4 text-left cursor-pointer transition-all duration-300 ${
                      isOpen ? "bg-gray-50" : "bg-white hover:bg-gray-50/60"
                    }`}
                  >
                    <span className="font-serif text-[20px] lg:text-[22px] font-bold leading-snug text-maroon transition-colors duration-300">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#AD8A3B] transition-all duration-500 ease-in-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-5 pb-5 sm:pb-5 pt-0.5 bg-gray-50">
                        <div
                          className="font-sans text-[16px] text-gray-600 leading-[1.85] [&_p]:mb-3 last:[&_p]:mb-0 [&_a]:text-maroon [&_a]:underline hover:[&_a]:text-[#8b1a34] [&_strong]:font-semibold [&_strong]:text-gray-800"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                        {faq.answer_image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={faq.answer_image}
                            alt={faq.question}
                            className="mt-3 rounded-lg max-w-full"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}