'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CategoryCard from './CategoryCard';
import SelfReflection from './SelfReflection';
import { PageContainer } from '@/app/components/PageHeader';

const selfReflectionQuestions = [
    "What do you think you did well during this consultation?",
    "What would you do differently if you repeated this consultation?",
    "Which part of the consultation did you find most challenging?",
    "What is the main thing you learned from this case?",
];

const TABS = ['AI Feedback', 'Session Recording', 'Self Reflection', 'Tutor feedback'];
const panelClass = 'rounded-2xl border border-brand-secondary bg-white p-4 sm:p-6';

export default function Feedback({ feedback, messages = [], notes = "", caseTitle, caseSlug }) {
    const [activeTab, setActiveTab] = useState('AI Feedback');
    const { overallScore, consultation, medicalKnowledge, communication, summary } = feedback;

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
                {TABS.map((tab) =>
                    <button
                        key={tab}
                        role='tab'
                        aria-selected={activeTab === tab}
                        className={`rounded-lg px-3 py-2 text-sm font-medium cursor-pointer ${activeTab === tab ? 'bg-light-blue text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                )}
            </div>

            {activeTab === 'AI Feedback' && <>
                <div className={`${panelClass} flex flex-col gap-2`}>
                    <div className='text-sm text-Secondary-Text'>Overall score</div>
                    <div className='text-3xl font-semibold text-green-600'>{overallScore}<span className='text-lg text-Secondary-Text'>/100</span></div>
                    {summary && <p className='text-gray-700'>{summary}</p>}
                </div>
                <CategoryCard title='Consultation' category={consultation} />
                <CategoryCard title='Clinical Reasoning' category={medicalKnowledge} />
                <CategoryCard title='Communication' category={communication} />
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
