"use client";

import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { TextInput } from "@/app/_components/ui/form-input";
import TextareaInput from "@/app/_components/ui/form-input/textarea-input/textarea-input";
import { IContact } from "@/types/contact.interface";
import { useForm } from "react-hook-form";
import { useContact } from "../../_api/contact";

const ContactForm = () => {
  const { confirm } = useDialog();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>();

  const contactMutation = useContact({
    onSuccess: async () => {
      await confirm({
        title: "درخواست شما ثبت شد",
        description: "به‌زودی با شما تماس می‌گیریم",
        isQuestion: false,
        variant: "success",
        confirmText: "باشه",
      });
    },
  });

  const onSubmit = (data: IContact) => {
    contactMutation.submit(data);
  };

  return (
    <div className="w-1/2">
      <h5 className="text-2xl">فرم تماس</h5>
      <form
        className="flex flex-col gap-6 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <TextInput<IContact>
            register={register}
            name="fullName"
            placeholder="نام و نام خانوادگی"
            rules={{ required: "نام و نام خانوادگی الزامی است" }}
            errors={errors}
            variant="primary"
          />
          <TextInput<IContact>
            register={register}
            name="email"
            placeholder="آدرس ایمیل"
            rules={{
              required: "آدرس ایمیل الزامی است",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "آدرس ایمیل معتبر نیست",
              },
            }}
            errors={errors}
            variant="primary"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextInput<IContact>
            register={register}
            name="phone"
            placeholder="شماره تماس"
            rules={{
              required: "شماره تماس الزامی است",
            }}
            errors={errors}
            variant="primary"
          />
          <TextInput<IContact>
            register={register}
            name="company"
            placeholder="نام شرکت"
            rules={{ required: "نام شرکت الزامی است" }}
            errors={errors}
            variant="primary"
          />
        </div>

        <TextareaInput<IContact>
          register={register}
          name="request"
          placeholder="درخواست شما"
          cols={45}
          rows={6}
          rules={{ required: "درخواست شما الزامی است" }}
          errors={errors}
          variant="primary"
        />
        <div>
          <Button
            type="submit"
            variant="primary"
            isLoading={contactMutation.isPending}
          >
            تایید
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
