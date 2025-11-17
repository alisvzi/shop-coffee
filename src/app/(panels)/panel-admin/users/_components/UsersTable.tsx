"use client";

import { Button } from "@/app/_components/ui/button/button";
import { ObjectId } from "mongoose";
import { Table } from "../../../_components/Table/Table";
import { useBanUser } from "../_api/useBanUser";
import { useChangeUserRole } from "../_api/useChangeUserRole";
import { useDeleteUser } from "../_api/useDeleteUser";

interface UserT {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function UsersTable({ users }: UserT[]) {
  const { changeRole } = useChangeUserRole();
  const { deleteUser } = useDeleteUser();
  const { banUser } = useBanUser();

  return (
    <Table<UserT>
      columns={[
        {
          key: "name",
          header: "نام و نام خانوادگی",
        },
        {
          key: "email",
          header: "ایمیل",
          render: (value) => (!value ? "ایمیل یافت نشد" : value),
        },
        {
          key: "role",
          header: "نقش",
          render: (value) => (value === "ADMIN" ? "مدیر" : "کاربر"),
        },
      ]}
      data={users}
      striped
      bordered
      isIndex
      pageSize={3}
      actions={(row) => (
        <div className="flex gap-4 justify-center">
          <Button onClick={() => {}} size="small">
            ویرایش
          </Button>
          <Button onClick={() => changeRole(row._id)} size="small">
            تغییر نقش
          </Button>
          <Button
            variant="error"
            onClick={() => deleteUser(row._id)}
            size="small"
          >
            حذف
          </Button>
          <Button
            variant="error"
            onClick={() => banUser(row.email, row.phone)}
            size="small"
          >
            مسدود
          </Button>
        </div>
      )}
    />
  );
}
