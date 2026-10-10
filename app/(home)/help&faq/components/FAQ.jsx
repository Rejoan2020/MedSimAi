'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'



export default function FAQ({ questions }) {
    const [openId, setOpenId] = useState(null)

    const toggleQuestion = (id) => {
        setOpenId((current) =>
            current === id ? null : id
        )
    }

    return (
        <div className="flex flex-col gap-3">

            {questions.length === 0 && (
                <p className="text-sm text-Secondary-Text">No questions have been added yet.</p>
            )}

            {questions.map((item) => {
                const isOpen = openId === item._id

                return (
                    <div
                        key={item._id}
                        className={`overflow-hidden rounded-xl border bg-white transition ${
                            isOpen
                                ? 'border-light-blue/40'
                                : 'border-gray-200'
                        }`}
                    >

                        {/* Question */}
                        <button
                            type="button"
                            onClick={() => toggleQuestion(item._id)}
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