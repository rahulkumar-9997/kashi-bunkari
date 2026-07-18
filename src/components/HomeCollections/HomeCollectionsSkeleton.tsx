export default function HomeCollectionsSkeleton() {
  return (
    <section className="w-full py-10 md:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-2 lg:px-1">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7 animate-pulse">
          <div className="space-y-2">
            <div className="h-7 w-52 rounded-md bg-gray-200" />
            <div className="h-4 w-64 rounded-md bg-gray-100 mt-3" />
          </div>
          <div className="hidden md:block h-8 w-28 rounded-full bg-gray-100" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-[#f4f1ee] border border-slate-100"
            >
              <div className="bg-gray-200" style={{ aspectRatio: "2/3" }} />
              <div className="bg-white px-4 py-3 space-y-2">
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-1 w-full rounded-full bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
