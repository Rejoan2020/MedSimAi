import React from 'react'

export default function SelfReflection({ question, answer }) {

    return (
        <div className='flex flex-col gap-1 rounded-2xl border border-brand-secondary bg-white p-4 sm:p-6'>
            <div className='font-semibold text-deep-blue'>{question}</div>
            {answer
                ? <div className='text-green-900'>{answer}</div>
                : <div className='text-sm text-Secondary-Text'>Not answered yet.</div>}
        </div>
    )
}
