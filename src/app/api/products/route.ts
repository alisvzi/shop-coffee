import productModel from "@/models/Product";
import { del, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
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

    if (!(img instanceof File)) {
      return NextResponse.json(
        { message: "Uploaded data is not a file!" },
        { status: 400 }
      );
    }

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

    const priceNum = Number(price);
    const weightNum = Number(weight);
    if (isNaN(priceNum) || isNaN(weightNum)) {
      return NextResponse.json(
        { message: "Price and weight must be numbers" },
        { status: 400 }
      );
    }
    const pathname = `products/${Date.now()}-${img.name.replace(/\s+/g, "_")}`;
    const uploaded = await put(pathname, img, {
      access: "public",
      addRandomSuffix: true,
      contentType: img.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const product = await productModel.create({
      name,
      price: priceNum,
      shortDesc,
      longDesc,
      weight: weightNum,
      suitableFor,
      smell,
      tags,
      img: uploaded.url,
    });

    return NextResponse.json(
      { message: "Product created successfully.", data: product },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
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
    const pathname = `uploads/${Date.now()}-${img.name.replace(/\s+/g, "_")}`;
    const uploaded = await put(pathname, img, {
      access: "public",
      addRandomSuffix: true,
      contentType: img.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return Response.json(
      {
        message: "File uploaded successfully!",
        url: uploaded.url,
        pathname: uploaded.pathname,
      },
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

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id } = body as { id?: string };

    if (!id) {
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 }
      );
    }

    const product = await productModel.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const imgUrl = typeof product.img === "string" ? product.img : undefined;
    if (imgUrl && imgUrl.includes("vercel-storage.com")) {
      try {
        await del(imgUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
      } catch (e) {}
    }

    await productModel.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
