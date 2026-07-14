"use client";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Home,
  Briefcase,
  ChevronRight,
  XCircle,
  CheckCircle,
  Phone,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type AddressType = "Home" | "Work" | "Other";

type Address = {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  addressLine1: string;
  addressLine2?: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  type: AddressType;
  isDefault: boolean;
  label?: string;
};

const SAMPLE_ADDRESSES: Address[] = [
  {
    id: "1",
    name: "Rahul Kuamar Maurya",
    phone: "7651982401",
    alternatePhone: "9876543210",
    addressLine1: "123, Street 1",
    addressLine2: "Near City Center",
    locality: "Indira Nagar",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    landmark: "Near City Center Mall",
    type: "Home",
    isDefault: true,
    label: "Home",
  },
  {
    id: "2",
    name: "Rahul Kuamar Maurya",
    phone: "7651982401",
    addressLine1: "456, Office Tower",
    addressLine2: "Bandra Kurla Complex",
    locality: "Bandra East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
    landmark: "Near BKC",
    type: "Work",
    isDefault: false,
    label: "Work",
  },
  {
    id: "3",
    name: "Rahul Kuamar Maurya",
    phone: "7651982401",
    addressLine1: "789, Lake View",
    addressLine2: "Powai",
    locality: "Powai",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400076",
    type: "Other",
    isDefault: false,
    label: "Other",
  },
];

export default function AddressesPage() {
  const { customer } = useAuth();
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  if (!customer) return null;

  const defaultAddress = SAMPLE_ADDRESSES.find((addr) => addr.isDefault);
  const otherAddresses = SAMPLE_ADDRESSES.filter((addr) => !addr.isDefault);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Heading
          level={1}
          text="My Addresses"
          className="text-maroon text-[24px]"
          decorator="underline-pink"
          allowHTML
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowAddAddress(!showAddAddress)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded border-2 border-gray-400 text-maroon text-sm font-medium transition-colors shrink-0 cursor-pointer"
        >
          <Plus size={18} />
          Add New Address
        </button>
      </div>
      {/* Add Address Form */}
      {showAddAddress && (
        <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-maroon">
              Add New Address
            </h3>
            <button
              onClick={() => setShowAddAddress(false)}
              className="text-gray-400 hover:text-maroon transition-colors"
            >
              <XCircle size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                placeholder="Enter pincode"
                className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Locality
              </label>
              <input
                type="text"
                placeholder="Enter locality"
                className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Area
                </label>
                <textarea
                rows={2}
                placeholder="House number, building name"
                className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]"/>
            </div>           
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City/District/Town
              </label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]">
                <option value="">--Select State--</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="Nearby landmark"
                className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alternate Phone (Optional)
              </label>
              <input
                type="tel"
                placeholder="Enter alternate phone"
                className="w-full px-4 py-3 rounded border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:border-[#8B1E3F]"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="px-6 py-2.5 bg-maroon hover:bg-maroon/90 text-white font-semibold rounded-lg text-sm transition-colors">
              Save Address
            </button>
            <button
              onClick={() => setShowAddAddress(false)}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Addresses List */}
      {SAMPLE_ADDRESSES.length === 0 ? (
        <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] px-6 py-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#E4D9C4] flex items-center justify-center mb-4">
            <MapPin size={28} className="text-[#AD8A3B]" />
          </div>
          <p className="font-serif text-lg font-bold text-maroon mb-1.5">
            No addresses found
          </p>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Add your first address for faster checkout
          </p>
          <button
            onClick={() => setShowAddAddress(true)}
            className="inline-flex items-center gap-2 text-sm font-medium text-maroon border-b-2 border-maroon pb-1 hover:gap-3 transition-all"
          >
            Add Address
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Default Address */}
          {defaultAddress && (
            <div className="bg-white rounded-xl border-2 border-maroon/30 p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <Heading
                      level={3}
                      text={defaultAddress.name}
                      className="font-bold text-gray-800 text-[18px]"
                      decorator="none"
                      allowHTML
                    />
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle size={12} />
                      Default
                    </span>                    
                  </div>
                  <p className="text-sm text-gray-600">
                    {defaultAddress.addressLine1}
                    {defaultAddress.addressLine2 &&
                      `, ${defaultAddress.addressLine2}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {defaultAddress.locality}, {defaultAddress.city},{" "}
                    {defaultAddress.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    Pincode: {defaultAddress.pincode}
                  </p>
                  {defaultAddress.landmark && (
                    <p className="text-sm text-gray-500">
                      Landmark: {defaultAddress.landmark}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1.5">
                    <span className="flex items-center gap-1">
                      <Phone size={12} />
                      {defaultAddress.phone}
                    </span>
                    {defaultAddress.alternatePhone && (
                      <span className="flex items-center gap-1">
                        <Phone size={12} />
                        {defaultAddress.alternatePhone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => setEditingAddressId(defaultAddress.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-maroon border border-maroon/30 rounded-lg hover:bg-maroon hover:text-white transition-all cursor-pointer"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      // Handle delete
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Other Addresses */}
          {otherAddresses.length > 0 && (
            <div className="space-y-3">
              {otherAddresses.map((address) => {
                return (
                  <div
                    key={address.id}
                    className="bg-white rounded-xl border border-[#E4D9C4] p-4 hover:border-maroon/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <Heading
                            level={3}
                            text={address.name}
                            className="font-bold text-gray-800 text-[18px]"
                            decorator="none"
                            allowHTML
                          />
                          
                          {!address.isDefault && (
                            <button
                              onClick={() => {
                                // Set as default
                              }}
                              className="text-[10px] font-medium text-blue-600 hover:underline cursor-pointer"
                            >
                              Set as default
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.locality}, {address.city}, {address.state}
                        </p>
                        <p className="text-sm text-gray-600">
                          Pincode: {address.pincode}
                        </p>
                        {address.landmark && (
                          <p className="text-sm text-gray-500">
                            Landmark: {address.landmark}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1.5">
                          <span className="flex items-center gap-1">
                            <Phone size={12} />
                            {address.phone}
                          </span>
                          {address.alternatePhone && (
                            <span className="flex items-center gap-1">
                              <Phone size={12} />
                              {address.alternatePhone}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button
                          onClick={() => setEditingAddressId(address.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-maroon border border-maroon/30 rounded-lg hover:bg-maroon hover:text-white transition-all cursor-pointer"
                        >
                          <Edit size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            // Handle delete
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Edit Address Modal/Form */}
      {editingAddressId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-maroon">
                Edit Address
              </h3>
              <button
                onClick={() => setEditingAddressId(null)}
                className="text-gray-400 hover:text-maroon transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/20 focus:border-[#8B1E3F]"
                    defaultValue="Rahul Kuamar Maurya"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E4D9C4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/20 focus:border-[#8B1E3F]"
                    defaultValue="7651982401"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="px-6 py-2.5 bg-maroon hover:bg-maroon/90 text-white font-semibold rounded-lg text-sm transition-colors">
                  Update Address
                </button>
                <button
                  onClick={() => setEditingAddressId(null)}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
