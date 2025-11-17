import userModel from "@/models/User";
import { IUser } from "@/types/user.interface";
import { generateAccessToken, hashPassword } from "@/utils/auth";
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
  const accessToken = generateAccessToken({ email });

  const users = await userModel.find({});

  await userModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: users.length > 0 ? roles.USER : roles.ADMIN,
  });

  return Response.json(
    { message: "User signed up successfully  " },
    {
      status: 201,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    }
  );
}
