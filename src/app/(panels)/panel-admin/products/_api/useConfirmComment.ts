import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { useRouter } from "next/navigation";

export const useConfirmComment = () => {
  const { confirm } = useDialog();
  const router = useRouter();

  const acceptComment = async (commentID) => {
    const res = await fetch("/api/comments/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      const ok = await confirm({
        title: "کامنت مورد نظر با موفقیت تایید شد",
        description: "",
        variant: "success",
        isQuestion: false,
        confirmText: "فهمیدم",
      });
      if (ok) {
        router.refresh();
      }
    }
  };

  const rejectComment = async (commentID) => {
    const res = await fetch("/api/comments/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      const ok = await confirm({
        title: "کامنت مورد نظر با موفقیت رد شد",
        description: "",
        variant: "success",
        isQuestion: false,
        confirmText: "فهمیدم",
      });
      if (ok) {
        router.refresh();
      }
    }
  };

  return { acceptComment, rejectComment };
};
