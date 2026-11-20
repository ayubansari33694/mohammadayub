import { NextResponse, type NextRequest } from "next/server";

/**
 * English is the default and lives at the root (/, /work/…).
 * Bengali and Arabic live under /bn and /ar.
 * Internally every page sits under app/[lang], so root URLs are rewritten to /en/…,
 * and anyone typing /en/… is redirected to the clean root URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/bn" || pathname.startsWith("/bn/") || pathname === "/ar" || pathname.startsWith("/ar/")) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // skip Next internals, the API, metadata files and anything with a file extension
  matcher: ["/((?!_next|api|icon|apple-icon|manifest|robots|sitemap|.*\\..*).*)"],
};
