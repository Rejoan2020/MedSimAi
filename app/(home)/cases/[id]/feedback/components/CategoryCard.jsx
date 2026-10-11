'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ResponsiveCircle from '@/components/ResponsiveCircle'
import Details from './Details'

// Same bands the AI evaluator is told to use (see the feedback route's prompt)
function scoreLabel(score) {
    if (score >= 90) return { text: 'Excellent', className: 'text-green-700' }
    if (score >= 80) return { text: 'Very good', className: 'text-green-600' }
    if (score >= 70) return { text: 'Good', className: 'text-light-blue' }
    if (score >= 60) return { text: 'Needs significant improvement', className: 'text-amber-600' }
    return { text: 'Poor', className: 'text-red-600' }
}

// One feedback category (consultation, clinical reasoning or communication)
export default function CategoryCard({ title, category }) {
    const [showMore, setShowMore] = useState(false)
    const label = scoreLabel(category.score)

    return (
        <section className='overflow-hidden rounded-2xl border border-brand-secondary bg-white'>
            <div className='flex items-center justify-between gap-4 border-b border-gray-100 bg-brand-primary px-4 py-3 sm:px-6'>
                <h2 className='font-semibold text-deep-blue'>{title}</h2>
                <button
                    type="button"
                    onClick={() => setShowMore((prev) => !prev)}
                    aria-expanded={showMore}
                    className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-sm ring-1 ring-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                    {showMore ? 'Hide details' : 'Show details'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                </button>
            </div>

            <div className='flex flex-col items-center gap-4 p-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:p-6 sm:text-left'>
                <ResponsiveCircle percentage={category.score} />
                <div className='min-w-0'>
                    <div className={`text-lg font-semibold ${label.className}`}>{label.text}</div>
                    <p className='mt-1 text-Secondary-Text'>{category.description}</p>
                </div>
            </div>

            {showMore &&
                <div className='border-t border-gray-100 p-4 sm:p-6'>
                    <Details
                        performance={category.performance}
                        strengths={category.strengths}
                        improvements={category.improvements}
                        recommendations={category.recommendations}
                    />
                </div>}
        </section>
    )
}
