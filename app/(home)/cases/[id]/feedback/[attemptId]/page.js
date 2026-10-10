import { notFound, redirect } from 'next/navigation';
import { isValidObjectId } from 'mongoose';
import CaseAttempt from '@/models/CaseAttempt';
import Case from '@/models/Case';
import Feedback from '../components/Feedback'
import { dbconnect } from '@/lib/mongo';
import { getCurrentUser } from '@/lib/currentUser';

// Turns a stored feedback category into plain props, tolerating missing fields
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

    const stored = caseAttempt.feedback;
    if (stored?.overallScore == null) {
        return (
            <div className='mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
                <div className='rounded-xl border border-gray-200 bg-white p-6 text-Secondary-Text'>
                    Feedback for this session is not available yet.
                </div>
            </div>
        )
    }

    const clinicalCase = await Case.findById(caseAttempt.case).select('title slug').lean();

    const feedback = {
        overallScore: stored.overallScore,
        summary: stored.summary ?? '',
        consultation: toCategory(stored.consultation),
        medicalKnowledge: toCategory(stored.medicalKnowledge),
        communication: toCategory(stored.communication),
    };

    return (
        <Feedback
            feedback={feedback}
            messages={(caseAttempt.messages ?? []).map(({ role, content }) => ({ role, content }))}
            notes={caseAttempt.notes ?? ""}
            caseTitle={clinicalCase?.title}
            caseSlug={clinicalCase?.slug}
        />
    )
}
