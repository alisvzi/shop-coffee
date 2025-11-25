"use client";

import { useEffect, useState } from "react";
import HeaderUserSection from "./header-user-section";
import { TopNavigation } from "./top-navigation";
import { MobileNavigation } from "./mobile-navigation";

interface IHeaderProps {
  isLogin: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ isLogin }) => {
  const [isFixed, setIsFixed] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    let lastScrollPosition = window.scrollY;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= 0) {
        if (
          (scrollPosition < lastScrollPosition && isFixed === false) ||
          scrollPosition < 5
        ) {
          setIsFixed(true);
        }

        if (
          scrollPosition >= window.innerHeight / 3 &&
          scrollPosition > lastScrollPosition &&
          isFixed === true
        ) {
          setIsFixed(false);
        }
      } else {
        setIsFixed(false);
      }

      lastScrollPosition = scrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);

  return (
    <header className="relative">
      <div className="h-[4rem]"></div>

      <div
        className={`w-full bg-white border-b border-base-content/10 fixed top-0 transition duration-300 ease-in-out ${
          isFixed ? "translate-y-0" : "translate-y-[-3.7rem]"
        } z-[9]`}
      >
        <div className="container flex items-center justify-between h-[4rem]">
          <img
            src="https://set-coffee.com/wp-content/uploads/2022/06/logonew.png"
            className="h-[43px]"
            alt="کلاسبن"
          />
          <TopNavigation />
          <div className="mr-auto hidden md:block">
            <HeaderUserSection isLogin={isLogin} />
          </div>
          <div className="mr-auto md:hidden">
            <MobileNavigation isLogin={isLogin} />
          </div>
        </div>
      </div>
    </header>
  );
};
