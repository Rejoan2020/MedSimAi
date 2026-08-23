import { dbconnect } from "@/lib/mongo";
import Case from "@/models/Case";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await dbconnect();
        const data = await Case.find();
        return NextResponse.json({
            success: true,
            data,
        }, { status: 201 })
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
        console.log("received body: ", body);
        const newCase = await Case.create({
            title: body.title,
            description: body.description,
            slug: body.slug,
            difficulty: body.difficulty,
            image: body.image,
            features: body.tags,
            pdfUrl: '/cases/cardio-report.pdf',
            duration: body.duration,
            specialty: body.specialty,
            completedBy: 10,
            isPublished: false,
        })
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

