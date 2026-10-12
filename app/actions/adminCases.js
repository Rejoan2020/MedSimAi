'use server'

import { isValidObjectId } from 'mongoose'
import { dbconnect } from '@/lib/mongo'
import { authorizeAdminAction } from '@/lib/currentUser'
import Case from '@/models/Case'
import CaseAttempt from '@/models/CaseAttempt'
import CasePrep from '@/models/CasePrep'
import { formToCase } from '@/utils/caseFields'
import { slugify } from '@/utils/slugify'

async function uniqueSlug(title) {
    const base = slugify(title) || 'case';
    let slug = base;
    for (let n = 2; await Case.exists({ slug }); n++) {
        slug = `${base}-${n}`;
    }
    return slug;
}

export async function createCase(values) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;

    const { data, error } = formToCase(values);
    if (error) return { success: false, message: error };

    await dbconnect();
    const created = await Case.create({
        ...data,
        slug: await uniqueSlug(data.title),
        completedBy: 0,
    });
    return { success: true, id: created._id.toString() };
}

export async function updateCase(caseId, values) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(caseId)) return { success: false, message: 'Case not found.' };

    const { update, error } = formToCase(values);
    if (error) return { success: false, message: error };
    if (Object.keys(update.$unset).length === 0) delete update.$unset;

    await dbconnect();
    const result = await Case.updateOne({ _id: caseId }, update, { runValidators: true });
    if (!result.matchedCount) return { success: false, message: 'Case not found.' };
    return { success: true };
}

export async function setCasePublished(caseId, isPublished) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(caseId)) return { success: false, message: 'Case not found.' };

    await dbconnect();
    const result = await Case.updateOne({ _id: caseId }, { $set: { isPublished: isPublished === true } });
    if (!result.matchedCount) return { success: false, message: 'Case not found.' };
    return { success: true };
}

export async function deleteCase(caseId) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(caseId)) return { success: false, message: 'Case not found.' };

    await dbconnect();
    // Deleting would orphan students' results; unpublishing hides the case instead
    const attempts = await CaseAttempt.countDocuments({ case: caseId });
    if (attempts > 0) {
        return {
            success: false,
            message: `This case has ${attempts} student attempt${attempts === 1 ? '' : 's'}, so it can't be deleted. Unpublish it to hide it from students.`,
        };
    }

    const result = await Case.deleteOne({ _id: caseId });
    if (!result.deletedCount) return { success: false, message: 'Case not found.' };
    await CasePrep.deleteMany({ case: caseId });
    return { success: true };
}
