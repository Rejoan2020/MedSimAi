import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    // Lower numbers are shown first
    order: { type: Number, default: 0 },
}, {
    timestamps: true,
})

export default mongoose.models.Faq || mongoose.model("Faq", FaqSchema);
