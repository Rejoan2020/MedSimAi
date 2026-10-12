import mongoose from "mongoose"
import { defineModel } from "@/lib/model";

const casePrepSchema = new mongoose.Schema({
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

    plan: {
        type: String,
        default: '',
    },

    confidence: {
        type: Map,
        of: Number,
        default: {},
    },
}, {
    timestamps: true,
})

casePrepSchema.index({ user: 1, case: 1 }, { unique: true });

export default defineModel("CasePrep", casePrepSchema);
