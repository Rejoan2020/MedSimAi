import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const GEMINI_MODELS = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];

const FALL_THROUGH = [404, 429, 500, 503];

export async function generateWithFallback(request) {
    let lastError;
    for (let round = 0; round < 2; round++) {
        for (const model of GEMINI_MODELS) {
            try {
                return await ai.models.generateContent({ ...request, model });
            } catch (error) {
                if (!FALL_THROUGH.includes(error?.status)) throw error;
                console.warn(`Gemini ${model} unavailable (${error.status}); trying the next model`);
                lastError = error;
            }
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    throw lastError;
}

export default ai;
