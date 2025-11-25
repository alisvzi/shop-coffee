import userModel from "@/models/User";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import connectToDB from "../../configs/db";
import { generateAccessToken, verifyAccessToken } from "./auth";

// const authUser = async () => {
//   await connectToDB();

//   const cookiesObj = await cookies();
//   const token = cookiesObj.get("token")?.value;
//   const refreshToken = cookiesObj.get("refresh-token")?.value;

//   if (!token) return null;
//   if (!refreshToken) return null;

//   const tokenPayload = verifyAccessToken(token) as JwtPayload | null;
//   if (!tokenPayload) {
//     try {
//       verify(refreshToken, process.env.refreshTokenSecretKey!);
//     } catch (error) {
//       return null;
//     }
//     const newAccessToken = generateAccessToken({ email: tokenPayload.email });
//   }

//   const user = await userModel.findOne({ email: tokenPayload.email });
//   return user;
// };

const authUser = async () => {
  await connectToDB();

  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;
  const refreshToken = cookiesObj.get("refresh-token")?.value;

  if (!token && !refreshToken) return null;

  let tokenPayload = token
    ? (verifyAccessToken(token) as JwtPayload | null)
    : null;

  if (!tokenPayload && refreshToken) {
    try {
      const refreshPayload = verify(
        refreshToken,
        process.env.RefreshTokenSecretKey!
      ) as JwtPayload;
      const newAccessToken = generateAccessToken({
        email: refreshPayload.email,
      });

      cookiesObj.set("token", newAccessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 15,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      tokenPayload = refreshPayload;
    } catch (error) {
      return null;
    }
  }

  let user = null as any;
  if ((tokenPayload as any)?.email) {
    user = await userModel.findOne({ email: (tokenPayload as any).email });
  } else if ((tokenPayload as any)?.phone) {
    user = await userModel.findOne({ phone: (tokenPayload as any).phone });
  }
  return user;
};

const authAdmin = async () => {
  await connectToDB();

  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;

  if (!token) return null;

  const tokenPayload = verifyAccessToken(token) as JwtPayload | null;
  if (!tokenPayload) return null;

  const user = await userModel.findOne({ email: tokenPayload.email });
  if (user?.role === "ADMIN") {
    return user;
  }
};

export { authAdmin, authUser };
