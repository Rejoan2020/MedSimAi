import mongoose from "mongoose";
import { defineModel } from "@/lib/model";

const FaqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    // Lower numbers are shown first
    order: { type: Number, default: 0 },
}, {
    timestamps: true,
})

export default defineModel("Faq", FaqSchema);
