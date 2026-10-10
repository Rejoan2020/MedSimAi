'use client'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { adminLogout, logout } from '../actions/auth'
import { usePathname } from 'next/navigation'
import { getMenu, isActive } from './navigation'

// Menu links, user details and sign out; used by the desktop sidebar and the mobile menu
export function NavContent({ name, email, variant = 'student', isAdmin = false, onNavigate }) {
    const pathname = usePathname()
    const menu = getMenu(variant, isAdmin)
    const roleLabel = variant === 'admin' || isAdmin ? 'Admin' : 'Student'

    return (
        <div className='flex h-full flex-col'>
            <nav className='flex flex-col gap-1 px-3' aria-label='Main'>
                <div className='px-3 pb-2 text-xs font-medium uppercase tracking-wide text-white/50'>
                    {variant === 'admin' ? 'Admin' : 'Platform'}
                </div>
                {menu.map((m) => {
                    const active = isActive(pathname, m)
                    const Icon = m.icon
                    return (
                        <Link
                            key={m.link}
                            href={m.link}
                            onClick={onNavigate}
                            aria-current={active ? 'page' : undefined}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                        >
                            <Icon className='h-5 w-5 shrink-0' />
                            <span>{m.title}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className='mt-auto border-t border-white/10 p-4'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light-blue font-semibold text-white'>
                        {name?.charAt(0)?.toUpperCase() ?? '?'}
                    </div>
                    <div className='min-w-0'>
                        <div className='truncate text-sm text-white'>{name ?? 'No user'}</div>
                        <div className='truncate text-xs text-white/50'>{email ?? roleLabel}</div>
                    </div>
                </div>
                <form action={variant === 'admin' ? adminLogout : logout} className='mt-3'>
                    <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                        <LogOut className='h-4 w-4' />
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    )
}

export function Logo({ href }) {
    return (
        <Link href={href} className='inline-flex'>
            <Image
                width={182}
                height={32}
                alt='MedSimAI'
                src={'/logo/medsimailogo.png'}
                className='h-8 w-[182px]'
                priority
            />
        </Link>
    )
}

// Desktop sidebar, shown from the lg breakpoint; MobileNav takes over below it
export default function Sidebar(props) {
    return (
        <aside className='hidden w-64 shrink-0 flex-col bg-deep-blue lg:flex'>
            <div className='px-6 py-6'>
                <Logo href={props.variant === 'admin' ? '/admin-dashboard' : '/dashboard'} />
            </div>
            <NavContent {...props} />
        </aside>
    )
}
