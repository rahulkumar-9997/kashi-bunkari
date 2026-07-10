"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthModalContextType = {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <AuthModalContext.Provider
      value={{
        isLoginOpen,
        openLogin: () => setIsLoginOpen(true),
        closeLogin: () => setIsLoginOpen(false),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx)
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  return ctx;
}
