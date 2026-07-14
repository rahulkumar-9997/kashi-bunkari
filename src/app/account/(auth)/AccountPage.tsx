// src/app/account/dashboard/AccountPage.tsx
"use client";
import { useState } from "react";
import { Pencil, Mail, Phone, Lock, Check, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/authService";

function formatDateForInput(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
}

export default function AccountPage() {
  const { customer, token, updateCustomer } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(customer?.name ?? "");
  const [gender, setGender] = useState(customer?.gender ?? "");
  const [dob, setDob] = useState(formatDateForInput(customer?.date_of_birth ?? null));

  if (!customer) return null;

  const startEditing = () => {
    setName(customer.name ?? "");
    setGender(customer.gender ?? "");
    setDob(formatDateForInput(customer.date_of_birth));
    setError(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      const res = await updateProfile(token, {
        name,
        gender: gender || null,
        date_of_birth: dob || null,
      });
      updateCustomer(res.data);
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-[22px] sm:text-[24px] font-bold text-maroon">
            My Profile
          </h1>
          <p className="font-sans text-[12.5px] text-gray-400 mt-0.5">
            Manage your personal information
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2.5 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3">
            <Check size={16} className="text-emerald-600 shrink-0" />
            <p className="font-sans text-[12.5px] font-medium text-emerald-700">
              Your profile has been updated.
            </p>
          </div>
        )}

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

          {error && (
            <div className="flex items-start gap-2.5 rounded-lg bg-[#FBEAEA] border border-[#E7B8B8] px-4 py-3 mb-5">
              <AlertCircle size={16} className="text-[#B3261E] shrink-0 mt-0.5" />
              <p className="font-sans text-[12.5px] font-medium text-[#B3261E]">{error}</p>
            </div>
          )}

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

          {/* Gender */}
          <div className="mb-5">
            <label className="block font-sans text-[11.5px] font-semibold uppercase tracking-[0.06em] text-gray-400 mb-2">
              Gender
            </label>
            {isEditing ? (
              <div className="flex items-center gap-6">
                {["Male", "Female"].map((option) => (
                  <label
                    key={option}
                    className="inline-flex items-center gap-2 cursor-pointer font-sans text-[14px] text-gray-700"
                  >
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === option}
                      onChange={() => setGender(option)}
                      className="w-4 h-4 accent-maroon cursor-pointer"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <p className="font-sans text-[14.5px] text-gray-800">
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
                className="inline-flex items-center gap-2 rounded-lg bg-maroon text-white font-sans text-[12px] font-bold uppercase tracking-[0.1em] px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={cancelEditing}
                disabled={saving}
                className="font-sans text-[12px] font-semibold text-gray-500 hover:text-gray-700 px-4 py-2.5 cursor-pointer disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* ══ EMAIL ADDRESS ══ */}
        <div className="rounded-xl border border-[#E4D9C4] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <Mail size={16} className="text-maroon" />
            <h2 className="font-serif text-[16px] font-bold text-maroon">Email Address</h2>
          </div>
          <p className="font-sans text-[14.5px] text-gray-800 mt-3">{customer.email}</p>
          <p className="mt-3 flex items-center gap-1.5 font-sans text-[11.5px] text-gray-400">
            <Lock size={11} />
            Contact support to change your registered email
          </p>
        </div>

        {/* ══ MOBILE NUMBER ══ */}
        <div className="rounded-xl border border-[#E4D9C4] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <Phone size={16} className="text-maroon" />
            <h2 className="font-serif text-[16px] font-bold text-maroon">Mobile Number</h2>
          </div>
          <p className="font-sans text-[14.5px] text-gray-800 mt-3">
            {customer.phone_number || "Not added yet"}
          </p>
          <p className="mt-3 flex items-center gap-1.5 font-sans text-[11.5px] text-gray-400">
            <Lock size={11} />
            Contact support to change your registered mobile number
          </p>
        </div>
      </div>
    </>
  );
}