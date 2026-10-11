'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, GraduationCap, MessageCircleHeart, NotebookPen, ScrollText, Sparkles, Stethoscope } from 'lucide-react';
import CategoryCard from './CategoryCard';
import PlanReview from './PlanReview';
import ConfidenceCheck from './ConfidenceCheck';
import SelfReflection from './SelfReflection';
import { PageContainer } from '@/app/components/PageHeader';
import { ScoreRing, scoreBand } from './ui';

const selfReflectionQuestions = [
    "What do you think you did well during this consultation?",
    "What would you do differently if you repeated this consultation?",
    "Which part of the consultation did you find most challenging?",
    "What is the main thing you learned from this case?",
];

const TABS = [
    { name: 'AI Feedback', short: 'AI Feedback', icon: Sparkles },
    { name: 'Session Recording', short: 'Recording', icon: ScrollText },
    { name: 'Self Reflection', short: 'Reflection', icon: NotebookPen },
    { name: 'Tutor feedback', short: 'Tutor', icon: GraduationCap },
];

// The three scored categories, in the order they're shown
const CATEGORIES = [
    { id: 'consultation', key: 'consultation', title: 'Consultation', subtitle: 'History taking, structure and coverage', icon: Stethoscope },
    { id: 'clinical-reasoning', key: 'medicalKnowledge', title: 'Clinical Reasoning', subtitle: 'Differentials, red flags and next steps', icon: BrainCircuit },
    { id: 'communication', key: 'communication', title: 'Communication', subtitle: 'Rapport, empathy and clear language', icon: MessageCircleHeart },
];
const panelClass = 'rounded-2xl border border-brand-secondary bg-white p-4 sm:p-6';

export default function Feedback({ feedback, messages = [], notes = "", caseTitle, caseSlug, plan = "", planReview = null, confidenceRows = [] }) {
    const [activeTab, setActiveTab] = useState('AI Feedback');
    // Category cards start collapsed; each opens independently
    const [openSections, setOpenSections] = useState({});
    const toggleSection = (id) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
    const { overallScore, summary } = feedback;

    return (
        <PageContainer>
            <div className='flex flex-col gap-1'>
                {caseSlug &&
                    <Link href={`/cases/${caseSlug}`} className='inline-flex w-fit items-center gap-1 text-sm text-Secondary-Text hover:text-deep-blue'>
                        <ArrowLeft className='h-4 w-4' /> Back to case
                    </Link>}
                <div className='eyebrow mt-2'>Results</div>
                <h1 className='text-2xl font-bold sm:text-3xl'>Session feedback</h1>
                {caseTitle && <p className='text-Secondary-Text'>{caseTitle}</p>}
            </div>

            <div role='tablist' className='grid grid-cols-2 gap-1 rounded-2xl border border-brand-secondary bg-white p-1 sm:grid-cols-4'>
                {TABS.map(({ name, short, icon: Icon }) =>
                    <button
                        key={name}
                        role='tab'
                        aria-selected={activeTab === name}
                        className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer ${activeTab === name ? 'bg-light-blue text-white shadow-sm' : 'text-gray-700 hover:bg-brand-primary'}`}
                        onClick={() => setActiveTab(name)}
                    >
                        <Icon className='h-4 w-4 shrink-0' aria-hidden />
                        <span className='sm:hidden'>{short}</span>
                        <span className='hidden sm:inline'>{name}</span>
                    </button>
                )}
            </div>

            {activeTab === 'AI Feedback' && <>
                <section aria-label='Overall score' className='relative overflow-hidden rounded-3xl border border-brand-secondary bg-gradient-to-br from-white via-[#F4F8FC] to-brand-primary p-5 sm:p-8'>
                    <div aria-hidden className='pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-light-blue/10 blur-3xl' />
                    <div className='relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10'>
                        <div className='flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left lg:flex-1'>
                            <ScoreRing score={overallScore} size='lg' />
                            <div className='min-w-0'>
                                <div className='eyebrow'>Overall score</div>
                                <div className='mt-1 text-2xl font-bold text-deep-blue'>{scoreBand(overallScore).label}</div>
                                {summary && <p className='mt-2 leading-relaxed text-gray-700'>{summary}</p>}
                            </div>
                        </div>

                        <nav aria-label='Score breakdown' className='grid gap-2 sm:grid-cols-3 lg:w-80 lg:grid-cols-1'>
                            {CATEGORIES.map(({ id, key, title, icon: Icon }) =>
                                <a key={id} href={`#${id}`} onClick={() => setOpenSections((prev) => ({ ...prev, [id]: true }))} className='flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2.5 ring-1 ring-brand-secondary transition hover:bg-white hover:shadow-sm'>
                                    <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary'>
                                        <Icon className='h-4 w-4 text-light-blue' aria-hidden />
                                    </span>
                                    <span className='min-w-0 flex-1 truncate text-sm font-medium text-deep-blue'>{title}</span>
                                    <span className='text-lg font-bold' style={{ color: scoreBand(feedback[key].score).color }}>{feedback[key].score}</span>
                                </a>)}
                        </nav>
                    </div>
                </section>

                {CATEGORIES.map(({ id, key, title, subtitle, icon }) =>
                    <CategoryCard key={id} id={id} title={title} subtitle={subtitle} icon={icon} category={feedback[key]}
                        open={!!openSections[id]} onToggle={() => toggleSection(id)} />)}
                {plan && <PlanReview plan={plan} review={planReview} />}
                {confidenceRows.length > 0 && <ConfidenceCheck rows={confidenceRows} />}
            </>}

            {activeTab === 'Session Recording' &&
                <div className={`${panelClass} flex flex-col gap-3`}>
                    {messages.length === 0
                        ? <div className='text-Secondary-Text'>No messages were exchanged in this session.</div>
                        : messages.map((msg, idx) =>
                            <div key={idx} className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm sm:max-w-[75%] ${msg.role === 'student' ? 'rounded-br-sm bg-light-blue text-white' : 'rounded-bl-sm bg-gray-100 text-gray-800'}`}>
                                    <div className='pb-0.5 text-xs opacity-70'>{msg.role === 'student' ? 'You' : 'Patient'}</div>
                                    {msg.content}
                                </div>
                            </div>
                        )}
                    {notes &&
                        <div className='mt-2 border-t border-gray-200 pt-4'>
                            <div className='font-semibold text-deep-blue'>Your notes</div>
                            <div className='whitespace-pre-wrap text-gray-700'>{notes}</div>
                        </div>}
                </div>}

            {activeTab === 'Self Reflection' &&
                <div className='flex flex-col gap-3'>
                    {selfReflectionQuestions.map((question, idx) => <SelfReflection key={idx} question={question} />)}
                </div>}

            {activeTab === 'Tutor feedback' &&
                <div className={`${panelClass} text-Secondary-Text`}>
                    Your tutor hasn&apos;t reviewed this session yet.
                </div>}
        </PageContainer>
    )
}
