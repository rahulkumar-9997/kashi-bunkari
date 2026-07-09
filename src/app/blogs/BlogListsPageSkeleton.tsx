export default function BlogListsPageSkeleton() {
  return (
    <div className="w-full min-h-screen"
      aria-busy="true"
      aria-label="Loading articles"
    >
      {/* Header skeleton */}
      <section className="relative overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto lg:py-10 md:py-10 sm:py-10 py-8 px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="h-9 w-full max-w-xl rounded bg-gray-200 animate-pulse mb-3" />
              <div className="h-9 w-2/3 max-w-sm rounded bg-gray-200 animate-pulse mb-4" />
              <div className="h-4 w-full max-w-lg rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="h-11 w-32 rounded-full bg-gray-200 animate-pulse shrink-0" />
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="w-full lg:px-12 md:px-10 px-4">
        <div className="w-full max-w-6xl mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Wide card */}
            <div className="sm:col-span-2 rounded-xl border border-gray-100 overflow-hidden flex flex-col sm:flex-row">
              <div className="w-full sm:w-2/4 aspect-4/3 bg-gray-200 animate-pulse" />
              <div className="flex-1 p-5">
                <div className="h-4 w-20 rounded bg-gray-100 animate-pulse mb-4" />
                <div className="h-6 w-full rounded bg-gray-200 animate-pulse mb-2" />
                <div className="h-6 w-2/3 rounded bg-gray-200 animate-pulse mb-4" />
                <div className="h-4 w-full rounded bg-gray-100 animate-pulse mb-1.5" />
                <div className="h-4 w-1/2 rounded bg-gray-100 animate-pulse" />
              </div>
            </div>

            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 overflow-hidden"
              >
                <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse" />
                <div className="p-5">
                  <div className="h-5 w-full rounded bg-gray-200 animate-pulse mb-2" />
                  <div className="h-5 w-2/3 rounded bg-gray-200 animate-pulse mb-4" />
                  <div className="h-4 w-full rounded bg-gray-100 animate-pulse mb-1.5" />
                  <div className="h-4 w-1/2 rounded bg-gray-100 animate-pulse mb-4" />
                  <div className="h-11 w-full rounded-lg bg-gray-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
