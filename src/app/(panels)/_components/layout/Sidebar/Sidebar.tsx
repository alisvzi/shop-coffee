"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar({ menuItems }) {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <aside className="flex h-full w-64 flex-col bg-white text-base-content border-r border-base-content">
      {/* Logo */}
      <div className="bg-base-100 flex h-16 items-center justify-center border-b border-base-content text-3xl font-extrabold tracking-widest text-base-content">
        COFFEE
      </div>

      {/* Navigation */}
      <nav className="shadow-md flex-1 overflow-y-auto p-6">
        <ul className="space-y-4">
          {menuItems.map((item) =>
            item.children ? (
              <li key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 font-semibold tracking-wide transition-colors duration-300 ${
                    openMenus.includes(item.label)
                      ? "bg-base-300 shadow-md"
                      : "hover:bg-base-200"
                  }`}
                  aria-expanded={openMenus.includes(item.label)}
                  aria-controls={`${item.label}-submenu`}
                >
                  <span className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    {item.label}
                  </span>
                  <span
                    className={`transition-transform duration-300 ${
                      openMenus.includes(item.label)
                        ? "rotate-90 "
                        : "rotate-0 "
                    }`}
                  >
                    ▶
                  </span>
                </button>
                {openMenus.includes(item.label) && (
                  <ul
                    id={`${item.label}-submenu`}
                    className="mt-2 space-y-2 border-l-4 border-accent-content pl-6"
                  >
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block rounded-md px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300  hover:bg-base-200"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 font-semibold tracking-wide transition-colors duration-300  hover:bg-base-200"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* User Profile */}
      <div
        className="shadow-md bg-base-100 border-t
       border-base-content p-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-content font-bold text-xl shadow-md">
            ن
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold tracking-wide">نام کاربر</span>
            <span className="text-xs tracking-wide">ادمین</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
