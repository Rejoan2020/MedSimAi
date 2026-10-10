import React from 'react'
import Dashboard from '../components/AdminDashboard'
import { getAdminOverview } from '@/lib/stats'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();

  const overview = await getAdminOverview();
  return (
    <>
      <Dashboard overview={overview} />
    </>
  )
}
