import ResponsiveCircle from '@/components/ResponsiveCircle'
import { ChevronDown } from 'lucide-react'
import React from 'react'

export default function Block({percentage}) {
    return (
        <div className='flex flex-col gap-8 w-full bg-blue-100 h-16 items-center p-4 border border-gray-100 rounded-t-lg'>
            <div className='w-full flex justify-between'>
                <div className='text-deep-blue font-bold'>Consultation</div>
                <div className='flex p-1 rounded-lg bg-white border-0'>
                    <div>Show details</div>
                    <ChevronDown />
                </div>
            </div>

            <div className='w-full flex gap-8'>
                <div>
                    <ResponsiveCircle percentage={percentage} />
                </div>
                <div>
                    <div className='text-[18px] font-semibold'>Needs Improvement</div>
                    <div className='text-Secondary-Text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus excepturi commodi ea expedita nemo odio odit, nisi necessitatibus consectetur natus voluptate nesciunt perferendis aspernatur. Quaerat magnam quisquam laboriosam blanditiis sunt.</div>
                </div>
            </div>
        </div>
    )
}
