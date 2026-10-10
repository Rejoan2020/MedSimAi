import React from 'react'
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar';
import { getCurrentUser, isAdmin } from '@/lib/currentUser';

export default async function layout({ children }) {
    const user = await getCurrentUser();
    if (!user) redirect('/signin');

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="sm:hidden max-sm:h-16 shrink-0">
                <Navbar name={user.name} email={user.email} />
            </div>
            <div className="max-sm:h-[calc(100vh-4rem)] sm:h-screen flex overflow-hidden">
                <Sidebar name={user.name} email={user.email} isAdmin={isAdmin(user)} />
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
