"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Textbox } from "@/app/_components/ui/textbox";
import { useState } from "react";

type DiscountFormState = {
  code: string;
  percent: string;
  maxUse: string;
  product: string;
};

type DiscountFormErrors = Partial<Record<keyof DiscountFormState, string>>;

const initialState: DiscountFormState = {
  code: "",
  percent: "",
  maxUse: "",
  product: "",
};

const DiscountForm = () => {
  const [form, setForm] = useState<DiscountFormState>(initialState);
  const [errors, setErrors] = useState<DiscountFormErrors>({});
  const { confirm } = useDialog();

  const validate = (): boolean => {
    const newErrors: DiscountFormErrors = {};
    const { code, percent, maxUse, product } = form;

    if (!code.trim()) {
      newErrors.code = "شناسه تخفیف نمی‌تواند خالی باشد.";
    }

    const percentNum = Number(percent);
    if (
      !percent ||
      isNaN(percentNum) ||
      percentNum <= 0 ||
      percentNum > 100 ||
      !/^\d+(\.\d{1,2})?$/.test(percent)
    ) {
      newErrors.percent = "درصد تخفیف باید عددی بین 1 تا 100 باشد.";
    }

    const maxUseNum = Number(maxUse);
    if (!maxUse || !Number.isInteger(maxUseNum) || maxUseNum <= 0) {
      newErrors.maxUse = "حداکثر استفاده باید یک عدد صحیح مثبت باشد.";
    }

    if (!product) {
      newErrors.product = "لطفا یک محصول را انتخاب کنید.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addDiscount = async () => {
    if (!validate()) return;

    const discount = {
      code: form.code.trim(),
      percent: Number(form.percent),
      maxUse: Number(form.maxUse),
      product: form.product,
    };

    const res = await fetch("/api/discounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discount),
    });

    if (res.status === 201) {
      await confirm({
        title: "کد تخفیف با موفقیت ایجاد شد",
        variant: "success",
        confirmText: "فهمیدم",
        isQuestion: false,
      }).then(() => {
        setForm(initialState);
        setErrors({});
      });
    } else {
      setErrors({ code: "مشکلی در ایجاد کد تخفیف رخ داده است." });
    }
  };

  const handleChange =
    (field: keyof DiscountFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error on change
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  return (
    <section className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
      <p className="text-lg font-semibold mb-4">افزودن کد تخفیف جدید</p>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">شناسه تخفیف</label>
          <Textbox
            value={form.code}
            onChange={handleChange("code")}
            placeholder="لطفا شناسه تخفیف را وارد کنید"
            type="text"
            aria-invalid={!!errors.code}
            aria-describedby="code-error"
            variant={errors.code ? "error" : "primary"}
          />
          {errors.code && (
            <p id="code-error" className="mt-1 text-sm text-error">
              {errors.code}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">درصد تخفیف</label>
          <Textbox
            value={form.percent}
            onChange={handleChange("percent")}
            placeholder="لطفا درصد تخفیف را وارد کنید"
            type="text"
            aria-invalid={!!errors.percent}
            aria-describedby="percent-error"
            variant={errors.percent ? "error" : "primary"}
          />
          {errors.percent && (
            <p id="percent-error" className="mt-1 text-sm text-error">
              {errors.percent}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">حداکثر استفاده</label>
          <Textbox
            value={form.maxUse}
            onChange={handleChange("maxUse")}
            placeholder="حداکثر استفاده از کد تخفیف"
            type="text"
            aria-invalid={!!errors.maxUse}
            aria-describedby="maxUse-error"
            variant={errors.maxUse ? "error" : "primary"}
          />
          {errors.maxUse && (
            <p id="maxUse-error" className="mt-1 text-sm text-error">
              {errors.maxUse}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">محصول</label>
          <select
            value={form.product}
            onChange={handleChange("product")}
            className={`w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.product ? "border-error" : "border-primary/30"
            }`}
            aria-invalid={!!errors.product}
            aria-describedby="product-error"
          >
            <option value="">انتخاب محصول</option>
            <option value="turkish-coffee">قهوه ترک</option>
            <option value="arabica-coffee">قهوه عربیکا</option>
            <option value="espresso-coffee">قهوه اسپرسو</option>
          </select>
          {errors.product && (
            <p id="product-error" className="mt-1 text-sm text-error">
              {errors.product}
            </p>
          )}
        </div>
      </div>

      <div className="text-end">
        <Button className="mt-6" onClick={addDiscount}>
          افزودن
        </Button>
      </div>
    </section>
  );
};

export default DiscountForm;
