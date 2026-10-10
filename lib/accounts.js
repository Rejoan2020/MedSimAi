import bcrypt from "bcryptjs";
import { dbconnect } from "@/lib/mongo";
import User from "@/models/User";

export const ROLES = ["student", "admin"];
export const MIN_PASSWORD_LENGTH = 8;

export function normalizeEmail(email) {
    return typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function passwordError(password) {
    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
        return `Passwords must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    return null;
}

// Validates and creates an account. Emails are stored lowercase so sign-in isn't case-sensitive.
// Returns { user } or { error }.
export async function createAccount({ name, email, password, role = "student" }) {
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = normalizeEmail(email);

    if (!cleanName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        return { error: "Please enter a name and a valid email." };
    }
    const invalidPassword = passwordError(password);
    if (invalidPassword) return { error: invalidPassword };
    if (!ROLES.includes(role)) return { error: "Invalid role." };

    await dbconnect();
    if (await User.exists({ email: cleanEmail })) {
        return { error: "An account with this email already exists." };
    }

    const user = await User.create({
        name: cleanName,
        email: cleanEmail,
        role,
        password: await bcrypt.hash(password, 12),
    });
    return { user };
}

export async function adminExists() {
    await dbconnect();
    return Boolean(await User.exists({ role: "admin" }));
}
