import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env.AGENTROUTER_API_KEY,
    baseURL: "https://co.agentrouter.org",
});

export default anthropic;