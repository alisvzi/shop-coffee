import subdepartmentModel from "@/models/SubDepartment";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";
import connectToDB from "../../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body: { title: string; department: ObjectId } = await req.json();

    const { title, department } = body;

    await subdepartmentModel.create({
      title,
      department,
    });

    return Response.json(
      { message: "subdepartment create successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
