'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const questions = [
    {
        id: 1,
        question: 'What is MedSimAI?',
        answer:
            'MedSimAI is an AI-powered clinical simulation platform that allows medical students to practice patient consultations, history taking, clinical reasoning, and diagnosis in a simulated environment.',
    },
    {
        id: 2,
        question: 'How do I start a clinical case?',
        answer:
            'Go to the Cases section, select a clinical case, and click Start Session. You will then enter the simulated consultation environment.',
    },
    {
        id: 3,
        question: 'Can I attempt a case more than once?',
        answer:
            'Yes. You can attempt a clinical case multiple times. Each completed attempt is recorded separately so you can track your progress and compare your performance.',
    },
    {
        id: 4,
        question: 'What happens if I stop a session?',
        answer:
            'If you explicitly stop a session before completing it, the attempt will be marked as abandoned. You can start the case again later and create a new attempt.',
    },
    {
        id: 5,
        question: 'How is my performance evaluated?',
        answer:
            'Your performance is evaluated based on factors such as history taking, clinical reasoning, questions asked, information gathered, diagnosis, and other case-specific criteria.',
    },
    {
        id: 6,
        question: 'Can I see feedback after completing a case?',
        answer:
            'Yes. After completing a simulation, MedSimAI provides feedback highlighting your strengths, areas for improvement, and recommendations for future practice.',
    },
    {
        id: 7,
        question: 'How long does a clinical session take?',
        answer:
            'The duration depends on the clinical case. Each case displays its expected duration before you start the session.',
    },
    {
        id: 8,
        question: 'Who can access my performance data?',
        answer:
            'Your performance data is available to you and authorized members of your institution, such as instructors or administrators.',
    },
]

export default function FAQ() {
    const [openId, setOpenId] = useState(null)

    const toggleQuestion = (id) => {
        setOpenId((current) =>
            current === id ? null : id
        )
    }

    return (
        <div className="flex flex-col gap-3">

            {questions.map((item) => {
                const isOpen = openId === item.id

                return (
                    <div
                        key={item.id}
                        className={`overflow-hidden rounded-xl border bg-white transition ${
                            isOpen
                                ? 'border-light-blue/40'
                                : 'border-gray-200'
                        }`}
                    >

                        {/* Question */}
                        <button
                            type="button"
                            onClick={() => toggleQuestion(item.id)}
                            className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                        >

                            <span className="text-sm font-medium text-gray-900">
                                {item.question}
                            </span>

                            <ChevronDown
                                className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${
                                    isOpen ? 'rotate-180 text-light-blue' : ''
                                }`}
                            />

                        </button>


                        {/* Answer */}
                        {isOpen && (
                            <div className="border-t border-gray-100 px-6 py-5">
                                <p className="text-sm leading-6 text-gray-600">
                                    {item.answer}
                                </p>
                            </div>
                        )}

                    </div>
                )
            })}

        </div>
    )
}