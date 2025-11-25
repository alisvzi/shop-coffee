// "use client";

// because use want use usePathname for change style of active page

import Link from "next/link";
import React from "react";
// import { usePathname } from "next/navigation";

export const TopNavigation: React.FC = () => {
  const menuItems: NavigationMenuItem[] = [
    { title: "صفحه اصلی", href: "/" },
    { title: "فروشگاه", href: "/shop" },
    { title: "مطالب و مقالات", href: "/blog" },
    { title: "تماس با ما", href: "/contact-us" },
    { title: "درباره ما", href: "/about-us" },
    { title: "قوانین", href: "/rules" },
  ];

  // const pathname = usePathname();

  return (
    <ul className="hidden md:flex gap-x-4 mr-12">
      {menuItems.map((item, index) => {
        // const isActive = pathname === item.href;
        return (
          <React.Fragment key={`navigation-${item.href}`}>
            <li>
              {/* ${
                isActive &&
                "border-b-2 dark:text-primary  dark:border-primary/30"
              } */}
              <Link
                href={item.href}
                className={`hover:text-primary transition-colors p-2 hover:bg-base-25 active:bg-base-50 rounded-lg`}
              >
                {item.title}
              </Link>
            </li>
            {index >= menuItems.length - 1 ? (
              <></>
            ) : (
              <span className="text-base-300">|</span>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
