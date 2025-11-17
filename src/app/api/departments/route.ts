import departmentModel from "@/models/Department";
import { NextRequest } from "next/server";
import connectToDB from "../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body: { title: string } = await req.json();

    const { title } = body;

    await departmentModel.create({
      title,
    });

    return Response.json(
      { message: "departmentModel create successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectToDB();
    const department = await departmentModel.find({});

    return Response.json(department);
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
