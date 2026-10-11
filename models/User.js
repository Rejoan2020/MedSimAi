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
}, {
    timestamps: true,
})

export default defineModel("User", UserSchema);