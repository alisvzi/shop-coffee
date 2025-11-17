import { IComment } from "@/types/comment.interface";
import mongoose, { Model, Schema } from "mongoose";
import "./Product";

const commentSchema: Schema<IComment> = new mongoose.Schema({
  userName: { type: String, required: true },
  body: { type: String, required: true },
  email: { type: String, required: true },
  score: { type: Number, required: true },
  isAccept: { type: Boolean, default: false },
  date: { type: Date, default: () => Date.now(), immutable: false },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const commentModel: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default commentModel;
