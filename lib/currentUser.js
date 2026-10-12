import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { dbconnect } from "@/lib/mongo";
import User from "@/models/User";

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

export async function authorizeAdminAction() {
    const user = await getCurrentUser();
    if (!isAdmin(user)) return { denied: ADMIN_ONLY };
    if (user.isDemo) return { denied: DEMO_READ_ONLY };
    return { admin: user };
}

export async function requireAdminPage() {
    const user = await getCurrentUser();
    if (!isAdmin(user)) redirect("/admin-dashboard/login");
    return user;
}
