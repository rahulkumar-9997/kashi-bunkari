"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Customer } from "@/types/auth";
import { getCustomer, getToken, saveSession, clearSession } from "@/lib/authSession";

type AuthContextType = {
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (customer: Customer, token: string) => void;
  logout: () => void;
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

  const logout = () => {
    clearSession();
    setCustomer(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ customer, token, isAuthenticated: !!token, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}