import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.AGENTROUTER_API_KEY,
    baseURL: "https://agentrouter.org/v1",
});

export default openai;