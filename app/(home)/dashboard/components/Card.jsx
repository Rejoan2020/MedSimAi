import React from 'react'

export default function Card({ title, number, icon: Icon }) {
    return (
        <div className='rounded-xl border border-gray-200 bg-white p-5'>
            <div className='flex items-center justify-between gap-2 text-sm text-Secondary-Text'>
                <div>{title}</div>
                <Icon className='h-5 w-5 text-light-blue' />
            </div>
            <div className='mt-2 text-3xl font-semibold text-[#2536A8] sm:text-4xl'>{number}</div>
        </div>
    )
}
