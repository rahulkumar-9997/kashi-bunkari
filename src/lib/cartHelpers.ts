import type { CartItem } from "@/types/cart";

export function formatPrice(value: number): string {
  return `Rs. ${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}
export function toNumber(
  value: string | number | null | undefined,
): number | null {
  if (value == null) return null;
  const n = typeof value === "string" ? parseFloat(value) : value;
  return Number.isFinite(n) ? n : null;
}

export function getUnitPrice(item: CartItem): number | null {
  const offerRate = toNumber(item.offer_rate);
  const mrp = toNumber(item.mrp);
  return offerRate ?? mrp;
}

export function getLineTotal(item: CartItem): number | null {
  if (item.line_total != null) return item.line_total;
  const unitPrice = getUnitPrice(item);
  return unitPrice != null ? unitPrice * item.quantity : null;
}

export function hasDiscount(item: CartItem): boolean {
  const mrp = toNumber(item.mrp);
  const offerRate = toNumber(item.offer_rate);
  return mrp != null && offerRate != null && mrp > offerRate;
}
