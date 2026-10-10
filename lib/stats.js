import { dbconnect } from "@/lib/mongo";
import Case from "@/models/Case";
import CaseAttempt from "@/models/CaseAttempt";
import User from "@/models/User";

// Scores below this count a student as "at risk" on the admin dashboard
const AT_RISK_SCORE = 60;

const DIFFICULTY_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 };

function average(numbers) {
    if (numbers.length === 0) return null;
    return Math.round(numbers.reduce((sum, n) => sum + n, 0) / numbers.length);
}

function scoreOf(attempt) {
    return attempt.feedback?.overallScore ?? null;
}

// Per case: how many students completed it, and this user's best score
export async function getCaseStats(userId) {
    await dbconnect();
    const [completions, bestScores] = await Promise.all([
        CaseAttempt.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: "$case", users: { $addToSet: "$user" } } },
            { $project: { completedBy: { $size: "$users" } } },
        ]),
        CaseAttempt.aggregate([
            { $match: { user: userId, status: "completed", "feedback.overallScore": { $ne: null } } },
            { $group: { _id: "$case", bestScore: { $max: "$feedback.overallScore" } } },
        ]),
    ]);

    const stats = {};
    for (const row of completions) {
        stats[row._id.toString()] = { completedBy: row.completedBy, bestScore: null };
    }
    for (const row of bestScores) {
        const id = row._id.toString();
        stats[id] = { completedBy: stats[id]?.completedBy ?? 0, bestScore: row.bestScore };
    }
    return stats;
}

export async function getStudentDashboard(userId) {
    await dbconnect();
    const [attempts, cases] = await Promise.all([
        CaseAttempt.find({ user: userId })
            .select("case status feedback.overallScore completedAt createdAt")
            .sort({ createdAt: -1 })
            .lean(),
        Case.find().select("title slug specialty difficulty isPublished").lean(),
    ]);

    const casesById = Object.fromEntries(cases.map((c) => [c._id.toString(), c]));
    const scored = attempts.filter((a) => a.status === "completed" && scoreOf(a) !== null);

    // Most recent attempt first, one entry per case, with the best score so far
    const attemptedCases = [];
    const seen = new Set();
    for (const attempt of attempts) {
        const id = attempt.case.toString();
        if (seen.has(id) || !casesById[id]) continue;
        seen.add(id);
        const scores = scored.filter((a) => a.case.toString() === id).map(scoreOf);
        attemptedCases.push({
            ...casesById[id],
            bestScore: scores.length ? Math.max(...scores) : null,
        });
    }

    const recommendedCases = cases
        .filter((c) => c.isPublished && !seen.has(c._id.toString()))
        .sort((a, b) => (DIFFICULTY_ORDER[a.difficulty] ?? 3) - (DIFFICULTY_ORDER[b.difficulty] ?? 3)
            || a.title.localeCompare(b.title));

    const recentResults = scored
        .filter((a) => casesById[a.case.toString()])
        .sort((a, b) => new Date(b.completedAt ?? 0) - new Date(a.completedAt ?? 0))
        .map((a) => ({
            attemptId: a._id.toString(),
            score: scoreOf(a),
            ...casesById[a.case.toString()],
        }));

    return JSON.parse(JSON.stringify({
        casesAttempted: seen.size,
        averageScore: average(scored.map(scoreOf)),
        totalSessions: attempts.length,
        recommendedCases: recommendedCases.slice(0, 3),
        attemptedCases: attemptedCases.slice(0, 3),
        recentResults: recentResults.slice(0, 3),
    }));
}

export async function getAdminOverview() {
    await dbconnect();
    const [students, cases, attempts] = await Promise.all([
        User.find({ role: { $ne: "admin" } }).select("_id").lean(),
        Case.find().select("title slug specialty difficulty duration isPublished").sort({ createdAt: -1 }).lean(),
        CaseAttempt.find().select("user case status feedback.overallScore").lean(),
    ]);

    const studentIds = new Set(students.map((s) => s._id.toString()));
    const studentAttempts = attempts.filter((a) => studentIds.has(a.user.toString()));
    const completed = studentAttempts.filter((a) => a.status === "completed");
    const scored = completed.filter((a) => scoreOf(a) !== null);

    // Students whose average score is below the threshold
    const scoresByStudent = {};
    for (const a of scored) {
        (scoresByStudent[a.user.toString()] ??= []).push(scoreOf(a));
    }
    const studentsAtRisk = Object.values(scoresByStudent)
        .filter((scores) => average(scores) < AT_RISK_SCORE).length;

    const caseRows = cases.map((c) => {
        const id = c._id.toString();
        const forCase = studentAttempts.filter((a) => a.case.toString() === id);
        return {
            ...c,
            attempts: forCase.length,
            completions: forCase.filter((a) => a.status === "completed").length,
            averageScore: average(forCase.map(scoreOf).filter((s) => s !== null)),
        };
    });

    return JSON.parse(JSON.stringify({
        totalStudents: students.length,
        studentsCompleted: new Set(completed.map((a) => a.user.toString())).size,
        averageScore: average(scored.map(scoreOf)),
        studentsAtRisk,
        atRiskThreshold: AT_RISK_SCORE,
        cases: caseRows,
    }));
}
