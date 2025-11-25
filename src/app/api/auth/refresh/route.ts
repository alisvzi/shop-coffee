import { generateAccessToken } from "@/utils/auth";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh-token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 }
      );
    }

    let payload: JwtPayload;
    try {
      payload = verify(
        refreshToken,
        process.env.RefreshTokenSecretKey!
      ) as JwtPayload;
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const newAccessToken = generateAccessToken({
      email: payload.email as string | undefined,
      phone: payload.phone as string | undefined,
    });

    cookieStore.set("token", newAccessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return NextResponse.json(
      { message: "Access token refreshed" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
