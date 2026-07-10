export default function FaqsPageSkeleton() {
  return (
    <div
      className="w-full min-h-screen"
      aria-busy="true"
      aria-label="Loading FAQs"
    >
      <section className="relative overflow-hidden">
        <div className="w-full max-w-5xl relative mx-auto lg:pt-10 md:pt-11 sm:pt-12 pt-8 pb-0 md:px-0 px-4 text-center">
          <div className="h-3 w-24 rounded bg-gray-200 animate-pulse mx-auto mb-4" />
          <div className="h-9 w-full max-w-md rounded bg-gray-200 animate-pulse mx-auto mb-5" />
          <div className="h-4 w-full max-w-sm rounded bg-gray-100 animate-pulse mx-auto" />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="w-full max-w-5xl relative mx-auto lg:py-10 md:py-11 sm:py-12 py-8 md:px-0 px-4">
          <div className="space-y-3 sm:space-y-3.5">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center justify-between gap-4 px-4 py-5">
                  <div className="h-5 w-2/3 rounded bg-gray-200 animate-pulse" />
                  <div className="h-5 w-5 rounded-full bg-gray-100 animate-pulse shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
