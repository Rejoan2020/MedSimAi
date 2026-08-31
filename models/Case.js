import mongoose from "mongoose";

const CasesSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    image: String,
    features: [String],
    pdfUrl: String,
    duration: String,
    specialty: String,
    completedBy: Number,
    aiScenario: {
        patient: {
            name: String,
            age: Number,
            gender: {
                type: String,
                enum: ["Male", "Female", "Other"],
            },
            occupation: String,
            personality: String,
        },

        clinicalData: {
            // chiefComplaint: String,

            historyOfPresentIllness: String,

            symptoms: {
                present: {
                    type: [String],
                    default: [],
                },

                absent: {
                    type: [String],
                    default: [],
                },
            },

            pastMedicalHistory: {
                type: [String],
                default: [],
            },

            medications: {
                type: [String],
                default: [],
            },

            allergies: {
                type: [String],
                default: [],
            },

            // familyHistory: {
            //     type: [String],
            //     default: [],
            // },

            // socialHistory: {
            //     smoking: String,
            //     alcohol: String,
            //     occupation: String,
            // },
        },

        behavior: {
            communicationStyle: String,
            emotionalState: String,

            revealInformationOnlyWhenAsked: {
                type: Boolean,
                default: true,
            },

            revealDiagnosis: {
                type: Boolean,
                default: false,
            },

            useMedicalTerminology: {
                type: Boolean,
                default: false,
            },
        },

        examination: {
            generalAppearance: String,

            vitals: {
                temperature: Number,
                heartRate: Number,
                respiratoryRate: Number,
                bloodPressure: String,
                oxygenSaturation: Number,
            },

            findings: {
                type: [String],
                default: [],
            },
        },

        // investigations: {
        //     available: {
        //         type: [
        //             {
        //                 name: String,
        //                 result: String,
        //             },
        //         ],
        //         default: [],
        //     },
        // },

        diagnosis: {
            primary: String,

            differentials: {
                type: [String],
                default: [],
            },
        },

        evaluation: {
            expectedQuestions: {
                type: [String],
                default: [],
            },

            criticalFindings: {
                type: [String],
                default: [],
            },

            // scoringCriteria: {
            //     type: [String],
            //     default: [],
            // },
        },
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

export default mongoose.models.Case || mongoose.model("Case", CasesSchema);