import { ObjectId } from "mongoose";

export interface IWishlist {
  user: ObjectId;
  product: ObjectId;
}
