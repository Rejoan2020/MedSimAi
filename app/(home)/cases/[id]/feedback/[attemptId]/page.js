import { notFound, redirect } from 'next/navigation';
import { isValidObjectId } from 'mongoose';
import CaseAttempt from '@/models/CaseAttempt';
import Case from '@/models/Case';
import Feedback from '../components/Feedback'
import GenerateFeedback from '../components/GenerateFeedback'
import { compareConfidence } from '@/utils/confidenceCheck'
import { dbconnect } from '@/lib/mongo';
import { getCurrentUser } from '@/lib/currentUser';

function toCategory(category) {
    return {
        score: category?.score ?? 0,
        description: category?.description ?? '',
        performance: (category?.performance ?? []).map((item) => ({
            section: item.section,
            score: item.score,
            maxScore: item.maxScore,
            details: item.details,
        })),
        strengths: category?.strengths ?? [],
        improvements: category?.improvements ?? [],
        recommendations: category?.recommendations ?? [],
    };
}

export default async function page({ params }) {
    const { attemptId } = await params;

    const user = await getCurrentUser();
    if (!user) redirect('/signin');
    if (!isValidObjectId(attemptId)) notFound();

    await dbconnect()
    const caseAttempt = await CaseAttempt.findOne({ _id: attemptId, user: user._id }).lean();
    if (!caseAttempt) notFound();

    const clinicalCase = await Case.findById(caseAttempt.case).select('title slug').lean();

    const stored = caseAttempt.feedback;
    if (stored?.overallScore == null) {
        return (
            <div className='mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
                <div>
                    <h1 className='text-2xl font-semibold'>Session feedback</h1>
                    {clinicalCase && <p className='text-Secondary-Text'>{clinicalCase.title}</p>}
                </div>
                {caseAttempt.status === 'completed'
                    ? <GenerateFeedback attemptId={attemptId} />
                    : <div className='rounded-2xl border border-brand-secondary bg-white p-6 text-Secondary-Text'>
                        Feedback is available once the session has been completed.
                    </div>}
            </div>
        )
    }

    const feedback = {
        overallScore: stored.overallScore,
        summary: stored.summary ?? '',
        consultation: toCategory(stored.consultation),
        medicalKnowledge: toCategory(stored.medicalKnowledge),
        communication: toCategory(stored.communication),
    };

    const plan = caseAttempt.prep?.plan ?? '';
    const planReview = stored.planReview?.summary || stored.planReview?.followed?.length
        ? {
            summary: stored.planReview.summary ?? '',
            followed: stored.planReview.followed ?? [],
            skipped: stored.planReview.skipped ?? [],
            missing: stored.planReview.missing ?? [],
        }
        : null;
    const confidenceRows = compareConfidence(caseAttempt.prep?.confidence, feedback);

    return (
        <Feedback
            feedback={feedback}
            messages={(caseAttempt.messages ?? []).map(({ role, content }) => ({ role, content }))}
            notes={caseAttempt.notes ?? ""}
            caseTitle={clinicalCase?.title}
            caseSlug={clinicalCase?.slug}
            plan={plan}
            planReview={planReview}
            confidenceRows={confidenceRows}
        />
    )
}
