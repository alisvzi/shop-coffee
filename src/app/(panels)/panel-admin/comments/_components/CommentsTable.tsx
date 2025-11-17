"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Rating } from "@/app/_components/ui/rating";
import { Table } from "../../../_components/Table/Table";
import { useConfirmComment } from "../_api/useConfirmComment";

interface Product {
  name: string;
  date: string;
  score: number;
  body: string;
  isAccept: boolean;
}

export default function CommentTable({ comments }) {
  const { confirm } = useDialog();
  const { acceptComment, rejectComment } = useConfirmComment();

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
          key: "userName",
          header: "کاربر",
        },
        {
          key: "user",
          header: "ایمیل",
          render: (value) => value?.email,
        },
        {
          key: "score",
          header: "امتیاز",
          render: (value) => (
            <Rating rate={value} size="small" className="justify-center" />
          ),
        },
        {
          key: "product",
          header: "محصول",
          render: (value) => value?.name,
        },
        {
          key: "date",
          header: "تاریخ",
          render: (value) => (
            <span>{new Date(value).toLocaleString("fa-IR")}</span>
          ),
        },
      ]}
      data={comments}
      bordered
      isIndex
      actions={(row) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="button"
            onClick={() => seeComment(row.body)}
            size="small"
          >
            مشاهده
          </Button>

          {row.isAccept ? (
            <Button
              type="button"
              variant="error"
              size="small"
              onClick={() => rejectComment(row._id)}
            >
              رد
            </Button>
          ) : (
            <Button
              type="button"
              variant="success"
              size="small"
              onClick={() => acceptComment(row._id)}
            >
              تایید
            </Button>
          )}
        </div>
      )}
    />
  );
}
