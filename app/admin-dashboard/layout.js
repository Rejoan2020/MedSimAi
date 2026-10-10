import React from 'react'
import Sidebar from '../components/Sidebar'
import { requireAdminPage } from '@/lib/currentUser'

export default async function layout({ children }) {
    const user = await requireAdminPage();

    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar name={user.name} email={user.email} variant="admin" />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
