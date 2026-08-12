import React from 'react'
import Button from './Button'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    const buttons = [
        {
            'icon': '',
            'title': 'Unpublish',
        },
        {
            'icon': '/icons/openeye.svg',
            'title': 'Preview',
        },
        {
            'icon': '/icons/edit.svg',
            'title': 'Edit',
        }
    ]
    return (
        <div>
            <div className='flex w-full justify-between'>
                <div className='border m-1 px-4 text-[#2536A8] bg-[#F0F4FE] flex justify-center items-center gap-1 rounded-full text-[14px]'>
                    <Image src={'/icons/bookmark.svg'} height={20} width={20} alt='bookmark' className='h-5 w-5'/>
                    <div>Neurology</div>
                </div>
                <div className='flex gap-2'>
                    {buttons.map((button, index) => <Button key={index} title={button.title} icon={button.icon} />)}
                </div>
            </div>
            <div className='text-[28px] font-medium'>Test Case Study</div>
            <div className='text-[#717680]'>Created by <Link href={'/'} className='text-light-blue'>MedSimAi</Link>  . 3 Cases . 0h Total</div>
        </div>
    )
}
