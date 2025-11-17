import { IComment } from "@/types/comment.interface";

export type TComment = Omit<IComment, "date">;
