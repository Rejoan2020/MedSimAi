import { auth } from "@/auth";
import { getPublicCases } from "@/lib/cases";
import { NextResponse } from "next/server";

// Cases are created and edited through the admin CMS (app/actions/adminCases.js)

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 })
        }

        const data = await getPublicCases();
        return NextResponse.json({
            success: true,
            data,
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "Failed to get cases."
        }, { status: 500 })
    }
}
