'use server'

import { isValidObjectId } from 'mongoose'
import { dbconnect } from '@/lib/mongo'
import { getCurrentUser } from '@/lib/currentUser'
import Case from '@/models/Case'
import CasePrep from '@/models/CasePrep'
import CaseAttempt from '@/models/CaseAttempt'
import { CONFIDENCE_SKILLS } from '@/utils/confidenceSkills'

const MAX_TEXT_LENGTH = 10000;

async function authorizeCase(caseId) {
    const user = await getCurrentUser();
    if (!user) return { error: 'You need to sign in again.' };

    await dbconnect();
    if (!isValidObjectId(caseId) || !(await Case.exists({ _id: caseId }))) {
        return { error: 'Case not found.' };
    }
    return { user };
}

export async function saveConfidence(caseId, skill, rating) {
    if (!CONFIDENCE_SKILLS.includes(skill) || ![1, 2, 3, 4, 5].includes(rating)) {
        return { success: false, message: 'Invalid rating.' };
    }

    const { user, error } = await authorizeCase(caseId);
    if (error) return { success: false, message: error };

    await CasePrep.updateOne(
        { user: user._id, case: caseId },
        { $set: { [`confidence.${skill}`]: rating } },
        { upsert: true }
    );
    return { success: true };
}

export async function saveConsultationPlan(caseId, plan) {
    if (typeof plan !== 'string' || plan.length > MAX_TEXT_LENGTH) {
        return { success: false, message: 'The plan is too long.' };
    }

    const { user, error } = await authorizeCase(caseId);
    if (error) return { success: false, message: error };

    await CasePrep.updateOne(
        { user: user._id, case: caseId },
        { $set: { plan } },
        { upsert: true }
    );
    return { success: true };
}

export async function saveNotes(attemptId, notes) {
    if (typeof notes !== 'string' || notes.length > MAX_TEXT_LENGTH) {
        return { success: false, message: 'The notes are too long.' };
    }

    const user = await getCurrentUser();
    if (!user) return { success: false, message: 'You need to sign in again.' };

    await dbconnect();
    const result = isValidObjectId(attemptId)
        ? await CaseAttempt.updateOne({ _id: attemptId, user: user._id }, { $set: { notes } })
        : { matchedCount: 0 };

    if (!result.matchedCount) return { success: false, message: 'Session not found.' };
    return { success: true };
}
