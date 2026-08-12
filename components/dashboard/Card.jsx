import Image from 'next/image'
import React from 'react'

export default function Card({ title, number, icon:Icon }) {
    return (
        <div className='p-8 px-12 border-1 border-[#F0F4FE] rounded-xl bg-[linear-gradient(to_right,#FFFDFC,#F8FDFF,#F7FAFF)]'>
            <div className='flex justify-between items-center'>
                <div className='text-[16px]'>{title}</div>
                <Icon/>
            </div>
            <div className='text-[#2536A8] text-[64px]'>{number}</div>
        </div>
    )
}
