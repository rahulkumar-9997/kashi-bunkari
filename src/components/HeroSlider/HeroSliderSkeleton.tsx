export default function HeroSliderSkeleton() {
  return (
    <section
      className="w-full relative overflow-hidden"
      aria-busy="true"
      aria-label="Loading banners"
    >
      <div className="md:hidden w-full aspect-15/22 bg-gray-200 animate-pulse" />
      <div className="hidden md:block w-full aspect-12/5 bg-gray-200 animate-pulse" />
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        <span className="w-4.5 h-1.75 rounded-full bg-white/60" />
        <span className="w-1.75 h-1.75 rounded-full bg-white/35" />
        <span className="w-1.75 h-1.75 rounded-full bg-white/35" />
      </div>
    </section>
  );
}
