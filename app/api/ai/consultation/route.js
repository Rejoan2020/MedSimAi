import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbconnect } from "@/lib/mongo";
import { generateWithFallback } from "@/lib/gemini";

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

        // Convert previous messages into Gemini format
        const history = attempt.messages.map((msg) => ({
            role: msg.role === "student" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        // Turn the case's behavior flags into explicit rules for the patient
        const { behavior = {}, diagnosis } = clinicalCase.aiScenario;

        const disclosureRule = behavior.revealInformationOnlyWhenAsked
            ? "Only share information the student specifically asks about. Do not volunteer other symptoms or history."
            : "You may volunteer relevant information about your symptoms and history.";

        const diagnosisRule = behavior.revealDiagnosis && diagnosis?.primary
            ? `You have previously been told you have ${diagnosis.primary}. You may say so if asked, but do not explain it like a doctor.`
            : "You do not know your diagnosis. Do not guess, name or hint at a diagnosis.";

        const languageRule = behavior.useMedicalTerminology
            ? "You may use medical terms, as a patient familiar with their condition would."
            : "Use everyday language, not medical terminology.";

        // System instructions for the simulated patient
        const instructions = `
You are a simulated patient in a medical education platform called MedSimAI.

Your job is to behave like the patient described below.

PATIENT:
${JSON.stringify(clinicalCase.aiScenario.patient)}

CLINICAL INFORMATION:
${JSON.stringify(clinicalCase.aiScenario.clinicalData)}

COMMUNICATION STYLE:
${behavior.communicationStyle || "Speak naturally like a real patient."}

EMOTIONAL STATE:
${behavior.emotionalState || "Calm."}

EXAMINATION:
${JSON.stringify(clinicalCase.aiScenario.examination)}

IMPORTANT RULES:

- Stay in character as the patient.
- Do not act as a doctor.
- ${diagnosisRule}
- ${disclosureRule}
- ${languageRule}
- Do not invent information that is not present in the case.
- Answer the student's question directly.
- Keep responses reasonably concise and conversational.
- Respond as the patient, not as an AI assistant.
`;

        // Falls back to lighter Gemini models when the main one is over quota or overloaded
        const response = await generateWithFallback({
            contents: [
                ...history,
                {
                    role: "user",
                    parts: [{ text: message.trim() }],
                },
            ],
            config: {
                systemInstruction: instructions,
                maxOutputTokens: 1024,
            },
        });

        const aiMessage = response.text?.trim();

        console.log(aiMessage);

        if (!aiMessage) {
            console.error("Unexpected Gemini response:", response);
            throw new Error("Gemini returned an empty response.");
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