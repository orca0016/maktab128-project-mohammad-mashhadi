import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("access-token");
  try {
    const userRes = await fetch(`http://localhost:8000/api/auth/logout`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionToken?.value}`,
      },
    });

    console.log(userRes, "---------------------------------------");
    const res = NextResponse.json({ message: "logged out" }, { status: 200 });
    res.cookies.set("access-token", "", { path: "/", maxAge: 0 });
    res.cookies.set("refresh-token", "", { path: "/", maxAge: 0 });
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" + error }, { status: 501 });
  }
}
