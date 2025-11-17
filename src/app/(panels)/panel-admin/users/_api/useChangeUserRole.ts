import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { useRouter } from "next/navigation";

export function useChangeUserRole() {
  const { confirm } = useDialog();
  const router = useRouter();

  async function changeRole(userId: string) {
    const ok = await confirm({
      title: "تغییر نقش",
      description: "آیا میخواهید نقش کاربر را تغییر دهید ؟",
      variant: "info",
    });

    if (!ok) return;

    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });

    if (res.status === 200) {
      await confirm({
        title: "تغییر نقش",
        description: "نقش کاربر با موفقیت تغییر کرد",
        variant: "success",
        isQuestion: false,
        confirmText: "متوجه شدم",
      });
      router.refresh();
    }
  }

  return { changeRole };
}
