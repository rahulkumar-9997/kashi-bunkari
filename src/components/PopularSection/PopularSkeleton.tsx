export default function PopularSkeleton() {
  return (
    <section className="w-full lg:px-12 md:px-10 px-4">
      <div className="w-full max-w-7xl relative mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
        <div className="flex items-end justify-between mb-7 md:mb-8 animate-pulse">
          <div className="space-y-2">
            <div className="h-7 w-52 rounded-md bg-gray-200" />
            <div className="h-4 w-64 rounded-md bg-gray-100 mt-3" />
          </div>
          <div className="hidden md:block h-11 w-32 rounded-full bg-gray-100" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white"
            >
              <div className="bg-gray-200" style={{ aspectRatio: "3/4" }} />
              <div className="px-3 py-3 space-y-2.5">
                <div className="h-4 w-16 rounded-full bg-gray-100" />
                <div className="h-3.5 w-full rounded bg-gray-200" />
                <div className="h-3.5 w-2/3 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
