"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { TextInput } from "@/app/_components/ui/form-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSignUp } from "../_api/signup";
import { Signup } from "../_types/signup.types";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Signup>();

  const router = useRouter();
  const { confirm } = useDialog();

  // const showNotification = useNotificationStore(
  //   (state) => state.showNotification
  // );

  const signUp = useSignUp({
    onSuccess: async () => {
      await confirm({
        title: "ثبت‌نام انجام شد",
        description: "اکنون می‌توانید وارد حساب کاربری شوید",
        variant: "success",
        isQuestion: false,
        confirmText: "رفتن به ورود",
      });
      router.push("/signin");
    },
  });

  const onSubmit = (data: Signup) => {
    signUp.submit(data);
  };

  return (
    <>
      <h5 className="text-2xl">ثبت نام</h5>
      <p className="mt-2">با ثبت‌نام، به تجربه خرید قهوه حرفه‌ای‌ها بپیوندید</p>
      <form
        className="flex flex-col gap-6 mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput<Signup>
          register={register}
          name={"name"}
          placeholder="نام و نام خانوادگی"
          rules={{
            required: "وارد کردن نام خود الزامی است",
          }}
          errors={errors}
          variant="primary"
        />
        <TextInput<Signup>
          register={register}
          name={"phone"}
          placeholder="شماره موبایل"
          rules={{
            required: "شماره موبایل الزامی است",
            maxLength: {
              value: 11,
              message: "شماره موبایل باید 11 رقم باشد",
            },
            minLength: {
              value: 11,
              message: "شماره موبایل باید 11 رقم باشد",
            },
          }}
          errors={errors}
          variant="primary"
        />
        <TextInput<Signup>
          register={register}
          name={"email"}
          placeholder="ایمیل (دلخواه)"
          rules={{}}
          errors={errors}
          variant="primary"
        />
        <TextInput<Signup>
          register={register}
          name={"password"}
          placeholder="رمز عبور"
          rules={{
            required: " رمز عبور الزامی است",

            minLength: {
              value: 8,
              message: " رمز عبور باید حداقل 8 رقم باشد",
            },
          }}
          errors={errors}
          variant="primary"
        />

        <Button type="submit" variant="primary" isLoading={false}>
          تایید و دریافت کد
        </Button>

        <p className="mt-2"> حساب کاربری دارید ؟</p>
        <Link href="/signin">
          <Button
            shape="full"
            type="button"
            variant="neutral"
            isLoading={signUp.isPending}
          >
            برگشت به ورود
          </Button>
        </Link>
      </form>
    </>
  );
};

export default SignUpForm;
