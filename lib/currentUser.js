import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { dbconnect } from "@/lib/mongo";
import User from "@/models/User";

// Loads the signed-in user from the DB so role changes apply without re-login.
export async function getCurrentUser() {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) return null;

    await dbconnect();
    return User.findOne({ email }).select("-password").lean();
}

export function isAdmin(user) {
    return user?.role === "admin";
}

// For server actions: returns the admin user, or null if the caller isn't an admin
export async function getAdminUser() {
    const user = await getCurrentUser();
    return isAdmin(user) ? user : null;
}

// For admin pages: redirects anyone who isn't an admin. Pages can render in
// parallel with their layout, so each admin page calls this itself.
export async function requireAdminPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/signin");
    if (!isAdmin(user)) redirect("/dashboard");
    return user;
}
