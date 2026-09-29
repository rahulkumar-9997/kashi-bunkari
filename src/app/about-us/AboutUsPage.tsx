"use client";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import {
  ArrowRight,
  ScrollText,
  Truck,
  Handshake,
  HeartHandshake,
  Users,
  Crown,
  Gem,
  Award,
  Infinity,
  Shield,
  Leaf,
  Sparkles,
} from "lucide-react";

const WHY_US = [
  {
    icon: Crown,
    title: "One-Stop Destination for Authentic Banarasi Silk",
    description: "Curated collection of pure silk, handwoven with precision",
  },
  {
    icon: Truck,
    title: "Worldwide Shipping",
    description: "Delivering elegance across the globe with care",
  },
  {
    icon: Handshake,
    title: "Trusted by 20,000+ Customers",
    description: "Building relationships through trust and quality",
  },
  {
    icon: HeartHandshake,
    title: "Handwoven Legacy of 25 Years",
    description: "Preserving the artistry of Banaras since 1999",
  },
  {
    icon: Gem,
    title: "5000+ Exclusive Designs",
    description: "Unique creations crafted for the discerning woman",
  },
  {
    icon: Users,
    title: "Supporting Indian Artisans",
    description: "Empowering weavers & preserving traditional crafts",
  },
];

const STATS = [
  { value: "25+", label: "Years of Legacy", icon: Award },
  { value: "5,000+", label: "Exclusive Designs", icon: Gem },
  { value: "20,000+", label: "Happy Customers", icon: Users },
  { value: "100%", label: "Handwoven Silk", icon: Leaf },
];
const VALUES = [
  {
    title: "Authenticity",
    description: "100% pure Banarasi silk, certified and genuine",
    icon: Shield,
  },
  {
    title: "Craftsmanship",
    description: "Meticulously handwoven by master artisans",
    icon: ScrollText,
  },
  {
    title: "Heritage",
    description: "Preserving centuries-old weaving traditions",
    icon: Infinity,
  },
];
export default function AboutUsPage() {
  return (
    <div className="w-full min-h-scree">
        <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />
        <section className="w-full relative overflow-hidden bg-linear-to-br from-[#FFFDF8] via-[#FCFAF5] to-[#F5EFE4]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,210,125,0.18)_0%,transparent_35%),radial-gradient(circle_at_80%_15%,rgba(139,11,19,0.06)_0%,transparent_40%),radial-gradient(circle_at_50%_100%,rgba(233,30,140,0.05)_0%,transparent_45%)]" />
            <div className="mx-auto max-w-7xl lg:py-15 md:py-10 sm:py-10 py-8 px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-2 lg:order-1">
                    <div className="inline-flex items-center gap-3 bg-[#AD8A3B]/10 px-4 py-2 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-pink-700 animate-pulse" />
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-pink-700">
                        Our Story
                        </span>
                    </div>
                    <Heading
                        level={1}
                        text="About the Brand"
                        allowHTML
                        className="font-serif text-3xl md:text-4xl font-bold leading-[1.1] text-maroon mb-4"
                        decorator="none"
                        decoratorClassName=""
                    />
                    <p className="mt-1 font-sans lg:text-[16px] text-[16px] text-gray-600 leading-relaxed max-w-lg">
                        Discover the heritage and artistry of Banaras with Kasi
                        Bunkari's exclusive collection of handwoven Banarasi Silk
                        Sarees.
                    </p>
                    <p className="mt-2 font-sans lg:text-[16px] text-[16px] text-gray-600 leading-relaxed max-w-lg">
                        Immerse yourself in the heritage of Kasibunkari, where timeless
                        elegance and exquisite craftsmanship unite to create sarees of
                        unparalleled beauty.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link
                        href="/"
                        className="group inline-flex items-center gap-3 px-8 py-3.5 bg-maroon text-white font-sans text-[12px] font-bold uppercase tracking-[0.12em] rounded-full hover:bg-[#AD8A3B] transition-all duration-300 hover:shadow-xl hover:shadow-[#AD8A3B]/25 hover:-translate-y-0.5"
                        >
                        Explore Collections
                        <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                        </Link>
                        <Link
                        href="/bulk-order"
                        className="group inline-flex items-center gap-2 px-8 py-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-maroon border-2 border-maroon/20 rounded-full hover:border-[#AD8A3B] hover:text-[#AD8A3B] transition-all duration-300"
                        >
                        Bulk Orders
                        </Link>
                    </div>
                </div>
                <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                    <div className="absolute -inset-6 sm:-inset-8 border-2 border-[#AD8A3B]/10 rounded-full animate-spin-slow" />
                    <div className="absolute -inset-10 sm:-inset-12 border border-[#AD8A3B]/5 rounded-full" />
                    <div className="relative flex items-center justify-center w-40 h-40 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-linear-to-br from-[#FBF3D9] to-white border-2 border-[#AD8A3B]/20 shadow-2xl p-8 sm:p-10">
                    <Image
                        src="/images/aboutUs.webp"
                        alt="Kasibunkari Logo"
                        width={260}
                        height={260}
                        priority
                        className="w-full h-full object-contain"
                    />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section id="story" className="w-full pt-10 md:pt-14 pb-10 md:pb-5 overflow-hidden" >
            <div className="mx-auto max-w-7xl px-4 md:px-2 lg:px-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
                <div className="relative">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group/image col-span-1">
                    <div
                        className="relative w-full"
                        style={{ aspectRatio: "4/5" }}
                    >
                        <Image
                        src="/images/about/1.webp"
                        alt="Kasibunkari Banarasi silk saree"
                        fill
                        className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                        sizes="(max-width:1024px) 50vw, 320px"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                        />
                    </div>
                    </div>
                    {/* Image 2 */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group/image col-span-1">
                    <div
                        className="relative w-full"
                        style={{ aspectRatio: "4/5" }}
                    >
                        <Image
                        src="/images/about/2.webp"
                        alt="Banarasi silk detail"
                        fill
                        className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                        sizes="(max-width:1024px) 25vw, 200px"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                        />
                    </div>
                    </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 z-20">
                    <div className="bg-white rounded-2xl shadow-2xl px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-[#AD8A3B]/20 hover:border-[#AD8A3B]/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#AD8A3B] opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#AD8A3B]" />
                        </span>
                        <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-maroon">
                        Handwoven with Love
                        </span>
                    </div>
                    </div>
                </div>
                <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-[#AD8A3B]/15 rounded-tl-2xl hidden lg:block" />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-[#AD8A3B]/15 rounded-br-2xl hidden lg:block" />
                </div>
                {/* Right - Content */}
                <div className="lg:pl-4">
                <div className="inline-flex items-center gap-3 mb-4">
                    <span className="w-10 h-0.5 bg-linear-to-r from-transparent to-[#AD8A3B]" />
                    <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-pink-700">
                    Our Story
                    </span>
                    <span className="w-10 h-0.5 bg-linear-to-l from-transparent to-[#AD8A3B]" />
                </div>
                {/* Main Heading */}
                <Heading
                    level={2}
                    text="The Art of Banarasi Weaving"
                    allowHTML
                    className="font-serif text-3xl md:text-4xl font-bold leading-[1.08] text-maroon mb-2"
                    decorator="underline-pink"
                    decoratorClassName="w-20"
                />
                <div className="space-y-4 mb-4 mt-3">
                    <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                    Born in the revered city of Varanasi,{" "}
                    <span className="font-semibold text-maroon relative inline-block group">
                        Kasi Bunkari
                    </span>{" "}
                    is synonymous with the artistry of the 9-yard Banarasi saree,
                    meticulously woven by masterful artisans known as bunkars. Our
                    collection is a testament to the intricate weaves and rich
                    textures that define true Banarasi silk, each piece embodying
                    generations of skill and passion.
                    </p>
                    <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                    Every thread of our sarees carries the legacy of Banaras,
                    crafted with impeccable precision and care. At{" "}
                    <span className="font-semibold text-maroon relative inline-block group">
                        Kasi Bunkari
                    </span>
                    , we blend the opulence of tradition with accessibility,
                    ensuring that each piece is not only a work of art but also an
                    affordable luxury for the modern woman.
                    </p>
                </div>
                {/* Value Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                    {VALUES.map((value) => (
                    <div
                        key={value.title}
                        className="group/value relative overflow-hidden p-3 rounded-xl bg-linear-to-br from-[#FBF3D9]/80 to-white hover:from-[#FBF3D9] hover:to-[#FDF8F0] transition-all duration-300 hover:shadow-xl border border-[#E4D9C4]/30 hover:border-[#AD8A3B]/30"
                    >
                        <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#AD8A3B]/20 to-[#8B1A34]/10 flex items-center justify-center shrink-0 group-hover/value:from-[#AD8A3B] group-hover/value:to-[#8B1A34] transition-all duration-300">
                            <value.icon
                            size={12}
                            className="text-[#AD8A3B] group-hover/value:text-white transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <p className="font-sans text-[12px] font-bold text-maroon">
                            {value.title}
                            </p>
                            <p className="font-sans text-[12px] text-gray-500 leading-tight">
                            {value.description}
                            </p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </section>

        <section className="w-full relative overflow-hidden bg-linear-to-br from-[#FCFBF8] via-white to-[#F5F1E8]">        
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-champagne/20 blur-[120px]" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-maroon/10 blur-[120px]" />
            <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-10 sm:py-10 py-8 lg:px-0 px-4">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-12 h-0.5 bg-linear-to-r from-transparent to-[#AD8A3B]" />
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-pink-700">
                        Why Choose Us
                        </span>
                        <span className="w-12 h-0.5 bg-linear-to-l from-transparent to-[#AD8A3B]" />
                    </div>
                    <Heading
                        level={3}
                        className="font-serif text-3xl md:text-4xl font-bold text-maroon"
                        decorator="none"
                        decoratorClassName=""
                        >
                        The{" "}
                        <span className="italic font-normal text-maroon/80">
                            Kasibunkari
                        </span>{" "}
                        Promise
                    </Heading>
                    <p className="font-sans text-[16px] text-gray-400 mt-3 tracking-wide max-w-2xl mx-auto">
                    Experience the perfect blend of tradition, quality, and elegance
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {WHY_US.map((item, index) => (
                    <div
                        key={item.title}
                        className="group relative p-5 border border-gray-200 rounded-xl bg-white hover:border-[#AD8A3B]/40 hover:shadow-2xl hover:shadow-[#AD8A3B]/10 transition-all duration-500 hover:-translate-y-2">
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-15 h-15 rounded-2xl bg-linear-to-br from-[#AD8A3B]/10 to-[#8B1A34]/10 group-hover:from-[#AD8A3B]/20 group-hover:to-[#8B1A34]/20 transition-all duration-300 mb-5">
                                <item.icon
                                size={24}
                                className="text-maroon group-hover:scale-110 transition-transform duration-300"
                                strokeWidth={1.5}
                                />
                            </div>
                            <Heading
                                level={4}
                                text={item.title}
                                allowHTML
                                className="font-sans text-[20px] font-bold text-maroon leading-snug mb-2"
                                decorator="none"    
                                decoratorClassName=""
                            />
                            {item.description && (
                                <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                                {item.description}
                                </p>
                            )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
}
