"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Table } from "../../../_components/Table/Table";

interface Product {
  name: string;
  date: string;
  score: number;
  body: string;
  isAccept: boolean;
}

export default function DiscountsTable({ discounts }) {
  const { confirm } = useDialog();

  const seeComment = async (bodyText) => {
    await confirm({
      title: "متن نظر",
      description: bodyText,
      variant: "success",
      isQuestion: false,
    });
  };

  return (
    <Table<Product>
      columns={[
        {
          key: "code",
          header: "کد",
        },
        {
          key: "percent",
          header: "درصد",
          render: (value) => <>{value}%</>,
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
            onClick={() => seeComment(row.body)}
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
