import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { useRouter } from "next/navigation";

export const useBanUser = () => {
  const { confirm } = useDialog();
  const router = useRouter();

  async function banUser(email: string, phone: string) {
    const ok = await confirm({
      title: "مسدودکردن کاربر",
      description: "آیا میخواهید  کاربر را مسدود کنید ؟",
      variant: "error",
    });

    if (!ok) return;

    const res = await fetch("/api/user/ban", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone }),
    });

    if (res.status === 200) {
      await confirm({
        title: "مسدودکردن کاربر",
        description: "کاربر با موفقیت مسدود شد",
        variant: "success",
        isQuestion: false,
        confirmText: "متوجه شدم",
      });
      router.refresh();
    }
  }

  return { banUser };
};
