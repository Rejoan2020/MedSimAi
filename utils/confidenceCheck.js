import { CONFIDENCE_SKILLS } from './confidenceSkills'

// Which part of the feedback reflects each skill students rate before a case.
// A matching section score (e.g. "Red Flag Recognition") is used when the evaluator gave one.
const SKILL_SOURCES = {
    'History taking': { category: 'consultation' },
    'Clinical reasoning': { category: 'medicalKnowledge' },
    'Recognising red flags': { category: 'medicalKnowledge', section: /red flag/i },
    'Communicating with the patient': { category: 'communication' },
    'Forming a differential diagnosis': { category: 'medicalKnowledge', section: /differential/i },
}

// A gap this large (in percentage points) between confidence and score is worth pointing out
const GAP = 25

function skillScore(feedback, { category, section }) {
    const data = feedback?.[category]
    if (!data) return null
    const match = section && (data.performance ?? []).find((p) => section.test(p.section ?? ''))
    if (match && match.maxScore) return Math.round((match.score / match.maxScore) * 100)
    return typeof data.score === 'number' ? data.score : null
}

// Compares the student's 1-5 confidence ratings with how they actually scored.
// A rating of 1-5 is read as 20-100%; returns one row per rated skill.
export function compareConfidence(confidence, feedback) {
    if (!confidence) return []
    return CONFIDENCE_SKILLS
        .filter((skill) => typeof confidence[skill] === 'number')
        .map((skill) => {
            const rating = confidence[skill]
            const score = skillScore(feedback, SKILL_SOURCES[skill])
            if (score === null) return null
            const gap = score - rating * 20
            const verdict = gap <= -GAP ? 'overconfident' : gap >= GAP ? 'underconfident' : 'calibrated'
            return { skill, rating, score, verdict }
        })
        .filter(Boolean)
}
