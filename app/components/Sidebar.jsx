'use client'
import { LogOut, MoonIcon, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { adminLogout, logout } from '../actions/auth'
import { usePathname } from 'next/navigation'

const adminMenu = [
    {
        'icon': '/icons/medal.svg',
        'title': 'Overview',
        'link': '/admin-dashboard',
        'exact': true,
    },
    {
        'icon': '/sidebar/learningpaths.png',
        'title': 'Cases',
        'link': '/admin-dashboard/cases',
    },
    {
        'icon': '/sidebar/notification.png',
        'title': 'Announcements',
        'link': '/admin-dashboard/announcements',
    },
    {
        'icon': '/sidebar/questions.png',
        'title': 'Help & FAQ',
        'link': '/admin-dashboard/faq',
    },
    {
        'icon': '/icons/students.svg',
        'title': 'Users',
        'link': '/admin-dashboard/users',
    },
    {
        'icon': '/icons/openeye.svg',
        'title': 'Student view',
        'link': '/dashboard',
    },
]

export default function Sidebar({ name, email, variant = 'student', isAdmin = false }) {
    const pathname = usePathname()
    const studentMenu = [
        {
            'icon': '/icons/students.svg',
            'title': 'Dashboard',
            'link': '/dashboard'
        },
        {
            'icon': '/sidebar/learningpaths.png',
            'title': 'Cases',
            'link': '/cases'
        },
        {
            'icon': '/sidebar/notification.png',
            'title': 'Announcements',
            'link': '/announcements'
        },
        {
            'icon': '/sidebar/questions.png',
            'title': 'Help & FAQ',
            'link': '/help&faq'
        },
        ...(isAdmin ? [{
            'icon': '/icons/edit.svg',
            'title': 'Admin',
            'link': '/admin-dashboard'
        }] : []),
    ]
    const menu = variant === 'admin' ? adminMenu : studentMenu

    const isActive = (m) => m.exact
        ? pathname === m.link
        : pathname === m.link || pathname.startsWith(`${m.link}/`)

    return (
        <div className='flex flex-col max-sm:hidden w-70 shrink-0 bg-deep-blue text-white/70'>
            <Link href={'/dashboard'}>
                <Image
                    width={162}
                    height={32}
                    alt='medsimai logo'
                    src={'/logo/medsimailogo.png'}
                    className='m-10 w-[162px] h-[32px]'
                />
            </Link>

            <div className='pl-10 pb-4 text-[#D5D7DA]'>Platform</div>
            {
                menu.map((m, idx) =>
                    <Link
                        key={idx}
                        className={`flex gap-2 p-4 pl-10 hover:bg-white/10 hover:text-white ${isActive(m) ? "bg-white/10 text-white" : ""} cursor-pointer`}
                        href={m.link}
                    >
                        <Image width={24} height={24} alt={m.title} src={m.icon} className='w-6 h-6' />
                        <div>{m.title}</div>
                    </Link>)
            } 
            <div className='mt-auto p-4 pl-10 flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <div className='text-Secondary-Text'>THEME</div>
                    <div className='flex gap-2'>
                        <Image width={24} height={24} alt='notification' src={'/sidebar/notification.png'} className='w-6 h-6' />
                        <MoonIcon className='w-6 h-6' />
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='border-0 hover:border-1 flex items-center justify-center rounded-full bg-light-blue p-2 h-10 w-10 cursor-pointer'>{name?.charAt(0)}</div>
                    <div>
                        <div>{name ? name : "No user"}</div>
                        <div className='text-Secondary-Text'>{variant === 'admin' || isAdmin ? 'Admin' : 'Student'}</div>
                    </div>
                    <Settings className='w-6 h-6 cursor-pointer' />
                </div>
                <form action={variant === 'admin' ? adminLogout : logout}>
                    <button
                        type="submit"
                        className="flex gap-2 mt-2 text-Secondary-Text hover:text-white cursor-pointer"
                    >
                        <LogOut />
                        <div>Sign out</div>
                    </button>
                </form>
            </div>
        </div>
    )
}
