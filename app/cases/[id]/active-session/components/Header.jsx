import { ArrowLeft, Clock, StopCircle } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <div className='flex justify-between max-w-350 w-full gap-4'>
            <div className='flex justify-between gap-2 cursor-pointer min-w-54 p-2'>
                <ArrowLeft className='w-6 h-6'/>
                <div>Nutrition Support (SS1)</div>
            </div>

            <div className='flex min-w-64 gap-4'>
                <div className='flex justify-between hover:bg-red-500 cursor-pointer bg-red-600 text-white gap-2 border rounded-lg p-2'>
                    <StopCircle/>
                    <div>Stop Session</div>
                </div>
                <div className='flex justify-between gap-2 p-2'>
                    <Clock/>
                    <div>30:15</div>
                </div>
            </div>

        </div>
    )
}
