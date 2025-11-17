import productModel from "@/models/Product";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import connectToDB from "../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim();
    const price = formData.get("price")?.toString().trim();
    const shortDesc = formData.get("shortDesc")?.toString().trim();
    const longDesc = formData.get("longDesc")?.toString().trim();
    const weight = formData.get("weight")?.toString().trim();
    const suitableFor = formData.get("suitableFor")?.toString().trim();
    const smell = formData.get("smell")?.toString().trim();
    const tagsRaw = formData.get("tags")?.toString();
    const img = formData.get("img");

    // Validate required fields
    if (
      !name ||
      !price ||
      !shortDesc ||
      !longDesc ||
      !weight ||
      !suitableFor ||
      !smell ||
      !tagsRaw ||
      !img
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate image file
    if (!(img instanceof File)) {
      return NextResponse.json(
        { message: "Uploaded data is not a file!" },
        { status: 400 }
      );
    }

    // Parse tags safely
    let tags: string[];
    try {
      tags = JSON.parse(tagsRaw);
      if (!Array.isArray(tags)) throw new Error();
    } catch {
      return NextResponse.json(
        { message: "Tags must be a JSON array" },
        { status: 400 }
      );
    }

    // Optional: Validate price and weight are numbers
    const priceNum = Number(price);
    const weightNum = Number(weight);
    if (isNaN(priceNum) || isNaN(weightNum)) {
      return NextResponse.json(
        { message: "Price and weight must be numbers" },
        { status: 400 }
      );
    }

    // Prepare file saving
    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = `${Date.now()}-${img.name.replace(/\s+/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure upload directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Save file
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    // Use environment variable for base URL or fallback
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    // Create product document
    const product = await productModel.create({
      name,
      price: priceNum,
      shortDesc,
      longDesc,
      weight: weightNum,
      suitableFor,
      smell,
      tags,
      img: `${baseUrl}/uploads/${fileName}`,
    });

    return NextResponse.json(
      { message: "Product created successfully.", data: product },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}

// IMAGE UPLOADER
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const img = formData.get("img");

    if (!img) {
      return Response.json(
        { message: "Product has no image!" },
        { status: 400 }
      );
    }

    if (!(img instanceof File)) {
      return Response.json(
        { message: "Uploaded data is not a file!" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = Date.now() + img.name;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    return Response.json(
      { message: "File uploaded successfully!" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const product = await productModel.find({}, "-__v").populate("comments");

    return Response.json(product, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
