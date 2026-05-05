import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { auth } from "./shared/lib/auth"
import { headers } from "next/headers"

const intlMiddleware = createMiddleware(routing)

export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAuthRoute = request.nextUrl.pathname.includes("/orders")

  if (!session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ["/", "/(ru|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
}
