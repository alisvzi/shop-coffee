import commentModel from "@/models/Comment";
import { authAdmin } from "@/utils/serverHelpers";
import { NextRequest } from "next/server";
import connectToDB from "../../../../../configs/db";

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = await authAdmin();

    if (!isAdmin) {
      throw new Error("This api protected and use access it !");
    }

    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation (You)

    await commentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: true,
        },
      }
    );
    return Response.json({ message: "Comment accepted successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
