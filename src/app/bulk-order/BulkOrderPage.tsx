"use client";
import {
  ArrowRight,
  Heart,
  Building2,
  Store,
  CheckCircle,
  Star,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BulkOrderForm from "@/components/Form/BulkOrderForm";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";

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


export default function BulkOrderPage() {
  return (
    <div className="w-full min-h-screen bg-white">
        <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Bulk Order" }]}
        />
        <section className="w-full overflow-hidden">       
            <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-11 sm:py-12 py-8 md:px-0 px-4 flex flex-col lg:gap-14 md:gap-12 gap-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">                
                    <div>
                        <div className="relative">                        
                            <Heading
                              level={1}
                              text='Bulk <span class="text-magenta/90 italic font-medium">Orders</span>'
                              allowHTML
                              className="text-3xl md:text-4xl text-maroon leading-[1.1] tracking-tight mb-3"
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
                                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>                           
                        </div>                        
                    </div>
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 bg-champagne/30 rounded-xl p-6 border border-[#E4D9C4]/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-sans text-[14px] text-maroon/60">
                                            Minimum Order
                                        </p>
                                        <p className="font-serif text-[32px] font-bold text-maroon">
                                            25
                                        </p>
                                        <p className="font-sans text-[14px] text-gray-400">
                                            Pieces
                                        </p>
                                    </div>
                                    <div className="w-px h-12 bg-[#E4D9C4]/30" />
                                    <div>
                                        <p className="font-sans text-[14px] text-maroon/60">
                                            Turnaround
                                        </p>
                                        <p className="font-serif text-[32px] font-bold text-maroon">
                                            15-25
                                        </p>
                                        <p className="font-sans text-[14px] text-gray-400">
                                            Days
                                        </p>
                                    </div>
                                    <div className="w-px h-12 bg-[#E4D9C4]/30" />
                                    <div>
                                        <p className="font-sans text-[14px] text-maroon/60">
                                            Customisation
                                        </p>
                                        <p className="font-serif text-[32px] font-bold text-maroon mt-4 mb-1">
                                            <CheckCircle size={28} className="text-maroon" />
                                        </p>
                                        <p className="font-sans text-[14px] text-gray-400">
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
                              <p className="font-sans text-[12px] uppercase tracking-widest text-gray-400">
                                  Exclusive Designs
                              </p>
                              <div className="mt-3 w-full h-1 bg-[#FBF3D9] rounded-full overflow-hidden">
                                  <div className="w-3/4 h-full bg-linear-to-r from-[#AD8A3B] to-[#8B1A34] rounded-full" />
                              </div>
                            </div>

                            {/* Bottom Right */}
                            <div className="bg-white rounded-2xl p-5 border border-[#E4D9C4]/20 shadow-sm">
                              <p className="font-serif text-[28px] font-bold text-maroon">
                                  20K+
                              </p>
                              <p className="font-sans text-[12px] uppercase tracking-widest text-gray-400">
                                  Happy Customers
                              </p>
                              <div className="flex items-center gap-1 mt-3">
                                  {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} className="text-[#AD8A3B] fill-[#AD8A3B] group-hover:scale-110 transition-transform" />
                                  ))}
                                  <span className="font-sans text-[10px] text-gray-400 ml-1">
                                  4.9/5
                                  </span>
                              </div>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-magenta/10 rounded-tr-2xl" />
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-magenta/10 rounded-bl-2xl" />
                    </div>
                </div>
            </div>
        </section>
        {/* ══ MAIN — USE CASES + FORM ══ */}
        <section className="w-full overflow-hidden relative bg-linear-to-br from-white via-[#FFFDF8] to-[#F7E9C7]">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle,#8b0b13_1px,transparent_1px)] bg-size-[22px_22px]"></div>
          <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-11 sm:py-12 py-8 md:px-0 px-4 flex flex-col lg:gap-14 md:gap-12 gap-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div> 
                <Heading
                  level={2}
                  text='Who We <span class="text-magenta/90 italic font-medium">Serve</span>'
                  allowHTML
                  className=" text-maroon leading-[1.1] tracking-tight mb-3"
                  decorator="none"
                />                
                <p className="font-sans text-[16px] text-gray-400 mt-3 tracking-widest leading-relaxed mb-3">
                  Choose from our wide range of bulk order solutions
                </p>

                <div className="space-y-5">
                  {USE_CASES.map((item) => (
                    <div key={item.title} className={`group relative p-5 rounded-xl bg-linear-to-br ${item.color} border border-transparent hover:border-[#AD8A3B]/20 transition-all duration-300 hover:shadow-lg`}>
                      <div className="flex items-start gap-4">
                        <span className={`w-12 h-12 shrink-0 rounded-full bg-white/70 flex items-center justify-center ${item.iconColor}`}
                        >
                          <item.icon size={22} strokeWidth={1.7} />
                        </span>
                        <div>
                          <Heading
                            level={3}
                            text={item.title}
                            className="font-serif md:text-[24px] text-[22px] font-bold text-black mb-1"
                          />                         
                          <p className="font-sans text-[15px] text-gray-500">
                            {item.text}
                          </p>
                        </div>
                      </div>                      
                    </div>
                  ))}
                </div>                
              </div>
              <div id="form">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#E4D9C4]/30 sticky top-20">     
                  <Heading
                    level={4}
                    text='Book a <span class="text-magenta/90 italic font-medium">Call Back</span>'
                    allowHTML
                    className="text-maroon leading-[1.1] tracking-tight mb-3"
                    decorator="none"
                  />  
                  <p className="font-sans text-[14px] text-gray-500 leading-relaxed mb-6">
                    Fill out the form below — our team will get in touch with a
                    custom quote, shortly.
                  </p>
                  <BulkOrderForm />                  
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
