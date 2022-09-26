import React, { forwardRef, useMemo } from "react";
import Link from "next/link";

import { useCRouter } from "@/hooks/useCRouter";
import { useAuth, useAuthActions } from "@/containers/Providers/AuthProvider";

export type TNavLink = {
  href: string;
  title: string;
  onClick?: () => void;
};

export interface INavBarProps {
  isOpen: boolean;
}

const NavBar = (props: INavBarProps, ref: any) => {
  const { isOpen } = props;

  const { user } = useAuth();
  const { handleLogout } = useAuthActions();

  const router = useCRouter();

  const navLinks: TNavLink[] = useMemo(
    () => [
      {
        href: "/",
        title: "Home",
      },
      {
        href: "/blogs",
        title: "Blogs",
      },
      {
        href: user ? "/profile" : "/auth/login",
        title: user ? user.name : "Login",
      },
    ],
    [user, handleLogout]
  );

  return (
    <nav
      className={`fixed md:relative right-0 left-0 -z-50 md:z-auto bg-opacity-30 dark:bg-opacity-30 ${
        isOpen
          ? "bg-gray-400 dark:bg-gray-900 md:bg-transparent z-50 top-0 bottom-0"
          : "z-0"
      }`}
    >
      <ul
        ref={ref}
        className={`bg-gray-50 z-20 dark:bg-gray-dark dark:md:bg-transparent md:bg-transparent shadow-xl md:shadow-none fixed md:static left-10 right-10 rounded-t-2xl md:rounded-none p-2 flex flex-col md:flex-row gap-2 md:gap-0 ${
          isOpen ? "bottom-0" : "-bottom-full"
        } `}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.title}
            navLink={link}
            isActive={link?.href === router.pathname}
          />
        ))}
        {user && (
          <li className="mt-2 md:mt-0">
            <button
              type="button"
              onClick={handleLogout}
              className="px-5 py-2 font-bold w-full inline-block bg-gray-dark text-white rounded-full dark:bg-gray-dark"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default forwardRef(NavBar);

export interface INavLinkProps {
  isActive: boolean;
  navLink: TNavLink;
}

export function NavLink(props: INavLinkProps) {
  const { isActive, navLink } = props;

  const NavItem = useMemo(() => (navLink.href ? Link : "button"), [navLink]);

  return (
    <li className="relative first:mt-0 mt-2 md:mt-0">
      <NavItem href={navLink.href}>
        <a
          className={`px-5 py-2 font-bold w-full inline-block rounded-md ${
            isActive
              ? "text-cyan-light dark:bg-cyan-light dark:text-light"
              : null
          }`}
        >
          {navLink.title}
        </a>
      </NavItem>
      <span
        className={`w-full h-0.5 block mt-2 absolute rounded-md dark:hidden ${
          isActive
            ? "bg-cyan-light shadow shadow-cyan-light/50 blur-[0.5px]"
            : null
        }`}
      ></span>
    </li>
  );
}
