"use client";

import Stepper from "@/app/_components/ui/stepper/Stepper";
import { useEffect, useState } from "react";
import CartTable from "./_components/CartTable";
import TotalSectionCart from "./_components/TotalSectionCart";

const Page = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    const parsedCart = localCart ? JSON.parse(localCart) : [];
    setCart(parsedCart);
  }, []);

  const steps = [
    { id: "cart", label: "سبد خرید", href: "/cart" },
    { id: "checkout", label: "پرداخت", href: "/checkout" },
    { id: "complete", label: "تکمیل سفارش", href: "/complete" },
  ];

  return (
    <>
      <Stepper steps={steps} currentStep={"cart"} />
      <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-10 my-10 py-10">
        {/* Cart Table */}
        <CartTable cart={cart} />

        {/* Totals Section */}
        <TotalSectionCart cart={cart} />
      </div>
    </>
  );
};

export default Page;
