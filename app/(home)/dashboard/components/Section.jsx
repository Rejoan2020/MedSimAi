import React from 'react'

// A titled white card used for each dashboard list
export default function Section({ title, icon: Icon, action, children }) {
    return (
        <section className='flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:p-6'>
            <div className='flex items-center justify-between gap-4'>
                <h2 className='flex items-center gap-2 text-lg font-semibold'>
                    {Icon && <Icon className='h-5 w-5 text-light-blue' />}
                    {title}
                </h2>
                {action}
            </div>
            {children}
        </section>
    )
}
