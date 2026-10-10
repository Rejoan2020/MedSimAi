import { auth } from "@/auth"
import { NextResponse } from "next/server"

const ADMIN_LOGIN = "/admin-dashboard/login"

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isAdminArea = pathname.startsWith("/admin-dashboard")

    // The admin login page must stay reachable while signed out
    if (pathname === ADMIN_LOGIN) return

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
        "/admin-dashboard/:path*",
    ],
}
