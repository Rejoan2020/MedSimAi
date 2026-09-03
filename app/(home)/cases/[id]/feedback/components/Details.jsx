import PerformanceIndicator from '@/components/PerformanceIndicator'
import React from 'react'
import { Check, CircleAlert } from 'lucide-react'

export default function Details({ performance, strengths, improvements, recommendations, }) {
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg p-8'>
                <div className='pb-6 font-semibold'>
                    Performance by section
                </div>

                <div className='grid 2xl:grid-cols-2 gap-2'>
                    {performance.map((item, idx) => <div key={idx} className='border p-2 rounded-lg border-gray-200'>
                        <div className='text-Secondary-Text pb-2 flex justify-between'>
                            <div>{item.section}({item.score}/{item.maxScore})</div>
                            <div className='text-blue-400'>See Details</div>
                        </div>
                        <PerformanceIndicator score={item.score} />
                    </div>)}
                </div>

            </div>

            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg p-8'>

                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <div>
                        <div className='font-semibold pb-4'>
                            Key Strength
                        </div>
                        {strengths.map((item, idx) => <div key={idx} className='flex gap-2'>
                            <Check color='green' className='w-6 h-6' />
                            <div className='text-Secondary-Text'>{item}</div>
                        </div>)}
                    </div>
                    <div>
                        <div className='font-semibold pb-4'>
                            Areas to improve
                        </div>
                        {improvements.map((item, idx) =>
                            <div key={idx} className='flex gap-2'>
                                <CircleAlert color='red' className='w-6 h-6' />
                                <div className='text-Secondary-Text'>{item} </div>
                            </div>)}
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg p-8'>
                <div className='font-bold pb-4'>Recommendations</div>
                <div className='flex flex-col gap-4'>
                    {recommendations.map((val, idx) =>
                        <div key={idx} className='border flex p-2 gap-2 border-gray-200 rounded-lg'>
                            <div className='border-0 w-6 h-6 flex justify-center bg-blue-500/50 items-center rounded-full'> {idx + 1}</div>
                            <div className='text-Secondary-Text '>{val}</div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}
