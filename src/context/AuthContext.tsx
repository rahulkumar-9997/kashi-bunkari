"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Customer } from "@/types/auth";
import {
  getCustomer,
  getToken,
  saveSession,
  clearSession,
} from "@/lib/authSession";
import { logoutApi } from "@/services/authService";

type AuthContextType = {
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (customer: Customer, token: string) => void;
  logout: () => Promise<void>;
  /*updates both React state and localStorage. */
  updateCustomer: (updates: Partial<Customer>) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setCustomer(getCustomer());
    setToken(getToken());
    setIsLoading(false);
  }, []);

  const login = (newCustomer: Customer, newToken: string) => {
    saveSession(newCustomer, newToken);
    setCustomer(newCustomer);
    setToken(newToken);
  };

  const logout = async () => {
    const currentToken = token;
    clearSession();
    setCustomer(null);
    setToken(null);
    if (currentToken) {
      try {
        await logoutApi(currentToken);
      } catch (err) {
        console.error("Server-side logout failed (already logged out locally):", err);
      }
    }
  };

  const updateCustomer = (updates: Partial<Customer>) => {
    setCustomer((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      if (token) saveSession(next, token);
      return next;
    });
  };
  return (
    <AuthContext.Provider
      value={{
        customer,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        updateCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}