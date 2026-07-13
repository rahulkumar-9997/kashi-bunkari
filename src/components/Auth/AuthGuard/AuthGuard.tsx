"use client";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { openLogin } = useAuthModal();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
      openLogin();
    }
  }, [isLoading, isAuthenticated, router, openLogin]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E4D9C4] border-t-maroon rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}