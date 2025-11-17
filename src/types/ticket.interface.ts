import { ObjectId } from "mongoose";

export interface ITicket {
  title: string;
  body: string;
  user: ObjectId;
  department: ObjectId;
  ticketID: ObjectId;
  subdepartment: ObjectId;
  priority: 1 | 2 | 3;
  hasAnswer: boolean;
  isAnswer: "user" | "admin" | "";
  mainTicket: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
