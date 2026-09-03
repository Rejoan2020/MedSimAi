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
        const clinicalCase = await Case.findById(attempt.case);

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
                You are a clinical performance evaluator for MedSimAI, a medical education platform.

                Your task is to evaluate a student's performance during a simulated patient consultation.

                You will be given:

                1. The complete clinical case scenario.
                2. The student's conversation with the simulated patient.

                Evaluate the student ONLY based on the information provided in the case scenario and the student's conversation.

                Do not invent information about the student or the patient.
 
                CASE SCENARIO  
                ${JSON.stringify(clinicalCase.aiScenario, null, 2)}
 
                STUDENT-PATIENT CONVERSATION  
                ${JSON.stringify(conversation, null, 2)}
 
                EVALUATION CATEGORIES  
                Evaluate the student independently in the following three categories.
 
                1. CONSULTATION  
                Evaluate how effectively the student conducted the patient consultation.

                Consider:

                - Opening and introduction
                - Establishing the chief complaint
                - History of the presenting complaint
                - Onset, duration and progression
                - Relevant associated symptoms
                - Relevant past medical history
                - Medication history
                - Family history
                - Social history
                - Risk factors
                - Appropriate follow-up questions
                - Important questions specific to this case
                - Whether the consultation was systematic
                - Whether important information was missed

                The consultation score represents how closely the student's consultation
                matches an ideal consultation for this specific case.
 
                2. MEDICAL ENTRY / CLINICAL REASONING 

                Evaluate the student's medical understanding and clinical reasoning.

                Consider:

                - Recognition of important clinical findings
                - Recognition of red flags
                - Understanding the significance of symptoms
                - Connecting symptoms and findings
                - Clinical reasoning demonstrated during the consultation
                - Differential diagnosis when demonstrated
                - Appropriate interpretation of patient responses
                - Identification of relevant risk factors
                - Avoidance of clinically incorrect conclusions

                The score should represent how well the student demonstrated appropriate
                medical reasoning for this specific case.
 
                3. BODY LANGUAGE / COMMUNICATION 

                The current MedSimAI consultation is text-based.

                Therefore, DO NOT evaluate physical body language such as:

                - Eye contact
                - Facial expressions
                - Posture
                - Hand gestures

                Instead, evaluate observable communication characteristics from the
                conversation.

                Consider:

                - Professionalism
                - Empathy
                - Respect
                - Clarity
                - Patient-friendly language
                - Active listening
                - Appropriate follow-up
                - Conversational flow
                - Patient-centered communication
                - Whether the student sounds dismissive, judgmental or rushed

                The score should represent the quality of the student's communication
                with the simulated patient.

                DESCRIPTION 

                    For each category, provide a short description explaining the student's
                    overall performance in that category.

                    The description should:

                    - Be 1-2 sentences.
                    - Summarize the student's performance in that category.
                    - Mention the most important strength and/or weakness.
                    - Be specific to this clinical case.
                    - Not simply repeat the score.
                    - Not contain recommendations.

                    For example:

                    "consultation": {
                        "score": 88,
                        "description": "The student conducted a well-structured consultation and explored most important aspects of the patient's symptoms. However, some relevant risk factors and past medical history were not explored in sufficient detail.",
                        ...
                    }
 
                SCORING 

                Give each category a score from 0 to 100.

                Use the following general interpretation:

                90-100 = Excellent
                80-89  = Very good
                70-79  = Good but has noticeable areas for improvement
                60-69  = Needs significant improvement
                0-59   = Poor

                The scores must reflect the student's ACTUAL performance.

                Do not give a high score simply because the student asked several questions.

                Consider the importance of the questions and findings for THIS SPECIFIC CASE.

                For example, missing a critical question should have a greater impact
                than missing a minor question.
 
                PERFORMANCE BY SECTION 

                For each category, break the evaluation into meaningful sections.

                Each section must have:

                - section
                - score
                - maxScore
                - details

                Use a maximum score of 10 for each section.

                The sections should be appropriate to the category.

                For consultation, possible sections include:

                - Opening
                - Chief Complaint
                - History of Present Illness
                - Associated Symptoms
                - Past Medical History
                - Medication History
                - Family & Social History
                - Risk Factors
                - Follow-up Questions
                - Closing

                Do NOT blindly use all of these sections if they are not relevant to the case.

                For clinical reasoning, use sections relevant to the case such as:

                - Symptom Recognition
                - Clinical Significance
                - Red Flag Recognition
                - Differential Diagnosis
                - Clinical Reasoning
                - Investigation Reasoning

                For communication, use sections such as:

                - Professionalism
                - Empathy
                - Clarity
                - Active Listening
                - Patient-centered Communication
                - Conversational Flow

                Only include sections that can actually be evaluated from the conversation.
 
                STRENGTHS 

                Provide 3 specific strengths.

                Do not use generic statements such as:

                "Good communication."

                Instead explain what the student actually did well.
 
                AREAS TO IMPROVE 

                Provide 3 specific areas for improvement.

                These should be based directly on the student's performance.
 
                MISSED QUESTIONS 

                For the consultation section, identify important questions that the student
                should have asked but did not.

                Only include questions that are relevant to the provided case.

                If the student did not miss any important questions, return an empty array.
 
                RECOMMENDATIONS 

                Provide exactly 3 practical recommendations.

                Recommendations should tell the student what they can do differently
                in their next consultation.
 
                OVERALL SCORE 

                Calculate an overall score from 0 to 100 based on the student's performance
                across consultation, clinical reasoning and communication.

                The overall score should be consistent with the three category scores.
 
                OUTPUT FORMAT 

                Return ONLY valid JSON.

                Do not include markdown.

                Do not include \`\`\`json.

                Use exactly this structure:

                {
                    "overallScore": 0,

                    "consultation": {
                        "score": 0,
                        "description":'',
                        "performance": [
                            {
                                "section": "",
                                "score": 0,
                                "maxScore": 10,
                                "details": ""
                            }
                        ],
                        "strengths": [],
                        "improvements": [],
                        "recommendations": []
                    },

                    "medicalEntry": {
                        "score": 0,
                        "description":'',
                        "performance": [
                            {
                                "section": "",
                                "score": 0,
                                "maxScore": 10,
                                "details": ""
                            }
                        ],
                        "strengths": [],
                        "improvements": [],
                        "recommendations": []
                    },

                    "bodyLanguage": {
                        "score": 0,
                        "description":'',
                        "performance": [
                            {
                                "section": "",
                                "score": 0,
                                "maxScore": 10,
                                "details": ""
                            }
                        ],
                        "strengths": [],
                        "improvements": [],
                        "recommendations": []
                    },

                    "summary": ""
                }

                IMPORTANT RULES:

                - All scores must be integers.
                - Category scores must be between 0 and 100.
                - Section scores must be between 0 and 10.
                - Do not invent questions that are not relevant to the case.
                - Do not invent patient information.
                - Do not reward the student for information they never demonstrated.
                - Do not penalize the student for information that was not relevant to this case.
                - Keep feedback specific and educational.
                - The three categories must be evaluated independently.
                `;

        // const response = await ai.models.generateContent({
        //     model: "gemini-3.7-flash",
        //     contents: prompt,
        //     config: {
        //         responseMimeType: "application/json",
        //     },
        // });

        const text = 'response.text';


        let feedback;

        try {
            feedback = {
                overallScore: 84,

                consultation: {
                    score: 88,
                    description: "The student conducted a well-structured consultation and explored most of the important symptoms. A few relevant historical questions were missed.",
                    performance: [
                        {
                            section: "Opening",
                            score: 9,
                            maxScore: 10,
                            details:
                                "The student introduced themselves appropriately and established a comfortable starting point for the consultation."
                        },
                        {
                            section: "Chief Complaint",
                            score: 10,
                            maxScore: 10,
                            details:
                                "The student clearly identified the patient's main complaint and allowed the patient to describe the primary concern."
                        },
                        {
                            section: "History of Present Illness",
                            score: 9,
                            maxScore: 10,
                            details:
                                "The student explored the onset, duration and progression of the symptoms effectively."
                        },
                        {
                            section: "Associated Symptoms",
                            score: 9,
                            maxScore: 10,
                            details:
                                "The student asked about several relevant associated symptoms and used the patient's answers to guide follow-up questions."
                        },
                        {
                            section: "Past Medical History",
                            score: 7,
                            maxScore: 10,
                            details:
                                "Some relevant medical history was explored, but the student did not investigate previous respiratory or similar conditions thoroughly."
                        },
                        {
                            section: "Medication History",
                            score: 8,
                            maxScore: 10,
                            details:
                                "The student explored medication use but could have asked more specifically about regular medications and recent changes."
                        },
                        {
                            section: "Family & Social History",
                            score: 7,
                            maxScore: 10,
                            details:
                                "The student explored some background information but missed potentially relevant family and social risk factors."
                        },
                        {
                            section: "Follow-up Questions",
                            score: 9,
                            maxScore: 10,
                            details:
                                "Most follow-up questions were relevant and connected appropriately to the patient's previous responses."
                        },
                        {
                            section: "Closing",
                            score: 9,
                            maxScore: 10,
                            details:
                                "The student ended the consultation appropriately and maintained a professional interaction."
                        }
                    ],

                    strengths: [
                        "Systematically explored the patient's main respiratory symptoms.",
                        "Used relevant follow-up questions based on the patient's responses.",
                        "Maintained a focused consultation without unnecessary questioning."
                    ],

                    improvements: [
                        "Explore previous respiratory and medical conditions more thoroughly.",
                        "Ask more comprehensive questions about family and social history.",
                        "Use a consistent checklist to ensure important risk factors are not missed."
                    ],

                    recommendations: [
                        "Use a structured history-taking framework for every consultation.",
                        "Review the important risk factors associated with the presenting complaint before moving toward a diagnosis.",
                        "Use the patient's answers to identify areas that require deeper follow-up."
                    ]
                },

                medicalKnowledge: {
                    score: 79,
                    description: "The student demonstrated good clinical understanding and recognized several important findings, but the clinical reasoning could have been more systematic.",
                    performance: [
                        {
                            section: "Symptom Recognition",
                            score: 9,
                            maxScore: 10,
                            details:
                                "The student recognized the major symptoms and identified the most clinically relevant information provided by the patient."
                        },
                        {
                            section: "Clinical Significance",
                            score: 8,
                            maxScore: 10,
                            details:
                                "The student demonstrated a good understanding of the significance of the major symptoms but missed some connections between the findings."
                        },
                        {
                            section: "Red Flag Recognition",
                            score: 7,
                            maxScore: 10,
                            details:
                                "The student identified some concerning features but did not fully explore all findings that could indicate a more serious condition."
                        },
                        {
                            section: "Differential Diagnosis",
                            score: 8,
                            maxScore: 10,
                            details:
                                "The student's reasoning considered appropriate possibilities but could have been more systematic."
                        },
                        {
                            section: "Clinical Reasoning",
                            score: 8,
                            maxScore: 10,
                            details:
                                "The overall reasoning was logical, although some clinical findings were not fully connected to the possible diagnoses."
                        }
                    ],

                    strengths: [
                        "Recognized the major clinical features of the presentation.",
                        "Considered appropriate possible causes of the patient's symptoms.",
                        "Demonstrated generally logical clinical reasoning."
                    ],

                    improvements: [
                        "Pay closer attention to clinically important risk factors.",
                        "Connect individual symptoms and findings more systematically.",
                        "Consider alternative diagnoses before settling on the most likely explanation."
                    ],

                    recommendations: [
                        "Use a structured differential diagnosis approach.",
                        "Review the major red flags associated with common respiratory presentations.",
                        "Practice explaining why each clinical finding supports or argues against a diagnosis."
                    ]
                },

                communication: {
                    score: 91,
                    description: "The student communicated clearly and professionally, used understandable language, and maintained an appropriate patient-centered style.",
                    performance: [
                        {
                            section: "Professionalism",
                            score: 10,
                            maxScore: 10,
                            details:
                                "The student maintained a consistently professional and respectful interaction."
                        },
                        {
                            section: "Empathy",
                            score: 9,
                            maxScore: 10,
                            details:
                                "The student acknowledged the patient's concerns and generally responded in an empathetic manner."
                        },
                        {
                            section: "Clarity",
                            score: 9,
                            maxScore: 10,
                            details:
                                "Questions were clear and easy for the simulated patient to understand."
                        },
                        {
                            section: "Active Listening",
                            score: 9,
                            maxScore: 10,
                            details:
                                "The student's follow-up questions demonstrated that they were paying attention to the patient's responses."
                        },
                        {
                            section: "Patient-centered Communication",
                            score: 9,
                            maxScore: 10,
                            details:
                                "The student generally maintained a patient-centered and conversational approach."
                        }
                    ],

                    strengths: [
                        "Used clear and patient-friendly language.",
                        "Maintained a professional and respectful tone throughout the consultation.",
                        "Demonstrated good active listening through relevant follow-up questions."
                    ],

                    improvements: [
                        "Use more explicit empathetic responses when the patient expresses discomfort or concern.",
                        "Avoid moving too quickly from one question to another.",
                        "Allow more conversational space for the patient to explain their concerns."
                    ],

                    recommendations: [
                        "Acknowledge the patient's emotions before moving to the next clinical question.",
                        "Continue using simple, patient-friendly language.",
                        "Focus on creating a natural conversation rather than asking questions as a checklist."
                    ]
                },

                summary:
                    "The student performed well overall, demonstrating strong consultation and communication skills. The main opportunities for improvement are more comprehensive history taking and developing a more systematic approach to clinical reasoning."
            };
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