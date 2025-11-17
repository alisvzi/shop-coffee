"use client";

import { Button } from "@/app/_components/ui/button/button";
import { TextInput } from "@/app/_components/ui/form-input";
import { useRouter } from "next/navigation";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { useForm } from "react-hook-form";
import { useAccount } from "./SendTicketAPI";

export type ticketType = {
  title: string;
  department: string;
  subdepartment: string;
  body: string;
  priority: number;
};

const priorities = [
  { value: "", label: "انتخاب اولویت" },
  { value: 1, label: "کم" },
  { value: 2, label: "متوسط" },
  { value: 3, label: "زیاد" },
];

type SendTicketFormProps = {
  departments: Array<{ _id: string; title: string }>;
  subdepartments: Array<{ _id: string; title: string; department: string }>;
};

const SendTicketForm = ({ departments, subdepartments }: SendTicketFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ticketType>();

  const selectedDepartmentId = watch("department");

  const router = useRouter();
  const { confirm } = useDialog();

  const accountDetail = useAccount({
    onSuccess: async () => {
      await confirm({
        title: "تیکت شما ارسال شد",
        description: "پاسخ پشتیبانی به‌زودی ارسال می‌شود",
        isQuestion: false,
        variant: "success",
        confirmText: "باشه",
      });
      reset({});
      router.push("/panel-user/tickets/");
    },
  });

  const onSubmit = (data: ticketType) => {
    accountDetail.submit(data);
  };

  // Filter subdepartments by selected department _id
  const filteredSubdepartments = subdepartments.filter(
    (sub) => sub.department === selectedDepartmentId
  );

  return (
    <form
      className="flex flex-col max-w-xl mx-auto gap-8 mt-16"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <label className="font-semibold" htmlFor="department">
          دپارتمان
        </label>
        <select
          id="department"
          {...register("department", {
            required: "انتخاب دپارتمان الزامی است",
          })}
          className={`border p-2 rounded ${
            errors.department ? "border-error" : "border-primary"
          }`}
        >
          <option value="">انتخاب کنید</option>
          {departments.map(({ title, _id }) => (
            <option key={_id} value={_id}>
              {title}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className="text-error text-sm">{errors.department.message}</p>
        )}

        <label className="font-semibold" htmlFor="subDepartment">
          ساب دپارتمان
        </label>
        <select
          id="subdepartment"
          {...register("subdepartment", {
            required: "انتخاب ساب دپارتمان الزامی است",
          })}
          className={`border p-2 rounded ${
            errors.subdepartment ? "border-error" : "border-primary"
          }`}
          disabled={!selectedDepartmentId}
        >
          <option value="">انتخاب ساب دپارتمان</option>
          {filteredSubdepartments.map(({ _id, title }) => (
            <option key={_id} value={_id}>
              {title}
            </option>
          ))}
        </select>
        {errors.subdepartment && (
          <p className="text-error text-sm">{errors.subdepartment.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-semibold" htmlFor="title">
          عنوان
        </label>
        <TextInput<ticketType>
          register={register}
          id="title"
          name={"title"}
          placeholder="عنوان"
          rules={{ required: "وارد کردن عنوان الزامی است" }}
          errors={errors}
          variant="primary"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="body">
          متن درخواست
        </label>
        <textarea
          id="body"
          {...register("body", {
            required: "وارد کردن متن درخواست الزامی است",
          })}
          placeholder="متن درخواست"
          className={`border p-2 rounded resize-y min-h-[100px] ${
            errors.body ? "border-error" : "border-primary"
          }`}
        />
        {errors.body && (
          <p className="text-error text-sm">{errors.body.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="priority">
          اولویت
        </label>
        <select
          id="priority"
          {...register("priority", { required: "انتخاب اولویت الزامی است" })}
          className={`border p-2 rounded ${
            errors.priority ? "border-error" : "border-primary"
          }`}
        >
          {priorities.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.priority && (
          <p className="text-error text-sm">{errors.priority.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={accountDetail.isPending}
      >
        ثبت تغییرات
      </Button>
    </form>
  );
};

export default SendTicketForm;
