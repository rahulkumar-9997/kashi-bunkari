"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Gift,
  HelpCircle,
  LogOut,
  Mail,
  Phone,
  Clock,
  User,
  Crown,
  Shield,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const NAV_ITEMS = [  
  { href: "/account/orders", icon: ShoppingBag, label: "My Orders" },
  { href: "/account/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/account/addresses", icon: MapPin, label: "Addresses" },
  { href: "/contact-us", icon: HelpCircle, label: "Help & Support" },
];

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function AccountSidebar() {
  const { customer, logout } = useAuth();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!customer) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };

  return (
    <aside className="lg:w-72 xl:w-80 shrink-0">
      <div className="lg:sticky lg:top-24">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
                <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-[#AD8A3B] to-[#D8B975] rounded-full opacity-30 blur-sm" />
                <div className="relative w-15 h-15 rounded-full bg-linear-to-br from-maroon to-[#8B1A34] flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-maroon/20">
                    {initialsOf(customer.name || "U")}
                </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-maroon mt-3">
                {customer.name}
                </h3>
            </div>

            <div className="mt-5 pt-5 border-t border-[#E4D9C4] space-y-2">
                <div className="flex items-center gap-2.5 text-sm text-gray-500">
                <Mail size={14} className="text-[#AD8A3B] shrink-0" />
                <span className="truncate">{customer.email}</span>
                </div>
                {customer.phone_number && (
                <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <Phone size={14} className="text-[#AD8A3B] shrink-0" />
                    <span>{customer.phone_number}</span>
                </div>
                )}
                <div className="flex items-center gap-2.5 text-sm text-gray-500">
                <Clock size={14} className="text-[#AD8A3B] shrink-0" />
                <span>Member since {formatDate(customer.created_at)}</span>
                </div>
            </div>
            <div className="mt-5 pt-5 border-t border-[#E4D9C4]">
                <Link href="/account" className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-maroon hover:bg-maroon/90 py-2.5 rounded-lg transition-colors shadow-md shadow-maroon/20">
                <User size={16} />
                Profile Information
                </Link>            
            </div>
            <nav className="mt-5 space-y-0.5">
                {NAV_ITEMS.map((item) => {
                const isActive =
                    pathname === item.href ||
                    (item.href !== "/account" && pathname?.startsWith(item.href));
                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[16px] font-medium transition-all duration-200 ${
                        isActive
                        ? "bg-[#FBF6ED] text-maroon border border-[#E4D9C4] shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-maroon"
                    }`}
                    >
                    <item.icon
                        size={17}
                        className={isActive ? "text-maroon" : "text-gray-400"}
                        strokeWidth={1.7}
                    />
                    {item.label}
                    {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-maroon" />
                    )}
                    </Link>
                );
                })}
            </nav>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 py-2.5 rounded-lg transition-all duration-200 mt-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-red-200"
            >
              <LogOut size={16} strokeWidth={1.5} />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>          
        </div>
      </div>
    </aside>
  );
}
