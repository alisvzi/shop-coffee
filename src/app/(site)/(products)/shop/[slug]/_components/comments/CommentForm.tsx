"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { TextInput } from "@/app/_components/ui/form-input";
import TextareaInput from "@/app/_components/ui/form-input/textarea-input/textarea-input";
import { RadioRating } from "@/app/_components/ui/radio-rating";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSendComment } from "../../_api/send-comment";
import { TComment } from "../../_types/send-comment.types";

interface CommentsFormProps {
  productID: string;
}

const CommentsForm = ({ productID }: CommentsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TComment>({
    defaultValues: {
      score: null,
    },
  });

  const router = useRouter();
  const { confirm } = useDialog();

  const { submit, isPending } = useSendComment({
    onSuccess: async () => {
      const ok = await confirm({
        title: "کامنت مورد نظر با موفقیت ثبت شد",
        description: "",
        variant: "success",
        isQuestion: false,
        confirmText: "فهمیدم",
      });
      if (ok) {
        router.refresh();
        reset({
          score: null,
          body: "",
          userName: "",
          email: "",
        });
      }
    },
  });

  const onSubmit = useCallback(
    (data: TComment) => {
      submit({ ...data, product: productID });
    },
    [productID, submit]
  );

  return (
    <div className="w-1/2">
      <h5 className="text-2xl">دیدگاه خود را بنویسید</h5>
      <p className="mt-2">نشانی ایمیل شما منتشر نخواهد شد.</p>

      <form
        className="flex flex-col gap-6 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-3 items-center">
          <p>امتیاز شما:</p>
          <Controller
            control={control}
            name="score"
            rules={{ required: "امتیاز دادن الزامیست" }}
            render={({ field }) => (
              <RadioRating {...field} size="normal" variant="warning" />
            )}
          />
          {errors.score && (
            <p className="text-red-600 text-sm">{errors.score.message}</p>
          )}
        </div>

        <TextareaInput<TComment>
          register={register}
          name="body"
          placeholder="دیدگاه شما"
          cols={45}
          rows={8}
          rules={{ required: "دیدگاه شما الزامیست" }}
          errors={errors}
          variant="primary"
        />

        <TextInput<TComment>
          register={register}
          name="userName"
          placeholder="نام ونام خانوادگی"
          rules={{ required: "نام ونام خانوادگی الزامیست" }}
          errors={errors}
          variant="primary"
        />

        <TextInput<TComment>
          register={register}
          name="email"
          placeholder="ایمیل"
          rules={{ required: "ایمیل الزامیست" }}
          errors={errors}
          variant="primary"
        />

        <div>
          <Button type="submit" variant="primary" isLoading={isPending}>
            تایید
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
