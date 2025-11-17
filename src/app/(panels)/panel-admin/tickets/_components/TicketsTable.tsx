"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Table } from "../../../_components/Table/Table";

type TicketRow = {
  _id: string;
  user: { _id?: string; name: string } | null;
  title: string;
  phone: string;
  department: { title: string } | string;
  body: string;
};

export default function TicketsTable({ tickets }: { tickets: TicketRow[] }) {
  const { confirm } = useDialog();
  const showBody = async (bodyText: string) => {
    await confirm({
      title: "متن تیکت",
      description: bodyText,
      variant: "success",
      isQuestion: false,
    });
  };
  const sendAnswer = async (ticket: TicketRow) => {
    const result = await confirm({
      title: "متن پاسخ",
      description: "پاسخ به تیکت را وارد کنید",
      variant: "success",
      hasInput: true,
      confirmText: "ثبت پاسخ",
    });

    if (typeof result !== "string" || result.trim() === "") {
      console.log("کاربر لغو کرد");
    } else {
      const res = await fetch("/api/tickets/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ ...ticket, body: result, ticketID: ticket._id }),
      });

      console.log("Respons -->", res);
    }
  };
  return (
    <Table<TicketRow>
      columns={[
        {
          key: "user",
          header: "نام و نام خانوادگی",
          render: (value) => (value as { name: string } | null)?.name,
        },
        {
          key: "title",
          header: "عنوان",
        },
        {
          key: "department",
          header: "دپارتمان",
          render: (value) =>
            typeof value === "string"
              ? value
              : (value as { title: string })?.title,
        },
      ]}
      data={tickets}
      striped
      bordered
      isIndex
      pageSize={3}
      actions={(row) => (
        <div className="flex gap-4 justify-center">
          <Button onClick={() => showBody(row.body)} size="small">
            نمایش
          </Button>
          <Button onClick={() => sendAnswer(row)} size="small">
            پاسخ
          </Button>
        </div>
      )}
    />
  );
}
