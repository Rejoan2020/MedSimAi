import { isValidObjectId } from "mongoose";
import { getCurrentUser } from "@/lib/currentUser";
import { dbconnect } from "@/lib/mongo";
import CaseAttempt from "@/models/CaseAttempt";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        await dbconnect();

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            },
                { status: 401 }
            );
        }

        const { attemptId } = await params;
        const { status } = await req.json().catch(() => ({}));

        if (!["completed", "abandoned"].includes(status)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid attempt status",
                },
                { status: 400 }
            );
        }
        const attempt = isValidObjectId(attemptId)
            ? await CaseAttempt.findOne({
                _id: attemptId,
                user: user._id,
            })
            : null;

        if (!attempt) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Attempt not found",
                },
                { status: 404 }
            );
        }

        if (
            attempt.status === "completed" ||
            attempt.status === "abandoned"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This attempt has already been finished",
                },
                { status: 400 }
            );
        }

        attempt.status = status;

        if (status === "completed") {
            attempt.completedAt = new Date();
        }

        if (status === "abandoned") {
            attempt.abandonedAt = new Date();
        }

        await attempt.save();

        return NextResponse.json(
            {
                success: true,
                message: `Attempt marked as ${status}`,
                data: attempt,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update attempt error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update attempt",
            },
            { status: 500 }
        );
    }
}