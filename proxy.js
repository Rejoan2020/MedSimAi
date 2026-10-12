import { auth } from "@/auth"
import { NextResponse } from "next/server"

const ADMIN_LOGIN = "/admin-dashboard/login"

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isAdminArea = pathname.startsWith("/admin-dashboard")

    if (pathname === ADMIN_LOGIN) return

    // Static files must load without a session (the image optimizer has no cookies)
    if (/\.[a-z0-9]+$/i.test(pathname)) return

    if (!req.auth) {
        return NextResponse.redirect(
            new URL(isAdminArea ? ADMIN_LOGIN : "/signin", req.url)
        )
    }
})

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/cases/:path*",
        "/announcements/:path*",
        "/help&faq/:path*",
        "/attempts/:path*",
        "/admin-dashboard/:path*",
    ],
}
