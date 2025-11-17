import contactModel from "@/models/Contact";
import productModel from "@/models/Product";
import { IContact } from "@/types/contact.interface";
import { NextRequest } from "next/server";
import connectToDB from "../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const reqBody: IContact = await req.json();
    const { fullName, email, phone, company, request } = reqBody;

    //Validation

    const contact = await contactModel.create({
      fullName,
      email,
      phone,
      company,
      request,
    });

    return Response.json(
      { message: "Message created successfully .", data: contact },
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
