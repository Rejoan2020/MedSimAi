import React from 'react'
import AppShell from '@/app/components/AppShell'
import { requireAdminPage } from '@/lib/currentUser'

export default async function layout({ children }) {
    const user = await requireAdminPage();

    return (
        <AppShell name={user.name} email={user.email} variant="admin">
            {children}
        </AppShell>
    )
}
