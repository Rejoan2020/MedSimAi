import React from 'react'
import { redirect } from 'next/navigation';
import AppShell from '../components/AppShell';
import { getCurrentUser, isAdmin } from '@/lib/currentUser';

export default async function layout({ children }) {
    const user = await getCurrentUser();
    if (!user) redirect('/signin');

    return (
        <AppShell name={user.name} email={user.email} isAdmin={isAdmin(user)} demo={Boolean(user.isDemo)}>
            {children}
        </AppShell>
    )
}
