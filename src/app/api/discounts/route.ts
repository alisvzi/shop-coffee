import DiscountModel from "@/models/Discount";
import { NextRequest } from "next/server";
import connectToDB from "../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();

    const { code, percent, maxUse } = body;

    // Validate
    await DiscountModel.create({
      code,
      percent,
      maxUse,
    });

    return Response.json(
      { message: "Discount code created successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
