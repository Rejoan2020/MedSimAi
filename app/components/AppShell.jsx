import React from 'react'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

// Page frame for signed-in areas: sidebar on large screens, top bar + menu below
export default function AppShell({ children, ...navProps }) {
    return (
        <div className='flex h-dvh w-full flex-col overflow-hidden lg:flex-row'>
            <MobileNav {...navProps} />
            <Sidebar {...navProps} />
            <div className='min-w-0 flex-1 overflow-y-auto bg-gray-50'>
                {children}
            </div>
        </div>
    )
}
