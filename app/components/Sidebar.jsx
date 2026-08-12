import { LogOut, MoonIcon, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Sidebar() {
    const menu = [
        {
            'icon': '/icons/students.svg',
            'title': 'Dashboard'
        },
        {
            'icon': '/sidebar/learningpaths.png',
            'title': 'Cases'
        },
        {
            'icon': '/sidebar/notification.png',
            'title': 'Announcements'
        },
        {
            'icon': '/sidebar/questions.png',
            'title': 'Help & FAQ'
        }
    ]
    const user = {
        'name': 'Abdullah-Al Maruf',
        'accountType': 'student'
    }
    return (
        <div className='flex flex-col w-70 shrink-0 bg-deep-blue text-white'>
            <Image width={162} height={32} alt='medsimai logo' src={'/logo/medsimailogo.png'}
                className='m-10 w-[162px] h-[32px]' />
            <div className='pl-10 pb-4 text-[#D5D7DA]'>Platform</div>
            {
                menu.map((m, idx) => <div key={idx} className='flex gap-2 p-4 pl-10 hover:bg-[#6796F2] cursor-pointer'>
                    <Image width={24} height={24} alt={m.title} src={m.icon} className='w-6 h-6' />
                    <div>{m.title}</div>
                </div>)
            }
            <div className='mt-auto p-4 pl-10 flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <div className='text-Secondary-Text'>THEME</div>
                    <div className='flex gap-2'>
                        <Image width={24} height={24} alt='notification' src={'/sidebar/notification.png'} className='w-6 h-6'/>
                        <MoonIcon className='w-6 h-6'/>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='border-0 hover:border-1 flex items-center justify-center rounded-full bg-light-blue p-2 h-10 w-10 cursor-pointer'>{user.name.charAt(0)}</div>
                    <div>
                        <div>{user.name}</div>
                        <div className='text-Secondary-Text'>{user.accountType}</div>
                    </div>
                    <Settings className='w-6 h-6 cursor-pointer'/>
                </div>
                <div className='flex gap-2 mt-2 text-Secondary-Text hover:text-white cursor-pointer'>
                    <LogOut/>
                    <div>Sign out</div>
                </div>
            </div>
        </div>
    )
}
