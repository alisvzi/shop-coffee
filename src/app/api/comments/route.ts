import commentModel from "@/models/Comment";
import productModel from "@/models/Product";
import { IComment } from "@/types/comment.interface";
import { authUser } from "@/utils/serverHelpers";
import { NextRequest } from "next/server";
import connectToDB from "../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const user = await authUser();
    const reqBody: Omit<IComment, "date"> = await req.json();
    const { userName, body, email, score, product } = reqBody;

    //Validation

    const comments = await commentModel.create({
      userName,
      body,
      email,
      score,
      product,
      user: user?._id,
    });

    await productModel.findOneAndUpdate(
      {
        _id: product,
      },
      {
        $push: {
          comments: comments._id,
        },
      }
    );

    return Response.json(
      { message: "Comment created successfully .", data: comments },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const comments = await productModel.find({}, "-__v").populate("comments");

    return Response.json(comments);
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
