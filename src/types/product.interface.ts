import { ObjectId } from "mongoose";
import type { IComment } from "./comment.interface";

export interface IProduct {
  _id: string | ObjectId;
  name: string;
  price: number;
  shortDesc: string;
  longDesc: string;
  weight: number;
  suitableFor: string;
  smell: string;
  score: number;
  tags: string[];
  img: string;
  comments: Array<ObjectId | IComment>;
}
