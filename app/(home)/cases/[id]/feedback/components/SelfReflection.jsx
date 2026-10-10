import React from 'react'

export default function SelfReflection({ question, answer }) {

    return (
        <div className='flex flex-col w-full max-w-350 bg-white  p-4'>
            <div className='flex w-full font-bold text-deep-blue'>
                Question: {question}
            </div>
            {answer
                ? <div className='flex w-full text-green-900'>Answer: {answer}</div>
                : <div className='flex w-full text-Secondary-Text'>Not answered yet.</div>}
        </div>
    )
}
