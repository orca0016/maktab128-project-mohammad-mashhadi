import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userRes = await fetch(`http://localhost:8000/api/users/${id}`);

  const userInfo = await userRes.json();
  if (!userInfo) {
    return NextResponse.json({ message: "not found user" }, { status: 403 });
  }
  return Response.json(userInfo);
}
