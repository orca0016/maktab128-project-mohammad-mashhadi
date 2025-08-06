import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { forbidden } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface IAuthorizedUser {
  id: string;
  role?: string;
}

const protectedRoutes = ["/dashboard"];
// const publicRoutes = ["/login", "/signup", "/"];
// export const config = {
//   matcher: ["/about/:path*", "/dashboard/:path*"],
// };
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  // const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("access-token")?.value;
  const session = await fetch("http://localhost:8000/api/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie}`,
      "Content-Type": "application/json",
    },
  });
  const authorizedUser: IAuthorizedUser = await session.json();
  if (isProtectedRoute && !authorizedUser?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isProtectedRoute && authorizedUser.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
  }

  return NextResponse.next();
}
