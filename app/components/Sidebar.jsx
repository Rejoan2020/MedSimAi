import Image from 'next/image'
import React from 'react'

export default function Sidebar() {
    const menu = [
        {
            'icon': '/sidebar/notification.png',
            'title': 'Case Catalogue'
        },
        {
            'icon': '/sidebar/learningpaths.png',
            'title': 'My Learning Paths'
        },
        {
            'icon': '/sidebar/notification.png',
            'title': 'Announcements'
        }
    ]
    return (
        <div className='flex flex-col w-70 shrink-0 bg-deep-blue text-white'>
            <Image width={162} height={32} alt='medsimai logo' src={'/logo/medsimailogo.png'}
                className='m-10 w-[162px] h-[32px]' />
            <div className='pl-10 pb-4 text-[#D5D7DA]'>Platform</div>
            {
                menu.map((m, idx) => <div key={idx} className='flex gap-1 p-4 pl-10 hover:bg-[#6796F2] '>
                    <Image width={24} height={24} alt={m.title} src={m.icon} className='w-6 h-6'/>
                    <div>{m.title}</div>
                </div>)
            }
        </div>
    )
}
