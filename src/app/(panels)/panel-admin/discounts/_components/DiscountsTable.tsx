"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Table } from "../../../_components/Table/Table";

type DiscountRow = {
  _id: string;
  code: string;
  percent: number;
  maxUse: number;
  uses: number;
};

export default function DiscountsTable({ discounts }: { discounts: DiscountRow[] }) {
  const { confirm } = useDialog();

  const confirmDelete = async (code: string) => {
    await confirm({
      title: "حذف تخفیف",
      description: `کد: ${code}`,
      variant: "warning",
      isQuestion: false,
    });
  };

  return (
    <Table<DiscountRow>
      columns={[
        {
          key: "code",
          header: "کد",
        },
        {
          key: "percent",
          header: "درصد",
          render: (value) => <>{(value as number)}%</>,
        },
        {
          key: "maxUse",
          header: "حداکثر استفاده",
        },
        {
          key: "uses",
          header: "دفعات استغاده شده",
        },
      ]}
      data={discounts}
      bordered
      isIndex
      actions={(row) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="button"
            onClick={() => confirmDelete(row.code)}
            size="small"
            variant="error"
          >
            حذف
          </Button>
        </div>
      )}
    />
  );
}
