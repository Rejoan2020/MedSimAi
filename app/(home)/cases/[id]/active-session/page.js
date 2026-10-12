import React from 'react'
import SessionWorkspace from './components/SessionWorkspace'
import { notFound, redirect } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import { dbconnect } from '@/lib/mongo'
import { getCurrentUser } from '@/lib/currentUser'
import Case from '@/models/Case'
import CaseAttempt from '@/models/CaseAttempt'
import CasePrep from '@/models/CasePrep'

export default async function Page({ params, searchParams }) {
    const { id: slug } = await params;
    const { attempt: attemptId } = await searchParams;

    const user = await getCurrentUser();
    if (!user) redirect('/signin');

    await dbconnect()

    const clinicalCase = await Case.findOne({ slug }).select('_id title').lean();
    if (!clinicalCase) notFound();

    let caseAttempt = null;
    if (isValidObjectId(attemptId)) {
        caseAttempt = await CaseAttempt.findOne({ _id: attemptId, user: user._id, case: clinicalCase._id });
    } else {
        caseAttempt = await CaseAttempt.findOne({ user: user._id, case: clinicalCase._id, status: 'started' })
            .sort({ createdAt: -1 });
    }

    if (!caseAttempt) notFound();

    if (caseAttempt.status === 'completed') {
        redirect(`/cases/${slug}/feedback/${caseAttempt._id}`);
    }
    if (caseAttempt.status !== 'started') notFound();

    const plan = caseAttempt.prep?.plan != null
        ? caseAttempt.prep.plan
        : (await CasePrep.findOne({ user: user._id, case: clinicalCase._id }).select('plan').lean())?.plan ?? '';

    return (
        <SessionWorkspace
            slug={slug}
            title={clinicalCase.title}
            attemptId={caseAttempt._id.toString()}
            initialMessages={caseAttempt.messages.map(({ role, content }) => ({ role, content }))}
            initialNotes={caseAttempt.notes ?? ''}
            plan={plan}
            startedAt={(caseAttempt.startedAt ?? caseAttempt.createdAt)?.toISOString()}
        />
    )
}
