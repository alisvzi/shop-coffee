"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Textbox } from "@/app/_components/ui/textbox";
import { useState } from "react";

type SetDiscountProps = {
  onDiscountApplied: (percent: number) => void;
};

const SetDiscount: React.FC<SetDiscountProps> = ({ onDiscountApplied }) => {
  const [discount, setDiscount] = useState<string>("");
  const { confirm } = useDialog();

  const checkDiscount = async () => {
    // Validation (You) ✅

    const res = await fetch("api/discounts/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });

    console.log("Response ->", res);

    if (res.status === 404) {
      return confirm({
        title: "خطا",
        description: "کد تخفیف وارد شده معتبر نیست",
        variant: "error",
        confirmText: "تلاش مجدد",
      });
    } else if (res.status === 422) {
      return confirm({
        title: "خطا",
        description: "کد تخفیف وارد شده منقضی شده",
        variant: "error",
        confirmText: "تلاش مجدد",
      });
    } else if (res.status === 200) {
      const discountCode = await res.json();
      confirm({
        title: "",
        description: "کد تخفیف با موفقیت اعمال شد",
        variant: "success",
        confirmText: "فهمیدم",
      });
      onDiscountApplied(discountCode.percent);
    }
  };
  return (
    <div className="flex gap-3 items-center">
      <Textbox
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        type="text"
        placeholder="کد تخفیف"
        className="flex-[70%]"
      />
      <Button
        shape="full"
        variant="success"
        className="flex-[35%] whitespace-nowrap"
        onClick={checkDiscount}
      >
        اعمال کوپن
      </Button>
    </div>
  );
};

export default SetDiscount;
