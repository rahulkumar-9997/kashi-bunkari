import Link from "next/link";
import { ChevronRight } from "lucide-react";
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: Props) {
  return (
    <section className="breadcrumb">
      <div className="relative overflow-hidden bg-gray-50 py-2 md:py-3">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(30deg,transparent,transparent_38px,rgba(244,114,182,0.05)_38px,rgba(244,114,182,0.05)_40px)]"/>
        <div className="relative mx-auto max-w-7xl px-2 md:px-8 lg:px-1">
          <div className="flex flex-wrap items-center gap-2 text-[12px]">
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <span
                  key={`${item.label}-${i}`}
                  className="flex items-center gap-2"
                >
                  {isLast || !item.href ? (
                    <span className="font-medium text-gray-500 text-[14px]">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-500 text-[14px] transition hover:text-maroon"
                    >
                      {item.label}
                    </Link>
                  )}
                  {!isLast && (
                    <ChevronRight size={14} className="text-gray-500" />
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
