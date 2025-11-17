"use client";

import { Button } from "@/app/_components/ui/button/button";
import { Textbox } from "@/app/_components/ui/textbox";
import stateData from "@/utils/stateData";
import Link from "next/link";
import { useState } from "react";
import Select from "react-select";
import SetDiscount from "./SetDiscount";

const TotalSectionCart = ({ cart }) => {
  const [changeAddress, setChangeAddress] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Prepare state options for react-select
  const stateOptions = stateData().map((state) => ({
    label: state.label,
    value: state.label,
    cities: state.value,
  }));

  // When a state is selected, reset city selection
  const handleStateChange = (option) => {
    setSelectedState(option);
    setSelectedCity(null);
  };

  // Prepare city options based on selected state
  const cityOptions = selectedState
    ? selectedState.cities.map((city) => ({ label: city, value: city }))
    : [];

  const calcTotalPrice = () => {
    if (!cart || !cart.length) return 0;
    const total = cart.reduce(
      (prev, current) => prev + current.price * current.count,
      0
    );
    if (discountPercent > 0) {
      return total - (total * discountPercent) / 100; // اعمال درصد تخفیف
    }
    return total;
  };

  return (
    <aside className="w-full lg:w-96 bg-white p-6 rounded-lg shadow-md flex flex-col">
      <h3 className="text-2xl font-extrabold mb-6 text-gray-800">
        جمع کل سبد خرید
      </h3>

      <div className="flex justify-between items-center border-b border-base-content/30 pb-3 mb-4">
        <span className="text-base-content/70 font-medium">جمع جزء</span>
        <span className="font-semibold text-lg">
          {calcTotalPrice().toLocaleString()} تومان
        </span>
      </div>

      <div className="mb-4">
        <p className="text-base-content/70 mb-1">
          پیک موتوری:{" "}
          <strong className="text-base-content/90">30,000 تومان</strong>
        </p>
        <p className="text-sm text-base-content/50">
          حمل و نقل به تهران (فقط شهر تهران).
        </p>
      </div>

      <button
        onClick={() => setChangeAddress((prev) => !prev)}
        className="text-info hover:underline text-right mb-6 font-semibold"
        aria-expanded={changeAddress}
        aria-controls="address-section"
      >
        {changeAddress ? "بستن تغییر آدرس" : "تغییر آدرس"}
      </button>

      {changeAddress && (
        <div id="address-section" className="mb-6 space-y-4">
          {/* Province Select */}
          <Select
            options={stateOptions}
            value={selectedState}
            onChange={handleStateChange}
            placeholder="استان را انتخاب کنید"
            isRtl
            classNamePrefix="react-select"
            aria-label="انتخاب استان"
          />

          {/* City Select */}
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder="شهر را انتخاب کنید"
            isDisabled={!selectedState}
            isRtl
            classNamePrefix="react-select"
            aria-label="انتخاب شهر"
          />

          <Textbox type="number" placeholder="کد پستی" aria-label="کد پستی" />

          <Button onClick={() => setChangeAddress(false)}>بروزرسانی</Button>
        </div>
      )}

      <div className="py-4 my-4">
        <SetDiscount onDiscountApplied={setDiscountPercent} />
      </div>

      <div className="flex justify-between items-center text-lg font-extrabold border-t border-base-content/30 pt-4">
        <span>مجموع</span>
        <span>{calcTotalPrice().toLocaleString()} تومان</span>
      </div>

      <Link href={"/checkout"} className="mt-4">
        <Button shape="full" variant="success">
          ادامه جهت تصویه حساب
        </Button>
      </Link>
    </aside>
  );
};

export default TotalSectionCart;
