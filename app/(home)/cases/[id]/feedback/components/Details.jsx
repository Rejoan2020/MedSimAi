import PerformanceIndicator from '@/components/PerformanceIndicator'
import React from 'react'
import { Check, CircleAlert } from 'lucide-react'

export default function Details({ performance, strengths, improvements, recommendations, }) {
    return (
        <div className='flex flex-col gap-6'>
            {performance.length > 0 &&
                <div>
                    <h3 className='pb-3 font-semibold'>Performance by section</h3>
                    <div className='grid gap-3 md:grid-cols-2'>
                        {performance.map((item, idx) =>
                            <div key={idx} className='rounded-lg border border-gray-200 p-3'>
                                <div className='flex justify-between gap-2 pb-2 text-sm'>
                                    <span className='font-medium'>{item.section}</span>
                                    <span className='shrink-0 text-Secondary-Text'>{item.score}/{item.maxScore}</span>
                                </div>
                                <PerformanceIndicator score={item.score} />
                                {item.details && <p className='pt-2 text-sm text-Secondary-Text'>{item.details}</p>}
                            </div>)}
                    </div>
                </div>}

            <div className='grid gap-6 md:grid-cols-2'>
                <div>
                    <h3 className='pb-3 font-semibold'>Key strengths</h3>
                    <ul className='flex flex-col gap-2'>
                        {strengths.map((item, idx) =>
                            <li key={idx} className='flex gap-2 text-sm'>
                                <Check className='h-5 w-5 shrink-0 text-green-600' />
                                <span className='text-Secondary-Text'>{item}</span>
                            </li>)}
                    </ul>
                </div>
                <div>
                    <h3 className='pb-3 font-semibold'>Areas to improve</h3>
                    <ul className='flex flex-col gap-2'>
                        {improvements.map((item, idx) =>
                            <li key={idx} className='flex gap-2 text-sm'>
                                <CircleAlert className='h-5 w-5 shrink-0 text-red-500' />
                                <span className='text-Secondary-Text'>{item}</span>
                            </li>)}
                    </ul>
                </div>
            </div>

            {recommendations.length > 0 &&
                <div>
                    <h3 className='pb-3 font-semibold'>Recommendations</h3>
                    <ol className='flex flex-col gap-2'>
                        {recommendations.map((val, idx) =>
                            <li key={idx} className='flex gap-3 rounded-lg border border-gray-200 p-3 text-sm'>
                                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-light-blue/15 text-xs font-semibold text-deep-blue'>{idx + 1}</span>
                                <span className='text-Secondary-Text'>{val}</span>
                            </li>)}
                    </ol>
                </div>}
        </div>
    )
}
