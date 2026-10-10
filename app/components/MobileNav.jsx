'use client'
import { Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Logo, NavContent } from './Sidebar'

// Top bar with a slide-in menu, shown below the lg breakpoint
export default function MobileNav(props) {
    const pathname = usePathname()
    // The page the menu was opened on; navigating anywhere else closes it
    const [openedOn, setOpenedOn] = useState(null)
    const open = openedOn === pathname
    const setOpen = (value) => setOpenedOn(value ? pathname : null)

    // Close on Escape
    useEffect(() => {
        if (!open) return
        const onKey = (e) => e.key === 'Escape' && setOpenedOn(null)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open])

    return (
        <div className='lg:hidden'>
            <header className='flex h-14 items-center justify-between bg-deep-blue px-4'>
                <Logo href={props.variant === 'admin' ? '/admin-dashboard' : '/dashboard'} />
                <button
                    type='button'
                    onClick={() => setOpen(true)}
                    aria-label='Open menu'
                    aria-expanded={open}
                    className='rounded-lg p-2 text-white hover:bg-white/10 cursor-pointer'
                >
                    <Menu className='h-6 w-6' />
                </button>
            </header>

            {open &&
                <div className='fixed inset-0 z-50' role='dialog' aria-modal='true' aria-label='Menu'>
                    <div className='absolute inset-0 bg-black/40' onClick={() => setOpen(false)} />
                    <div className='absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-deep-blue shadow-xl'>
                        <div className='flex items-center justify-between px-4 py-4'>
                            <Logo href={props.variant === 'admin' ? '/admin-dashboard' : '/dashboard'} />
                            <button
                                type='button'
                                onClick={() => setOpen(false)}
                                aria-label='Close menu'
                                className='rounded-lg p-2 text-white hover:bg-white/10 cursor-pointer'
                            >
                                <X className='h-6 w-6' />
                            </button>
                        </div>
                        <NavContent {...props} onNavigate={() => setOpen(false)} />
                    </div>
                </div>}
        </div>
    )
}
