import mongoose from "mongoose";

const CasesSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    slug: String,
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    image: String,
    features: [String],
    pdfUrl: String,
    duration: String,
    specialty: String,
    completedBy: Number,
    isPublished: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

export default mongoose.models.Case || mongoose.model("Case", CasesSchema);