'use server'

import { redirect } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import { dbconnect } from '@/lib/mongo'
import { getCurrentUser, isAdmin } from '@/lib/currentUser'
import Case from '@/models/Case'
import CaseAttempt from '@/models/CaseAttempt'

export async function startSession(formData) {
    // Server actions are public endpoints: take the user from the session, never from the form
    const user = await getCurrentUser();
    if (!user) redirect('/signin');

    const caseId = formData.get('caseId');

    await dbconnect()

    const clinicalCase = isValidObjectId(caseId)
        ? await Case.findById(caseId).select('slug isPublished').lean()
        : null;
    // Students can only start published cases; admins can also try out drafts
    if (!clinicalCase || (!clinicalCase.isPublished && !isAdmin(user))) {
        throw new Error('Case not found');
    }

    const attempt = await CaseAttempt.create({
        user: user._id,
        case: caseId,
        startedAt: new Date(),
        messages:[],
        status: 'started',
    })

    redirect(`/cases/${clinicalCase.slug}/active-session?attempt=${attempt._id}`);
}
