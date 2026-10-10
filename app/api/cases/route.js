import { auth } from "@/auth";
import { getPublicCases } from "@/lib/cases";
import { dbconnect } from "@/lib/mongo";
import Case from "@/models/Case";
import { NextResponse } from "next/server";


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

export async function POST(request) {
    try {
        await dbconnect();
        const body = await request.json();

        const newCase = await Case.create({
            ...body,

            features: body.tags,

            completedBy: 0,

            isPublished: false,
        });

        return NextResponse.json({
            success: true,
            data: newCase,
        }, {
            status: 201
        })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: err.message,
        }, {
            status: 500
        })
    }
}

