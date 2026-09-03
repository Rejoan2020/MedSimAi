
import CaseAttempt from '@/models/CaseAttempt';
import Feedback from '../components/Feedback'
import { auth } from '@/auth';
import User from '@/models/User';
import { dbconnect } from '@/lib/mongo';
export default async function page({ params }) {
    await dbconnect()
    const { attemptId } = await params; 
    const session = await auth();
    const email = session?.user?.email;
    const user = await User.findOne({ email }) 
    const caseAttempt = await CaseAttempt.findOne({ _id: attemptId, user: user._id }).lean(); 
    const feedback = {
        ...caseAttempt?.feedback,
        consultation: {
            ...caseAttempt.feedback.consultation,
            performance: caseAttempt.feedback.consultation.performance.map((item) => ({
                section: item.section,
                score: item.score,
                maxScore: item.maxScore,
                details: item.details,
            })),
        },
        medicalKnowledge: {
            ...caseAttempt.feedback.medicalKnowledge,
            performance: caseAttempt.feedback.medicalKnowledge.performance.map((item) => ({
                section: item.section,
                score: item.score,
                maxScore: item.maxScore,
                details: item.details,
            })),
        },

        communication: {
            ...caseAttempt.feedback.communication,
            performance: caseAttempt.feedback.communication.performance.map((item) => ({
                section: item.section,
                score: item.score,
                maxScore: item.maxScore,
                details: item.details,
            })),
        },
    };


    return (
        <Feedback feedback={feedback} />
    )
}
