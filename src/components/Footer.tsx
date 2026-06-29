"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "./Heading/Heading";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Send,
  Sparkles,
} from "lucide-react";

const SHOP_LINKS = [
  "New Arrivals",
  "Banarasi Sarees",
  "Designer Lehenga",
  "Party Wear Suits",
  "Festive Collection",
  "Unstitched Suits",
  "Flash Sale",
];
const HELP_LINKS = [
  "Track My Order",
  "Returns & Exchange",
  "Size Guide",
  "Bulk Orders",
  "Contact Us",
  "FAQs",
];
const ABOUT_LINKS = [
  "Our Story",
  "Handloom Heritage",
  "Artisan Partners",
  "Privacy Policy",
  "Terms & Conditions",
  "Sitemap",
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="w-full bg-zinc-50">
      <div
        className="w-full h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,26,52,0.15) 20%, rgba(233,30,140,0.25) 50%, rgba(139,26,52,0.15) 80%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 md:px-2 lg:px-1 pt-14">
        <div className="pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.9fr_1fr_1fr_1fr] gap-10 md:gap-14">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <a href="/" className="flex items-center shrink-0">
                  <Image
                      src="/images/kasibunkari_logo.webp"
                      alt="Kasibunkari Logo"
                      width={160}
                      height={50}
                      className="object-contain w-auto h-8 sm:h-10 md:h-12"
                      priority
                  />
                  </a>
              </div>

              <p className="font-sans text-[15px] text-gray-400 leading-[1.9] mb-3 max-w-90">
                Premium ethnic wear blending centuries-old Banarasi craftsmanship
                with contemporary silhouettes — from loom to doorstep.
              </p>
              <div className="flex gap-2.5 mb-4">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-pink hover:border-pink hover:bg-pink/5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>

              {/* Payment */}
              <div>
                <p className="font-sans text-[14px] font-bold tracking-[0.1em] text-gray-400 mb-2.5">
                  Secure Payments
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {["UPI", "Visa", "Mastercard", "COD", "Razorpay"].map((m) => (
                    <span
                      key={m}
                      className="font-sans text-[10px] font-bold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {[
              { heading: "Shop", links: SHOP_LINKS },
              { heading: "Support", links: HELP_LINKS },
              { heading: "Company", links: ABOUT_LINKS },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <div className="mb-5">                
                  <Heading
                    level={5}
                    text={heading}
                    className="font-sans font-bold transition-colors duration-200 leading-snug line-clamp-2 mb-1.5"
                    decorator="underline-pink"
                  />
                </div>
                <ul className="space-y-3.5 list-none m-0 p-0">
                  {links.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="group flex items-center gap-1.5 font-sans text-[14px] text-gray-400 hover:text-pink transition-colors duration-200"
                      >
                        <ChevronRight
                          size={11}
                          className="text-pink shrink-0 -translate-x-1 transition-all duration-200"
                        />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-5 pb-5 border-t border-gray-100 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
            {[
              {
                Icon: MapPin,
                label: "Visit Us",
                value: "AB2, Virat complex, ramkatora,piplanikatra,varanasi-221010, India",
                href: "#",
              },
              {
                Icon: Phone,
                label: "Call Us",
                value: "+91-9108900000",
                href: "tel:+919108900000",
              },
              {
                Icon: Mail,
                label: "Email Us",
                value: "kasibunkari@gmail.com",
                href: "mailto:kasibunkari@gmail.com",
              },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-start gap-3.5"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139,26,52,0.07), rgba(233,30,140,0.08))",
                    border: "1px solid rgba(233,30,140,0.16)",
                  }}
                >
                  <Icon size={14} className="text-pink" />
                </div>
                <div>
                  <p className="font-sans text-[15px] text-gray-400 mb-0.5">
                    {label}
                  </p>
                  <p className="font-sans text-[14px] text-gray-500 group-hover:text-gray-800 transition-colors duration-200 leading-snug">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#8b1a3414] bg-[linear-gradient(135deg,#fff8f6,#ffffff,#fdf4f7)]">
      <div className="mx-auto max-w-7xl px-4 md:px-2 lg:px-1 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[12px] text-gray-400 text-center sm:text-left">
            © 2025 Kasibunkari India Pvt. Ltd. All Rights Reserved.
            <span className="hidden sm:inline ml-1">
              · Crafted with love in Varanasi.
            </span>
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Sitemap"].map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                <Link
                  href="#"
                  className="font-sans text-[12px] text-gray-400 hover:text-pink transition-colors duration-200"
                >
                  {item}
                </Link>
                {i < 2 && <span className="w-px h-3 bg-gray-200" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
