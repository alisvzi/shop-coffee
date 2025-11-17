import { IContact } from "@/types/contact.interface";
import mongoose, { Model, Schema } from "mongoose";

const contactSchema: Schema<IContact> = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  request: { type: String, required: true },
  company: { type: String, required: false },
  phone: { type: String, required: true },
});

const contactModel: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default contactModel;
