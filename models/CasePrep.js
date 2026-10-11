import mongoose from "mongoose"
import { defineModel } from "@/lib/model";

// A student's preparation for a case before starting it: confidence ratings and consultation plan
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

    // Skill name -> rating from 1 (not confident) to 5 (very confident)
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
