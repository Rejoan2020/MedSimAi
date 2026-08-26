import React from 'react'
import {
    LayoutDashboard,
    Bell,
    CircleHelp,
    Settings,
    LogOut,
    ToolCase,
} from 'lucide-react'
import { logout } from '../actions/auth'
import Link from 'next/link'

export default function Modal({ openMenu, setOpenMenu }) {
    const menu = [
        {
            'icon': LayoutDashboard,
            'title': 'Dashboard',
            'link': '/dashboard'
        },
        {
            'icon': ToolCase,
            'title': 'Cases',
            'link': '/cases'
        },
        {
            'icon': Bell,
            'title': 'Announcements',
            'link': '/announcements'
        },
        {
            'icon': CircleHelp,
            'title': 'Help & FAQ',
            'link': '/help&faq'
        },

        {
            'icon': Settings,
            'title': 'Settings',
            'link': '/'
        }
    ]
    return (
        <div className="w-56 overflow-hidden rounded-xl border border-white/10 bg-deep-blue shadow-xl">

            <div className="border-b border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-white">
                    Menu
                </p>
            </div>

            <div className="p-2">
                {menu.map((m, idx) =>
                    <Link
                        key={idx}
                        href={m.link} className="flex cursor-pointer w-full items-center gap-3 rounded-lg p-3 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                        onClick={() => setOpenMenu(!openMenu)}
                    >

                        <m.icon size={18} />
                        <span>{m.title}</span>
                    </Link>
                )}

                <div className="flex cursor-pointer w-full items-center gap-3 rounded-lg p-3 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white">
                    <form action={logout}>
                        <button
                            type="submit"
                            className="flex gap-2 items-center cursor-pointer"
                        >
                            <LogOut size={18} />
                            <div>Sign out</div>
                        </button>
                    </form>
                </div>


            </div>
        </div>
    )
}