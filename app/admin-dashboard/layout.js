import React from 'react'
import { redirect } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import { getCurrentUser, isAdmin } from '@/lib/currentUser'

export default async function layout({ children }) {
    const user = await getCurrentUser();
    if (!user) redirect('/signin');
    if (!isAdmin(user)) redirect('/dashboard');

    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar name={user.name} email={user.email} />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
