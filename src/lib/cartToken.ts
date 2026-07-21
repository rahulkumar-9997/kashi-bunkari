const CART_TOKEN_KEY = "kasibunkari_cart_token";

/**
 * Cookies for guest-cart identification are unreliable across origins,
 * especially over plain HTTP (browsers require SameSite=None; Secure —
 * i.e. HTTPS — for cross-site cookies, and will silently drop them
 * otherwise). This generates a stable client-side token instead, stored
 * in localStorage, sent as a custom header on every cart request. The
 * backend can use it to identify the same guest cart across requests,
 * completely sidestepping cookie/session issues.
 */
export function getCartToken(): string {
  if (typeof window === "undefined") return "";

  let token = localStorage.getItem(CART_TOKEN_KEY);
  if (!token) {
    token =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `cart_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(CART_TOKEN_KEY, token);
  }
  return token;
}