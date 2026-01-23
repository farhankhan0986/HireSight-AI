import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Not logged in → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Decode JWT payload (EDGE SAFE)
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

  const { role } = payload;
  const pathname = req.nextUrl.pathname;

  // 🔒 Recruiter-only protection
  if (
    pathname.startsWith("/dashboard/recruiter") &&
    role !== "recruiter"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
