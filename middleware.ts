import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./lib/i18n";

/** Sends locale-less URLs (/, /our-story) to /en/... or /sv/... */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (isLocale(pathname.split("/")[1])) return NextResponse.next();

  // Build the address from the domain the visitor used. Behind Caddy, request.nextUrl carries
  // the server's internal address (localhost:3000); Caddy passes the public one in
  // X-Forwarded-Host/Proto and overwrites any values a visitor sends.
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
  const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(/:$/, "");
  const path = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}${search}`;
  return NextResponse.redirect(new URL(path, `${proto}://${host}`), 307);
}

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;
  const accept = request.headers.get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("sv") ? "sv" : defaultLocale;
}

export const config = {
  matcher: ["/((?!api|_next|images|brand|favicon.ico|robots.txt|sitemap.xml|.*\\.[\\w]+$).*)"],
};
