import userModel from "@/models/User";
import { IUser } from "@/types/user.interface";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth";
import { roles } from "@/utils/constant";
import { NextRequest } from "next/server";
import connectToDB from "../../../../../configs/db";

export async function POST(req: NextRequest) {
  await connectToDB();
  const body: Omit<IUser, "refreshToken" | "role"> = await req.json();
  const { name, email, password, phone } = body;

  // validation
  const isUserExist = await userModel.findOne({
    $or: [{ name }, { email }, { phone }],
  });

  if (isUserExist) {
    return Response.json(
      { message: "The username or email is exist already !" },
      { status: 422 }
    );
  }

  const hashedPassword = await hashPassword(password);
  const accessToken = generateAccessToken({ email, phone });
  const refreshToken = generateRefreshToken({ email, phone });

  const users = await userModel.find({});

  await userModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: users.length > 0 ? roles.USER : roles.ADMIN,
    refreshToken,
  });

  const isSecure =
    (process.env.NEXT_PUBLIC_APP_URL || "").startsWith("https") ||
    process.env.NODE_ENV === "production";
  const accessFlags = ["Path=/", "HttpOnly", `Max-Age=${60 * 15}`];
  const refreshFlags = ["Path=/", "HttpOnly", `Max-Age=${60 * 60 * 24 * 15}`];
  if (isSecure) {
    accessFlags.push("Secure", "SameSite=Lax");
    refreshFlags.push("Secure", "SameSite=Lax");
  }

  const headers = new Headers();
  headers.append("Set-Cookie", `token=${accessToken};${accessFlags.join(";")}`);
  headers.append(
    "Set-Cookie",
    `refresh-token=${refreshToken};${refreshFlags.join(";")}`
  );

  return Response.json(
    { message: "User signed up successfully  " },
    {
      status: 201,
      headers,
    }
  );
}
