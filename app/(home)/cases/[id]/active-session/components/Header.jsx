'use client'
import { ArrowLeft, Clock, StopCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Header({ id }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                return prev + 1;
            })
        }, 1000);
        return () => clearInterval(interval)
    }, [])

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div className='flex justify-between max-w-350 w-full gap-4'>
            <div className='flex justify-between gap-2 cursor-pointer min-w-54 p-2'>
                <ArrowLeft className='w-6 h-6' />
                <div>Nutrition Support (SS1)</div>
            </div>

            <div className='flex min-w-64 gap-4'>
                <Link className='flex justify-between hover:bg-red-500 cursor-pointer bg-red-600 text-white gap-2 border rounded-lg p-2'
                    href={`/cases/${id}/feedback`}>
                    <StopCircle />
                    <div>Stop Session</div>
                </Link>
                <div className='flex justify-between gap-2 p-2'>
                    <Clock />
                    <div>
                        {String(minutes).padStart(2, '0')}:
                        {String(remainingSeconds).padStart(2, '0')}
                    </div>
                </div>
            </div>

        </div>
    )
}
