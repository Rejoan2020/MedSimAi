import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbconnect } from "@/lib/mongo";
import openai from "@/lib/openai";
import anthropic from "@/lib/anthropic";

import CaseAttempt from "@/models/CaseAttempt";
import Case from "@/models/Case";
import User from "@/models/User";

export async function POST(req) {
    try {
        await dbconnect();

        // Authenticate user
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        // Find user
        const user = await User.findOne({
            email: session.user.email,
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404 }
            );
        }

        // Get request data
        const { attemptId, message } = await req.json();

        if (!attemptId || !message?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "attemptId and message are required.",
                },
                { status: 400 }
            );
        }

        // Find case attempt
        const attempt = await CaseAttempt.findById(attemptId);

        if (!attempt) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Case attempt not found.",
                },
                { status: 404 }
            );
        }

        // Make sure this attempt belongs to the logged-in user
        if (attempt.user.toString() !== user._id.toString()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You are not allowed to access this attempt.",
                },
                { status: 403 }
            );
        }

        // Make sure the case is still active
        if (attempt.status !== "started") {
            return NextResponse.json(
                {
                    success: false,
                    message: "This session is no longer active.",
                },
                { status: 400 }
            );
        }

        // Get clinical case
        const clinicalCase = await Case.findById(attempt.case);

        if (!clinicalCase) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Case not found.",
                },
                { status: 404 }
            );
        }

        // Convert previous messages into OpenAI/OpenRouter format
        const history = attempt.messages.map((msg) => ({
            role: msg.role === "student" ? "user" : "assistant",
            content: msg.content,
        }));

        // System instructions for the simulated patient
        const instructions = `
You are a simulated patient in a medical education platform called MedSimAI.

Your job is to behave like the patient described below.

PATIENT:
${JSON.stringify(clinicalCase.aiScenario.patient)}

CLINICAL INFORMATION:
${JSON.stringify(clinicalCase.aiScenario.clinicalData)}

BEHAVIOR:
${JSON.stringify(clinicalCase.aiScenario.behavior)}

EXAMINATION:
${JSON.stringify(clinicalCase.aiScenario.examination)}

INVESTIGATIONS:
${JSON.stringify(clinicalCase.aiScenario.investigations)}

IMPORTANT RULES:

- Stay in character as the patient.
- Do not act as a doctor.
- Do not diagnose yourself.
- Do not reveal the diagnosis unless the scenario explicitly allows it.
- Do not reveal information that the student has not asked about when revealInformationOnlyWhenAsked is enabled.
- Use natural patient language rather than medical terminology.
- Do not invent information that is not present in the case.
- Answer the student's question directly.
- Keep responses reasonably concise and conversational.
- Respond as the patient, not as an AI assistant.
`;

        // Build conversation
        const messages = [
            {
                role: "system",
                content: instructions,
            },
            ...history,
            {
                role: "user",
                content: message.trim(),
            },
        ];

        const completion = await anthropic.messages.create({
            model: "claude-opus-4-8",
            max_tokens: 500,
            system: instructions,
            messages: [
                ...history,
                {
                    role: "user",
                    content: message.trim(),
                },
            ],
        });

        const aiMessage = completion.content
            ?.filter((item) => item.type === "text")
            ?.map((item) => item.text)
            ?.join("")
            ?.trim();

        if (!aiMessage) {
            console.error("Unexpected AgentRouter response:", completion);
            throw new Error("AgentRouter returned an empty response.");
        }

        // Save student's message
        attempt.messages.push({
            role: "student",
            content: message.trim(),
        });

        // Save AI patient's response
        attempt.messages.push({
            role: "patient",
            content: aiMessage,
        });

        await attempt.save();

        return NextResponse.json({
            success: true,
            message: aiMessage,
        });
    } catch (error) {
        console.log("KEY EXISTS:", !!process.env.AGENTROUTER_API_KEY);
        console.log(
            "KEY PREFIX:",
            process.env.AGENTROUTER_API_KEY?.slice(0, 8)
        );
        console.log(
            "KEY LENGTH:",
            process.env.AGENTROUTER_API_KEY?.length
        );
        console.log(error)
        console.error("AI consultation error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to get AI response.",
            },
            { status: 500 }
        );
    }
}