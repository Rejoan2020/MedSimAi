// Usage: npm run seed:demo (run seed-cases.mjs first)
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Keep in sync with DEMO_ACCOUNTS in lib/demo.js
const ACCOUNTS = [
    { email: "demo.student@medsimai.app", name: "Demo Student", role: "student" },
    { email: "demo.admin@medsimai.app", name: "Demo Admin", role: "admin" },
];

const password = process.env.DEMO_PASSWORD;
if (!password || password.length < 8) {
    console.error("Set DEMO_PASSWORD (at least 8 characters) in .env first.");
    process.exit(1);
}

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

const category = (score, description, performance, strengths, improvements, recommendations) => ({
    score,
    description,
    performance: performance.map(([section, sectionScore, details]) => ({ section, score: sectionScore, maxScore: 10, details })),
    strengths,
    improvements,
    recommendations,
});

const transcript = (startedAt, lines) =>
    lines.map(([role, content], i) => ({ _id: new mongoose.Types.ObjectId(), role, content, createdAt: new Date(startedAt + i * 50 * 1000) }));

const CHEST_PAIN_PLAN = `1. Introduce myself and confirm his name.
2. SOCRATES for the chest pain.
3. Ask about sweating, nausea and breathlessness.
4. Cardiac risk factors: smoking, diabetes, blood pressure, cholesterol, family history.
5. Medications and allergies.
6. Explain next steps (ECG, bloods) and check his concerns.`;

const CHEST_PAIN_CONFIDENCE = {
    "History taking": 4,
    "Clinical reasoning": 3,
    "Recognising red flags": 4,
    "Communicating with the patient": 4,
    "Forming a differential diagnosis": 3,
};

const ATTEMPTS = [
    {
        slug: "shortness-of-breath",
        daysAgo: 12,
        minutes: 9,
        notes: "Cough 3 days, green sputum, fevers.\nR-sided pleuritic pain.\nSOB on walking round house.",
        messages: [
            ["student", "Hi, I'm one of the medical students. Could you tell me your name and what's brought you in today?"],
            ["patient", "Tom Bennett. I've had this cough for about three days and now I'm really out of breath."],
            ["student", "I'm sorry to hear that. Are you bringing anything up when you cough?"],
            ["patient", "Yeah, it's yellowy-green. And I've been shivering, hot and cold all night."],
            ["student", "How far can you walk before you get breathless?"],
            ["patient", "Just walking round the house now. Normally I'm fine."],
            ["student", "Any chest pain?"],
            ["patient", "A sharp pain on the right side, worse when I breathe in deep or cough."],
            ["student", "Have you coughed up any blood, or noticed any swelling in your legs?"],
            ["patient", "No blood, no swelling."],
            ["student", "Okay. Do you have any medical problems or take any medicines?"],
            ["patient", "No, I'm normally healthy. Just paracetamol for the fever."],
            ["student", "Thank you, I'll let the doctor know and we'll get a chest X-ray."],
        ],
        feedback: {
            overallScore: 64,
            summary: "You quickly established a likely chest infection, but missed his penicillin allergy and smoking history, which change the management, and closed without explaining much.",
            consultation: category(68, "A focused history of the presenting complaint, but the background history was rushed.",
                [["Presenting complaint", 8, "Cough, sputum, fever and breathlessness were all explored."],
                 ["Past medical and drug history", 5, "Asked about medicines but not allergies."],
                 ["Social history", 3, "Smoking and occupation weren't asked about."]],
                ["Clear opening and open question", "Good characterisation of breathlessness and pleuritic pain"],
                ["Allergies weren't asked; he is allergic to penicillin", "No smoking history"],
                ["Always ask about allergies before antibiotics are likely", "Use a structured social history: smoking, alcohol, work, home"]),
            medicalKnowledge: category(63, "You recognised community-acquired pneumonia but didn't assess severity.",
                [["Differential diagnosis", 7, "Pneumonia was clearly considered; PE was briefly screened."],
                 ["Severity assessment", 4, "No questions about confusion or other severity markers."]],
                ["Screened for haemoptysis and leg swelling"],
                ["Assess severity (e.g. CURB-65 features)", "Consider sepsis red flags"],
                ["Practise a severity checklist for chest infections"]),
            communication: category(61, "Polite and clear, but the ending was abrupt and his concerns weren't explored.",
                [["Rapport", 7, "Friendly introduction and empathetic response."],
                 ["Explanation and closing", 4, "Little explanation of next steps; no chance for questions."]],
                ["Warm, empathetic opening"],
                ["Ask about his ideas, concerns and expectations", "Summarise and check understanding before closing"],
                ["End with a summary and 'Is there anything you'd like to ask?'"]),
        },
    },
    {
        slug: "acute-chest-pain",
        daysAgo: 9,
        minutes: 10,
        notes: "Central crushing pain 30 min, radiates L arm.\nSweaty, nauseous.\nSmoker.",
        messages: [
            ["student", "Hello, I'm a medical student. Can I take your name?"],
            ["patient", "Mohammad Rahman... sorry, it's this pain in my chest."],
            ["student", "I can see you're uncomfortable. When did it start?"],
            ["patient", "About half an hour ago. I was just sitting at home."],
            ["student", "Can you describe what it feels like?"],
            ["patient", "Heavy. Like something squeezing my chest."],
            ["student", "Does it go anywhere else?"],
            ["patient", "Down my left arm."],
            ["student", "Have you felt sweaty or sick?"],
            ["patient", "Yes, both. I've been sweating a lot."],
            ["student", "Do you smoke?"],
            ["patient", "Yes, about twenty a day."],
            ["student", "Okay, this could be your heart, so we'll get an ECG straight away."],
        ],
        feedback: {
            overallScore: 71,
            summary: "You recognised a likely heart attack quickly and acted on it. The history missed other risk factors and didn't screen for aortic dissection.",
            consultation: category(76, "A focused, well-paced history for an emergency, with some gaps in the background.",
                [["Presenting complaint", 9, "Onset, character, radiation and associated symptoms covered."],
                 ["Risk factors", 6, "Smoking asked; diabetes, blood pressure and family history missed."],
                 ["Medications and allergies", 4, "Not asked about."]],
                ["Recognised urgency and kept the history focused", "Good SOCRATES structure"],
                ["Complete the cardiovascular risk factor screen", "Ask about medications and allergies before treatment"],
                ["Memorise a quick risk-factor list for chest pain"]),
            medicalKnowledge: category(66, "Acute coronary syndrome was identified, but the differential was narrow.",
                [["Differential diagnosis", 6, "ACS considered; dissection and PE not explored."],
                 ["Red flags", 5, "Tearing pain and back radiation weren't asked about."]],
                ["Correctly prioritised an ECG"],
                ["Screen for aortic dissection before anticoagulation"],
                ["Run through the 'can't miss' chest pain causes every time"]),
            communication: category(71, "Calm and reassuring, although his worries weren't explored.",
                [["Rapport", 8, "Acknowledged his discomfort early."],
                 ["Ideas, concerns and expectations", 5, "His concerns weren't asked about."]],
                ["Acknowledged his pain and stayed calm"],
                ["Explain what the ECG is for", "Ask what he is most worried about"],
                ["Add a brief explanation whenever you order a test"]),
        },
    },
    {
        slug: "palpitations",
        daysAgo: 5,
        minutes: 10,
        notes: "Irregular palpitations 2 days, constant since am.\nAfter weekend drinking.\nHTN, T2DM. Father stroke.",
        messages: [
            ["student", "Good morning, I'm one of the medical students. What's brought you in today?"],
            ["patient", "My heart has been fluttering, quite irregular. It started two days ago."],
            ["student", "Is it there all the time, or does it come and go?"],
            ["patient", "It came and went at first, but it's been constant since this morning."],
            ["student", "Have you had any chest pain, breathlessness, or felt faint?"],
            ["patient", "No chest pain. I'm more breathless on the stairs, and I've felt lightheaded a few times."],
            ["student", "Any weakness in your face, arm or leg, or trouble speaking?"],
            ["patient", "No, nothing like that."],
            ["student", "Was anything going on before it started?"],
            ["patient", "We had a family celebration at the weekend. I probably drank more than usual."],
            ["student", "How much do you usually drink in a week?"],
            ["patient", "Oh, a few glasses of wine. Maybe a bit more."],
            ["student", "Do you have any medical conditions or take regular medication?"],
            ["patient", "High blood pressure and type 2 diabetes. I take amlodipine and metformin."],
            ["student", "Thank you. Does anyone in your family have heart problems or strokes?"],
            ["patient", "My father had a stroke in his seventies."],
            ["student", "That's helpful. This sounds like it could be atrial fibrillation. We'll do an ECG and talk about stroke prevention. Is there anything worrying you?"],
            ["patient", "Mainly whether I'll end up like my father."],
        ],
        feedback: {
            overallScore: 82,
            summary: "A thorough, well-structured consultation that identified likely atrial fibrillation and its stroke risk factors. Alcohol intake could have been quantified more precisely.",
            consultation: category(85, "Systematic and complete, with good coverage of the background history.",
                [["Presenting complaint", 9, "Onset, pattern and associated symptoms clearly established."],
                 ["Past medical and drug history", 9, "Conditions and medications both covered."],
                 ["Social history", 6, "Alcohol asked about but not quantified in units."]],
                ["Logical flow from symptoms to background", "Asked about the trigger"],
                ["Quantify alcohol intake in units"],
                ["When patients downplay drinking, ask about a typical week in detail"]),
            medicalKnowledge: category(80, "Recognised AF and screened for stroke well.",
                [["Differential diagnosis", 8, "AF identified; thyroid causes not screened."],
                 ["Red flags", 9, "Stroke symptoms and haemodynamic compromise were checked."]],
                ["Screened for stroke symptoms", "Linked his history to stroke risk"],
                ["Ask about thyroid symptoms"],
                ["Review CHA2DS2-VASc so you can explain stroke risk"]),
            communication: category(81, "Warm and clear, and you explored his main concern.",
                [["Rapport", 8, "Calm and respectful throughout."],
                 ["Ideas, concerns and expectations", 8, "Asked what was worrying him."]],
                ["Invited his concerns before closing"],
                ["Respond to his fear about his father's stroke"],
                ["After a concern is raised, acknowledge it before moving on"]),
        },
    },
    {
        slug: "acute-chest-pain",
        daysAgo: 2,
        minutes: 10,
        prep: { plan: CHEST_PAIN_PLAN, confidence: CHEST_PAIN_CONFIDENCE },
        notes: "Central heavy pain 30 min, L arm.\nSweaty + nausea.\nSmoker 20/day, HTN, father MI at 55.\nNo tearing/back pain.\nAspirin? -> no allergies.",
        messages: [
            ["student", "Hello, I'm one of the medical students working with the team. Can I confirm your name?"],
            ["patient", "Mohammad Rahman."],
            ["student", "Thank you, Mr Rahman. I can see you're in pain. Can you tell me what's happening?"],
            ["patient", "A heavy, squeezing pain in my chest. It started about half an hour ago."],
            ["student", "Does the pain spread anywhere?"],
            ["patient", "Into my left arm."],
            ["student", "Is it a tearing pain, or does it go through to your back?"],
            ["patient", "No, not my back. It's more like pressure."],
            ["student", "Have you felt sweaty, sick or short of breath?"],
            ["patient", "Sweaty and sick, yes."],
            ["student", "Do you have any medical conditions, like high blood pressure, diabetes or high cholesterol?"],
            ["patient", "High blood pressure. I take tablets for it."],
            ["student", "Do you smoke, and has anyone in your family had heart problems?"],
            ["patient", "Twenty a day. My father had a heart attack at fifty-five."],
            ["student", "Any allergies to medicines?"],
            ["patient", "No."],
            ["student", "Thank you. I'm worried this could be your heart, so we'll do an ECG and blood tests right away and give you something for the pain. What's going through your mind?"],
            ["patient", "I'm scared it's a heart attack, like my father."],
            ["student", "That's understandable. It could be, and that's why we're acting quickly. We'll keep you updated at every step."],
        ],
        feedback: {
            overallScore: 86,
            summary: "A big improvement: a complete, well-ordered history that covered risk factors and screened for aortic dissection, with a clear explanation and good response to his fear.",
            consultation: category(88, "Complete and efficient for an emergency presentation.",
                [["Presenting complaint", 9, "Character, onset, radiation and associated symptoms covered."],
                 ["Risk factors", 9, "Blood pressure, smoking and family history all established."],
                 ["Medications and allergies", 8, "Allergies checked; medication names not confirmed."]],
                ["Followed a clear structure", "Covered all key risk factors"],
                ["Confirm the names and doses of his blood pressure tablets"],
                ["Keep using a written plan; it showed in your structure"]),
            medicalKnowledge: category(84, "Good reasoning with appropriate red-flag screening.",
                [["Differential diagnosis", 8, "ACS prioritised; dissection actively excluded."],
                 ["Red flags", 9, "Tearing pain and back radiation asked about."]],
                ["Screened for aortic dissection", "Prioritised ECG and bloods"],
                ["Briefly consider PE in your differential"],
                ["Name your top three differentials when you summarise"]),
            communication: category(86, "Clear, honest and empathetic.",
                [["Rapport", 9, "Respectful and calm under time pressure."],
                 ["Ideas, concerns and expectations", 8, "Explored and acknowledged his fear."]],
                ["Explained next steps clearly", "Responded empathetically to his fear"],
                ["Check he understood the plan"],
                ["Finish with a quick check of understanding"]),
            planReview: {
                summary: "You followed almost all of your plan, and it gave the consultation a clear structure.",
                followed: ["Introduced yourself and confirmed his name", "Used SOCRATES for the pain", "Asked about sweating and nausea", "Covered cardiac risk factors", "Checked allergies", "Explained the ECG and bloods and asked about his concerns"],
                skipped: ["Medications weren't confirmed by name"],
                missing: ["Screening for aortic dissection (you did this anyway, but add it to your plan)"],
            },
        },
    },
];

await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
const users = db.collection("users");
const hash = await bcrypt.hash(password, 12);

const ids = {};
for (const account of ACCOUNTS) {
    const result = await users.findOneAndUpdate(
        { email: account.email },
        {
            $set: { name: account.name, role: account.role, password: hash, isDemo: true, updatedAt: new Date() },
            $setOnInsert: { email: account.email, createdAt: new Date(), __v: 0 },
        },
        { upsert: true, returnDocument: "after" }
    );
    ids[account.role] = (result?.value ?? result)._id;
    console.log(`ready   ${account.email} (${account.role})`);
}

const student = ids.student;
const attempts = db.collection("caseattempts");
const preps = db.collection("casepreps");
await Promise.all([attempts.deleteMany({ user: student }), preps.deleteMany({ user: student })]);

const cases = db.collection("cases");
let added = 0;
for (const a of ATTEMPTS) {
    const clinicalCase = await cases.findOne({ slug: a.slug }, { projection: { _id: 1 } });
    if (!clinicalCase) {
        console.log(`skipped ${a.slug} (case not found; run seed-cases.mjs)`);
        continue;
    }
    const startedAt = now - a.daysAgo * DAY;
    const completedAt = new Date(startedAt + a.minutes * 60 * 1000);
    await attempts.insertOne({
        user: student,
        case: clinicalCase._id,
        status: "completed",
        startedAt: new Date(startedAt),
        completedAt,
        notes: a.notes,
        messages: transcript(startedAt, a.messages),
        feedback: a.feedback,
        ...(a.prep && { prep: a.prep }),
        createdAt: new Date(startedAt),
        updatedAt: completedAt,
        __v: 0,
    });
    if (a.prep) {
        await preps.insertOne({ user: student, case: clinicalCase._id, ...a.prep, createdAt: new Date(startedAt - DAY), updatedAt: new Date(startedAt), __v: 0 });
    }
    added++;
}
console.log(`added   ${added} sample attempts for the demo student`);

await mongoose.disconnect();
