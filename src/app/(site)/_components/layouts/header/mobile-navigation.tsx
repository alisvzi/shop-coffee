"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderUserSection from "./header-user-section";
import { IconClose, IconToc } from "@/app/_components/icons/icons";

export const MobileNavigation: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { title: "صفحه اصلی", href: "/" },
    { title: "فروشگاه", href: "/shop" },
    { title: "مطالب و مقالات", href: "/blog" },
    { title: "تماس با ما", href: "/contact-us" },
    { title: "درباره ما", href: "/about-us" },
    { title: "قوانین", href: "/rules" },
  ];

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-lg hover:bg-base-25 active:bg-base-50"
        aria-label="open-menu"
      >
        <IconToc width={24} height={24} />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[99]"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full bg-white z-[100] flex flex-col">
            <div className="flex items-center justify-between h-16 px-5 border-b">
              <span className="font-bold">منو</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-base-25 active:bg-base-50"
                aria-label="close-menu"
              >
                <IconClose width={20} height={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-2 text-base leading-7">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-lg hover:bg-base-25 active:bg-base-50"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-5 border-t">
              <HeaderUserSection isLogin={isLogin} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};