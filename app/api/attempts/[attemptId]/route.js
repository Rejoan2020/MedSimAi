import { auth } from "@/auth";
import { dbconnect } from "@/lib/mongo";
import CaseAttempt from "@/models/CaseAttempt";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        await dbconnect();

        const session = await auth();
        if (!session.user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            },
                { status: 401 }
            );
        }
        const userId = await User.findOne({ email: session.user.email });

        const { attemptId } = await params;
        const body = req.json();
        const { status } = await body;

        if (!["completed", "abandoned"].includes(status)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid attempt status",
                },
                { status: 400 }
            );
        }
        console.log(attemptId, session.user)
        const attempt = await CaseAttempt.findOne({
            _id: attemptId,
            user: userId,
        });

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