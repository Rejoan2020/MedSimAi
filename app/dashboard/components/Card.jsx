import Image from 'next/image'
import React from 'react'

export default function Card({ title, number, icon }) {
    return (
        <div className='p-4 border-0 bg-[linear-gradient(to_right,#FFFDFC,#F8FDFF,#F7FAFF)]'>
            <div className='flex justify-between items-center'>
                <div className='text-[16px]'>{title}</div>
                <Image height={64} width={64} src={icon} alt={title}/>
            </div>
            <div className='text-[#2536A8] text-[64px]'>{number}</div>
        </div>
    )
}
