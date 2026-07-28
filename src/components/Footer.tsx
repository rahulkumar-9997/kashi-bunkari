"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "./Heading/Heading";
import { MapPin, Phone, Mail, ChevronRight, Send } from "lucide-react";
const currentYear = new Date().getFullYear();
export const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      {
        title: "New Arrivals",
        href: "/shop/new-arrival",
      },
      {
        title: "Sarees",
        href: "/shop/sarees",
      },
      {
        title: "Souit",
        href: "/shop/suits",
      },
      {
        title: "Party Wear Saree",
        href: "/shop/party",
      },
      {
        title: "Festive Saree",
        href: "/shop/festival",
      },
      {
        title: "Wedding Saree",
        href: "shop/wedding",
      },      
    ],
  },
  {
    heading: "Support",
    links: [
      {
        title: "Track My Order",
        href: "#",
      },
      {
        title: "Refund Policy",
        href: "/refund-policy",
      },
      {
        title: "Size Guide",
        href: "#",
      },
      {
        title: "Bulk Orders",
        href: "/bulk-order",
      },
      {
        title: "Contact Us",
        href: "/contact-us",
      },
      {
        title: "FAQs",
        href: "/faqs",
      },
    ],
  },
  {
    heading: "Company",
    links: [
      {
        title: "Our Story",
        href: "/about-us",
      },
      {
        title: "Blogs",
        href: "/blogs",
      },
      
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        title: "Terms & Conditions",
        href: "/terms-and-conditions",
      },
      {
        title: "Sitemap",
        href: "#",
      },
    ],
  },
];

const message = "Hello Team, I would like to know more about your products.";
const href = `https://wa.me/919696588343?text=${encodeURIComponent(message)}`;

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kasibunkari",
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
    href: "https://www.facebook.com/kasibunkaridotcom",
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
    href: "https://www.youtube.com/@kasibunkari",
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
    href: href,
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

const CONTACT = [
  {
    Icon: MapPin,
    label: "Visit Us",
    value:
      "AB2, Virat complex, Ramkatora, Piplani Katra, Varanasi - 221010, India",
    href: "#",
  },
  {
    Icon: Phone,
    label: "Call Us",
    value: "+91 9696588343",
    href: "tel:919696588343",
  },
  {
    Icon: Mail,
    label: "Email Us",
    value: "kasibunkari@gmail.com",
    href: "mailto:kasibunkari@gmail.com",
  },
];

const FOOTER_BOTTOM_LINKS = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Refund Policy", href: "/refund-policy" },
  { title: "Shipping Policy", href: "/shipping-policy" },
  { title: "Terms and Conditions", href: "/terms-and-conditions" },
];
export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100">
      <div
        className="w-full h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,26,52,0.15) 20%, rgba(233,30,140,0.25) 50%, rgba(139,26,52,0.15) 80%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 pt-10 md:pt-14">
        <div className="pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.9fr_1fr_1fr_1fr] gap-1 md:gap-12 lg:gap-14">
            <div className="sm:text-left">
              <div className="flex sm:justify-start gap-3.5 mb-5 md:mb-6">
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

              <p className="font-sans text-[16px] md:text-[15px] text-gray-400 leading-[1.85] mb-4 lg:max-w-82.5 mx-auto sm:mx-0">
                Premium ethnic wear blending centuries-old Banarasi
                craftsmanship with contemporary silhouettes — from loom to
                doorstep.
              </p>

              <div className="flex justify-start sm:justify-start gap-2.5 mb-5">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-white hover:text-pink hover:border-pink hover:bg-pink/5 hover:-translate-y-0.5 transition-all duration-200 bg-maroon"
                  >
                    {icon}
                  </a>
                ))}
              </div>

              {/* Payment */}
              <div>
                <p className="font-sans text-[14px] md:text-[13px] font-bold text-gray-400 mb-2.5">
                  Secure Payments
                </p>
                <div className="flex justify-start sm:justify-start gap-1.5 flex-wrap">
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
            {FOOTER_LINKS.map((section) => (
              <FooterLinkColumn
                key={section.heading}
                heading={section.heading}
                links={section.links}
              />
            ))}
          </div>
        </div>
        <div className="lg:pt-8 md:pt-5 pb-5 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 md:place-items-center">
            {CONTACT.map(({ Icon, label, value, href }) => (
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
                <div className="min-w-0">
                  <p className="font-sans text-[15px] text-maroon mb-0.5">
                    {label}
                  </p>
                  <p className="font-sans text-[15px] text-gray-500 group-hover:text-gray-800 transition-colors duration-200 leading-snug wrap-break-word">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className="border-t border-[#8b1a3414] bg-[linear-gradient(135deg,#fff8f6,#ffffff,#fdf4f7)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[11px] md:text-[12px] text-gray-400 text-center sm:text-left">
            © {currentYear} Kasibunkari India . All Rights Reserved.
            <span className="hidden sm:inline ml-1">
              · Crafted with love in Varanasi.
            </span>
            <span className="hidden sm:inline ml-1">
              · Designed &amp; Developed by{" "}
              <a
                href="https://wizards.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-maroon hover:text-pink transition-colors"
              >
                Wizards Next.
              </a>
            </span>
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_BOTTOM_LINKS.map((item, i) => (
              <span key={item.title} className="flex items-center gap-4">
                <Link
                  href={item.href}
                  className="font-sans text-[11px] md:text-[12px] text-gray-400 hover:text-pink transition-colors duration-200"
                >
                  {item.title}
                </Link>
                {i < FOOTER_BOTTOM_LINKS.length - 1 && (
                  <span className="w-px h-3 bg-gray-200" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterLinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: {
    title: string;
    href: string;
  }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 py-2 sm:border-0 sm:pb-0">
      {/* Mobile */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between sm:hidden"
      >
        <Heading
          level={5}
          text={heading}
          className="font-sans text-[22px] font-bold"
          decorator="none"
        />

        <ChevronRight
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Desktop */}
      <div className="mb-5 hidden sm:block">
        <Heading
          level={5}
          text={heading}
          className="mb-1.5 font-sans text-[24px] font-bold"
          decorator="underline-pink"
        />
      </div>

      {/* Links */}
      <ul
        className={`overflow-hidden list-none p-0 transition-all duration-300
          ${
            open
              ? "max-h-96 opacity-100 pt-3 pb-3"
              : "max-h-0 opacity-0 sm:max-h-none sm:opacity-100"
          }
          space-y-3 sm:space-y-3.5`}
      >
        {links.map((item, index) => (
          <li key={`${heading}-${item.title}-${index}`}>
            <Link
              href={item.href}
              className="group flex items-center gap-1.5 font-sans text-[15px] text-gray-400 transition-colors duration-200 hover:text-pink"
            >
              <ChevronRight
                size={11}
                className="shrink-0 -translate-x-1 text-pink transition-all duration-200"
              />

              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
