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

const ADMIN_ONLY = { success: false, message: "Only admins can do this." };
const DEMO_READ_ONLY = { success: false, message: "This is a read-only demo, so changes aren't saved." };

// For admin server actions: { admin } when the caller may make changes, otherwise
// { denied } holding the result to return. The demo admin can look around but not change anything.
export async function authorizeAdminAction() {
    const user = await getCurrentUser();
    if (!isAdmin(user)) return { denied: ADMIN_ONLY };
    if (user.isDemo) return { denied: DEMO_READ_ONLY };
    return { admin: user };
}

// For admin pages: sends anyone who isn't an admin to the admin login page, which
// explains why. Pages can render in parallel with their layout, so each admin page
// calls this itself.
export async function requireAdminPage() {
    const user = await getCurrentUser();
    if (!isAdmin(user)) redirect("/admin-dashboard/login");
    return user;
}
