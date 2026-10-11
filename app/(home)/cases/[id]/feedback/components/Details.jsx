import React from 'react'
import { CircleCheck, Lightbulb, MoveUpRight, ThumbsUp, TrendingUp } from 'lucide-react'

function PointPanel({ icon: Icon, title, points, itemIcon: ItemIcon, panelClass, iconClass }) {
    return (
        <div className={`rounded-xl p-4 ${panelClass}`}>
            <h3 className='flex items-center gap-2 pb-3 font-semibold'>
                <Icon className={`h-4 w-4 ${iconClass}`} aria-hidden /> {title}
            </h3>
            {points.length === 0
                ? <p className='text-sm text-Secondary-Text'>Nothing noted for this category.</p>
                : <ul className='flex flex-col gap-2.5'>
                    {points.map((item, idx) =>
                        <li key={idx} className='flex gap-2 text-sm'>
                            <ItemIcon className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
                            <span className='text-gray-700'>{item}</span>
                        </li>)}
                </ul>}
        </div>
    )
}

// Strengths, areas to improve and recommendations for one feedback category
export default function Details({ strengths, improvements, recommendations }) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='grid gap-4 md:grid-cols-2'>
                <PointPanel icon={ThumbsUp} itemIcon={CircleCheck} title='What went well' points={strengths}
                    panelClass='bg-green-50 ring-1 ring-green-100' iconClass='text-green-600' />
                <PointPanel icon={TrendingUp} itemIcon={MoveUpRight} title='Areas to improve' points={improvements}
                    panelClass='bg-amber-50 ring-1 ring-amber-100' iconClass='text-amber-600' />
            </div>

            {recommendations.length > 0 &&
                <div>
                    <h3 className='flex items-center gap-2 pb-3 font-semibold'>
                        <Lightbulb className='h-4 w-4 text-light-blue' aria-hidden /> Recommendations for next time
                    </h3>
                    <ol className='flex flex-col gap-2'>
                        {recommendations.map((val, idx) =>
                            <li key={idx} className='flex gap-3 rounded-xl border border-brand-secondary p-3 text-sm'>
                                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-light-blue text-xs font-semibold text-white'>{idx + 1}</span>
                                <span className='text-gray-700'>{val}</span>
                            </li>)}
                    </ol>
                </div>}
        </div>
    )
}
