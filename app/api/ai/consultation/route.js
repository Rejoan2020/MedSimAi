import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbconnect } from "@/lib/mongo";
import openai from "@/lib/openai";

import CaseAttempt from "@/models/CaseAttempt";
import Case from "@/models/Case";
import User from "@/models/User";
import ai from "@/lib/gemini";

export async function POST(req) {
    try {
        await dbconnect();

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

        const user = await User.findOne({ email: session?.user?.email });

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
        console.log(attempt.user.toString());
        console.log(user._id.toString())

        if (attempt.user.toString() !== user._id.toString()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You are not allowed to access this attempt.",
                },
                { status: 403 }
            );
        }

        if (attempt.status !== "started") {
            return NextResponse.json(
                {
                    success: false,
                    message: "This session is no longer active.",
                },
                { status: 400 }
            );
        }

        const clinicalCase = await Case.findById(attempt.case);
        console.log(clinicalCase.aiScenario.patient);
        if (!clinicalCase) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Case not found.",
                },
                { status: 404 }
            );
        }

        const history = attempt.messages.map((msg) => ({
            role: msg.role === "student"
                ? "user"
                : "assistant",

            content: msg.content,
        }));

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
            `;

        const conversation = history.map((msg) => ({
            role: msg.role === "student" ? "user" : "model",
            parts: [
                {
                    text: msg.content,
                },
            ],
        }));

        conversation.push({
            role: "user",
            parts: [
                {
                    text: message.trim(),
                },
            ],
        });

        const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",

            config: {
                systemInstruction: instructions,
            },

            contents: conversation,
        });

        const aiMessage = response.text;


        // const response = await ai.interactions.create({
        //     model: "gemini-3.7-flash",
        //     input: "Hello Gemini!",
        // });


        attempt.messages.push({
            role: "student",
            content: message.trim(),
        });

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