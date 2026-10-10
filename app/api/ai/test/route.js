import { NextResponse } from "next/server";

export async function GET() {
    const key = process.env.OPENROUTER_API_KEY;

    console.log("KEY EXISTS:", !!key);
    console.log("KEY LENGTH:", key?.length);
    console.log("KEY PREFIX:", key?.slice(0, 10));
    console.log(
        "KEY HAS WHITESPACE:",
        key !== key?.trim()
    );

    try {
        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${key}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-6-astra",
                    messages: [
                        {
                            role: "user",
                            content: "Say hello in one sentence.",
                        },
                    ],
                    max_completion_tokens: 50,
                }),
            }
        );

        const data = await response.json();

        console.log("STATUS:", response.status);
        console.log("RESPONSE:", data);

        return NextResponse.json({
            status: response.status,
            data,
        });
    } catch (error) {
        console.error("FETCH ERROR:", error);

        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}