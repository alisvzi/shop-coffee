import { IProduct } from "@/types/product.interface";
import mongoose, { Model, Schema } from "mongoose";
import "./Comment";

const productSchema: Schema<IProduct> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  shortDesc: { type: String, required: true },
  longDesc: { type: String, required: true },
  weight: { type: Number, required: true },
  suitableFor: { type: String, required: true },
  smell: { type: String, required: true },
  score: { type: Number, default: 5 },
  img: { type: String, required: true },
  tags: { type: [String], required: true },
  comments: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
});

const productModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default productModel;
