"use client";
import {
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Heart,
  Building2,
  Store,
  Package2,
  Headphones,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BulkOrderForm from "@/components/Form/BulkOrderForm";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import Head from "next/head";

const USE_CASES = [
  {
    icon: Heart,
    title: "Weddings & Trousseau",
    text: "Coordinated sets for the bride's family, bridesmaids, or return gifts — in matching or complementary weaves.",
    color: "from-rose-100 to-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: Building2,
    title: "Corporate Gifting",
    text: "Curated Banarasi pieces for client appreciation, festive gifting, or milestone celebrations.",
    color: "from-blue-100 to-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Store,
    title: "Retail Partners",
    text: "Wholesale pricing for boutiques and retailers looking to stock authentic handwoven silk.",
    color: "from-emerald-100 to-emerald-50",
    iconColor: "text-emerald-600",
  },
];

const QUICK_FACTS = [
  {
    icon: Package2,
    label: "Minimum Order",
    value: "25 Pieces",
    detail: "Flexible quantities available",
  },
  {
    icon: Clock,
    label: "Turnaround Time",
    value: "15–25 Days",
    detail: "Express options available",
  },
  {
    icon: Sparkles,
    label: "Customisation",
    value: "Available",
    detail: "Designs & colors",
  },
];

export default function BulkOrderPage() {
  return (
    <div className="w-full min-h-screen bg-white">
        <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Bulk Order" }]}
        />
        <section className="w-full overflow-hidden">       
            <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-11 sm:py-12 py-8 flex flex-col lg:gap-14 md:gap-12 gap-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">                
                    <div>
                        <div className="relative">                        
                            <Heading
                                level={1}
                                text=" Bulk <span style='background: linear-gradient(135deg, #8b1a34, #e91e8c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-style: italic; font-weight: 300;'>Orders</span>"
                                allowHTML
                                className="text-maroon leading-[1.1] tracking-tight mb-3"
                                decorator="none"
                            />  
                        </div>
                        <div className="mt-8 space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#AD8A3B]/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-magenta/40" />
                                </div>
                                <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                                    Looking to place a bulk order for exquisite sarees? Whether
                                    it's for weddings, corporate gifting, or retail, we've got
                                    you covered!
                                </p>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#AD8A3B]/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-magenta/40" />
                                </div>
                                <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                                    Choose from our wide selection of handcrafted sarees in
                                    vibrant colors, unique designs, and premium fabric.
                                </p>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#AD8A3B]/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-magenta/40" />
                                </div>
                                <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                                    Fill out the form below with your requirements. Our team
                                    shall contact you soon.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-10">
                            <Link
                            href="#form"
                            className="group rounded-xl inline-flex items-center gap-3 px-4 py-3.5 bg-maroon text-white font-sans text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-magenta transition-all duration-300 hover:shadow-2xl hover:shadow-[#AD8A3B]/25 hover:-translate-y-1">
                                Start Your Order
                                <span className="text-[18px] group-hover:translate-x-1 transition-transform">
                                    →
                                </span>
                            </Link>                           
                        </div>                        
                    </div>
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Top Left - Large Number */}
                            <div className="col-span-2 bg-[#FBF3D9]/30 rounded-2xl p-6 border border-[#E4D9C4]/20">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#AD8A3B]/60">
                                    Minimum Order
                                </p>
                                <p className="font-serif text-[32px] font-bold text-maroon">
                                    25
                                </p>
                                <p className="font-sans text-[11px] text-gray-400">
                                    Pieces
                                </p>
                                </div>
                                <div className="w-px h-12 bg-[#E4D9C4]/30" />
                                <div>
                                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#AD8A3B]/60">
                                    Turnaround
                                </p>
                                <p className="font-serif text-[32px] font-bold text-maroon">
                                    15-25
                                </p>
                                <p className="font-sans text-[11px] text-gray-400">
                                    Days
                                </p>
                                </div>
                                <div className="w-px h-12 bg-[#E4D9C4]/30" />
                                <div>
                                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#AD8A3B]/60">
                                    Customisation
                                </p>
                                <p className="font-serif text-[32px] font-bold text-maroon">
                                    ✓
                                </p>
                                <p className="font-sans text-[11px] text-gray-400">
                                    Available
                                </p>
                                </div>
                            </div>
                            </div>

                            {/* Bottom Left */}
                            <div className="bg-white rounded-2xl p-5 border border-[#E4D9C4]/20 shadow-sm">
                            <p className="font-serif text-[28px] font-bold text-maroon">
                                5000+
                            </p>
                            <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-gray-400">
                                Exclusive Designs
                            </p>
                            <div className="mt-3 w-full h-1 bg-[#FBF3D9] rounded-full overflow-hidden">
                                <div className="w-3/4 h-full bg-gradient-to-r from-[#AD8A3B] to-[#8B1A34] rounded-full" />
                            </div>
                            </div>

                            {/* Bottom Right */}
                            <div className="bg-white rounded-2xl p-5 border border-[#E4D9C4]/20 shadow-sm">
                            <p className="font-serif text-[28px] font-bold text-maroon">
                                20K+
                            </p>
                            <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-gray-400">
                                Happy Customers
                            </p>
                            <div className="flex items-center gap-1 mt-3">
                                {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-[#AD8A3B] text-[12px]">
                                    ★
                                </span>
                                ))}
                                <span className="font-sans text-[10px] text-gray-400 ml-1">
                                4.9/5
                                </span>
                            </div>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#AD8A3B]/10 rounded-tr-2xl" />
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-[#AD8A3B]/10 rounded-bl-2xl" />
                    </div>
                </div>
            </div>
        </section>
      {/* ══ MAIN — USE CASES + FORM ══ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT - Use Cases */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#AD8A3B]" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-[#AD8A3B]">
                Perfect For
              </span>
            </div>

            <h2 className="font-serif text-[30px] sm:text-[36px] font-bold text-maroon mb-3">
              Who We{" "}
              <span className="italic font-normal text-[#AD8A3B]">Serve</span>
            </h2>
            <p className="font-sans text-[14px] text-gray-500 mb-8">
              Choose from our wide range of bulk order solutions
            </p>

            <div className="space-y-5">
              {USE_CASES.map((item) => (
                <div
                  key={item.title}
                  className={`group relative p-6 rounded-2xl bg-gradient-to-br ${item.color} border border-transparent hover:border-[#AD8A3B]/20 transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`w-12 h-12 shrink-0 rounded-full bg-white/70 flex items-center justify-center ${item.iconColor}`}
                    >
                      <item.icon size={22} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-serif text-[17px] font-bold text-maroon mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[13.5px] text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ArrowRight size={24} className="text-maroon" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Facts */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {QUICK_FACTS.map((f) => (
                <div
                  key={f.label}
                  className="text-center p-4 bg-white rounded-xl border border-[#E4D9C4]/30 shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#AD8A3B]/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#AD8A3B] transition-colors duration-300">
                    <f.icon
                      size={16}
                      className="text-[#AD8A3B] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <p className="font-serif text-[15px] font-bold text-maroon">
                    {f.value}
                  </p>
                  <p className="font-sans text-[9px] font-bold uppercase tracking-[0.06em] text-gray-400 mt-0.5">
                    {f.label}
                  </p>
                  <p className="font-sans text-[8px] text-gray-400 mt-1">
                    {f.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-10 bg-gradient-to-br from-[#FBF3D9] to-[#FDF8F0] rounded-xl p-6 border border-[#E4D9C4]/30">
              <div className="flex items-center gap-2 mb-4">
                <Headphones size={16} className="text-[#AD8A3B]" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#AD8A3B]">
                  Connect Directly
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+919108900000"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all group border border-transparent hover:border-[#AD8A3B]/20"
                >
                  <Phone
                    size={16}
                    className="text-[#AD8A3B] group-hover:text-maroon transition-colors shrink-0"
                  />
                  <span className="font-sans text-[13px] text-gray-700 group-hover:text-maroon transition-colors">
                    +91 91089 00000
                  </span>
                </a>
                <a
                  href="https://wa.me/919270588878"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all group border border-transparent hover:border-[#AD8A3B]/20"
                >
                  <MessageCircle
                    size={16}
                    className="text-[#AD8A3B] group-hover:text-maroon transition-colors shrink-0"
                  />
                  <span className="font-sans text-[13px] text-gray-700 group-hover:text-maroon transition-colors">
                    WhatsApp
                  </span>
                </a>
                <a
                  href="mailto:kasibunkari@gmail.com"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all group border border-transparent hover:border-[#AD8A3B]/20 sm:col-span-2"
                >
                  <Mail
                    size={16}
                    className="text-[#AD8A3B] group-hover:text-maroon transition-colors shrink-0"
                  />
                  <span className="font-sans text-[13px] text-gray-700 group-hover:text-maroon transition-colors">
                    kasibunkari@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT - Form */}
          <div id="form">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#E4D9C4]/30 sticky top-20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-[2px] bg-[#AD8A3B]" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#AD8A3B]">
                  Get in Touch
                </span>
              </div>
              <h2 className="font-serif text-[26px] font-bold text-maroon mb-2">
                Book a{" "}
                <span className="italic font-normal text-[#AD8A3B]">
                  Call Back
                </span>
              </h2>
              <p className="font-sans text-[14px] text-gray-500 leading-relaxed mb-6">
                Fill out the form below — our team will get in touch with a
                custom quote, shortly.
              </p>

              <BulkOrderForm />

              <div className="mt-4 flex flex-wrap items-center gap-4 pt-4 border-t border-[#E4D9C4]/30">
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield size={12} className="text-[#AD8A3B]" />
                  <span className="font-sans text-[9px] uppercase tracking-[0.1em]">
                    100% Confidential
                  </span>
                </div>
                <div className="w-px h-3 bg-[#E4D9C4]" />
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={12} className="text-[#AD8A3B]" />
                  <span className="font-sans text-[9px] uppercase tracking-[0.1em]">
                    Response in 24hrs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
