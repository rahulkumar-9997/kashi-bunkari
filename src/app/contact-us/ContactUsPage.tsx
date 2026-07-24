"use client";
import {
  Mail,
  Phone,
  MapPin,
  Navigation,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ContactForm from "@/components/Form/ContactForm";
import Heading from "@/components/Heading/Heading";
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
);
const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.11-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.39.58A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.39-.58a3 3 0 0 0 2.11-2.12A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);

const SOCIALS = [
  { icon: InstagramIcon, href: "https://www.instagram.com/kasibunkari", label: "Instagram" },
  { icon: FacebookIcon, href: "https://www.facebook.com/kasibunkaridotcom", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://www.youtube.com/@kasibunkari", label: "YouTube" },
];

const STORE_ADDRESS =
  "AB2, Virat Complex, Ramkatora, Piplani Katra, Jaitpura, Varanasi, Uttar Pradesh 221010";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  STORE_ADDRESS,
)}`;
function SocialRow() {
  return (
    <div className="flex items-center justify-start gap-3 mb-8 mt-5">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="group w-12 h-12 rounded-full border border-maroon/20 bg-maroon flex items-center justify-center text-white hover:text-white hover:bg-maroon hover:border-maroon transition-all duration-300"
        >
          <s.icon size={17} />
        </a>
      ))}
    </div>
  );
}

export default function ContactUsPage() { 
  return (
    <div className="w-full min-h-screen">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className="w-full overflow-hidden">
        <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-11 sm:py-12 py-8 md:px-0 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>              
                <Heading
                    level={1}
                    text='Get in <span class="text-magenta/90 font-medium">Touch</span>'
                    className="font-serif text-[30px] sm:text-[34px] font-bold text-maroon mb-3"
                    decorator="none"
                    allowHTML
                />
              <div className="space-y-4">
                <div className="group rounded-xl px-3 py-3 bg-white border border-maroon/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#AD8A3B]/10 to-[#C9A84C]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone size={16} className="text-maroon" />
                    </div>
                    <div>
                      <span className="font-sans text-[18px] font-normal text-maroon">
                        Call Us
                      </span>
                      <a
                        href="tel:+919696588343"
                        className="block font-sans text-[15px] text-gray-600 hover:text-[#AD8A3B] transition-colors"
                      >
                        +91 96965 88343
                      </a>
                    </div>
                  </div>
                </div>
                <div className="group rounded-xl px-3 py-3 bg-white border border-maroon/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#AD8A3B]/10 to-[#C9A84C]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail size={16} className="text-maroon" />
                    </div>
                    <div>
                      <span className="font-sans text-[18px] font-normal text-maroon">
                        Mail Us
                      </span>
                      <a
                        href="mailto:kasibunkari@gmail.com"
                        className="block font-sans text-[15px] text-gray-600 hover:text-[#AD8A3B] transition-colors"
                      >
                        kasibunkari@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group rounded-xl px-3 py-3 bg-white border border-maroon/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#AD8A3B]/10 to-[#C9A84C]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle size={16} className="text-maroon" />
                    </div>
                    <div>
                      <span className="font-sans text-[18px] font-normal text-maroon">
                        Chat With Us
                      </span>
                      <a
                        href="https://wa.me/919696588343"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-sans text-[15px] text-gray-600 hover:text-[#AD8A3B] transition-colors"
                      >
                        WhatsApp: +91 96965 88343
                      </a>
                    </div>
                  </div>
                </div>
                <div className="group rounded-xl px-3 py-3 bg-white border border-maroon/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#AD8A3B]/10 to-[#C9A84C]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin size={16} className="text-[#AD8A3B]" />
                    </div>
                    <div>
                      <span className="font-sans text-[18px] font-normal text-maroon">
                        Visit Us
                      </span>
                      <p className="font-sans text-[14px] text-gray-600 leading-relaxed mb-3">
                        AB2, Virat Complex, Ramkatora, Piplani Katra, Jaitpura,
                        Varanasi, Uttar Pradesh 221010
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <SocialRow />
            </div>
            <div className="relative">
              <Heading
                level={2}
                text='Contact Us'
                className="font-serif text-[26px] sm:text-[30px] font-bold text-maroon mb-4"
                decorator="none"
                allowHTML
              />
              <div className="relative rounded-xl shadow-[0_8px_10px_rgb(0,0,0,0.08)] px-4 py-4 bg-white border border-maroon/20 overflow-hidden">
                <div className="relative">                  
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full relative overflow-hidden bg-linear-to-br from-[#FFFDF8] via-[#FCFAF5] to-[#F5EFE4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,210,125,0.18)_0%,transparent_35%),radial-gradient(circle_at_80%_15%,rgba(139,11,19,0.06)_0%,transparent_40%),radial-gradient(circle_at_50%_100%,rgba(233,30,140,0.05)_0%,transparent_45%)]"></div>
        <div className="w-full max-w-7xl relative mx-auto lg:pb-10 md:pb-11 sm:pb-12 pb-12 pt-12 md:px-0 px-4">
            <div className="relative">          
                <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative group overflow-hidden rounded-2xl bg-white border border-[#E4D9C4]/60 p-4 shadow-xl shadow-[#AD8A3B]/5">                        
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#AD8A3B]/10 to-[#C9A84C]/10 flex items-center justify-center">
                                    <Clock size={20} className="text-magenta" />
                                </div>
                            <div>                            
                            <Heading
                            level={3}
                            text='Opening Hours'
                            className="font-sans text-[18px] font-bold text-maroon/60"
                            decorator="none"
                            allowHTML
                            />
                            <div className="w-12 h-px bg-linear-to-r from-magenta to-transparent mt-1" />
                        </div>
                        </div>
                        <div className="space-y-1 ml-15">
                        {[
                            {
                            day: "Monday – Friday",
                            hours: "10am – 7pm",
                            active: true,
                            },
                            { day: "Saturday", hours: "11am – 7pm", active: true },
                            { day: "Sunday", hours: "Closed", active: false },
                        ].map((item, idx) => (
                            <div
                            key={idx}
                            className="flex items-center justify-between group/item hover:bg-[#AD8A3B]/5 rounded-lg px-3 py-1.5 transition-all duration-200">
                            <div className="flex items-center gap-3">
                                <div
                                className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-[#AD8A3B]" : "bg-red-400"}`}
                                />
                                <span
                                className={`font-sans text-[16px] ${item.active ? "text-gray-700" : "text-gray-400"}`}
                                >
                                {item.day}
                                </span>
                            </div>
                            <span
                                className={`font-sans text-[16px] font-medium ${item.active ? "text-maroon" : "text-red-400"}`}
                            >
                                {item.hours}
                            </span>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center gap-2 rounded-xl bg-maroon text-white font-sans text-[14px] font-bold tracking-[0.12em] px-4 py-3.5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#AD8A3B]/25"
                        >
                            <span className="relative flex items-center gap-2">
                                <Navigation size={14} />
                                Directions
                            </span>
                        </a>
                        <a
                        href="tel:+919696588343"
                        className="group flex items-center justify-center gap-2 rounded-xl border-2 border-[#AD8A3B] text-[#AD8A3B] font-sans text-[11px] font-bold uppercase tracking-[0.12em] px-4 py-3.5 hover:bg-[#AD8A3B] hover:text-white transition-all duration-300"
                        >
                            <Phone size={14} />
                            Call Store
                        </a>
                    </div>
                    </div>
                    <div className="lg:col-span-3 relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#AD8A3B]/15 border-2 border-[#E4D9C4]/40 group">                       
                            <iframe
                            title="Kasibunkari store location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1803.1984483863407!2d83.0005770387819!3d25.324459418857856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2f379ab64213%3A0xbbc942b04c22e4ca!2sKasibunkari!5e0!3m2!1sen!2sin!4v1727875515673!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "460px" }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[0.1] hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.02] transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
