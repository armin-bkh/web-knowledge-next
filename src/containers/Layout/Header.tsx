import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NavBar from "@/containers/Layout/NavBar";
import { useOrientation } from "@/hooks/useOreintation";
import ChangeTheme from "@/components/common/ChangeTheme/ChangeTheme";

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

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLandscape, isMobile } = useOrientation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(isLandscape && false);
    }
  }, [isLandscape, isMobile]);

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
    <header className="shadow-md px-5 py-3 dark:text-light">
      <div className="container flex items-center justify-between mx-auto max-w-screen-xl">
        <div className="flex items-center">
          <div className="font-extrabold text-cyan-light dark:text-light mr-2">
            WEB Knowledge
          </div>
          <ChangeTheme />
        </div>
        <NavBar ref={navRef} navLinks={navLinks} isOpen={isOpen} />
        <button
          id="ham-menu"
          className="md:hidden flex flex-col gap-1 z-20"
          type="button"
          onClick={handleOpenMenu}
        >
          <div id="ham-menu" className="bg-cyan-light h-1 w-7 rounded-md"></div>
          <div
            id="ham-menu"
            className={`bg-cyan-light h-1 rounded-md transition-all ${
              isOpen ? "w-5" : "w-7"
            }`}
          ></div>
          <div id="ham-menu" className="bg-cyan-light h-1 w-7 rounded-md"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;
