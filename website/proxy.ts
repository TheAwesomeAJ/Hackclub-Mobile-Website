import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Forward /docs and subpaths to docs app
  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    const url = req.nextUrl.clone();
    url.hostname = "localhost"; // docs app
    url.port = "3000"; // Vercel does not require a port
    url.protocol = "https:"; // Ensure HTTPS
    url.pathname = pathname; // keep /docs prefix
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Only match /docs paths
export const config = {
  matcher: "/docs/:path*",
};
