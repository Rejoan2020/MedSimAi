import React from 'react'
import { redirect } from 'next/navigation'
import AdminAuth from './components/AdminAuth'
import { getCurrentUser, isAdmin } from '@/lib/currentUser'
import { adminExists } from '@/lib/accounts'
import { demoEnabled } from '@/lib/demo'

export const metadata = {
  title: 'Admin sign in · MedSimAI',
}

export default async function page() {
  const user = await getCurrentUser();
  if (isAdmin(user)) redirect('/admin-dashboard');

  const allowSignup = !(await adminExists());

  return (
    <AdminAuth allowSignup={allowSignup} signedInAs={user?.email ?? null} demo={demoEnabled()} />
  )
}
