"use client";
import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/account/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);
  if (isLoading || !isAuthenticated) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E4D9C4] border-t-maroon rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}