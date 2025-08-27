import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { trackId, orderId } = await req.json();

  try {
    const verifyRes = await fetch("https://gateway.zibal.ir/v1/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant: process.env.ZIBAL_MERCHANT!,
        trackId,
      }),
    });

    const result = await verifyRes.json();

    if (result.result !== 100 && result.result !== 201) {
      return NextResponse.json(
        { error: "Payment not verified", result },
        { status: 400 }
      );
    }

    //update order as paid
    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payed: true }),
      }
    );

    if (!orderRes.ok) {
      throw new Error("Failed to update order status");
    }

    const orderData: IResponseSingleOrder = await orderRes.json();

    //update product quantities
    if (orderData?.data?.order?.products?.length &&result.result===100) {
      await Promise.all(
        orderData.data.order.products.map(async (item) => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${item.product._id}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                quantity: item.product.quantity - item.count,
              }),
            }
          );

          if (!res.ok) {
            const errorText = await res.text(); 
            console.error("Product update failed:", {
              errorText,
            });
            throw new Error(`Failed to update product ${item.product._id}`);
          }
        })
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { success: false, error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
