import type { IComment } from "@/types/comment.interface";
import { ComponentBase } from "../../types/component-base.type";

export type CommentProps = Omit<ComponentBase, "isDisabled" | "size"> &
  Omit<Pick<IComment, "userName" | "email" | "body" | "score" | "date">, "date"> &
  { date: string | Date };
