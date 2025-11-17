import { IUser } from "@/types/user.interface";
import mongoose, { Model, Schema } from "mongoose";

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  password: { type: String },
  role: { type: String, default: "USER" },
  refreshToken: { type: String },
});

const userModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default userModel;
