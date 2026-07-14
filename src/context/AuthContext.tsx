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

  return (
    <AuthContext.Provider
      value={{
        customer,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
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