import wishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/serverHelpers";
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "../../../../../configs/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return NextResponse.json(
        { message: "Please login at first" },
        { status: 401 }
      );
    }

    const { id: productID } = await params;

    await wishlistModel.findOneAndDelete({
      user: user._id,
      product: productID,
    });

    return NextResponse.json({ message: "Product removed successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
