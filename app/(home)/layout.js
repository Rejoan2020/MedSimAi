import React from 'react'
import Sidebar from '../components/Sidebar'
import { auth } from '@/auth';

export default async function layout({ children }) {
    await dbconnect();
    const session = await auth();
    
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar name = {session.user.name} email = {session.user.email}/>
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
