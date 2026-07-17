"use client";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import {
  Package,
  ShoppingBag,
  Truck,
  ChevronRight,
  Eye,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: string;
  items: number;
  itemsSummary: string;
  trackingNumber?: string;
};

const SAMPLE_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "#ORD-2024-001",
    date: "December 15, 2024",
    status: "Delivered",
    total: "Rs.245.00",
    items: 3,
    itemsSummary: "Varanasi Special Package, Sarnath Tour",
    trackingNumber: "TRK-123456789",
  },
  {
    id: "2",
    orderNumber: "#ORD-2024-002",
    date: "December 10, 2024",
    status: "Shipped",
    total: "Rs.89.50",
    items: 1,
    itemsSummary: "Ayodhya Temple Tour",
    trackingNumber: "TRK-987654321",
  },
  {
    id: "3",
    orderNumber: "#ORD-2024-003",
    date: "December 5, 2024",
    status: "Processing",
    total: "Rs.156.00",
    items: 2,
    itemsSummary: "Prayagraj Kumbh Package",
    trackingNumber: "TRK-456789123",
  },
];

const STATUS_STYLES: Record<
  OrderStatus,
  { bg: string; text: string; border: string; icon: React.ReactNode }
> = {
  Processing: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: <Clock size={14} className="text-amber-600" />,
  },
  Shipped: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: <Truck size={14} className="text-blue-600" />,
  },
  Delivered: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: <CheckCircle size={14} className="text-emerald-600" />,
  },
  Cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: <XCircle size={14} className="text-red-600" />,
  },
};

const FILTER_OPTIONS = [
  { value: "all", label: "All Orders" },
  { value: "Processing", label: "Processing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
];

export default function OrdersPage() {
  const { customer } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  if (!customer) return null;

  const filteredOrders = SAMPLE_ORDERS.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.itemsSummary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div>
        <Heading
          level={1}
          text="My Orders"
          className="text-maroon text-[24px]"
          decorator="underline-pink"
          allowHTML
        />
      </div>
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar - Fixed */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by order number or item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 rounded-lg border border-[#E4D9C4] bg-white pl-4 pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/20 focus:border-[#8B1E3F]"
          />

          {searchTerm ? (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B1E3F]"
            >
              <XCircle size={18} />
            </button>
          ) : (
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4D9C4] hover:border-maroon/30 bg-white text-sm font-medium min-w-[140px] justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              {filterStatus === "all" ? "All Orders" : filterStatus}
            </span>
            <ArrowUpDown
              size={16}
              className={`transition-transform duration-200 ${showFilterDropdown ? "rotate-180" : ""}`}
            />
          </button>
          {showFilterDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg border border-[#E4D9C4] shadow-lg z-10 py-1">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilterStatus(option.value);
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#FBF6ED] ${
                    filterStatus === option.value
                      ? "text-maroon font-medium bg-[#FBF6ED]"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] px-6 py-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#E4D9C4] flex items-center justify-center mb-4">
            <Package size={28} className="text-[#AD8A3B]" />
          </div>
          <p className="font-serif text-lg font-bold text-maroon mb-1.5">
            No orders found
          </p>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria"
              : "When you place an order, it will appear here"}
          </p>
          {searchTerm || filterStatus !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="text-sm font-medium text-maroon hover:underline"
            >
              Clear filters
            </button>
          ) : (
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-sm font-medium text-maroon border-b-2 border-maroon pb-1 hover:gap-3 transition-all"
            >
              Start Shopping
              <ChevronRight size={16} />
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusStyle = STATUS_STYLES[order.status];
            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block bg-white rounded-xl border border-[#E4D9C4] p-2 hover:border-[#AD8A3B]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Order Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-[#E4D9C4] shrink-0">
                      <img
                        src="/images/products/5.webp"
                        alt="Triveni Sangam Tour"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/kasibunkari_logo.webp";
                        }}
                      />

                      <span className="absolute top-1 -right-1 w-5 h-5 rounded-full bg-maroon text-white text-[10px] font-bold flex items-center justify-center">
                        +1
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Heading
                            level={1}
                            text= {order.orderNumber}
                            className="font-bold text-gray-800 text-[20px]"
                            decorator="none"
                            allowHTML
                        />
                        <span
                          className={`inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                        >
                          {statusStyle.icon}
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[14px] text-gray-500 mb-1 line-clamp-1">
                        {order.itemsSummary}
                      </p>
                      <div className="flex flex-wrap gap-3 text-[12px] text-gray-400">
                        <span>1 items</span>
                        <span>{order.date}</span>
                        {order.trackingNumber && (
                          <span>Track: {order.trackingNumber}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 shrink-0">
                    <span className="text-lg font-bold text-maroon">
                      {order.total}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-maroon border border-maroon/30 rounded-lg hover:bg-maroon hover:text-white transition-all">
                        <Eye size={12} />
                        View
                      </span>
                      {order.status === "Delivered" && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle invoice download
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-gray-600 border border-[#E4D9C4] rounded-lg hover:bg-[#FBF6ED] transition-all"
                        >
                          <Download size={12} />
                          Invoice
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
