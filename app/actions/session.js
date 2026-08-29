'use server'

import { redirect } from 'next/navigation'
import { dbconnect } from '@/lib/mongo'
import CaseAttempt from '@/models/CaseAttempt'

export async function startSession(formData) {
    const caseId = formData.get('caseId');
    const userId = formData.get('userId');

    await dbconnect()

    const session = await CaseAttempt.create({
        user: userId,
        case: caseId,
        startedAt: new Date(),
        messages:[],
        status: 'started',
    })

    redirect(`/cases/${caseId}/active-session`);
}