export default function BlogSectionSkeleton() {
  return (
    <section
      className="w-full bg-[#faf9f7] lg:px-12 md:px-10 px-4"
      aria-busy="true"
      aria-label="Loading blog posts"
    >
      <div className="w-full max-w-7xl mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 md:mb-8">
          <div className="max-w-2xl w-full">
            <div className="h-7 w-32 rounded-full bg-gray-200 animate-pulse mb-5" />
            <div className="h-9 w-3/4 rounded-md bg-gray-200 animate-pulse mb-3" />
            <div className="h-9 w-1/2 rounded-md bg-gray-200 animate-pulse mb-5" />
            <div className="h-4 w-full max-w-lg rounded bg-gray-200 animate-pulse mb-2" />
            <div className="h-4 w-2/3 max-w-md rounded bg-gray-200 animate-pulse" />
          </div>
          <div className="hidden md:block h-11 w-40 rounded-full bg-gray-200 animate-pulse shrink-0" />
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 md:gap-8">
          <div className="rounded-2xl bg-gray-200 animate-pulse h-105 md:h-130" />

          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-xl border border-gray-100/80 p-2"
              >
                <div className="shrink-0 w-27.7 h-27.5 md:w-30 md:h-30 rounded-lg bg-gray-200 animate-pulse" />
                <div className="flex-1 min-w-0 py-1">
                  <div className="h-4 w-full rounded bg-gray-200 animate-pulse mb-2" />
                  <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse mb-3" />
                  <div className="h-3 w-full rounded bg-gray-100 animate-pulse mb-1.5" />
                  <div className="h-3 w-1/2 rounded bg-gray-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
