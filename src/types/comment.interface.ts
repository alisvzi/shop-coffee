import { ObjectId } from "mongoose";

export interface IComment {
  userName: string;
  date: Date;
  email: string;
  body: string;
  isAccept: boolean;
  score: number | null;
  product: string | ObjectId;
  user: string | ObjectId;
}
