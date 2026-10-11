import mongoose from "mongoose";
import { defineModel } from "@/lib/model";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    },
    // Shared portfolio demo account (see scripts/seed-demo.mjs); the demo admin is read-only
    isDemo: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

export default defineModel("User", UserSchema);