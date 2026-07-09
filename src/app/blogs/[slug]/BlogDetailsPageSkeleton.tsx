// src/app/blogs/[slug]/BlogDetailsPageSkeleton.tsx
export default function BlogDetailsPageSkeleton() {
  return (
    <div className="w-full min-h-screen bg-white" aria-busy="true" aria-label="Loading article">
      <section className="w-full lg:px-12 md:px-10 px-4">
        <div className="w-full max-w-4xl mx-auto lg:py-10 md:py-10 sm:py-10 py-8">
          <div className="text-center">
            <div className="h-9 w-full max-w-2xl mx-auto rounded bg-gray-200 animate-pulse mb-3" />
            <div className="h-9 w-2/3 max-w-md mx-auto rounded bg-gray-200 animate-pulse mb-5" />
            <div className="h-4 w-full max-w-xl mx-auto rounded bg-gray-100 animate-pulse mb-2" />
            <div className="h-4 w-2/3 max-w-sm mx-auto rounded bg-gray-100 animate-pulse" />
          </div>

          <div className="w-full aspect-16/10 rounded bg-gray-200 animate-pulse mt-5" />

          <div className="pt-10 sm:pt-12 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-4 rounded bg-gray-100 animate-pulse ${i === 5 ? "w-1/2" : "w-full"}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full lg:px-12 md:px-10 px-4 mt-10">
        <div className="mx-auto max-w-6xl py-8">
          <div className="h-7 w-56 rounded bg-gray-200 animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
                <div className="w-full aspect-4/3 bg-gray-200 animate-pulse" />
                <div className="p-5">
                  <div className="h-5 w-full rounded bg-gray-200 animate-pulse mb-2" />
                  <div className="h-5 w-2/3 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
