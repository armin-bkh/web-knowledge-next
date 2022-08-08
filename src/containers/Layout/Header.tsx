import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NavBar from "@/containers/Layout/NavBar";
import { useOrientation } from "@/hooks/useOreintation";

export type TNavLink = {
  href: string;
  title: string;
};

const navLinks: TNavLink[] = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/blogs",
    title: "Blogs",
  },
  {
    href: "/about",
    title: "About",
  },
  {
    href: "/auth/login",
    title: "Login",
  },
];

function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLandscape = useOrientation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsOpen(isLandscape && false);
  }, [isLandscape]);

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseMenu);
    return () => {
      document.removeEventListener("mousedown", handleCloseMenu);
    };
  }, [navRef]);

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  function handleCloseMenu(e: any) {
    if (
      navRef.current &&
      !navRef.current.contains(e.target) &&
      e.target.id !== "ham-menu"
    ) {
      setIsOpen(false);
    }
  }

  const handleOpenMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <header className="shadow-md p-5">
      <div className="container flex items-center justify-between mx-auto">
        <div className="font-extrabold text-cyan-700">WEB Knowledge</div>
        <NavBar ref={navRef} navLinks={navLinks} isOpen={isOpen} />
        <button
          id="ham-menu"
          className="md:hidden flex flex-col gap-1 z-10"
          type="button"
          onClick={handleOpenMenu}
        >
          <div id="ham-menu" className="bg-cyan-700 h-1 w-7 rounded-md"></div>
          <div
            id="ham-menu"
            className={`bg-cyan-700 h-1 rounded-md transition-all ${
              isOpen ? "w-5" : "w-7"
            }`}
          ></div>
          <div id="ham-menu" className="bg-cyan-700 h-1 w-7 rounded-md"></div>
        </button>
      </div>
    </header>
  );
}

export default Header;
