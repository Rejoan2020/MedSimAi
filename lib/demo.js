// Shared demo accounts so anyone can explore the app without signing up.
// scripts/seed-demo.mjs creates them (keep the emails there in sync); the one-click
// demo sign-in only appears when DEMO_PASSWORD is set.
export const DEMO_ACCOUNTS = {
    student: { email: "demo.student@medsimai.app", redirectTo: "/dashboard" },
    admin: { email: "demo.admin@medsimai.app", redirectTo: "/admin-dashboard" },
};

export function demoEnabled() {
    return Boolean(process.env.DEMO_PASSWORD);
}

// Demo accounts never call Gemini, so public visitors can't use up the AI quota
export const DEMO_AI_OFF = "Live AI sessions are turned off in the demo. Open a sample attempt to see the AI feedback.";

// Hides real users' details from the demo admin: "jane.doe@gmail.com" -> "j•••@g•••.com"
export function maskEmail(email = "") {
    const [local = "", domain = ""] = email.split("@");
    const dot = domain.lastIndexOf(".");
    const host = dot > 0 ? domain.slice(0, dot) : domain;
    const tld = dot > 0 ? domain.slice(dot) : "";
    return `${local.slice(0, 1)}•••@${host.slice(0, 1)}•••${tld}`;
}

// "Jane Doe" -> "Jane D."
export function maskName(name = "") {
    const [first = "", ...rest] = name.trim().split(/\s+/);
    const last = rest.at(-1);
    return last ? `${first} ${last[0]}.` : first;
}
