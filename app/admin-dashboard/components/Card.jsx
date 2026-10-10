import Image from 'next/image'
import React from 'react'

export default function Card({ title, number, icon }) {
    return (
        <div className='flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5'>
            <div className='min-w-0'>
                <div className='text-sm text-Secondary-Text'>{title}</div>
                <div className='mt-1 text-3xl font-semibold text-[#2536A8]'>{number}</div>
            </div>
            <Image height={48} width={48} src={icon} alt='' className='h-12 w-12 shrink-0' />
        </div>
    )
}
