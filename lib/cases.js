import { dbconnect } from "@/lib/mongo";
import Case from "@/models/Case";

// Fields students may see. The rest of aiScenario (diagnosis, expected questions,
// hidden history) must never reach the client; only the patient's age is
// exposed, for the Adult/Pediatric badge.
export const PUBLIC_CASE_FIELDS = "title description slug difficulty image features pdfUrl duration specialty aiScenario.patient.age";

// Converts ObjectIds/Dates into plain values so results can be passed to client components.
function serialize(doc) {
    return JSON.parse(JSON.stringify(doc));
}

// Only published cases are listed for students
export async function getPublicCases() {
    await dbconnect();
    const cases = await Case.find({ isPublished: true }).select(PUBLIC_CASE_FIELDS).lean();
    return serialize(cases);
}

// includeDrafts lets admins preview unpublished cases
export async function getPublicCaseBySlug(slug, { includeDrafts = false } = {}) {
    await dbconnect();
    const filter = includeDrafts ? { slug } : { slug, isPublished: true };
    const cs = await Case.findOne(filter).select(`${PUBLIC_CASE_FIELDS} isPublished`).lean();
    return cs ? serialize(cs) : null;
}
