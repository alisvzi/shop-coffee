"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/_components/ui/button/button";

export const ShopToolbar: React.FC<{ resultsCount: number }> = ({ resultsCount }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "latest";
  const q = searchParams.get("q") ?? "";
  const tag = searchParams.get("tag") ?? "";

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearTag = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="rounded-xl border border-base-200 bg-base-100 p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-sm">نتایج: {resultsCount.toLocaleString()} مورد</span>
        {q && <span className="text-xs opacity-70">جستجو: {q}</span>}
        {tag && (
          <Button size="small" variant="ghost" onClick={clearTag} className="text-xs">
            حذف فیلتر برچسب ({tag})
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <label className="opacity-80">مرتب‌سازی:</label>
        <select
          className="textbox textbox-ghost"
          value={sort}
          onChange={(e) => updateSort(e.target.value)}
        >
          <option value="latest">جدیدترین</option>
          <option value="price_asc">قیمت کم‌به‌زیاد</option>
          <option value="price_desc">قیمت زیاد‌به‌کم</option>
          <option value="score_desc">امتیاز بالا</option>
        </select>
      </div>
    </div>
  );
};