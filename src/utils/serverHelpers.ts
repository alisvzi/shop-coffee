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

  if (!token) return null;
  if (!refreshToken) return null;

  let tokenPayload = verifyAccessToken(token) as JwtPayload | null;

  if (!tokenPayload) {
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
        secure: true,
        sameSite: "strict",
      });

      tokenPayload = refreshPayload;
    } catch (error) {
      return null;
    }
  }

  const user = await userModel.findOne({ email: tokenPayload.email });
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
