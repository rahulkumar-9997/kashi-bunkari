export default function OccasionSkeleton() {
  return (
    <section className="w-full lg:px-12 md:px-10 px-4 relative overflow-hidden">
      <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-10 sm:py-10 py-8 flex flex-col lg:gap-14 md:gap-12 gap-10">
        <div className="relative w-full max-w-7xl mx-auto px-2 lg:px-2 sm:px-2 md:px-1">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 md:mb-8">
            <div className="space-y-1.5 md:space-y-2 animate-pulse">
              <div className="h-7 w-56 rounded-md bg-gray-200" />
              <div className="h-4 w-72 rounded-md bg-gray-100 mt-3" />
            </div>
          </div>

          {/* Mobile skeleton */}
          <div className="grid grid-cols-2 gap-2.5 md:hidden animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-gray-200"
                style={{ height: 160 }}
              />
            ))}
          </div>

          {/* Desktop skeleton */}
          <div className="hidden md:grid grid-cols-3 gap-3 md:gap-4 grid-rows-[repeat(2,minmax(180px,220px))] animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-gray-200 ${i === 0 ? "row-span-2" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
