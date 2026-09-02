import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbconnect } from "@/lib/mongo";
import CaseAttempt from "@/models/CaseAttempt";
import Case from "@/models/Case";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req, { params }) {
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

        const { attemptId } = await params;

        const attempt = await CaseAttempt.findOne({
            _id: attemptId,
            userId: session.user.id,
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

        if (attempt.status !== "completed") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Attempt has not been completed yet",
                },
                { status: 400 }
            );
        }

        const clinicalCase = await Case.findById(attempt.caseId);

        if (!clinicalCase) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Case not found",
                },
                { status: 404 }
            );
        }

        if (attempt.feedback?.score !== undefined) {
            return NextResponse.json({
                success: true,
                message: "Feedback already exists",
                data: attempt.feedback,
            });
        }

        const conversation = attempt.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
        }));

        const prompt = `
            You are an evaluator for MedSimAI, a medical education platform.

            Your job is to evaluate a student's performance during a simulated patient consultation.

            Do NOT evaluate information that is not present in the case.
 
            CASE SCENARIO 

            ${JSON.stringify(clinicalCase.aiScenario, null, 2)}
            
            STUDENT-PATIENT CONVERSATION 

            ${JSON.stringify(conversation, null, 2)}
            
            EVALUATION CRITERIA 

            Evaluate the student's:

            1. History taking
            2. Important questions asked
            3. Critical findings identified
            4. Communication
            5. Clinical reasoning
            6. Missed important information
            7. Overall performance

            The student should be evaluated against the case scenario and evaluation criteria.

            Be fair and educational.

            Return ONLY valid JSON.

            Use exactly this structure:

            {
                "score": 0,
                "strengths": [],
                "weaknesses": [],
                "missedQuestions": [],
                "clinicalReasoning": "",
                "communication": "",
                "recommendations": [],
                "summary": ""
            }

            Rules:

            - score must be between 0 and 100.
            - strengths must contain specific things the student did well.
            - weaknesses must contain specific areas that could be improved.
            - missedQuestions must contain important questions the student failed to ask.
            - clinicalReasoning should explain how well the student recognized the clinical significance of the information.
            - communication should evaluate the student's questioning style.
            - recommendations should provide practical ways to improve.
            - summary should give a concise overall assessment.
            `;
 
        const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });
 
        const text = response.text;

        console.log("Gemini evaluation:", text);
 
        let feedback;

        try {
            feedback = JSON.parse(text);
        } catch (error) {
            console.error("Failed to parse Gemini response:", error);

            return NextResponse.json(
                {
                    success: false,
                    message: "AI returned an invalid evaluation",
                },
                { status: 500 }
            );
        }
 
        attempt.feedback = feedback;

        await attempt.save();
 
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