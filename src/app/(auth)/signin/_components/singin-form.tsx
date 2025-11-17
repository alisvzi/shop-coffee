"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { TextInput } from "@/app/_components/ui/form-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSignIn } from "../_api/signin";
import { SignIn } from "../_types/signin.types";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignIn>();

  const router = useRouter();
  const { confirm } = useDialog();

  // const showNotification = useNotificationStore(
  //   (state) => state.showNotification
  // );

  const signIn = useSignIn({
    onSuccess: async () => {
      // <-- make onSuccess async
      const ok = await confirm({
        title: "ورود به حساب",
        description: "کاربر وارد شد",
        variant: "success",
        isQuestion: false,
      });

      if (ok) {
        console.log("is Success");
        router.replace("/");
        return;
      }
    },
  });

  const onSubmit = (data: SignIn) => {
    signIn.submit(data);
  };

  return (
    <>
      <h5 className="text-2xl">ورود به حساب</h5>
      <p className="mt-2">به دنیای قهوه ست خوش آمدید</p>
      <form
        className="flex flex-col gap-6 mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput<SignIn>
          register={register}
          name={"email"}
          placeholder="نام کاربری/ایمیل"
          rules={{
            required: "شماره موبایل الزامی است",
            // maxLength: {
            //   value: 11,
            //   message: "شماره موبایل باید 11 رقم باشد",
            // },
            // minLength: {
            //   value: 11,
            //   message: "شماره موبایل باید 11 رقم باشد",
            // },
          }}
          errors={errors}
          variant="primary"
        />
        <TextInput<SignIn>
          register={register}
          name={"password"}
          placeholder="رمز عبور"
          rules={{
            required: "شماره موبایل الزامی است",
            // maxLength: {
            //   value: 11,
            //   message: "شماره موبایل باید 11 رقم باشد",
            // },
            // minLength: {
            //   value: 11,
            //   message: "شماره موبایل باید 11 رقم باشد",
            // },
          }}
          errors={errors}
          variant="primary"
        />

        <Button type="submit" variant="primary" isLoading={false}>
          ورود به حساب کاربری
        </Button>

        <p className="mt-2">رمز عبور خود را فراموش کرده‌اید ؟</p>
        <Link href="/signup">
          <Button
            shape="full"
            type="button"
            variant="primary"
            isLoading={false}
          >
            ورود با کد یکبار مصرف
          </Button>
        </Link>
        <p className="mt-2">آیا حساب کاربری ندارید ؟</p>
        <Link href="/signup">
          <Button
            shape="full"
            type="button"
            variant="neutral"
            isLoading={false}
          >
            ثبت نام
          </Button>
        </Link>
      </form>
    </>
  );
};

export default SignInForm;
