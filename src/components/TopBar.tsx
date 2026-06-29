import React from "react";

export const TopBar = () => {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#8b0b13] via-[#b8870a] to-[#8b0b13] py-1 px-4 border-b border-[#e9d27d]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">            
            <p className="font-sans text-white text-[11.5px] sm:text-[12px] font-medium tracking-wide truncate">
              <a
                href="https://wa.me/919270588878"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-200 transition-colors duration-200 underline-offset-2 hover:underline font-semibold"
              >
                WhatsApp +91-9270588878
              </a>
              <span className="hidden sm:inline">
                &nbsp;|&nbsp; Free Delivery above ₹2,000 &nbsp;|&nbsp; Easy
                7-Day Returns
              </span>
            </p>
          </div>

          {/* Right Section - Social Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Free Delivery - Mobile */}
            <span className="sm:hidden text-white/90 text-[10px] font-medium px-2 py-0.5 bg-white/10 rounded-full">
              Free ₹2000+
            </span>
            {/* Social Icons */}
            <div className="flex items-center gap-1">
              <a
                href="#"
                className="p-1.5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 text-white/80 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-1.5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 text-white/80 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-1.5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 text-white/80 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-1.5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                aria-label="YouTube"
              >
                <svg
                  className="w-4 h-4 text-white/80 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <span className="hidden sm:inline-block w-px h-5 bg-white/20"></span>
            <div className="hidden sm:flex items-center gap-1.5 text-white/80 text-[10px] font-medium">
              <svg
                className="w-3.5 h-3.5 text-white/60"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Trusted Store</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
