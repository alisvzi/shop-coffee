import BanModel from "@/models/Ban";
import { NextRequest } from "next/server";
import connectToDB from "../../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, phone } = body;

    // Validation (You)

    await BanModel.create({ email, phone });

    return Response.json({ message: "User banned successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
