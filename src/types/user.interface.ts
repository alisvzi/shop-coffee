import type { ObjectId } from "mongoose";

export interface IUser {
  _id?: string | ObjectId;
  name: string;
  email?: string;
  phone: string;
  password: string;
  role?: "USER" | "ADMIN";
  refreshToken?: string;
}

export interface UserToken {
  name: string;
  email?: string;
  phone: string;
  password?: string;
  role?: string;
  refreshToken?: string;
}

// export interface UserSession extends UserToken {}
