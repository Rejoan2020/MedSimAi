'use client'
import { useState } from 'react';
import Consultation from './Consultation';
import MedicalKnowledge from './MedicalKnowledge';
import Communication from './Communication';
import SelfReflection from './SelfReflection';

const selfReflectionQuestions = [
    "What do you think you did well during this consultation?",
    "What would you do differently if you repeated this consultation?",
    "Which part of the consultation did you find most challenging?",
    "What is the main thing you learned from this case?",
];

export default function Feedback({ feedback, messages = [], notes = "" }) {
    const [activeTab, setActiveTab] = useState('AI Feedback');
    const tabs = ['Tutor feedback', 'AI Feedback', 'Session Recording', 'Self Reflection'];
    const { overallScore, consultation, medicalKnowledge, communication, summary } = feedback;

    return (
        <div className='w-full flex flex-col justify-start items-center min-h-screen p-8 gap-4 bg-gray-100 min-w-200'>
            <div className='grid grid-cols-4 w-full max-w-350 bg-white rounded-lg '>
                {tabs.map((tab, idx) =>
                    <button
                        key={idx}
                        className={`border-x border-gray-200 hover:bg-light-blue hover:text-white ${activeTab === tab ? 'bg-light-blue text-white' : ''} flex justify-center py-2 cursor-pointer`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                )}
            </div>
            {activeTab === 'Tutor feedback' &&
                <div className='flex flex-col w-full max-w-350 bg-white p-4 text-Secondary-Text'>
                    Your tutor hasn&apos;t reviewed this session yet.
                </div>}

            {activeTab === 'AI Feedback' && <>
                <div className='flex flex-col gap-2 w-full max-w-350 bg-white rounded-lg p-4'>
                    <div className='text-[24px] text-green-500'>{overallScore}/100</div>
                    {summary && <div>{summary}</div>}
                </div>
                <Consultation consultation={consultation} />
                <MedicalKnowledge medicalKnowledge={medicalKnowledge} />
                <Communication communication={communication} /></>}

            {activeTab === 'Session Recording' &&
                <div className='flex flex-col gap-3 w-full max-w-350 bg-white p-4'>
                    {messages.length === 0
                        ? <div className='text-Secondary-Text'>No messages were exchanged in this session.</div>
                        : messages.map((msg, idx) =>
                            <div key={idx}>
                                <span className='font-semibold text-deep-blue'>
                                    {msg.role === 'student' ? 'You' : 'Patient'}:
                                </span>{' '}
                                {msg.content}
                            </div>
                        )}
                    {notes &&
                        <div className='mt-4 border-t border-gray-200 pt-4'>
                            <div className='font-semibold text-deep-blue'>Your notes</div>
                            <div className='whitespace-pre-wrap'>{notes}</div>
                        </div>}
                </div>}
            {activeTab === 'Self Reflection' && selfReflectionQuestions.map((question, idx) => <SelfReflection key={idx} question={question} />)}

        </div>
    )
}
