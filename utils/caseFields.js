export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
export const GENDERS = ["Male", "Female", "Other"];

export const LIST_FIELDS = [
    "features",
    "aiScenario.clinicalData.symptoms.present",
    "aiScenario.clinicalData.symptoms.absent",
    "aiScenario.clinicalData.pastMedicalHistory",
    "aiScenario.clinicalData.medications",
    "aiScenario.clinicalData.allergies",
    "aiScenario.clinicalData.familyHistory",
    "aiScenario.examination.findings",
    "aiScenario.diagnosis.differentials",
    "aiScenario.evaluation.expectedQuestions",
    "aiScenario.evaluation.criticalFindings",
];

export const NUMBER_FIELDS = [
    "durationMinutes",
    "aiScenario.patient.age",
    "aiScenario.examination.vitals.temperature",
    "aiScenario.examination.vitals.heartRate",
    "aiScenario.examination.vitals.respiratoryRate",
    "aiScenario.examination.vitals.oxygenSaturation",
];

export const BOOLEAN_FIELDS = [
    "isPublished",
    "aiScenario.behavior.revealInformationOnlyWhenAsked",
    "aiScenario.behavior.revealDiagnosis",
    "aiScenario.behavior.useMedicalTerminology",
];

export const TEXT_FIELDS = [
    "title",
    "description",
    "difficulty",
    "specialty",
    "image",
    "pdfUrl",
    "aiScenario.patient.name",
    "aiScenario.patient.gender",
    "aiScenario.patient.occupation",
    "aiScenario.patient.personality",
    "aiScenario.clinicalData.historyOfPresentIllness",
    "aiScenario.clinicalData.socialHistory.smoking",
    "aiScenario.clinicalData.socialHistory.alcohol",
    "aiScenario.clinicalData.socialHistory.occupation",
    "aiScenario.behavior.communicationStyle",
    "aiScenario.behavior.emotionalState",
    "aiScenario.examination.generalAppearance",
    "aiScenario.examination.vitals.bloodPressure",
    "aiScenario.diagnosis.primary",
];

export const REQUIRED_FIELDS = ["title", "description", "difficulty", "durationMinutes", "aiScenario.diagnosis.primary"];

const ALL_FIELDS = [...LIST_FIELDS, ...NUMBER_FIELDS, ...BOOLEAN_FIELDS, ...TEXT_FIELDS];

function getPath(obj, path) {
    return path.split(".").reduce((value, key) => value?.[key], obj);
}

function setPath(obj, path, value) {
    const keys = path.split(".");
    let target = obj;
    for (const key of keys.slice(0, -1)) {
        target = target[key] ??= {};
    }
    target[keys.at(-1)] = value;
}

export function caseToForm(caseDoc = {}) {
    const values = {};
    for (const field of ALL_FIELDS) {
        const value = field === "durationMinutes"
            ? parseInt(caseDoc.duration, 10)
            : getPath(caseDoc, field);

        if (LIST_FIELDS.includes(field)) values[field] = (value ?? []).join("\n");
        else if (BOOLEAN_FIELDS.includes(field)) values[field] = Boolean(value);
        else values[field] = value == null || Number.isNaN(value) ? "" : String(value);
    }

    if (!caseDoc._id) {
        values.difficulty = "Beginner";
        values.durationMinutes = "10";
        values["aiScenario.patient.gender"] = "Male";
        values["aiScenario.behavior.revealInformationOnlyWhenAsked"] = true;
    }
    return values;
}

export function formToCase(values) {
    const data = {};
    const cleared = [];

    for (const field of ALL_FIELDS) {
        const raw = values?.[field];

        if (LIST_FIELDS.includes(field)) {
            const items = String(raw ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
            setPath(data, field, items);
        } else if (BOOLEAN_FIELDS.includes(field)) {
            setPath(data, field, raw === true);
        } else if (NUMBER_FIELDS.includes(field)) {
            const text = String(raw ?? "").trim();
            if (text === "") { cleared.push(field); continue; }
            const number = Number(text);
            if (!Number.isFinite(number) || number < 0) return { error: `${field} must be a positive number.` };
            setPath(data, field, number);
        } else {
            setPath(data, field, String(raw ?? "").trim());
        }
    }

    for (const field of REQUIRED_FIELDS) {
        const value = getPath(data, field);
        if (value === undefined || value === "") return { error: "Please fill in all required fields." };
    }
    if (!DIFFICULTIES.includes(data.difficulty)) return { error: "Invalid difficulty." };

    const gender = data.aiScenario.patient.gender;
    if (gender && !GENDERS.includes(gender)) return { error: "Invalid patient gender." };
    if (!gender) delete data.aiScenario.patient.gender;

    data.duration = `${Math.round(data.durationMinutes)} minutes`;
    delete data.durationMinutes;

    const $set = { duration: data.duration };
    for (const field of ALL_FIELDS) {
        const value = getPath(data, field);
        if (value !== undefined) $set[field] = value;
    }
    const $unset = Object.fromEntries(
        [...cleared, ...(data.aiScenario.patient.gender ? [] : ["aiScenario.patient.gender"])].map((f) => [f, ""])
    );

    return { data, update: { $set, $unset } };
}
