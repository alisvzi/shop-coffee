"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Rating } from "@/app/_components/ui/rating";
import { Table } from "../../../_components/Table/Table";

type ProductRow = {
  _id: string;
  name: string;
  price: number;
  score: number;
  shortDesc: string;
};

export default function ProductsTable({ products }: { products: ProductRow[] }) {
  const { confirm } = useDialog();
  const seeDetails = async (bodyText: string) => {
    await confirm({
      title: "جزئیات",
      description: bodyText,
      variant: "success",
      isQuestion: false,
    });
  };

  return (
    <Table<ProductRow>
      columns={[
        {
          key: "name",
          header: "محصول",
        },
        {
          key: "price",
          header: "قیمت",
          render: (value) => (value as number).toLocaleString(),
        },
        {
          key: "score",
          header: "امتیاز",
          render: (value) => (
            <Rating rate={value as number} size="small" className="justify-center" />
          ),
        },
      ]}
      data={products}
      bordered
      isIndex
      actions={(row) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="button"
            onClick={() => seeDetails(row.shortDesc)}
            size="small"
          >
            مشاهده جزئیات
          </Button>
          <Button
            type="button"
            onClick={() => seeDetails(row.shortDesc)}
            size="small"
          >
            ویرایش
          </Button>
          <Button
            type="button"
            onClick={() => seeDetails(row.shortDesc)}
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
