import wishlistModel from "@/models/Wishlist";
import { IWishlist } from "@/types/wishlist.interface";
import { NextRequest } from "next/server";
import connectToDB from "../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body: IWishlist = await req.json();
    const { user, product } = body;

    // VALIDATION

    const wish = await wishlistModel.findOne({ user, product });

    if (!wish) {
      await wishlistModel.create({ user, product });
    }

    return Response.json(
      { message: "Product added wishlist successfully ." },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
