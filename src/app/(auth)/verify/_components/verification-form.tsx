"use client";

import { Button } from "@/app/_components/ui/button/button";
import { TextInput } from "@/app/_components/ui/form-input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";

type VerifyUserModel = { username: string; code: string };

const VerificationForm = ({ mobile }: { mobile: string }) => {
  const {
    handleSubmit,
    setValue,
    register,
    formState: { isValid },
  } = useForm<VerifyUserModel>();

  const { confirm } = useDialog();
  const router = useRouter();
  const params = useSearchParams();
  const username = (params.get("mobile") as string) || mobile;

  const onSubmit = async (data: VerifyUserModel) => {
    // Stubbed verify flow (legacy SMS is not supported). Show info and redirect.
    await confirm({
      title: "تایید کد غیرفعال است",
      description: "لطفاً با ایمیل و رمز عبور وارد شوید",
      isQuestion: false,
      variant: "info",
      confirmText: "باشه",
    });
    router.push("/signin");
  };

  return (
    <>
      <h5 className="text-2xl">کد تایید</h5>
      <p className="mt-2">فعلاً ورود با رمز عبور پشتیبانی می‌شود</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-10 flex-1">
        <TextInput<VerifyUserModel>
          register={register}
          name="code"
          placeholder="کد تایید"
          rules={{ minLength: { value: 5, message: "کد ۵ رقمی" } }}
          errors={{}}
          variant="primary"
        />
        <Button type="submit" variant="primary" isLoading={false} isDisabled={!isValid}>
          تایید و ادامه
        </Button>
        <div className="flex items-start gap-1 justify-center mt-auto">
          <span>برای اصلاح شماره موبایل</span>
          <Link href="/signin">اینجا</Link>
          <span>کلیک کنید</span>
        </div>
      </form>
    </>
  );
};

export default VerificationForm;
