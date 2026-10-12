import React from 'react'
import { Info } from 'lucide-react'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

const DEMO_NOTES = {
    student: "You're exploring the demo. Live AI sessions are turned off, but you can browse cases and sample AI feedback.",
    admin: "You're exploring the demo admin. Look around freely; changes aren't saved.",
}

export default function AppShell({ children, demo = false, ...navProps }) {
    return (
        <div className='flex h-dvh w-full flex-col overflow-hidden lg:flex-row'>
            <MobileNav {...navProps} />
            <Sidebar {...navProps} />
            <div className='min-w-0 flex-1 overflow-y-auto bg-gray-50'>
                {demo &&
                    <div role='note' className='flex items-center justify-center gap-2 border-b border-brand-secondary bg-brand-primary px-4 py-2 text-center text-sm text-deep-blue'>
                        <Info className='h-4 w-4 shrink-0 text-light-blue' aria-hidden />
                        {DEMO_NOTES[navProps.variant === 'admin' ? 'admin' : 'student']}
                    </div>}
                {children}
            </div>
        </div>
    )
}
