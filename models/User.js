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
    isDemo: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

export default defineModel("User", UserSchema);