'use client'

import { useState } from 'react'
import { ChevronDown, CircleAlert, CircleCheck, CircleX, ClipboardList } from 'lucide-react'
import { IconTile } from './ui'

function PointList({ icon: Icon, iconClass, title, points, empty }) {
    return (
        <div>
            <h3 className='pb-2 text-sm font-semibold'>{title}</h3>
            {points.length === 0
                ? <p className='text-sm text-Secondary-Text'>{empty}</p>
                : <ul className='flex flex-col gap-2'>
                    {points.map((point, idx) =>
                        <li key={idx} className='flex gap-2 text-sm'>
                            <Icon className={`h-5 w-5 shrink-0 ${iconClass}`} />
                            <span className='text-Secondary-Text'>{point}</span>
                        </li>)}
                </ul>}
        </div>
    )
}

// The plan the student wrote before this attempt, and how the consultation compared with it
export default function PlanReview({ plan, review }) {
    const [showPlan, setShowPlan] = useState(false)

    return (
        <section className='rounded-2xl border border-brand-secondary bg-white p-4 sm:p-6'>
            <div className='flex flex-wrap items-end justify-between gap-3'>
                <div className='flex items-center gap-3'>
                    <IconTile icon={ClipboardList} />
                    <div>
                        <div className='eyebrow'>Consultation plan</div>
                        <h2 className='mt-0.5 text-lg font-bold leading-tight'>Your plan vs. what you did</h2>
                    </div>
                </div>
                <button
                    type='button'
                    onClick={() => setShowPlan((v) => !v)}
                    aria-expanded={showPlan}
                    className='flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-brand-secondary hover:bg-brand-primary cursor-pointer'
                >
                    {showPlan ? 'Hide your plan' : 'Show your plan'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showPlan ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {showPlan &&
                <p className='mt-4 whitespace-pre-wrap rounded-xl bg-brand-primary/60 p-4 text-sm leading-6'>{plan}</p>}

            {review
                ? <>
                    {review.summary && <p className='mt-4 text-gray-700'>{review.summary}</p>}
                    <div className='mt-5 grid gap-6 md:grid-cols-3'>
                        <PointList icon={CircleCheck} iconClass='text-green-600' title='Planned and done' points={review.followed} empty='None of the planned points were carried out.' />
                        <PointList icon={CircleX} iconClass='text-red-500' title='Planned but skipped' points={review.skipped} empty='You followed your whole plan.' />
                        <PointList icon={CircleAlert} iconClass='text-amber-500' title='Missing from your plan' points={review.missing} empty='Your plan covered the important points.' />
                    </div>
                </>
                : <p className='mt-4 text-sm text-Secondary-Text'>
                    This attempt&apos;s feedback was generated before plan reviews were added, so only your plan is shown.
                </p>}
        </section>
    )
}
