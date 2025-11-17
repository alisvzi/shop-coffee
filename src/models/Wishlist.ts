import { IWishlist } from "@/types/wishlist.interface";
import mongoose, { Model, Schema } from "mongoose";
import "./Product";
import "./User";

const wishlistSchema: Schema<IWishlist> = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const wishlistModel: Model<IWishlist> =
  mongoose.models.Wishlist ||
  mongoose.model<IWishlist>("Wishlist", wishlistSchema);

export default wishlistModel;
