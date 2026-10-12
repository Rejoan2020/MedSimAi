import { dbconnect } from "@/lib/mongo";
import Case from "@/models/Case";

// Fields students may see; the rest of aiScenario must never reach the client
export const PUBLIC_CASE_FIELDS = "title description slug difficulty image features pdfUrl duration specialty aiScenario.patient.age";

function serialize(doc) {
    return JSON.parse(JSON.stringify(doc));
}

export async function getPublicCases() {
    await dbconnect();
    const cases = await Case.find({ isPublished: true }).select(PUBLIC_CASE_FIELDS).lean();
    return serialize(cases);
}

export async function getPublicCaseBySlug(slug, { includeDrafts = false } = {}) {
    await dbconnect();
    const filter = includeDrafts ? { slug } : { slug, isPublished: true };
    const cs = await Case.findOne(filter).select(`${PUBLIC_CASE_FIELDS} isPublished`).lean();
    return cs ? serialize(cs) : null;
}
