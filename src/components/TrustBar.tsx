import Heading from "./Heading/Heading";
const TRUSTS = [
  {
    title: "Authentic Quality",
    desc: "Hand-picked premium ethnic wear & trusted craftsmanship you can rely on",
  },
  {
    title: "Modern Tradition",
    desc: "Designs that blend timeless Indian heritage with contemporary elegance",
  },
  {
    title: "Express Delivery",
    desc: "Fast shipping across India with secure packaging and tracking",
  },
  {
    title: "Easy Returns",
    desc: "7-day hassle-free returns and exchange policy for your peace of mind",
  },
  {
    title: "100% Secure Payment",
    desc: "Safe payment gateways ensuring your data and privacy",
  },
];
const ICONS = [
  <path
    key="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
  />,
  <path
    key="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  />,
  <path
    key="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
  />,
  <path
    key="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
  />,
  <path
    key="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
  />,
];

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden w-full lg:px-12 md:px-10 px-4 bg-linear-to-b from-[#fffdfb] via-[#fff8f1] to-[#ffffff]">
      <div className="w-full max-w-7xl mx-auto lg:py-10 md:py-10 sm:py-10 py-8 relative z-10">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-linear-to-r from-transparent via-amber-300 to-transparent" />
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(ellipse_at_center,#b45309_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {TRUSTS.map((t, i) => (
              <div
                key={t.title}
                className="group relative flex flex-col items-center text-center gap-4 p-3 rounded-2xl transition-all duration-500 hover:bg-white/60 hover:shadow-[0_8px_30px_rgba(180,83,9,0.08)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-b from-amber-50/30 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-br from-amber-200/30 to-amber-400/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100" />
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-linear-to-br from-amber-50 via-white to-amber-100/50 shadow-[0_2px_8px_rgba(180,83,9,0.06)] group-hover:shadow-[0_8px_24px_rgba(180,83,9,0.12)] transition-all duration-500 border border-amber-200/30 group-hover:border-amber-300/50">
                    <div className="text-amber-600/70 group-hover:text-amber-700 transition-colors duration-300">
                      <svg
                        width="28"
                        height="28"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        className="group-hover:scale-110 transition-transform duration-300"
                      >
                        {ICONS[i]}
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="font-serif text-[20px] font-semibold text-maroon group-hover:text-amber-800 transition-colors duration-300">
                    {t.title}
                  </div>    
                  {/* <div className="w-8 h-px mx-auto mt-2 bg-linear-to-r from-transparent via-amber-300/50 to-transparent group-hover:via-amber-400/70 transition-all duration-500" /> */}
                  <p className="font-sans text-[14px] text-gray-400/90 mt-2.5 leading-relaxed tracking-wide group-hover:text-gray-500 transition-colors duration-300">
                    {t.desc}
                  </p>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-amber-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
