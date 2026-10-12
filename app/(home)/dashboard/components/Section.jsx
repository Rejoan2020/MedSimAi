import React from 'react'

export default function Section({ eyebrow, title, action, children }) {
    return (
        <section className='flex min-w-0 flex-col gap-4 rounded-2xl border border-brand-secondary bg-white p-5 sm:p-6'>
            <div className='flex items-end justify-between gap-4'>
                <div>
                    {eyebrow && <div className='eyebrow'>{eyebrow}</div>}
                    <h2 className='mt-0.5 text-xl font-bold'>{title}</h2>
                </div>
                {action}
            </div>
            <div className='flex flex-col gap-3'>{children}</div>
        </section>
    )
}
