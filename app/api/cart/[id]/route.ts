import { CartServices } from "@/services/cart-services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("productId");

  if (!userId || !productId) {
    return NextResponse.json(
      { error: "user id and product id  is required." },
      { status: 401 }
    );
  }
  const resData = await CartServices.getProductById({
    userId,
    productId,
  });

  return NextResponse.json({ data: resData });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: "userId is required." }, { status: 401 });
  }
  const resData = await CartServices.clearCart({ userId });

  return NextResponse.json({ data: resData });
}
