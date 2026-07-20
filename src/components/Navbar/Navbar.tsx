"use client";
import LogoSearchBar from "./LogoSearchBar";
import NavBarComponents from "./NavBarComponents";

export default function Navbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <>
      {/* <header className="w-full"> */}
        <LogoSearchBar onMenuOpen={onMenuOpen} />
        <NavBarComponents />
      {/* </header> */}
    </>
    
  );
}