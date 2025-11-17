import UserModel from "@/models/User";
import { authUser } from "@/utils/serverHelpers";
import { NextRequest } from "next/server";
import connectToDB from "../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const user = await authUser();
    const body = await req.json();
    const { name, email, phone } = body;

    // Validation (You)

    await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id } = body;

    // Validation (You)

    await UserModel.findOneAndDelete({ _id: id });

    return Response.json(
      { message: "User removed successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
