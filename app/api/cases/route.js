import { auth } from "@/auth";
import { getPublicCases } from "@/lib/cases";
import { getCurrentUser, isAdmin } from "@/lib/currentUser";
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
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 })
        }
        if (!isAdmin(user)) {
            return NextResponse.json({
                success: false,
                message: "Forbidden",
            }, { status: 403 })
        }

        await dbconnect();
        const body = await request.json();

        // Only accept fields the create form is meant to set
        const newCase = await Case.create({
            title: body.title,
            description: body.description,
            slug: body.slug,
            difficulty: body.difficulty,
            image: body.image,
            pdfUrl: body.pdfUrl,
            duration: body.duration,
            specialty: body.specialty,
            aiScenario: body.aiScenario,

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

