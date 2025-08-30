import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { amount, callbackUrl, orderId } = body;

  const response = await fetch("https://gateway.zibal.ir/v1/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant: process.env.ZIBAL_MERCHANT!, 
      amount, 
      callbackUrl, 
      orderId, 
    }),
  });

  const result = await response.json();

  if (result.trackId) {
    return NextResponse.json({
      success: true,
      trackId: result.trackId,
    });
  }

  return NextResponse.json({ success: false, error: result.message });
}
