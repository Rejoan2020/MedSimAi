import mongoose from "mongoose"

const caseAttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    case: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case',
        required: true,
    },

    startedAt: Date,

    completedAt: Date,

    status: {
        type: String,
        enum: ['started', 'completed'],
        default: 'started',
    },

    score: Number,

    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
    },
}, {
    timestamps: true,
})

export default mongoose.models.CaseAttempt || mongoose.model("CaseAttempt", caseAttemptSchema);