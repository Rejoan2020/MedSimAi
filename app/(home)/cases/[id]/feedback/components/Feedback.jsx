'use client'
import { act, useState } from 'react';
import Block from '../components/Block'
import Details from './Details';
import Consultation from './Consultation';
import MedicalKnowledge from './MedicalKnowledge';
import Communication from './Communication';
import SelfReflection from './SelfReflection';

export default function Feedback({ feedback }) {
    const [activeTab, setActiveTab] = useState('Tutor feedback');
    const tabs = ['Tutor feedback', 'AI Feedback', 'Session Recording', 'Self Reflection'];
    const { overallScore, consultation, medicalKnowledge, communication, summary } = feedback;
    const selfReflection = {

        questions: [
            {
                question:
                    "What do you think you did well during this consultation?",
                answer:
                    "I think I did well in identifying the patient's main complaint and asking follow-up questions about the shortness of breath."
            },
            {
                question:
                    "What would you do differently if you repeated this consultation?",
                answer:
                    "I would ask more questions about the patient's previous medical history, medications, smoking history, and family history."
            },
            {
                question:
                    "Which part of the consultation did you find most challenging?",
                answer:
                    "The most challenging part was deciding which questions were most important to ask while keeping the consultation focused."
            },
            {
                question:
                    "What is the main thing you learned from this case?",
                answer:
                    "I learned that a systematic approach to history taking is important because it helps prevent missing clinically important risk factors."
            }
        ]
    };
    return (
        <div className='w-full flex flex-col justify-start items-center min-h-screen p-8 gap-4 bg-gray-100 min-w-200'>
            {/* <div className='flex gap-2 w-full max-w-350'>
                {Array.from({ length: 4 }, (val, idx) => <Tab key={idx} number={idx + 1} title={'Consultation'} />)}
            </div> */}
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
                <div className='flex flex-col w-full max-w-350 bg-white min-h-screen p-4'>
                    <div className='text-[24px] text-green-500'>84/100</div>
                    You conducted a good consultation and demonstrated a structured approach to history taking. You identified most of the important symptoms, but there were a few opportunities to explore the patient's risk factors and clinical history in greater depth."
                </div>}

            {activeTab === 'AI Feedback' && <><Consultation consultation={consultation} />
                <MedicalKnowledge medicalKnowledge={medicalKnowledge} />
                <Communication communication={communication} /></>}

            {activeTab === 'Session Recording' &&
                <div className='flex w-full max-w-350 bg-white min-h-screen p-4'>
                    <div className='text-light-blue px-2'>Click here </div> to Download the full session.
                </div>}
            {activeTab === 'Self Reflection' && selfReflection.questions.map((item, idx) => <SelfReflection key={idx} question={item.question} answer={item.answer} />)}

        </div>
    )
}
