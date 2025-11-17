"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Rating } from "@/app/_components/ui/rating";
import { Table } from "../../../_components/Table/Table";

interface Product {
  name: string;
  date: string;
  score: number;
  body: string;
  isAccept: boolean;
}

export default function CommentTable({ comments }) {
  const { confirm } = useDialog();

  const commentsList = [];

  comments.forEach((element) => {
    const comment = {
      name: element.product.name,
      date: new Date(element.date).toLocaleDateString("fa-IR"),
      score: element.score,
      isAccept: element.isAccept,
      body: element.body,
    };

    commentsList.push(comment);
  });

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
          key: "date",
          header: "تاریخ",
        },
        { key: "name", header: "نام محصول" },
        {
          key: "score",
          header: "امتیاز",
          render: (value) => (
            <Rating rate={value} size="small" className="justify-center" />
          ),
        },
        {
          key: "isAccept",
          header: "موجودی",
          render: (value) =>
            value ? (
              <span className="text-success font-medium">تایید شده</span>
            ) : (
              <span className="text-warning font-medium">در انتظار تایید</span>
            ),
        },
      ]}
      data={commentsList}
      striped
      bordered
      isIndex
      pageSize={3}
      actions={(row) => (
        <div className="flex gap-2 justify-center">
          <Button onClick={() => seeComment(row.body)} size="small">
            مشاهده
          </Button>
        </div>
      )}
    />
  );
}
