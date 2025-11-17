import { default as userModel } from "@/models/User";
import { NextRequest } from "next/server";
import connectToDB from "../../../../../configs/db";

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id } = body;

    const user = await userModel.findOne({ _id: id });
    await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { role: user?.role === "USER" ? "ADMIN" : "USER" } }
    );

    return Response.json(
      { message: "User role updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
