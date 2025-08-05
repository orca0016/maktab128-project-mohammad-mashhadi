import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const res = await fetch("http://localhost:8000/api/auth/login", {
      body: JSON.stringify({ username, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData: IResponseUserData = await res.json();

    const cookieStore = await cookies();
    cookieStore.set({
      name: "access-token",
      value: userData.token.accessToken,
      httpOnly: true,
      path: "/",
    });
    cookieStore.set({
      name: "refresh-token",
      value: userData.token.refreshToken,
      httpOnly: true,
      path: "/",
    });

    return NextResponse.json(
      { message: "user successfully login." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something vents wrong" + error },
      { status: 401 }
    );
  }
}
