import React from 'react'
import Tab from './components/Tab'
import Block from './components/Block'
import PerformanceIndicator from '@/components/PerformanceIndicator'
import { Check, CircleAlert, FileExclamationPoint } from 'lucide-react'

export default function page() {
    return (
        <div className='w-full flex flex-col justify-center items-center min-h-screen p-8 gap-4 bg-gray-100 min-w-200'>
            <div className='flex gap-2 w-full max-w-350'>
                {Array.from({ length: 4 }, (val, idx) => <Tab key={idx} number={idx + 1} title={'Consultation'} />)}
            </div>
            <div className='flex w-full max-w-350 bg-white rounded-lg'>
                {Array.from({ length: 4 }, (val, idx) => <div key={idx} className='border-x border-gray-200 px-4 flex justify-center p-2'>Tutor feedback</div>)}
            </div>
            {/* <div className='flex w-full max-w-350 bg-white min-h-screen p-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam explicabo minus excepturi atque voluptatem dolor ea vitae esse consequatur? Dolorem corporis voluptatum deserunt impedit officiis libero ipsa rem ut laboriosam.
            </div> */}
            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg'>
                <Block percentage={64} />
            </div>

            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg p-8'>
                <div className='pb-6 font-semibold'>
                    Performance by section
                </div>
                <div className='grid 2xl:grid-cols-2 gap-2'>
                    {Array.from({ length: 8 }, (val, idx) => <div key={idx} className='border p-2 rounded-lg border-gray-200'>
                        <div className='text-Secondary-Text pb-2 flex justify-between'>
                            <div>Opening(05/10)</div>
                            <div className='text-blue-400'>See Details</div>
                        </div>
                        <PerformanceIndicator score={5} />
                    </div>)}
                </div>

            </div>
            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg p-8'>

                <div className='grid grid-cols-2'>
                    <div>
                        <div className='font-semibold pb-4'>
                            Key Strength
                        </div>
                        {Array.from({ length: 3 }, (val, idx) => <div className='flex gap-2'>
                            <Check color='green' className='w-6 h-6' />
                            <div className='text-Secondary-Text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam explicabo minus excepturi atque voluptatem dolor ea vitae esse consequatur? </div>
                        </div>)}
                    </div>
                    <div>
                        <div className='font-semibold pb-4'>
                            Areas to improve
                        </div>
                        {Array.from({ length: 3 }, (val, idx) => <div className='flex gap-2'>
                            <CircleAlert color='red' className='w-6 h-6' />
                            <div className='text-Secondary-Text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam explicabo minus excepturi atque voluptatem dolor ea vitae esse consequatur? </div>
                        </div>)}
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg p-8'>
                <div className='font-bold pb-4'>Recommendations</div>
                <div className='flex flex-col gap-4'>
                    {Array.from({ length: 3 }, (val, idx) => <div key={idx} className='border flex p-2 gap-2 border-gray-200 rounded-lg'>
                        <div className='border-0 w-6 h-6 flex justify-center bg-blue-500/50 items-center rounded-full'> {idx+1}</div>
                        <div className='text-Secondary-Text '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                    </div>)}
                </div>
            </div>


            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg'>
                <Block percentage={12} />
            </div>
            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg'>
                <Block percentage={88} />
            </div>
        </div>
    )
}
