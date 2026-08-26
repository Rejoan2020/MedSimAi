import React from 'react'
import Sidebar from '../components/Sidebar'
import { auth } from '@/auth';
import { dbconnect } from '@/lib/mongo';
import Navbar from '../components/Navbar';

export default async function layout({ children }) {
    await dbconnect();
    const session = await auth();

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
