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
