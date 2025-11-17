"use client";

import { IconArrowLeft } from "@/app/_components/icons/icons";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 left-5 bg-base-content text-white p-3 rounded-full shadow-lg transition duration-300 ${
        isVisible ? " translate-y-0" : " translate-y-20 "
      }`}
      //   style={{ display: isVisible ? "block" : "none" }}
    >
      <IconArrowLeft />
    </button>
  );
};

export default ScrollToTop;
