import { CartServices } from "@/services/cart-services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, quantity, product } = await req.json();
  if (!userId || !quantity || !product) {
    return NextResponse.json(
      { error: "userId , quantity,product is required." },
      { status: 401 }
    );
  }

  const resData = await CartServices.addProduct({ product, quantity, userId });

  return NextResponse.json({ resData });
}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId  is required." },
      { status: 401 }
    );
  }

  const resData = await CartServices.getAllPRoduct({
    userId,
  });

  return NextResponse.json({data:resData });
}
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const productId = searchParams.get("productId");

  if (!userId || !productId) {
    return NextResponse.json(
      { error: "userId and productId is required." },
      { status: 401 }
    );
  }
  const resData = await CartServices.removeProduct({ productId, userId });

  return NextResponse.json({ resData });
}
