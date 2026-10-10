import React from 'react'
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar'
import { auth } from '@/auth';
import Navbar from '../components/Navbar';

export default async function layout({ children }) {
    const session = await auth();
    if (!session?.user) redirect('/signin');

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="sm:hidden max-sm:h-16 shrink-0">
                <Navbar name={session.user.name} email={session.user.email} />
            </div>
            <div className="max-sm:h-[calc(100vh-4rem)] sm:h-screen flex overflow-hidden">
                <Sidebar name={session.user.name} email={session.user.email} />
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
