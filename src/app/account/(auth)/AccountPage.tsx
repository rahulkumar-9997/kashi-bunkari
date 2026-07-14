"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Mail, Phone, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, ValidationError } from "@/services/authService";
import Heading from "@/components/Heading/Heading";
function formatDateForInput(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
}

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function AccountPage() {
  const { customer, token, updateCustomer } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(customer?.name ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [phone, setPhone] = useState(customer?.phone_number ?? "");
  const [gender, setGender] = useState(customer?.gender ?? "");
  const [dob, setDob] = useState(formatDateForInput(customer?.date_of_birth ?? null));
  if (!customer) return null;
  const startEditing = () => {
    setName(customer.name ?? "");
    setEmail(customer.email ?? "");
    setPhone(customer.phone_number ?? "");
    setGender(customer.gender ?? "");
    setDob(formatDateForInput(customer.date_of_birth));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const res = await updateProfile(token, {
        name,
        email,
        phone_number: phone || null,
        gender: gender || null,
        date_of_birth: dob || null,
      });
      updateCustomer(res.data);
      setIsEditing(false);
      toast.success("Your profile has been updated.");
    } catch (err) {
      if (err instanceof ValidationError) {
        const allMessages = Object.values(err.errors).flat().join(" ");
        toast.error(allMessages || err.message);
      } else {
        toast.error(err instanceof Error ? err.message : "Failed to save changes");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <Heading
            level={1}
            text="My Profile"
            className="text-maroon text-[24px]"
            decorator="underline-pink"
            allowHTML
          />
        </div>

        {/* ══ PERSONAL INFORMATION ══ */}
        <div className="rounded-xl border border-[#E4D9C4] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-[17px] font-bold text-maroon">
                Personal Information
            </h2>
            {!isEditing && (
              <button
                onClick={startEditing}
                className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-bold text-maroon hover:underline cursor-pointer"
              >
                <Pencil size={13} />
                Edit
              </button>
            )}
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="block font-sans text-[11.5px] font-semibold uppercase tracking-[0.06em] text-gray-400 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-sm rounded-lg border border-[#E4D9C4] bg-white px-4 py-3 font-sans text-[14px] text-gray-800 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-all"
              />
            ) : (
              <p className="font-sans text-[14.5px] text-gray-800">{customer.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block font-sans text-[11.5px] font-semibold uppercase tracking-[0.06em] text-gray-400 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-sm rounded-lg border border-[#E4D9C4] bg-white px-4 py-3 font-sans text-[14px] text-gray-800 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-all"
              />
            ) : (
              <p className="font-sans text-[14.5px] text-gray-800">{customer.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label className="block font-sans text-[11.5px] font-semibold uppercase tracking-[0.06em] text-gray-400 mb-2">
              Mobile Number
            </label>
            {isEditing ? (
              <div className="flex items-stretch max-w-sm rounded-lg border border-[#E4D9C4] bg-white overflow-hidden focus-within:border-maroon focus-within:ring-2 focus-within:ring-maroon/10 transition-all">
                <span className="flex items-center px-4 border-r border-[#E4D9C4] font-sans text-[14px] text-gray-500 bg-gray-50">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone ?? ""}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="flex-1 min-w-0 px-4 py-3 font-sans text-[14px] text-gray-800 outline-none"
                />
              </div>
            ) : (
              <p className="font-sans text-[14.5px] text-gray-800">
                {customer.phone_number || "Not added yet"}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-5">
            <label className="block font-sans text-[11.5px] font-semibold uppercase tracking-[0.06em] text-gray-400 mb-2">
              Gender
            </label>
            {isEditing ? (
              <div className="flex items-center gap-6 flex-wrap">
                {GENDER_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center gap-2 cursor-pointer font-sans text-[14px] text-gray-700"
                  >
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === option.value}
                      onChange={() => setGender(option.value)}
                      className="w-4 h-4 accent-maroon cursor-pointer"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : (
              <p className="font-sans text-[14.5px] text-gray-800 capitalize">
                {customer.gender || "—"}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className={isEditing ? "mb-6" : ""}>
            <label className="block font-sans text-[11.5px] font-semibold uppercase tracking-[0.06em] text-gray-400 mb-2">
              Date of Birth
            </label>
            {isEditing ? (
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full max-w-sm rounded-lg border border-[#E4D9C4] bg-white px-4 py-3 font-sans text-[14px] text-gray-800 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-all"
              />
            ) : (
              <p className="font-sans text-[14.5px] text-gray-800">
                {customer.date_of_birth
                  ? new Date(customer.date_of_birth).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-maroon text-white font-sans text-[12px] font-bold uppercase tracking-widest px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={cancelEditing}
                disabled={saving}
                className="font-sans text-[12px] font-semibold text-gray-500 hover:text-gray-700 px-4 py-2.5 cursor-pointer disabled:opacity-60">
                Cancel
              </button>
            </div>
          )}
        </div>
        {/* Quiet reference cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] px-5 py-4 flex items-center gap-3">
            <Mail size={16} className="text-[#AD8A3B] shrink-0" />
            <div className="min-w-0">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-400">
                Email
              </p>
              <p className="font-sans text-[13px] text-gray-700 truncate">{customer.email}</p>
            </div>
          </div>
          <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] px-5 py-4 flex items-center gap-3">
            <Phone size={16} className="text-[#AD8A3B] shrink-0" />
            <div className="min-w-0">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-400">
                Mobile
              </p>
              <p className="font-sans text-[13px] text-gray-700 truncate">
                {customer.phone_number || "Not added yet"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}