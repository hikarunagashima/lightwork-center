import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 本番(Production)で *.vercel.app にアクセスされたら独自ドメインへ 308 リダイレクト。
// プレビュー(VERCEL_ENV=preview)とローカルは対象外。
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (process.env.VERCEL_ENV === "production" && host.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = "lightworkcenter.com";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
