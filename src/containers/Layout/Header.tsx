import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import NavBar from "@/containers/Layout/NavBar";
import { useOrientation } from "@/hooks/useOreintation";
import ChangeTheme from "@/components/common/ChangeTheme/ChangeTheme";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navRef = useRef<HTMLElement>(null);

  const { isLandscape, isMobile } = useOrientation();
  const router = useRouter();

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

  const handleCloseMenu = useCallback((e: any) => {
    if (
      navRef.current &&
      !navRef.current.contains(e.target) &&
      e.target.id !== "ham-menu"
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleOpenMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <header className="shadow-md px-5 py-3 dark:text-light sticky top-0 z-20 bg-gray-50 dark:bg-gray-darkest">
      <div className="container flex items-center justify-between mx-auto max-w-screen-xl">
        <div className="flex items-center">
          <div className="font-extrabold text-cyan-light dark:text-light mr-2">
            WEB Knowledge
          </div>
          <ChangeTheme />
        </div>
        <NavBar ref={navRef} isOpen={isOpen} />
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
