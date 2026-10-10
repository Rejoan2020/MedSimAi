// Usage: node --env-file=.env scripts/seed-content.mjs
// Moves the announcements and FAQ that used to be hard-coded into the database.
// Each collection is only seeded while it is empty, so it is safe to re-run.
import mongoose from "mongoose";

const announcements = [
    { title: "New Clinical Cases Available", description: "Three new clinical simulation cases have been added to the Respiratory and Cardiology modules.", type: "New Cases", publishedAt: "2026-08-24" },
    { title: "System Maintenance", description: "MedSimAI will undergo scheduled maintenance on August 28 from 2:00 AM to 4:00 AM.", type: "Maintenance", publishedAt: "2026-08-22" },
    { title: "Updated Simulation Feedback", description: "We have improved the AI feedback system to provide more detailed recommendations after each simulation.", type: "Update", publishedAt: "2026-08-20" },
    { title: "New Learning Path Available", description: "A new Emergency Medicine learning path is now available for students.", type: "Learning Path", publishedAt: "2026-08-18" },
];

const faqs = [
    { question: "What is MedSimAI?", answer: "MedSimAI is an AI-powered clinical simulation platform that allows medical students to practice patient consultations, history taking, clinical reasoning, and diagnosis in a simulated environment." },
    { question: "How do I start a clinical case?", answer: "Go to the Cases section, select a clinical case, and click Start Session. You will then enter the simulated consultation environment." },
    { question: "Can I attempt a case more than once?", answer: "Yes. You can attempt a clinical case multiple times. Each completed attempt is recorded separately so you can track your progress and compare your performance." },
    { question: "What happens if I stop a session?", answer: "When you click Stop Session, your attempt is completed and MedSimAI generates feedback on your consultation. You can start the case again later to make a new attempt." },
    { question: "How is my performance evaluated?", answer: "Your performance is evaluated based on factors such as history taking, clinical reasoning, questions asked, information gathered, diagnosis, and other case-specific criteria." },
    { question: "Can I see feedback after completing a case?", answer: "Yes. After completing a simulation, MedSimAI provides feedback highlighting your strengths, areas for improvement, and recommendations for future practice." },
    { question: "How long does a clinical session take?", answer: "The duration depends on the clinical case. Each case displays its expected duration before you start the session." },
    { question: "Who can access my performance data?", answer: "Your performance data is available to you and authorized members of your institution, such as instructors or administrators." },
];

await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
const now = new Date();

if (await db.collection("announcements").countDocuments() === 0) {
    await db.collection("announcements").insertMany(announcements.map((a) => ({
        ...a, publishedAt: new Date(a.publishedAt), isPublished: true, createdAt: now, updatedAt: now, __v: 0,
    })));
    console.log(`added   ${announcements.length} announcements`);
} else {
    console.log("exists  announcements (left unchanged)");
}

if (await db.collection("faqs").countDocuments() === 0) {
    await db.collection("faqs").insertMany(faqs.map((f, i) => ({
        ...f, order: i + 1, createdAt: now, updatedAt: now, __v: 0,
    })));
    console.log(`added   ${faqs.length} FAQ entries`);
} else {
    console.log("exists  FAQ entries (left unchanged)");
}

await mongoose.disconnect();
