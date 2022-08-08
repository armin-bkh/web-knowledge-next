import { TNavLink } from "@/containers/Layout/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { forwardRef } from "react";

export interface INavbarProps {
  isOpen: boolean;
  navLinks: TNavLink[];
}

function NavBar(props: INavbarProps, ref: any) {
  const { isOpen, navLinks } = props;

  const router = useRouter();

  return (
    <nav
      className={`fixed md:relative right-0 left-0 -z-10 top-0 bottom-0 bg-opacity-30 dark:bg-opacity-30 transition-all ${
        isOpen ? "bg-gray-400 dark:bg-gray-900 md:bg-transparent z-20" : null
      }`}
    >
      <ul
        ref={ref}
        className={`bg-gray-50 dark:bg-gray-dark dark:md:bg-transparent md:bg-transparent shadow-xl md:shadow-none fixed md:static left-10 right-10 rounded-t-2xl md:rounded-none p-2 flex flex-col md:flex-row gap-2 md:gap-0 transition-all ${
          isOpen ? "bottom-0" : "-bottom-full"
        } `}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            navLink={link}
            isActive={link.href === router.pathname}
          />
        ))}
      </ul>
    </nav>
  );
}

export default forwardRef(NavBar);

export interface INavLinkProps {
  isActive: boolean;
  navLink: TNavLink;
}

export function NavLink(props: INavLinkProps) {
  const { isActive, navLink } = props;

  return (
    <li className="relative first:mt-0 mt-2 md:mt-0">
      <Link href={navLink.href}>
        <a
          className={`px-5 py-2 font-bold w-full inline-block ${
            isActive
              ? "text-cyan-light dark:bg-cyan-light dark:text-light rounded-md"
              : null
          }`}
        >
          {navLink.title}
        </a>
      </Link>
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
