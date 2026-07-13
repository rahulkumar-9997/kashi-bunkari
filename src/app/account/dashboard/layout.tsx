import type { ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AuthGuard from "@/components/Auth/AuthGuard/AuthGuard";
import AccountSidebar from "@/components/Account/AccountSidebar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="w-full min-h-screen bg-white">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "My Account" }]}
        />
        <section className="w-full overflow-hidden">
            <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-11 sm:py-12 py-8 md:px-0 px-4 flex flex-col lg:gap-14 md:gap-12 gap-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <AccountSidebar />
                    <main className="w-full flex-1 min-w-0">{children}</main>
                </div>
            </div>
        </section>
      </div>
    </AuthGuard>
  );
}
