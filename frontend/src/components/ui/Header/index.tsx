"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

import menuData from "./menuData";
import { useTheme } from "next-themes";

const Header = () => {
  const pathUrl = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { setTheme } = useTheme();
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const navbarToggleHandler = () => setNavbarOpen((prev) => !prev);

  const handleStickyNavbar = () => setSticky(window.scrollY >= 80);

  const handleSubmenu = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  useEffect(() => {
    setTheme("light");
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  return (
    <header
      className={clsx("ud-header fixed left-0 top-0 z-40 w-full", {
        "shadow-nav border-b bg-white/80 backdrop-blur-[5px] dark:border-dark-3/20 dark:bg-dark/10":
          sticky,
        "absolute bg-transparent": !sticky,
      })}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-24 max-w-full px-4">
            <Link
              href="/"
              className={clsx("navbar-logo block w-full", {
                "py-2": sticky,
                "py-5": !sticky,
              })}
            >
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={240}
                height={30}
                className="header-logo w-full dark:block"
              />
            </Link>
          </div>
          <div className="flex items-center justify-between px-4 w-full">
            <button
              onClick={navbarToggleHandler}
              className="absolute right-4 top-1/2 -translate-y-1/2 block lg:hidden"
            >
              <span
                className={clsx(
                  "relative block h-0.5 w-[30px] transition-all duration-300",
                  navbarOpen && "rotate-45 top-[7px]",
                  pathUrl !== "/" && "!bg-dark dark:!bg-black",
                  sticky && "bg-dark dark:bg-secondary",
                )}
              ></span>
              <span
                className={clsx(
                  "relative block h-0.5 w-[30px] transition-all duration-300",
                  navbarOpen && "opacity-0",
                  pathUrl !== "/" && "!bg-dark dark:!bg-black",
                  sticky && "bg-dark dark:bg-secondary",
                )}
              ></span>
              <span
                className={clsx(
                  "relative block h-0.5 w-[30px] transition-all duration-300",
                  navbarOpen && "-rotate-45 top-[-8px]",
                  pathUrl !== "/" && "!bg-dark dark:!bg-black",
                  sticky && "bg-dark dark:bg-secondary",
                )}
              ></span>
            </button>
            <nav
              className={clsx(
                "absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-black px-6 py-4 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:dark:bg-transparent",
                navbarOpen && "opacity-100 top-full",
              )}
            >
              <ul className="block lg:ml-8 lg:flex lg:gap-x-8 xl:ml-14 xl:gap-x-12">
                <li className="sm:hidden">
                  <Link
                    href="/dashboard"
                    className="block text-center w-full p-3 rounded-xl py-2 text-base text-secondary"
                  >
                    Acessar Plataforma
                  </Link>
                </li>
                {menuData.map((menuItem, index) =>
                  menuItem.path ? (
                    <li key={index} className="group relative">
                      <Link
                        href={menuItem.path}
                        className={clsx(
                          "ud-menu-scroll flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6",
                          {
                            "!text-primary":
                              pathUrl === menuItem?.path &&
                              (pathUrl !== "/" || sticky),
                            "!text-white":
                              pathUrl === menuItem?.path &&
                              pathUrl === "/" &&
                              !sticky,
                            "text-secondary-foreground dark:text-secondary-foreground":
                              sticky,
                            "text-secondary dark:text-secondary-foreground lg:text-secondary-foreground":
                              !sticky,
                          },
                        )}
                      >
                        {menuItem.title}
                      </Link>
                    </li>
                  ) : (
                    <li key={index} className="submenu-item group relative">
                      <button
                        onClick={() => handleSubmenu(index)}
                        className={clsx(
                          "ud-menu-scroll flex items-center justify-between py-2 text-base",
                          {
                            "text-primary": openIndex === index,
                            "text-secondary dark:text-secondary": !sticky,
                          },
                        )}
                      >
                        {menuItem.title}
                        <span className="pl-1">
                          <svg
                            className="duration-300 lg:group-hover:rotate-180"
                            width="16"
                            height="17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 11.9L1.85 6.1C1.625 5.875 1.625 5.525 1.85 5.3C2.075 5.075 2.425 5.075 2.65 5.3L8 10.525L13.35 5.25C13.575 5.025 13.925 5.025 14.15 5.25C14.375 5.475 14.375 5.825 14.15 6.05L8 11.7C8.275 11.825 8.15 11.9 8 11.9Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      </button>
                      <div
                        className={clsx(
                          "submenu absolute top-full left-0 w-[250px] rounded-sm bg-white p-4 transition-all duration-300 lg:hidden lg:group-hover:block",
                          openIndex === index ? "visible" : "invisible",
                        )}
                      >
                        {menuItem?.submenu?.map(
                          (submenuItem, i) =>
                            submenuItem.path && (
                              <Link
                                href={submenuItem.path}
                                key={i}
                                className={clsx(
                                  "block rounded px-4 py-[10px] text-sm",
                                  pathUrl === submenuItem.path
                                    ? "text-primary"
                                    : "text-body-color dark:text-dark-6 hover:text-primary dark:hover:text-primary",
                                )}
                              >
                                {submenuItem.title}
                              </Link>
                            ),
                        )}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <div className="hidden sm:flex lg:pr-0">
              <Link
                href="/dashboard"
                className="mx-4 font-bold bg-secondary-foreground p-3 rounded-xl text-primary-foreground text-xs"
              >
                Acessar Plataforma
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
