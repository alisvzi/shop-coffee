"use client";

import { Button } from "@/app/_components/ui/button/button";
import { TextInput } from "@/app/_components/ui/form-input";
import { useRouter } from "next/navigation";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { useForm } from "react-hook-form";
import { useAccount } from "./AccountDetailsAPI";

export type userType = {
  name: string;
  phone: string;
  email?: string;
  password: string;
};

const AccountDetailsForm = ({ name, phone, email, password }: userType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userType>();

  const router = useRouter();
  const { confirm } = useDialog();

  const logOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
  };

  const accountDetail = useAccount({
    onSuccess: async () => {
      await confirm({
        title: "اطلاعات حساب به‌روزرسانی شد",
        description: "لطفاً مجدد وارد شوید",
        variant: "success",
        isQuestion: false,
        confirmText: "ورود",
      });
      await logOut();
      router.push("/signin");
    },
  });

  const onSubmit = (data: userType) => {
    accountDetail.submit(data);
  };

  return (
    <form
      className="flex flex-col gap-6 mt-16"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput<userType>
        register={register}
        name={"name"}
        placeholder="نام و نام خانوادگی"
        rules={{ required: "وارد کردن نام خود الزامی است" }}
        errors={errors}
        variant="primary"
        defaultValue={name}
      />

      <TextInput<userType>
        register={register}
        name={"phone"}
        placeholder="شماره موبایل"
        rules={{
          required: "شماره موبایل الزامی است",
          maxLength: { value: 11, message: "شماره موبایل باید 11 رقم باشد" },
          minLength: { value: 11, message: "شماره موبایل باید 11 رقم باشد" },
        }}
        errors={errors}
        variant="primary"
        defaultValue={phone}
      />

      <TextInput<userType>
        register={register}
        name={"email"}
        placeholder="ایمیل (دلخواه)"
        errors={errors}
        variant="primary"
        defaultValue={email}
      />

      {/* <TextInput<userType>
        register={register}
        name={"password"}
        placeholder="رمز عبور"
        rules={{
          required: "رمز عبور الزامی است",
          minLength: { value: 8, message: "رمز عبور باید حداقل 8 رقم باشد" },
        }}
        errors={errors}
        variant="primary"
      /> */}

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

export default AccountDetailsForm;
