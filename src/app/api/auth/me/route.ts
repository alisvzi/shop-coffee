import userModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import connectToDB from "../../../../../configs/db";

export async function GET(req) {
  await connectToDB();

  const cookiesObj = await cookies();
  let user = null;

  const token = cookiesObj.get("token");

  if (token) {
    const tokenPayload = verifyAccessToken(token.value) as JwtPayload | null;

    if (tokenPayload) {
      user = await userModel.findOne(
        { email: tokenPayload.email },
        "-password -refreshToken -__v"
      );

      return Response.json(user);
    } else {
      return Response.json(
        { data: null, message: "Not access" },
        { status: 401 }
      );
    }
  }
}
