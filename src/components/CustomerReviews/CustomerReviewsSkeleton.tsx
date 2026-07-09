export default function CustomerReviewsSkeleton() {
  return (
    <section
      className="w-full overflow-hidden bg-white"
      aria-busy="true"
      aria-label="Loading customer reviews"
    >
      {/* Dark header band skeleton */}
      <div
        className="w-full py-14 md:py-15 px-4 md:px-8 lg:px-4"
        style={{
          background:
            "linear-gradient(135deg, #2d0a14 0%, #5c1a2e 45%, #8b1a34 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="max-w-md w-full">
            <div className="h-3 w-40 rounded-full bg-white/15 animate-pulse mb-5" />
            <div className="h-9 w-full rounded bg-white/15 animate-pulse mb-3" />
            <div className="h-9 w-2/3 rounded bg-white/15 animate-pulse mb-4" />
            <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
          </div>
          <div className="h-28 w-full max-w-xs rounded-2xl bg-white/10 animate-pulse shrink-0" />
        </div>
      </div>

      {/* Review cards skeleton */}
      <div className="w-full bg-[#fdfcfb] py-12 md:py-16 px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-14 rounded bg-gray-100 animate-pulse" />
              </div>
              <div className="h-4 w-full rounded bg-gray-100 animate-pulse mb-2" />
              <div className="h-4 w-full rounded bg-gray-100 animate-pulse mb-2" />
              <div className="h-4 w-2/3 rounded bg-gray-100 animate-pulse mb-6" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                <div>
                  <div className="h-3 w-24 rounded bg-gray-200 animate-pulse mb-1.5" />
                  <div className="h-2.5 w-16 rounded bg-gray-100 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
