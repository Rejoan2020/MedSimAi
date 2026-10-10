import { auth } from "@/auth";
import { getPublicCaseBySlug } from "@/lib/cases";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 })
        }

        const { id } = await params;
        const data = await getPublicCaseBySlug(id);
        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Case not found.",
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data,
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "Failed to get case."
        }, { status: 500 })
    }
}
