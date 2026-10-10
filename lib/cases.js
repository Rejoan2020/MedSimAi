import { dbconnect } from "@/lib/mongo";
import Case from "@/models/Case";

// Fields students may see. aiScenario (diagnosis, expected questions,
// hidden history) must never reach the client.
export const PUBLIC_CASE_FIELDS = "title description slug difficulty image features pdfUrl duration specialty completedBy";

// Converts ObjectIds/Dates into plain values so results can be passed to client components.
function serialize(doc) {
    return JSON.parse(JSON.stringify(doc));
}

export async function getPublicCases() {
    await dbconnect();
    const cases = await Case.find().select(PUBLIC_CASE_FIELDS).lean();
    return serialize(cases);
}

export async function getPublicCaseBySlug(slug) {
    await dbconnect();
    const cs = await Case.findOne({ slug }).select(PUBLIC_CASE_FIELDS).lean();
    return cs ? serialize(cs) : null;
}
