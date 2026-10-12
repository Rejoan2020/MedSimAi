import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { getCurrentUser } from "@/lib/currentUser";
import { dbconnect } from "@/lib/mongo";
import { generateFeedback } from "@/lib/feedback";
import { DEMO_AI_OFF } from "@/lib/demo";
import CaseAttempt from "@/models/CaseAttempt";
import Case from "@/models/Case";

export const maxDuration = 60;

export async function POST(req, { params }) {
    try {
        await dbconnect();

        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { attemptId } = await params;

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

        if (attempt.status !== "completed") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Attempt has not been completed yet",
                },
                { status: 400 }
            );
        }

        if (attempt.feedback?.overallScore != null) {
            return NextResponse.json({
                success: true,
                message: "Feedback already exists",
                data: attempt.feedback,
            });
        }

        if (user.isDemo) {
            return NextResponse.json(
                {
                    success: false,
                    message: DEMO_AI_OFF,
                },
                { status: 403 }
            );
        }

        const clinicalCase = await Case.findById(attempt.case).lean();

        if (!clinicalCase) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Case not found",
                },
                { status: 404 }
            );
        }

        let feedback;
        try {
            feedback = await generateFeedback(clinicalCase, attempt.messages, attempt.prep?.plan);
        } catch (error) {
            console.error("Feedback generation failed:", error);
            return NextResponse.json(
                {
                    success: false,
                    message: "Feedback couldn't be generated right now. Please try again in a moment.",
                },
                { status: 502 }
            );
        }

        // Never overwrite feedback saved by a parallel request
        const result = await CaseAttempt.updateOne(
            { _id: attempt._id, "feedback.overallScore": null },
            { $set: { feedback } },
            { runValidators: true }
        );
        if (!result.modifiedCount) {
            const saved = await CaseAttempt.findById(attempt._id).select("feedback").lean();
            feedback = saved.feedback;
        }

        return NextResponse.json(
            {
                success: true,
                message: "Feedback generated successfully",
                data: feedback,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Feedback generation error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to generate feedback",
            },
            { status: 500 }
        );
    }
}
