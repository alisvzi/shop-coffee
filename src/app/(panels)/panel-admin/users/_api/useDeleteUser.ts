import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { useRouter } from "next/navigation";

export function useDeleteUser() {
  const { confirm } = useDialog();
  const router = useRouter();

  async function deleteUser(userId: string) {
    const ok = await confirm({
      title: "حذف کاربر",
      description: "آیا میخواهید  کاربر را حذف کنید ؟",
      variant: "error",
    });

    if (!ok) return;

    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });

    if (res.status === 200) {
      await confirm({
        title: "حذف کاربر",
        description: "کاربر با موفقیت حذف شد",
        variant: "success",
        isQuestion: false,
        confirmText: "متوجه شدم",
      });
      router.refresh();
    }
  }

  return { deleteUser };
}
