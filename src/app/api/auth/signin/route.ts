import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword,
} from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

import userModel from "@/models/User";
import connectToDB from "../../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, password } = body;

    //   validation
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      return Response.json(
        { message: "Email or Password is not valid" },
        { status: 419 }
      );
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 422 });
    }

    const isCorrectPasswordWithHash = await verifyPassword(password, user.password);

    if (!isCorrectPasswordWithHash) {
      return Response.json(
        { message: "Email or Password is not correct" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    await userModel.findOneAndUpdate({ email }, { $set: { refreshToken } });

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true`
    );

    return Response.json(
      { message: "User logged in successfully :))" },
      {
        status: 200,
        headers: headers,
      }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
