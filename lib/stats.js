import { dbconnect } from "@/lib/mongo";
import Case from "@/models/Case";
import CaseAttempt from "@/models/CaseAttempt";
import User from "@/models/User";

const AT_RISK_SCORE = 60;

const DIFFICULTY_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 };

function average(numbers) {
    if (numbers.length === 0) return null;
    return Math.round(numbers.reduce((sum, n) => sum + n, 0) / numbers.length);
}

function scoreOf(attempt) {
    return attempt.feedback?.overallScore ?? null;
}

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
            .select("case status feedback.overallScore startedAt completedAt createdAt")
            .sort({ createdAt: -1 })
            .lean(),
        Case.find().select("title slug specialty difficulty isPublished").lean(),
    ]);

    const casesById = Object.fromEntries(cases.map((c) => [c._id.toString(), c]));
    const scored = attempts.filter((a) => a.status === "completed" && scoreOf(a) !== null);
    const seen = new Set(attempts.map((a) => a.case.toString()));

    const attemptNumber = {};
    const countByCase = {};
    for (const a of [...attempts].reverse()) {
        const id = a.case.toString();
        countByCase[id] = (countByCase[id] ?? 0) + 1;
        attemptNumber[a._id.toString()] = countByCase[id];
    }

    const inProgress = attempts
        .filter((a) => a.status === "started" && casesById[a.case.toString()])
        .map((a) => ({
            ...casesById[a.case.toString()],
            attemptId: a._id.toString(),
            attemptNumber: attemptNumber[a._id.toString()],
            startedAt: a.startedAt ?? a.createdAt,
        }));

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
        inProgress: inProgress.slice(0, 3),
        inProgressTotal: inProgress.length,
        recentResults: recentResults.slice(0, 3),
    }));
}

export async function getStudentAttempts(userId, { caseId } = {}) {
    await dbconnect();
    const [attempts, cases] = await Promise.all([
        CaseAttempt.find({ user: userId })
            .select("case status feedback.overallScore startedAt completedAt createdAt messages")
            .sort({ createdAt: 1 })
            .lean(),
        Case.find().select("title slug specialty difficulty").lean(),
    ]);

    const casesById = Object.fromEntries(cases.map((c) => [c._id.toString(), c]));
    const countByCase = {};

    const rows = attempts
        .filter((a) => casesById[a.case.toString()])
        .map((a) => {
            const id = a.case.toString();
            countByCase[id] = (countByCase[id] ?? 0) + 1;
            const c = casesById[id];
            return {
                attemptId: a._id.toString(),
                caseId: id,
                attemptNumber: countByCase[id],
                title: c.title,
                slug: c.slug,
                specialty: c.specialty,
                difficulty: c.difficulty,
                status: a.status,
                score: scoreOf(a),
                questionsAsked: (a.messages ?? []).filter((m) => m.role === "student").length,
                startedAt: a.startedAt ?? a.createdAt,
                completedAt: a.completedAt ?? null,
            };
        })
        .filter((row) => !caseId || row.caseId === caseId.toString())
        .reverse();

    return JSON.parse(JSON.stringify(rows));
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
