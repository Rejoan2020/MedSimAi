import { dbconnect } from "@/lib/mongo";
import Announcement from "@/models/Announcement";
import Faq from "@/models/Faq";
import User from "@/models/User";
import CaseAttempt from "@/models/CaseAttempt";

function serialize(doc) {
    return JSON.parse(JSON.stringify(doc));
}

export async function getAnnouncements({ includeHidden = false } = {}) {
    await dbconnect();
    const filter = includeHidden ? {} : { isPublished: true };
    return serialize(await Announcement.find(filter).sort({ publishedAt: -1 }).lean());
}

export async function getFaqs() {
    await dbconnect();
    return serialize(await Faq.find().sort({ order: 1, createdAt: 1 }).lean());
}

export async function getUsersWithStats() {
    await dbconnect();
    const [users, stats] = await Promise.all([
        User.find().select("name email role isDemo createdAt").sort({ createdAt: 1 }).lean(),
        CaseAttempt.aggregate([
            {
                $group: {
                    _id: "$user",
                    attempts: { $sum: 1 },
                    averageScore: { $avg: "$feedback.overallScore" },
                },
            },
        ]),
    ]);

    const statsByUser = Object.fromEntries(stats.map((s) => [s._id.toString(), s]));
    return serialize(users.map((user) => {
        const s = statsByUser[user._id.toString()];
        return {
            ...user,
            role: user.role ?? "student",
            attempts: s?.attempts ?? 0,
            averageScore: s?.averageScore == null ? null : Math.round(s.averageScore),
        };
    }));
}
