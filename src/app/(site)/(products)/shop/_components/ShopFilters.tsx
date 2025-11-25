"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/_components/ui/button/button";
import { RadioRating } from "@/app/_components/ui/radio-rating";
import { Textbox } from "@/app/_components/ui/textbox";
import { PriceRangeSlider } from "./PriceRangeSlider";

type ShopFiltersProps = { maxPrice: number };

export const ShopFilters: React.FC<ShopFiltersProps> = ({ maxPrice }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState<string>(searchParams.get("q") ?? "");
  const [min, setMin] = useState<number>(
    searchParams.get("min") ? Number(searchParams.get("min")) : 0
  );
  const [max, setMax] = useState<number>(
    searchParams.get("max") ? Number(searchParams.get("max")) : maxPrice
  );
  const [score, setScore] = useState<number | null>(
    searchParams.get("score") ? Number(searchParams.get("score")) : null
  );
  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "latest");

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
    setMin(searchParams.get("min") ? Number(searchParams.get("min")) : 0);
    setMax(searchParams.get("max") ? Number(searchParams.get("max")) : maxPrice);
    setScore(searchParams.get("score") ? Number(searchParams.get("score")) : null);
    setSort(searchParams.get("sort") ?? "latest");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const paramsString = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (min) params.set("min", String(min));
    if (max && max !== maxPrice) params.set("max", String(max));
    if (score) params.set("score", String(score));
    if (sort) params.set("sort", sort);
    return params.toString();
  }, [q, min, max, score, sort, maxPrice]);

  const applyFilters = () => {
    const url = paramsString ? `${pathname}?${paramsString}` : pathname;
    router.push(url);
  };

  const resetFilters = () => {
    setQ("");
    setMin(0);
    setMax(maxPrice);
    setScore(null);
    setSort("latest");
    router.push(pathname);
  };

  return (
    <aside className="w-full lg:w-[20%] rounded-xl border border-base-200 bg-white p-4 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">فیلترها</h3>
        <Button variant="ghost" size="small" onClick={resetFilters} className="text-sm">
          پاک‌سازی
        </Button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm">نام محصول</label>
        <Textbox
          placeholder="جستجوی نام..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          variant="ghost"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm">قیمت</label>
        <PriceRangeSlider
          min={0}
          max={maxPrice}
          step={10000}
          value={[min, max]}
          onChange={([lo, hi]) => {
            setMin(lo);
            setMax(hi);
          }}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm">حداقل امتیاز</label>
        <RadioRating value={score} onChange={(val) => setScore(val)} size="small" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm">مرتب‌سازی</label>
        <select
          className="textbox textbox-ghost"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">جدیدترین</option>
          <option value="price_asc">قیمت کم‌به‌زیاد</option>
          <option value="price_desc">قیمت زیاد‌به‌کم</option>
          <option value="score_desc">امتیاز بالا</option>
        </select>
      </div>

      <Button variant="primary" className="w-full" onClick={applyFilters}>
        اعمال فیلتر
      </Button>
    </aside>
  );
};