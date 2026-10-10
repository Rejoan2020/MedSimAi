// Usage: node --env-file=.env scripts/make-admin.mjs <email> [student|admin]
import mongoose from "mongoose";

const [email, role = "admin"] = process.argv.slice(2);

if (!email || !["student", "admin"].includes(role)) {
    console.error("Usage: node --env-file=.env scripts/make-admin.mjs <email> [student|admin]");
    process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);

const result = await mongoose.connection
    .collection("users")
    .updateOne({ email }, { $set: { role } });

console.log(result.matchedCount ? `${email} is now ${role}` : `No user found with email ${email}`);

await mongoose.disconnect();
