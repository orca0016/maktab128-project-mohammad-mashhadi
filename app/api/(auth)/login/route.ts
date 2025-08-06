import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const res = await fetch("http://localhost:8000/api/auth/login", {
      body: JSON.stringify({ username, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await res.json();

    const response = NextResponse.json(
      { message: "user successfully login." },
      { status: 200 }
    );

    response.cookies.set("access-token", userData.token.accessToken, {
      httpOnly: true,
      path: "/",
    });
    response.cookies.set("refresh-token", userData.token.refreshToken, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong: " + error },
      { status: 401 }
    );
  }
}