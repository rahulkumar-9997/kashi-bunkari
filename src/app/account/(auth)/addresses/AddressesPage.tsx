"use client";
import Heading from "@/components/Heading/Heading";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  XCircle,
  CheckCircle,
  Phone,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddresses,
  useStates,
  useAddAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/hooks/useAddresses";
import type { Address, AddressPayload } from "@/types/address";
import {
  validateAddressForm,
  hasErrors,
  type AddressFormErrors,
} from "@/lib/addressValidation";

const EMPTY_FORM: AddressPayload = {
  name: "",
  phone_number: "",
  alternate_phone: "",
  zip_code: "",
  locality: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  country: "India",
};

export default function AddressesPage() {
  const { customer } = useAuth();
  const { data: addresses = [], isLoading } = useAddresses();
  const { data: states = [] } = useStates();

  const addMutation = useAddAddress();
  const updateMutation = useUpdateAddress();
  const deleteMutation = useDeleteAddress();
  const setDefaultMutation = useSetDefaultAddress();

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [form, setForm] = useState<AddressPayload>(EMPTY_FORM);
  const [editForm, setEditForm] = useState<AddressPayload>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<AddressFormErrors>({});
  const [editFormErrors, setEditFormErrors] = useState<AddressFormErrors>({});

  if (!customer) return null;

  const defaultAddress = addresses.find((a) => a.is_default);
  const otherAddresses = addresses.filter((a) => !a.is_default);

  const handleField =
    (
      setter: typeof setForm,
      errorSetter: typeof setFormErrors,
      field: keyof AddressPayload,
    ) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setter((prev) => ({ ...prev, [field]: e.target.value }));
      // Field mein type karte hi uska error clear ho jaaye
      errorSetter((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const handleSaveNew = async () => {
    const errors = validateAddressForm(form);
    if (hasErrors(errors)) {
      setFormErrors(errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setFormErrors({});
    try {
      await addMutation.mutateAsync(form);
      toast.success("Address added successfully.");
      setForm(EMPTY_FORM);
      setShowAddAddress(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not save address.",
      );
    }
  };

  const openEdit = (address: Address) => {
    setEditForm({
      name: address.name,
      phone_number: address.phone_number,
      alternate_phone: address.alternate_phone ?? "",
      zip_code: address.zip_code,
      locality: address.locality,
      address: address.address,
      city: address.city,
      state: address.state,
      landmark: address.landmark ?? "",
      country: address.country,
    });
    setEditFormErrors({});
    setEditingAddressId(address.id);
  };

  const handleSaveEdit = async () => {
    if (!editingAddressId) return;
    const errors = validateAddressForm(editForm);
    if (hasErrors(errors)) {
      setEditFormErrors(errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setEditFormErrors({});
    try {
      await updateMutation.mutateAsync({
        id: editingAddressId,
        payload: editForm,
      });
      toast.success("Address updated successfully.");
      setEditingAddressId(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update address.",
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Address removed.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not remove address.",
      );
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultMutation.mutateAsync(id);
      toast.success("Default address updated.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not set default address.",
      );
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded border bg-white text-sm focus:outline-none transition-colors ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-[#E4D9C4] focus:border-[#8B1E3F]"
    }`;

  const FieldError = ({ message }: { message?: string }) =>
    message ? (
      <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
        <AlertCircle size={11} />
        {message}
      </p>
    ) : null;

  const renderFormFields = (
    data: AddressPayload,
    setter: typeof setForm,
    errors: AddressFormErrors,
    errorSetter: typeof setFormErrors,
  ) => (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={data.name}
          onChange={handleField(setter, errorSetter, "name")}
          className={inputClass(!!errors.name)}
        />
        <FieldError message={errors.name} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={data.phone_number}
          onChange={handleField(setter, errorSetter, "phone_number")}
          className={inputClass(!!errors.phone_number)}
        />
        <FieldError message={errors.phone_number} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pincode <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter pincode"
          value={data.zip_code}
          onChange={handleField(setter, errorSetter, "zip_code")}
          className={inputClass(!!errors.zip_code)}
        />
        <FieldError message={errors.zip_code} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Locality <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter locality"
          value={data.locality}
          onChange={handleField(setter, errorSetter, "locality")}
          className={inputClass(!!errors.locality)}
        />
        <FieldError message={errors.locality} />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Area <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={2}
          placeholder="House number, building name"
          value={data.address}
          onChange={handleField(setter, errorSetter, "address")}
          className={inputClass(!!errors.address)}
        />
        <FieldError message={errors.address} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City/District/Town <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter city"
          value={data.city}
          onChange={handleField(setter, errorSetter, "city")}
          className={inputClass(!!errors.city)}
        />
        <FieldError message={errors.city} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State <span className="text-red-500">*</span>
        </label>
        <select
          value={data.state}
          onChange={handleField(setter, errorSetter, "state")}
          className={inputClass(!!errors.state)}
        >
          <option value="">--Select State--</option>
          {states.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        <FieldError message={errors.state} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Landmark (Optional)
        </label>
        <input
          type="text"
          placeholder="Nearby landmark"
          value={data.landmark}
          onChange={handleField(setter, errorSetter, "landmark")}
          className={inputClass(false)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alternate Phone (Optional)
        </label>
        <input
          type="tel"
          placeholder="Enter alternate phone"
          value={data.alternate_phone}
          onChange={handleField(setter, errorSetter, "alternate_phone")}
          className={inputClass(!!errors.alternate_phone)}
        />
        <FieldError message={errors.alternate_phone} />
      </div>
    </div>
  );

  const renderAddressCard = (address: Address, isDefaultCard: boolean) => (
    <div
      key={address.id}
      className={`bg-white rounded-xl border p-4 hover:shadow-lg transition-all duration-300 ${
        isDefaultCard
          ? "border-2 border-maroon/30"
          : "border-[#E4D9C4] hover:border-maroon/30"
      }`}
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
            {isDefaultCard ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle size={12} />
                Default
              </span>
            ) : (
              <button
                onClick={() => handleSetDefault(address.id)}
                disabled={setDefaultMutation.isPending}
                className="text-[10px] font-medium text-blue-600 hover:underline cursor-pointer disabled:opacity-50"
              >
                Set as default
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600">{address.address}</p>
          <p className="text-sm text-gray-600">
            {address.locality}, {address.city}, {address.state}
          </p>
          <p className="text-sm text-gray-600">Pincode: {address.zip_code}</p>
          {address.landmark && (
            <p className="text-sm text-gray-500">
              Landmark: {address.landmark}
            </p>
          )}
          <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1.5">
            <span className="flex items-center gap-1">
              <Phone size={12} />
              {address.phone_number}
            </span>
            {address.alternate_phone && (
              <span className="flex items-center gap-1">
                <Phone size={12} />
                {address.alternate_phone}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 shrink-0">
          <button
            onClick={() => openEdit(address)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-maroon border border-maroon/30 rounded hover:bg-maroon hover:text-white transition-all cursor-pointer"
          >
            <Edit size={12} />
            Edit
          </button>
          <button
            onClick={() => handleDelete(address.id)}
            disabled={deleteMutation.isPending}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 transition-all cursor-pointer disabled:opacity-50"
          >
            <Trash2 size={12} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
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
          onClick={() => {
            setShowAddAddress(!showAddAddress);
            setFormErrors({});
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded border-2 border-gray-400 text-maroon text-sm font-medium transition-colors shrink-0 cursor-pointer"
        >
          <Plus size={18} />
          Add New Address
        </button>
      </div>

      {showAddAddress && (
        <div className="rounded-xl border border-[#E4D9C4] bg-[#FBF6ED] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-maroon">
              Add New Address
            </h3>
            <button
              onClick={() => setShowAddAddress(false)}
              className="text-gray-400 hover:text-maroon transition-colors cursor-pointer"
            >
              <XCircle size={20} />
            </button>
          </div>
          {renderFormFields(form, setForm, formErrors, setFormErrors)}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSaveNew}
              disabled={addMutation.isPending}
              className="flex items-center gap-2 px-6 py-2.5 bg-maroon hover:bg-maroon/90 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60 cursor-pointer"
            >
              {addMutation.isPending && (
                <Loader2 size={14} className="animate-spin" />
              )}
              Save Address
            </button>
            <button
              onClick={() => setShowAddAddress(false)}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="py-12 text-center text-sm text-gray-400">
          Loading addresses...
        </div>
      ) : addresses.length === 0 ? (
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
          {defaultAddress && renderAddressCard(defaultAddress, true)}
          {otherAddresses.length > 0 && (
            <div className="space-y-3">
              {otherAddresses.map((a) => renderAddressCard(a, false))}
            </div>
          )}
        </div>
      )}

      {editingAddressId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-400 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-maroon">
                Edit Address
              </h3>
              <button
                onClick={() => setEditingAddressId(null)}
                className="text-gray-400 hover:text-maroon transition-colors cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {renderFormFields(
                editForm,
                setEditForm,
                editFormErrors,
                setEditFormErrors,
              )}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={updateMutation.isPending}
                  className="flex items-center gap-2 px-6 py-2.5 bg-maroon hover:bg-maroon/90 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60"
                >
                  {updateMutation.isPending && (
                    <Loader2 size={14} className="animate-spin" />
                  )}
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
