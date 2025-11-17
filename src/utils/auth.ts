import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};

export const generateAccessToken = (data: {
  email?: string;
  name?: string;
}) => {
  const token = sign({ ...data }, process.env.AccessTokenSecretKey!, {
    expiresIn: "60s",
  });

  return token;
};

export const verifyAccessToken = (token: string) => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey!);
    return tokenPayload;
  } catch (err) {
    console.log("verifyAccess Token Error --> ", err);
  }
  return token;
};

export const generateRefreshToken = (data: { email: string }) => {
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey!, {
    expiresIn: "15d",
  });

  return token;
};

export const validateEmail = (email: string) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

export const validatePhone = (phone: string) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

export const validatePassword = (password: string) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};
