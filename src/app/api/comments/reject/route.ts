import commentModel from "@/models/Comment";
import { NextRequest } from "next/server";
import connectToDB from "../../../../../configs/db";

export async function PUT(req: NextRequest) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation (You)

    await commentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: false,
        },
      }
    );
    return Response.json({ message: "Comment accepted successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
