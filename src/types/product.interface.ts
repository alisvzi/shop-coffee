import { ObjectId } from "mongoose";

export interface IProduct {
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
  comments: ObjectId[];
}
