import mongoose from "mongoose";

const CasesSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Hard'] },
    image: '',
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

export default mongoose.models.Cases || mongoose.model("Cases", CasesSchema);