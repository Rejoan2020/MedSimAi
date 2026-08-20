import { dbconnect } from "@/lib/mongo";
import Case from "@/models/Case";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    try {
        await dbconnect();
        const { id } = await params;
        console.log("id from route: ", id);
        const data = await Case.findOne({ slug: id });
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