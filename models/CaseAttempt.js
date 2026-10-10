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

    abandonedAt: Date,

    status: {
        type: String,
        enum: ['started', 'completed', 'abandoned'],
        default: 'started',
    },
    messages: [
        {
            role: {
                type: String,
                enum: ["student", "patient"],
                required: true,
            },

            content: {
                type: String,
                required: true,
            },

            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    feedback: {
        overallScore: {
            type: Number,
            min: 0,
            max: 100,
        },

        consultation: {
            score: {
                type: Number,
                min: 0,
                max: 100,
            },
            description: String,
            performance: [
                {
                    section: String,
                    score: Number,
                    maxScore: Number,
                    details: String,
                }
            ],

            strengths: [String],

            improvements: [String],

            recommendations: [String],
        },

        medicalKnowledge: {
            score: {
                type: Number,
                min: 0,
                max: 100,
            },
            description: String,
            performance: [
                {
                    section: String,
                    score: Number,
                    maxScore: Number,
                    details: String,
                }
            ],

            strengths: [String],

            improvements: [String],

            recommendations: [String],
        },

        communication: {
            score: {
                type: Number,
                min: 0,
                max: 100,
            },
            description: String,
            performance: [
                {
                    section: String,
                    score: Number,
                    maxScore: Number,
                    details: String,
                }
            ],

            strengths: [String],

            improvements: [String],

            recommendations: [String],
        },
        summary: String,
    },
    score: Number,
}, {
    timestamps: true,
})

export default mongoose.models.CaseAttempt || mongoose.model("CaseAttempt", caseAttemptSchema);