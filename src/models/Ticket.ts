import { ITicket } from "@/types/ticket.interface";
import mongoose, { Model, Schema } from "mongoose";
import "./Department";
import "./SubDepartment";
import "./User";

const ticketSchema: Schema<ITicket> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subdepartment: {
      type: mongoose.Types.ObjectId,
      ref: "subDepartment",
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: String,
      default: "",
      enum: ["user", "admin", ""],
    },
    mainTicket: {
      type: mongoose.Types.ObjectId,
      ref: "ticket",
    },
  },
  {
    timestamps: true,
  }
);

const ticketModel: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);

export default ticketModel;
